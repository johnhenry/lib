# CORS Helper

This utility is used to help define CORS headers for a given request origin.

## API

### CreateCORSHelper Function (default export)

The default export is a function that creates a CORS helper object given the following parameters:

- **allowedOrigins** -- array of origins that are be allowed to make CORS requests
  - a [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String),
    a [regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp),
    or a [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API) that's tested against the request origin
  - instead of an array, this may be a function that takes a request and returns a boolean.
- **deniedOrigins** -- list of origins that are deined from making CORS requests
  - (see allowedOrigins)
- **headers** -- a [heaaders init object or array](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers#parameters)
  used as the basis for headers set for allowed cors requests
- **accessControlAllowOrigin** -- function who's return value is used as the "Access-Control-Allow-Origin" header
  - it takes as parameters:
    - the request origin
    - the match from (see allowedOrigins above)
    - the full request object
  - by default, it returns the request origin. You may choose to have it return "\*" to , but this causes requests sent with credentials to fail.

The CORS helper has the following methods that take a [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object as a parameter:

- **getHeadersInit** -- returns a [heaaders init array](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers#parameters) configured for CORS if the request is allowed, or an empty array if not.

  - This is designed to be used to as a base for headers in most [non-OPTIONS] responses.

- **getResponse** -- returns a [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) with headers configured for CORS if the request is allowed, or a response with empty headers if not.
  - You may pass a second parameter to overide the default "ok" message in the response.
  - This is designed to be used to respond to OPTIONS requests.

## Example Usage

```javascript
// 0. Create helper object
import CreateCORSHelper from "...";
const helper = CreateCORSHelper([
  "http://localhost:3000",
  new URLPattern({ hostname: "{:subdomain.}*example.com" }),
  /./,
]);
const handler = (request) => {
  // 1. If the request method is "OPTIONS"
  // respond immediately with response object
  // returned by the helper's getResponse method
  if (request.method === "OPTIONS") {
    return helper.getResponse(request);
  }
  // 2. Otherwise, construct a response object
  // using the array from the helper's
  // getHeadersInit method as a base for it's headers
  const otherHeades = [];
  const headers = new Headers([
    ...helper.getHeadersInit(request),
    ...otherHeaders,
  ]);
  return new Response("...", {
    headers,
  });
};
```
