const throwError = (
  message = throwError("message must be defined"),
  ErrorClass = Error,
  ...args
) => {
  throw new ErrorClass(message, ...args);
};
export default throwError;
