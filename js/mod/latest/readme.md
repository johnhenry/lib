# mod

The modulus operator (%') in math works slightly differently than it does in javascript (%).
That is in math, it's a binary operation that returns a positive number. In javascript, the number can be negative. This "mod" function works _more_ like the math version.

mod = (a, b) => a %' b
