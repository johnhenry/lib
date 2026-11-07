/*
Name: CreateCORSHelper
Description: Creates a helper object that can be used to create a CORS-compatible response
*/
const CreateCORSHelper = (
  allowedOrigins = [],
  deniedOrigins = [],
  headers = [
    ["Access-Control-Allow-Credentials", "true"],
    ["Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"],
    [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    ],
  ],
  accessControlAllowOrigin = (origin) => origin
) => {
  if (!Array.isArray(headers)) {
    headers = Object.entries(headers);
  }
  const getHeadersInit = (request) => {
    let matched = allowedOrigins;
    const origin = String(request.headers.get("origin"));
    if (typeof allowedOrigins === "function") {
      matched = allowedOrigins(request);
    } else if (allowedOrigins.length) {
      matched = false;
      for (const url of allowedOrigins) {
        if (typeof url === "string" ? url === origin : url.test(origin)) {
          matched = url;
          break;
        }
      }
    }
    if (!matched) {
      return [];
    }
    if (deniedOrigins === true) {
      return [];
    }
    if (typeof deniedOrigins === "function") {
      if (deniedOrigins(request)) {
        return [];
      }
    }
    if (deniedOrigins.length) {
      for (const url of deniedOrigins) {
        if (typeof url === "string" ? url === origin : url.test(origin)) {
          return [];
        }
      }
    }
    return [
      [
        "Access-Control-Allow-Origin",
        accessControlAllowOrigin(origin, matched, request),
      ],
      ...headers,
    ];
  };

  const getResponse = (request, message = "ok") => {
    return new Response(message, {
      headers: new Headers(getHeadersInit(request)),
    });
  };
  return {
    getHeadersInit,
    getResponse,
  };
};

export default CreateCORSHelper;
