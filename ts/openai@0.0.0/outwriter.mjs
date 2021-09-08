export default (log) =>
  (output, format = undefined) => {
    let result = output;
    if (result.error) {
      throw new Error(result.error.message);
    }

    switch (format) {
      case "simple":
        result = output.choices[0].text;
        break;
    }
    log(result);
    return result;
  };
