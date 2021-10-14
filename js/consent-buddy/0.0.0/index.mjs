const DEFAULT_LOCAL_STORAGE_KEY = "consent-buddy";
const DEFAULT_LOCAL_STORAGE_VALUE_REJECTED = "-";
const DEFAULT_LOCAL_STORAGE_VALUE_ACCEPTED = "+";
const DEFAULT_DISPLAY_VALUE_VISIBLE = "block";
const DEFAULT_DISPLAY_VALUE_NOT_VISIBLE = "none";

export default (ready, options = {}) => {
  const localStorageKey = options.localStorageKey || DEFAULT_LOCAL_STORAGE_KEY;
  const status = globalThis.localStorage.getItem(localStorageKey);
  const localStorageValueRejected =
    options.localStorageValueRejected || DEFAULT_LOCAL_STORAGE_VALUE_REJECTED;
  const customProperty = options.customProperty || `--${localStorageKey}`;
  const providedEventName =
    options.providedEventName || `${localStorageKey}-provided`;
  const witheldEventName =
    options.witheldEventName || `${localStorageKey}-withheld`;
  const localStorageValueAccepted =
    options.localStorageValueAccepted || DEFAULT_LOCAL_STORAGE_VALUE_ACCEPTED;
  const displayValueVisible =
    options.displayValueVisible || DEFAULT_DISPLAY_VALUE_VISIBLE;
  const displayValueNotVisible =
    options.displayValueNotVisible || DEFAULT_DISPLAY_VALUE_NOT_VISIBLE;
  const resolve = (status, event) => {
    globalThis.localStorage.setItem(localStorageKey, status);
    globalThis.document.documentElement.style.setProperty(
      customProperty,
      displayValueNotVisible
    );
    globalThis.removeEventListener(providedEventName, enableConsent);
    globalThis.removeEventListener(witheldEventName, disableConsent);
    if (status !== localStorageValueRejected) {
      ready(status, event);
    }
  };
  // function to enable consent
  const enableConsent = (event) =>
    resolve(event.detail ? event.detail : localStorageValueAccepted, event);
  const disableConsent = (event) => resolve(localStorageValueRejected, event);
  const final = (done = () => {}) => {
    globalThis.localStorage.removeItem(localStorageKey);
    globalThis.document.documentElement.style.removeProperty(customProperty);
    globalThis.removeEventListener(providedEventName, enableConsent);
    globalThis.removeEventListener(witheldEventName, disableConsent);
    done();
  };
  if (status === localStorageValueRejected) {
    // consent has been rejected
    return final;
  }
  if (status != null) {
    // consent has been accepted
    ready(status);
    return final;
  }
  // consent response has not been provided
  globalThis.addEventListener(providedEventName, enableConsent);
  globalThis.addEventListener(witheldEventName, disableConsent);
  globalThis.document.documentElement.style.setProperty(
    customProperty,
    displayValueVisible
  );
  return final;
};
