// https://developer.mozilla.org/en-US/docs/Web/API/Response
import InvertedPromise from "../../../invertedpromise/0.0.0/index.mjs";
import InvertedIterator from "../../../invertediterator/0.0.0/index.mjs";
import pause from "../../../pause/0.0.0/index.mjs";

const VERSION = "HTTP/1.1";

const defaultStatusMessages = {
  200: "OK",
};
export default class {
  constructor(
    body = undefined,
    { headers = {}, status = 200, statusText, version = VERSION } = {
      headers: {},
      status: 200,
      statusText: "",
      version: VERSION,
    },
    paused = false
  ) {
    this._body = [];
    if (body) {
      this._body.push(body);
    }
    this.paused = paused;
    this._headers = new Headers(headers);
    this._version = version;
    this._status = status;
    this._statusText = statusText || defaultStatusMessages[status];
    this.headersIteratorController = InvertedIterator();
    this.bodyIteratorController = InvertedIterator();

    const {
      promise: headersIteratorReadyPromise,
      resolve: headersIteratorReadyResolve,
    } = InvertedPromise();
    this.headersIteratorReady = headersIteratorReadyPromise.then((val) => {
      this.headersIteratorSent = true;
      return val;
    });
    this.headersIteratorReadyResolve = headersIteratorReadyResolve;

    const { promise: versionReadyPromise, resolve: versionReadyResolve } =
      InvertedPromise();
    this.versionReady = versionReadyPromise.then((val) => {
      this.versionSent = true;
      return val;
    });
    this.versionReadyResolve = versionReadyResolve;
    // if(this._version && !this.paused){
    //   this.sendVersion(this._version);
    // }

    const { promise: statusReadyPromise, resolve: statusReadyResolve } =
      InvertedPromise();
    this.statusReady = statusReadyPromise.then((val) => {
      this.statusSent = true;
      return val;
    });
    this.statusReadyResolve = statusReadyResolve;
    // if(this._status && !this.paused){
    //   this.sendStatus(this._status);
    // }

    const { promise: statusTextReadyPromise, resolve: statusTextReadyResolve } =
      InvertedPromise();
    this.statusTextReady = statusTextReadyPromise.then((val) => {
      this.statusTextSent = true;
      return val;
    });
    this.statusTextReadyResolve = statusTextReadyResolve;

    // if(!this.paused){
    //   this.endHeaders();
    // }

    const {
      promise: bodyIteratorReadyPromise,
      resolve: bodyIteratorReadyResolve,
    } = InvertedPromise();
    this.bodyIteratorReady = bodyIteratorReadyPromise.then((val) => {
      this.bodyIteratorSent = true;
      return val;
    });
    this.bodyIteratorReadyResolve = bodyIteratorReadyResolve;
    // if(!this.paused){
    //   this.endBody();
    // }

    const { promise: bodyStartedPromise, resolve: bodyStartedResolve } =
      InvertedPromise();
    this.bodyStarted = bodyStartedPromise;
    this.bodyStartedResolve = bodyStartedResolve;
  }
  sendVersion(version = VERSION, go = true) {
    if (!this.versionSent) {
      this._version = version || this._version;
      if (go) {
        this.versionReadyResolve(version || this._version);
        this.versionSent = true;
      }
    }
  }
  sendStatus(status, go = true) {
    this.sendVersion(undefined, go);
    if (!this.statusSent) {
      this._status = status || this._status;
      if (go) {
        this.statusReadyResolve(this._status);
        this.statusSent = true;
      }
    }
  }
  sendStatusText(statusText, go = true) {
    this.sendStatus(undefined, go);
    if (!this.statusTextSent) {
      this._statusText = statusText || this._statusText;
      if (go) {
        this.statusTextReadyResolve(this._statusText);
        // this.statusTextSent = true;
        this.headersIteratorReadyResolve(
          this.headersIteratorController.iterator
        );
        // this.headersIteratorSent = true;
      }
    }
  }
  async sendHeaders(headers = {}, go = true) {
    //Everything that's there, and also some more maybe
    this.sendStatusText(undefined, go);
    if (!this.headersSent) {
      if (go) {
        await pause();
        for (const [key, value] of this._headers.entries()) {
          await this.headersIteratorController.resolve([key, value]);
        }
        for (const [key, value] of new Headers(headers).entries()) {
          await this.headersIteratorController.resolve([key, value]);
        }
        this._headers = new Headers();
        await pause();
      } else {
        for (const [key, value] of new Headers(headers).entries()) {
          this._headers.add(key, value);
        }
      }
    }
  }
  async endHeaders(headers, go = true) {
    await this.sendHeaders(headers, go);
    if (!this.headersSent) {
      if (go) {
        this.headersSent = true;
        this.headersIteratorController.end();
      }
    }
  }
  async sendBody(chunk = undefined, go = true) {
    //Everything that's there, and also some more maybe
    await this.endHeaders(undefined, go);
    if (!this.bodySent) {
      if (go) {
        for (const c of this._body) {
          this.bodyIteratorController.resolve(c);
        }
        this._body = [];
        if (chunk !== undefined) {
          this.bodyIteratorController.resolve(chunk);
        }
        this.bodyStartedResolve(true);
      } else {
        this._body.push(chunk);
      }
    }
  }
  endBody(chunk = undefined, go = false) {
    this.sendBody(chunk, go);
    this.bodySent = true;
    this.bodyIteratorController.end();
  }
  get paused() {
    return this._paused;
  }
  set paused(pause) {
    this._paused = pause;
  }
}

export const redirect = (url, status) =>
  new Response("", { headers: { Location: url, status } });
