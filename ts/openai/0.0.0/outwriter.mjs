export default (log) =>
  (output, format, addendum = "") => {
    let result = output;
    if (result.error) {
      throw new Error(result.error.message);
    }

    switch (format) {
      case "full":
        break;
      default:
        result = output.choices[0].text + addendum;
    }
    log(result);
    return result;
  };
