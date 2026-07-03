export default (number, padding = 0, leftQuote = "'", rightQuote = leftQuote) =>
  `${leftQuote}${String(number).padStart(padding, "0")}${rightQuote}`;
