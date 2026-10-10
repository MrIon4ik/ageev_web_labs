function pluralizeRecords(n) {
  let last = n % 10;
  let lastTwo = n % 100;

  let was, found, record;

  if (last === 1 && lastTwo !== 11) {
    was = "была";
    found = "найдена";
    record = "запись";
  } else if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) {
    was = "было";
    found = "найдено";
    record = "записи";
  } else {
    was = "было";
    found = "найдено";
    record = "записей";
  }

  return "В результате выполнения запроса " + was + " " + found + " " + n + " " + record;
}

console.log(pluralizeRecords(0));   // ...было найдено 0 записей
console.log(pluralizeRecords(1));   // ...была найдена 1 запись
console.log(pluralizeRecords(3));   // ...было найдено 3 записи
console.log(pluralizeRecords(11));  // ...было найдено 11 записей
console.log(pluralizeRecords(21));  // ...была найдена 21 запись
console.log(pluralizeRecords(112)); // ...было найдено 112 записей