function getSortedArray(array, key) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = array[i];
  }

  // сортировка пузырьком
  for (let i = 0; i < result.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (result[j][key] > result[j + 1][key]) {
        let temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break; // массив уже отсортирован
  }

  return result;
}

const users = [
  { name: "Олег", age: 30 },
  { name: "Анна", age: 25 },
  { name: "Борис", age: 35 },
];

console.log(getSortedArray(users, "age"));  // Анна (25), Олег (30), Борис (35)
console.log(getSortedArray(users, "name")); // Анна, Борис, Олег