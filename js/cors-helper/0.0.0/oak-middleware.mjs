import CreateCORSHelper from "./index.mjs";

// Route that blanketly enables CORS headers for all requests
const CreateOakMiddleware = (...init) => {
  const helper = CreateCORSHelper(...init);
  return async ({ request, response }, next) => {
    for (const [key, value] of helper.getHeadersInit(request)) {
      response.headers.set(key, value);
    }
    if (request.method !== "OPTIONS") {
      await next();
    } else {
      response.body = "";
    }
  };
};

export default CreateOakMiddleware;
