// home_works.js
// Поддерживает:
// - проверку gmail (регулярное выражение, регистронезависимо)
// - проверку ИИН: сначала формат (\d{12}), затем контрольная сумма (алгоритм для КЗ ИИН)

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
        showMessage(gmailResult, 'Введите email', 'orange');
        return;
    }

    if (gmailRegExp.test(value)) {
        showMessage(gmailResult, 'Почта верна', 'green');
    } else {
        showMessage(gmailResult, 'Почта не верна (требуется @gmail.com)', 'red');
    }
}

/* ---------- IIN: формат + контрольная сумма ---------- */
/*
Алгоритм:
1) Проверяем, что ИИН — 12 цифр (регулярка /^\d{12}$/).
2) Вычисляем контрольную цифру:
   - Сначала весовые множители 1..11: суммируем digits[i] * (i+1) для i=0..10.
     r = sum % 11;
     если r != 10, контроль = r.
   - Если r == 10, повторяем с множителями 3..13: sum2 = sum(digits[i] * (i+3))
     r2 = sum2 % 11;
     если r2 != 10, контроль = r2, иначе контроль = 0.
3) Сравниваем полученный контроль с 12-м символом (digits[11]).
*/
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
        showMessage(iinResult, 'Введите ИИН', 'orange');
        return;
    }

    // Сначала регулярка на формат
    if (!/^\d{12}$/.test(value)) {
        showMessage(iinResult, 'ИИН должен содержать 12 цифр', 'red');
        return;
    }

    // Проверка контрольной суммы
    if (isValidIIN(value)) {
        showMessage(iinResult, 'ИИН верный', 'green');
    } else {
        showMessage(iinResult, 'ИИН не верный (ошибка контрольной суммы)', 'red');
    }
}