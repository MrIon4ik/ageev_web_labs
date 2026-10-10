// Настройки

const QUESTIONS_PER_LEVEL = 10;   // вопросов на уровне
const PASS_PERCENT = 80;          // порог для перехода на следующий уровень
const TIME_PER_LEVEL = 5 * 60;    // секунд на уровень

// Генераторы вопросов
// Каждый вопрос: { text, answer, type: 'number' | 'boolean' | 'text', hint }

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(list) {
  return list[rand(0, list.length - 1)];
}

function apply(x, op, y) {
  switch (op) {
    case '+': return x + y;
    case '-': return x - y;
    case '*': return x * y;
  }
}

function compare(x, op, y) {
  switch (op) {
    case '>': return x > y;
    case '<': return x < y;
    case '>=': return x >= y;
    case '<=': return x <= y;
    case '===': return x === y;
    case '!==': return x !== y;
  }
}

function numberQuestion(text, answer, hint) {
  return { text: text, answer: answer, type: 'number', hint: hint || 'Введите число' };
}

function booleanQuestion(text, answer) {
  return { text: text, answer: answer, type: 'boolean', hint: 'Выберите true или false' };
}

// ---------- Уровень 1: арифметические операторы ----------

function generateBasic() {
  const op = pick(['+', '+', '-', '-', '*', '*', '/', '/', '%', '**']);
  let a, b, answer;

  switch (op) {
    case '+':
      a = rand(10, 99); b = rand(10, 99); answer = a + b; break;
    case '-':
      a = rand(20, 99); b = rand(5, a); answer = a - b; break;
    case '*':
      a = rand(2, 12); b = rand(2, 15); answer = a * b; break;
    case '/':
      b = rand(2, 12); answer = rand(2, 12); a = b * answer; break;
    case '%':
      a = rand(10, 99); b = rand(2, 9); answer = a % b; break;
    case '**':
      a = rand(2, 5); b = rand(2, 3); answer = a ** b; break;
  }
  return numberQuestion(a + ' ' + op + ' ' + b, answer);
}

// ---------- Уровень 2: арифметика + операторы сравнения ----------
function twoOperations() {
  const a = rand(2, 20), b = rand(2, 12), c = rand(2, 12);
  const op1 = pick(['+', '-', '*']);
  const op2 = pick(['+', '-', '*']);

  if (Math.random() < 0.5) {
    // со скобками: (a op1 b) op2 c
    const value = apply(apply(a, op1, b), op2, c);
    return numberQuestion('(' + a + ' ' + op1 + ' ' + b + ') ' + op2 + ' ' + c, value);
  }
  // без скобок: умножение выполняется раньше сложения и вычитания
  let value;
  if (op2 === '*' && op1 !== '*') {
    value = apply(a, op1, apply(b, op2, c));
  } else {
    value = apply(apply(a, op1, b), op2, c);
  }
  return numberQuestion(a + ' ' + op1 + ' ' + b + ' ' + op2 + ' ' + c, value);
}

function simpleExpression() {
  const a = rand(2, 15), b = rand(2, 12), op = pick(['+', '-', '*']);
  return { text: a + ' ' + op + ' ' + b, value: apply(a, op, b) };
}

function generateComparison() {
  const expr = simpleExpression();
  const r = Math.random();
  let other;

  if (r < 0.35) {
    other = { text: String(expr.value), value: expr.value };
  } else if (r < 0.6) {
    const v = expr.value + pick([-2, -1, 1, 2]);
    other = { text: String(v), value: v };
  } else {
    other = simpleExpression();
  }

  const swap = Math.random() < 0.5;
  const left = swap ? other : expr;
  const right = swap ? expr : other;
  const op = pick(['>', '<', '>=', '<=', '===', '!==']);

  return booleanQuestion(left.text + ' ' + op + ' ' + right.text,
                         compare(left.value, op, right.value));
}

function generateMedium() {
  return Math.random() < 0.5 ? twoOperations() : generateComparison();
}

// ---------- Уровень 3: логические операторы и двоичные числа ----------
function logicAtom() {
  if (Math.random() < 0.35) {
    const v = Math.random() < 0.5;
    return { text: String(v), value: v };
  }
  const a = rand(1, 20);
  const b = Math.random() < 0.3 ? a : rand(1, 20);
  const op = pick(['>', '<', '>=', '<=', '===', '!==']);
  return { text: '(' + a + ' ' + op + ' ' + b + ')', value: compare(a, op, b) };
}

function logic(x, op, y) {
  return op === '&&' ? (x && y) : (x || y);
}

function generateLogical() {
  const A = logicAtom(), B = logicAtom(), C = logicAtom();
  const op1 = pick(['&&', '||']);
  const op2 = pick(['&&', '||']);

  switch (rand(0, 3)) {
    case 0:
      return booleanQuestion(A.text + ' ' + op1 + ' ' + B.text,
                             logic(A.value, op1, B.value));
    case 1:
      return booleanQuestion('!' + A.text + ' ' + op1 + ' ' + B.text,
                             logic(!A.value, op1, B.value));
    case 2:
      return booleanQuestion('(' + A.text + ' ' + op1 + ' ' + B.text + ') ' + op2 + ' ' + C.text,
                             logic(logic(A.value, op1, B.value), op2, C.value));
    default:
      return booleanQuestion('!(' + A.text + ' ' + op1 + ' ' + B.text + ')',
                             !logic(A.value, op1, B.value));
  }
}

function binaryLiteral(n) {
  return '0b' + n.toString(2);
}

function generateBinary() {
  switch (rand(0, 4)) {
    case 0:
    case 1: {
      // побитовые операции
      const a = rand(1, 31), b = rand(1, 31);
      const op = pick(['&', '|', '^']);
      const fmt = Math.random() < 0.5 ? binaryLiteral : String;
      let answer;
      if (op === '&') answer = a & b;
      else if (op === '|') answer = a | b;
      else answer = a ^ b;
      return numberQuestion(fmt(a) + ' ' + op + ' ' + fmt(b), answer,
                            'Ответ запишите в десятичной системе');
    }
    case 2: {
      // сдвиги
      const op = pick(['<<', '>>']);
      const a = op === '<<' ? rand(1, 15) : rand(16, 255);
      const n = op === '<<' ? rand(1, 4) : rand(1, 3);
      const answer = op === '<<' ? a << n : a >> n;
      return numberQuestion(a + ' ' + op + ' ' + n, answer,
                            'Ответ запишите в десятичной системе');
    }
    case 3: {
      // двоичное -> десятичное
      const n = rand(5, 63);
      return numberQuestion('Переведите двоичное число ' + n.toString(2) + ' в десятичное', n,
                            'Ответ запишите в десятичной системе');
    }
    default: {
      // десятичное -> двоичное
      const n = rand(5, 63);
      return { text: 'Переведите число ' + n + ' в двоичную систему',
               answer: n.toString(2), type: 'text',
               hint: 'Введите только цифры 0 и 1' };
    }
  }
}

function generateAdvanced() {
  return Math.random() < 0.45 ? generateLogical() : generateBinary();
}

const LEVELS = [
  { name: 'Начальный',   generate: generateBasic },
  { name: 'Средний',     generate: generateMedium },
  { name: 'Продвинутый', generate: generateAdvanced }
];

// Состояние игры
const state = {
  levelIndex: 0,
  questionNumber: 0,
  correct: 0, // верные ответы на текущем уровне
  incorrect: 0, // неверные ответы на текущем уровне
  totalCorrect: 0, // верные за всю игру
  totalIncorrect: 0, // неверные за всю игру
  timeLeft: TIME_PER_LEVEL,
  timerId: null,
  current: null,
  locked: false,
  active: false,
  asked: new Set() // уже заданные вопросы: повторы запрещены
};

// Работа со страницей
const $ = function (id) { return document.getElementById(id); };

function showScreen(name) {
  $('screen-start').hidden = name !== 'start';
  $('screen-game').hidden = name !== 'game';
  $('screen-result').hidden = name !== 'result';
}

function updateStats() {
  $('correct').textContent = state.correct;
  $('incorrect').textContent = state.incorrect;
}

function updateTimer() {
  const t = Math.max(state.timeLeft, 0);
  const seconds = String(t % 60).padStart(2, '0');
  $('timer').textContent = Math.floor(t / 60) + ':' + seconds;
  $('timer').classList.toggle('low', t <= 30);
}

function setFeedback(text, kind) {
  const el = $('feedback');
  el.textContent = text;
  el.className = 'feedback' + (kind ? ' ' + kind : '');
}

function setControlsDisabled(disabled) {
  $('answer').disabled = disabled;
  $('submit-btn').disabled = disabled;
  $('btn-true').disabled = disabled;
  $('btn-false').disabled = disabled;
}

function setActions(buttons) {
  const box = $('result-actions');
  box.innerHTML = '';
  buttons.forEach(function (item) {
    const btn = document.createElement('button');
    btn.textContent = item.label;
    if (item.secondary) btn.className = 'secondary';
    btn.addEventListener('click', item.onClick);
    box.appendChild(btn);
  });
}

// Ход игры
function nextQuestion() {
  const level = LEVELS[state.levelIndex];
  for (let i = 0; i < 500; i++) {
    const q = level.generate();
    if (!state.asked.has(q.text)) {
      state.asked.add(q.text);
      return q;
    }
  }
  return level.generate();
}

function startGame() {
  state.levelIndex = 0;
  state.totalCorrect = 0;
  state.totalIncorrect = 0;
  state.asked.clear();
  startLevel();
}

function startLevel() {
  state.questionNumber = 0;
  state.correct = 0;
  state.incorrect = 0;
  state.timeLeft = TIME_PER_LEVEL;
  state.active = true;

  $('level-name').textContent = LEVELS[state.levelIndex].name;
  updateStats();
  updateTimer();
  showScreen('game');
  startTimer();
  showNextQuestion();
}

function startTimer() {
  stopTimer();
  state.timerId = setInterval(function () {
    state.timeLeft -= 1;
    updateTimer();
    if (state.timeLeft <= 0) {
      finishLevel('timeout');
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId !== null) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function showNextQuestion() {
  if (state.questionNumber >= QUESTIONS_PER_LEVEL) {
    finishLevel('done');
    return;
  }

  state.questionNumber += 1;
  state.current = nextQuestion();
  state.locked = false;

  $('q-number').textContent = state.questionNumber;
  $('question').textContent = state.current.text;
  $('hint').textContent = state.current.hint;
  setFeedback('', '');
  setControlsDisabled(false);

  const isBool = state.current.type === 'boolean';
  $('input-block').hidden = isBool;
  $('bool-block').hidden = !isBool;

  if (!isBool) {
    $('answer').value = '';
    $('answer').focus();
  }
}

function handleAnswer(userAnswer) {
  if (!state.active || state.locked) return;

  const q = state.current;
  let isCorrect;

  if (q.type === 'boolean') {
    isCorrect = userAnswer === q.answer;
  } else {
    const raw = String(userAnswer).trim().replace(',', '.');

    if (raw === '') {
      setFeedback('Введите ответ', 'bad');
      return;
    }

    if (q.type === 'number') {
      const num = Number(raw);
      if (Number.isNaN(num)) {
        setFeedback('Введите число', 'bad');
        return;
      }
      isCorrect = num === q.answer;
    } else {
      if (!/^(0b)?[01]+$/i.test(raw)) {
        setFeedback('Используйте только цифры 0 и 1', 'bad');
        return;
      }
      const cleaned = raw.replace(/^0b/i, '').replace(/^0+(?=\d)/, '');
      isCorrect = cleaned === q.answer;
    }
  }

  state.locked = true;
  setControlsDisabled(true);

  if (isCorrect) {
    state.correct += 1;
    state.totalCorrect += 1;
    setFeedback('Верно!', 'ok');
  } else {
    state.incorrect += 1;
    state.totalIncorrect += 1;
    setFeedback('Неверно. Правильный ответ: ' + q.answer, 'bad');
  }
  updateStats();

  setTimeout(function () {
    if (state.active) showNextQuestion();
  }, 900);
}

function finishLevel(reason) {
  state.active = false;
  stopTimer();

  const level = LEVELS[state.levelIndex];
  const percent = Math.round(state.correct * 100 / QUESTIONS_PER_LEVEL);
  const passed = reason === 'done' && state.correct * 100 >= PASS_PERCENT * QUESTIONS_PER_LEVEL;
  const isLast = state.levelIndex === LEVELS.length - 1;

  if (reason === 'timeout') {
    const answered = state.correct + state.incorrect;
    $('result-title').textContent = 'Время вышло';
    $('result-text').textContent =
      'Вы успели ответить на ' + answered + ' из ' + QUESTIONS_PER_LEVEL +
      ' вопросов уровня «' + level.name + '» (верно: ' + state.correct + '). Попробуйте ещё раз!';
    setActions([
      { label: 'Перезапустить игру', onClick: startGame },
      { label: 'Выйти', onClick: showExit, secondary: true }
    ]);
  } else if (!passed) {
    $('result-title').textContent = 'Уровень «' + level.name + '» не пройден';
    $('result-text').textContent =
      'Верных ответов: ' + state.correct + ' из ' + QUESTIONS_PER_LEVEL + ' (' + percent + '%). ' +
      'Для перехода дальше нужно не менее ' + PASS_PERCENT + '%.';
    setActions([
      { label: 'Перезапустить игру', onClick: startGame },
      { label: 'Выйти', onClick: showExit, secondary: true }
    ]);
  } else if (!isLast) {
    const next = LEVELS[state.levelIndex + 1];
    $('result-title').textContent = 'Уровень «' + level.name + '» пройден!';
    $('result-text').textContent =
      'Верных ответов: ' + state.correct + ' из ' + QUESTIONS_PER_LEVEL + ' (' + percent + '%). ' +
      'Вы переходите на уровень «' + next.name + '».';
    setActions([
      { label: 'Следующий уровень', onClick: function () { state.levelIndex += 1; startLevel(); } },
      { label: 'Выйти', onClick: showExit, secondary: true }
    ]);
  } else {
    $('result-title').textContent = 'Поздравляем!';
    $('result-text').textContent =
      'Вы прошли все три уровня игры! Всего верных ответов: ' + state.totalCorrect +
      ', неверных: ' + state.totalIncorrect + '.';
    setActions([
      { label: 'Играть снова', onClick: startGame },
      { label: 'Выйти', onClick: showExit, secondary: true }
    ]);
  }

  showScreen('result');
}

function showExit() {
  state.active = false;
  stopTimer();
  $('result-title').textContent = 'Спасибо за игру!';
  $('result-text').textContent =
    'Итог: верных ответов — ' + state.totalCorrect + ', неверных — ' + state.totalIncorrect +
    '. Возвращайтесь ещё!';
  setActions([{ label: 'Играть снова', onClick: startGame }]);
  showScreen('result');
}

// Обработчики событий
$('start-btn').addEventListener('click', startGame);
$('submit-btn').addEventListener('click', function () { handleAnswer($('answer').value); });
$('answer').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') handleAnswer($('answer').value);
});
$('btn-true').addEventListener('click', function () { handleAnswer(true); });
$('btn-false').addEventListener('click', function () { handleAnswer(false); });
