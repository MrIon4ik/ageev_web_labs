function minDigit(x) {
  let min = 9;
  do {
    let digit = x % 10;
    if (digit < min) {
      min = digit;
    }
    x = (x - digit) / 10;
  } while (x > 0);
  return min;
}

console.log(minDigit(4821)); // 1
console.log(minDigit(777));  // 7
console.log(minDigit(500));  // 0
console.log(minDigit(0));    // 0