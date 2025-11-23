// Элементы Gmail
const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');

// Элементы IIN
const iinInput = document.getElementById('iin_input');
const iinButton = document.getElementById('iin_button');
const iinResult = document.getElementById('iin_result');

// Регулярное выражение для gmail (регистр игнорируется)
const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

/* ---------- Gmail: простой валидатор ---------- */
function checkGmail() {
    const value = (gmailInput.value || '').trim();
    if (!value) {
        gmailResult.textContent = 'Введите email';
        gmailResult.style.color = 'orange';
        return;
    }

    if (gmailRegExp.test(value)) {
        gmailResult.textContent = 'Почта верна';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.textContent = 'Почта не верна (требуется @gmail.com)';
        gmailResult.style.color = 'red';
    }
}

/* ---------- IIN: формат + контрольная сумма ---------- */
function isValidIIN(iin) {
    if (!/^\d{12}$/.test(iin)) return false;

    const digits = iin.split('').map(d => Number(d));

    // Первый проход: веса 1..11
    let sum = 0;
    for (let i = 0; i < 11; i++) {
        sum += digits[i] * (i + 1);
    }
    let r = sum % 11;
    let control;
    if (r !== 10) {
        control = r;
    } else {
        // Второй проход: веса 3..13
        let sum2 = 0;
        for (let i = 0; i < 11; i++) {
            sum2 += digits[i] * (i + 3);
        }
        const r2 = sum2 % 11;
        control = (r2 !== 10) ? r2 : 0;
    }

    return control === digits[11];
}

function checkIIN() {
    const value = (iinInput.value || '').trim();

    if (!value) {
        iinResult.textContent = 'Введите ИИН';
        iinResult.style.color = 'orange';
        return;
    }

    // Сначала регулярка на формат
    if (!/^\d{12}$/.test(value)) {
        iinResult.textContent = 'ИИН должен содержать 12 цифр';
        iinResult.style.color = 'red';
        return;
    }

    // Проверка контрольной суммы
    if (isValidIIN(value)) {
        iinResult.textContent = 'ИИН верный';
        iinResult.style.color = 'green';
    } else {
        iinResult.textContent = 'ИИН не верный (ошибка контрольной суммы)';
        iinResult.style.color = 'red';
    }
}

// Добавляем обработчики для кнопок
gmailButton.addEventListener('click', checkGmail);
iinButton.addEventListener('click', checkIIN);

// Движение квадрата по квадрату
const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let x = 0;
let y = 0;
let directionX = 1;
let directionY = 0;
const speed = 3;

function move() {
    const maxWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
    const maxHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

    x += directionX * speed;
    y += directionY * speed;

    childBlock.style.left = x + 'px';
    childBlock.style.top = y + 'px';

    if (x > maxWidth && directionX === 1) {
        directionX = 0;
        directionY = 1;
    } else if (y >= maxHeight && directionY === 1) {
        directionX = -1;
        directionY = 0;
    } else if (x <= 0 && directionX === -1) {
        directionX = 0;
        directionY = -1;
    } else if (y <= 0 && directionY === -1) {
        directionX = 1;
        directionY = 0;
    }
    setTimeout(move, 10);
}
move();

// Секундомер
let milliseconds = 0;
let intervalId;
let running = false;

function updateTimer() {
    milliseconds++;

    const minutes = Math.floor(milliseconds / 6000);
    const seconds = Math.floor((milliseconds % 6000) / 100);
    const tenths = milliseconds % 100;

    document.getElementById('minutesS').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('secondsS').innerText = seconds.toString().padStart(2, '0');
    document.getElementById('ml-secondsS').innerText = tenths.toString().padStart(2, '0');
}

function resetTimer() {
    milliseconds = 0;
    document.getElementById('minutesS').innerText = '00';
    document.getElementById('secondsS').innerText = '00';
    document.getElementById('ml-secondsS').innerText = '00';

    if (running) {
        clearInterval(intervalId);
        running = false;
    }
}

document.getElementById('start').addEventListener('click', function () {
    if (!running) {
        intervalId = setInterval(updateTimer, 10);
        running = true;
    }
});

document.getElementById('stop').addEventListener('click', function () {
    if (running) {
        clearInterval(intervalId);
        running = false;
    }
});

document.getElementById('reset').addEventListener('click', resetTimer);