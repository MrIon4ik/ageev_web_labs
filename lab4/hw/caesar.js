function caesar(str, shift, action) {
  const alph = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const alph_len = alph.length;

  if (action === "decode") {
    shift = -shift;
  }
  shift = ((shift % alph_len) + alph_len) % alph_len; // приводим сдвиг к диапазону 0..alph_len-1

  let result = "";
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const lower = ch.toLowerCase();
    const idx = alph.indexOf(lower);

    if (idx === -1) {
      result += ch; // символ не из алфавита остаётся как есть
    } else {
      const newChar = alph[(idx + shift) % alph_len];
      result += ch === lower ? newChar : newChar.toUpperCase();
    }
  }
  return result;
}

console.log(caesar("эзтыхз фзъзъз", 8, "decode")); // хакуна матата
console.log(caesar("хакуна матата", 8, "encode")); // эзтыхз фзъзъз
console.log(caesar("Привет, мир!", 3, "encode"));  // Тулезх, пму!