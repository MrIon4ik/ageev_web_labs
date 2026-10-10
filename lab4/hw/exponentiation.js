function pow(x, n) {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}

console.log(pow(2, 3)); // 8
console.log(pow(3, 4)); // 81
console.log(pow(5, 1)); // 5