// https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/serviceworker
export const updateRequest = async (oldRequest, newURL, newInit = {}) => {
  const oldInit = {};
  for (const key of Object.keys(Request.prototype)) {
    if (key === "url") {
      continue;
    }
    oldInit[key] = oldRequest[key];
  }
  if (
    oldRequest.method.toUpperCase() !== "HEAD" &&
    oldRequest.method.toUpperCase() !== "GET"
  ) {
    const blob = await oldRequest.blob();
    if (blob.size > 0) {
      oldInit.body = blob;
    }
  }
  return new Request(newURL || oldRequest.url, { ...oldInit, ...newInit });
};

// Visit given url
export const ActionSingle = (url) => () => fetch(url); // String => stagic get of single address

// URLs attempted based on given weight probabilty
export const ActionWeightedProbability = (
  weights,
  { check = () => {}, tries = 1 } = {}
) => {
  const values = Object.entries(weights)
    .map(([url, weight]) => {
      const result = [];
      for (let i = 0; i < weight; i++) {
        result.push(url);
      }
      return result;
    })
    .flat();
  return async () => {
    for (let i = 0; i < tries; i++) {
      try {
        const response = await fetch(
          values[Math.floor(Math.random() * values.length)]
        );
        check(response);
        return response;
      } catch {
        continue;
      }
    }
    throw new Error("could not connect");
  };
};

// URLs attempted in order.
export const ActionRoundRobin = (
  urls,
  { check = () => {}, tries = 1 } = {}
) => {
  return async () => {
    for (let i = 0; i < tries; i++) {
      for (const url of urls) {
        try {
          const response = await fetch(url);
          check(response);
          return response;
        } catch {
          continue;
        }
      }
    }
    throw new Error("could not connect");
  };
};

// First successful url becomes used permanenty
export const ActionSticky = (urls, { check = () => {}, tries = 1 } = {}) => {
  let saved = null;
  return async () => {
    for (let i = 0; i < tries; i++) {
      if (saved !== null) {
        await fetch(url);
      } else {
        for (const url of urls) {
          try {
            const response = await fetch(url);
            check(response);
            saved = url;
            return response;
          } catch {
            continue;
          }
        }
      }
    }
    throw new Error("could not connect");
  };
};

export const Route = class {
  constructor(action, match = false) {
    this.__action = action;
    if (match === false) {
      this.__match = {
        url: false,
        method: false,
        headers: false,
        body: false,
      };
    } else if (
      typeof match === "string" ||
      match instanceof RegExp ||
      Array.isArray(match)
    ) {
      this.__match = {
        url: match,
        method: false,
        headers: false,
        body: false,
      };
    } else {
      this.__match = {
        url: match.url || false,
        method: match.method || false,
        headers: match.headers || false,
        body: match.body || false,
      };
    }
  }
  __test(request) {
    let match = this.__match;
    if (match.url) {
      if (Array.isArray(match.url)) {
        let atLeastOne = false;
        for (const m of match.url) {
          if (m instanceof RegExp) {
            if (m.test(request.url)) {
              atLeastOne = true;
              break;
            }
          } else {
            if (m === request.url) {
              atLeastOne = true;
              break;
            }
          }
        }
        if (!atLeastOne) {
          return false;
        }
      } else if (match.url instanceof RegExp) {
        if (!match.url.test(request.url)) {
          return false;
        }
      } else {
        if (match.url !== request.url) {
          return false;
        }
      }
    }
    if (match.method) {
      if (match.method instanceof RegExp) {
        if (!match.method.test(request.method)) {
          return false;
        }
      } else {
        if (match.method !== request.method) {
          return false;
        }
      }
    }
    if (match.headers) {
      for (const [header, match] of Object.entries(match.headers)) {
        const value = request.headers.get(header);
        if (match instanceof RegExp) {
          if (!match.test(value)) {
            return false;
          }
        } else {
          if (match !== value) {
            return false;
          }
        }
      }
    }
    if (match.body) {
      if (match.body instanceof RegExp) {
        if (!match.body.test(request.body)) {
          return false;
        }
      } else {
        if (match.body !== request.body) {
          return false;
        }
      }
    }
    return true;
  }
  __exec(request) {
    const output = {};
    let match = this.__match;
    if (match.url) {
      if (Array.isArray(match.url)) {
        output.url = [];
        for (const m of match.url) {
          if (m instanceof RegExp) {
            output.url.push[m.exec(request.url)];
          } else {
            if (m === request.url) {
              output.url.push([m, m === request.url]);
            }
          }
        }
      } else if (match.url instanceof RegExp) {
        output.url = match.url.exec(request.url);
      } else {
        output.url = request.url;
      }
    }
    if (match.method) {
      if (match.method instanceof RegExp) {
        output.method = match.method.exec(request.method);
      } else {
        output.method = request.method;
      }
    }
    if (match.headers) {
      output.headers = {};
      for (const [header, match] of Object.entries(match.headers)) {
        const value = request.headers.get(header);
        if (match instanceof RegExp) {
          output.headers[header] = match.exec(value);
        } else {
          output.headers[header] = value;
        }
      }
    }
    if (match.body) {
      if (match.body instanceof RegExp) {
        output.body = match.body.exec(request.body);
      } else {
        output.body = request.body;
      }
    }
    return output;
  }
  async send(currentRequest, currentResponse) {
    if (this.__test(currentRequest)) {
      return this.__action(
        currentRequest,
        currentResponse,
        this.__exec(currentRequest)
      );
    }
  }
};

export const Router = class {
  constructor(...routes) {
    this.__routes = routes;
  }
  get lastRoute() {
    return __routes[__routes.length - 1];
  }
  async send(request) {
    let currentRequest = request.clone();
    let currentResponse;
    try {
      for (const route of this.__routes) {
        const res = await route.send(currentRequest, currentResponse);
        if (res instanceof Response) {
          return res;
        } else if (res === undefined) {
          // skip to next route
          continue;
        } else if (res === false) {
          // send current request to default route... can this be more useful?
          return this.lastRoute.send(currentRequest);
        } else if (res === null) {
          // send original original request route... can this be more useful?;
          return this.lastRoute.send(request);
        } else if (typeof res === "number") {
          // return code with default message
          return new Response("", { status: res });
        } else if (typeof res === "string") {
          return new Response(res);
        } else if (Array.isArray(res)) {
          [currentRequest, currentResponse] = res;
        }
      }
      throw new Error("matching route not found");
    } catch (error) {
      return new Response(error, { status: 500 });
    }
  }
  get routes() {
    return this.__routes;
  }
  // [Symbol.iterator]{
  //   return this.routes();
  // }
};
