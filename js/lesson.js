//проверка номера
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');


//+996550644772
const reqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (reqExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = 'Этот номер существует';
        phoneSpan.style.color = 'green';
    } else {
        phoneSpan.innerHTML = 'Этот номер не существует';
        phoneSpan.style.color = 'red';
    }
})


//TAB SLIDER
const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParents = document.querySelector('.tab_content_items');


const hightTabsContentCards = () => {
    tabsContentCards.forEach((tabsContentCard) => {
        tabsContentCard.style.display = 'none'
    })
    tabsItems.forEach((tabItem) => {
        tabItem.classList.remove('tab_content_item_active')
    })
}

const showTabsContentCards = (indexElement = 0) => {
    tabsContentCards[indexElement].style.display = 'block';
    tabsItems[indexElement].classList.add('tab_content_item_active')
}

hightTabsContentCards();
showTabsContentCards();


tabsItemsParents.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                hightTabsContentCards()
                showTabsContentCards(tabItemIndex)
            }
        })
    }
}

let curretIndex = 0; // Первая вкладка
let intervalId; //Переменная для хранения интервала

//Ф-ция для автоматического переключения

const startAuthoSlider = () => {
    intervalId = setInterval(() => {
        hightTabsContentCards();
        showTabsContentCards(curretIndex);
        curretIndex = (curretIndex + 1) % tabsItems.length;
    }, 2000); // 2сек
}
//Запуск автослайдера
startAuthoSlider();

//Остановка слайдера при клике на вкладку

tabsItemsParents.onclick = (event) => {
    clearInterval(intervalId);
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                hightTabsContentCards();
                showTabsContentCards(tabItemIndex);
                curretIndex = tabItemIndex;
                startAuthoSlider();
            }
        })
    }
}

// Проверка российского номера
const rPhoneInput = document.querySelector('#r_phone_input');
const rPhoneButton = document.querySelector('#r_phone_button');
const rPhoneSpan = document.querySelector('#r_phone_result');

// Регулярка для проверки формата +7 9XX XXX-XX-XX
const rReqExp = /^\+7 9\d{2} \d{3}-\d{2}-\d{2}$/;

rPhoneButton.addEventListener('click', () => {
    const value = rPhoneInput.value.trim();

    if (rReqExp.test(value)) {
        rPhoneSpan.innerHTML = 'Номер корректен (Россия)';
        rPhoneSpan.style.color = 'green';
    } else {
        rPhoneSpan.innerHTML = 'Некорректный номер. Введите в формате +7 9XX XXX-XX-XX';
        rPhoneSpan.style.color = 'red';
    }
});


// Конвертер валют
const somInput = document.getElementById('som');
const usdInput = document.getElementById('usd');
const eurInput = document.getElementById('eur');

// Курсы валют (примерные)
const USD_RATE = 0.011; // 1 KGS = 0.011 USD
const EUR_RATE = 0.010; // 1 KGS = 0.010 EUR

function convertFromSom() {
    const somValue = parseFloat(somInput.value) || 0;
    usdInput.value = (somValue * USD_RATE).toFixed(2);
    eurInput.value = (somValue * EUR_RATE).toFixed(2);
}

function convertFromUsd() {
    const usdValue = parseFloat(usdInput.value) || 0;
    somInput.value = (usdValue / USD_RATE).toFixed(2);
    eurInput.value = (usdValue * (EUR_RATE / USD_RATE)).toFixed(2);
}

function convertFromEur() {
    const eurValue = parseFloat(eurInput.value) || 0;
    somInput.value = (eurValue / EUR_RATE).toFixed(2);
    usdInput.value = (eurValue * (USD_RATE / EUR_RATE)).toFixed(2);
}

somInput.addEventListener('input', convertFromSom);
usdInput.addEventListener('input', convertFromUsd);
eurInput.addEventListener('input', convertFromEur);

// Card Switcher
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const card = document.querySelector('.card');

const cards = [
    { color: 'red', text: 'Card 1' },
    { color: 'blue', text: 'Card 2' },
    { color: 'green', text: 'Card 3' },
    { color: 'yellow', text: 'Card 4' },
    { color: 'purple', text: 'Card 5' }
];

let currentCardIndex = 0;

function updateCard() {
    const currentCard = cards[currentCardIndex];
    card.style.backgroundColor = currentCard.color;
    card.textContent = currentCard.text;
    card.style.display = 'flex';
    card.style.justifyContent = 'center';
    card.style.alignItems = 'center';
    card.style.color = 'white';
    card.style.fontSize = '20px';
    card.style.fontWeight = 'bold';
}

prevBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    updateCard();
});

nextBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    updateCard();
});

// Инициализация первой карточки
updateCard();

// Погода
const cityInput = document.querySelector('.cityName');
const citySpan = document.querySelector('.city');
const tempSpan = document.querySelector('.temp');

// Мок-данные для погоды (в реальном приложении здесь был бы API запрос)
const weatherData = {
    'бишкек': { temp: '+25°C', description: 'Солнечно' },
    'москва': { temp: '+15°C', description: 'Облачно' },
    'нью-йорк': { temp: '+20°C', description: 'Дождь' },
    'токио': { temp: '+22°C', description: 'Ясно' },
    'дубай': { temp: '+35°C', description: 'Жарко' }
};

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim().toLowerCase();

        if (weatherData[city]) {
            citySpan.textContent = cityInput.value;
            tempSpan.textContent = `${weatherData[city].temp}, ${weatherData[city].description}`;
            tempSpan.style.color = 'green';
        } else {
            citySpan.textContent = 'Город не найден';
            tempSpan.textContent = '';
        }

        cityInput.value = '';
    }
});

// Модальное окно (добавляем функциональность)
const modal = document.querySelector('.modal');
const modalBtn = document.getElementById('btn-get');
const modalClose = document.querySelector('.modal_close');

modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Добавляем CSS для модального окна
const style = document.createElement('style');
style.textContent = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
    
    .modal_content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 500px;
        border-radius: 10px;
        position: relative;
    }
    
    .modal_close {
        position: absolute;
        right: 15px;
        top: 10px;
        font-size: 24px;
        cursor: pointer;
    }
    
    .modal_input {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    
    .card {
        width: 200px;
        height: 300px;
        border: 2px solid #333;
        border-radius: 10px;
        margin: 0 20px;
    }
`;
document.head.appendChild(style);