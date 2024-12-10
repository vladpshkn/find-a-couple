// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
document.addEventListener('DOMContentLoaded', () => {

function createNumbersArray(count) {
    const result = [];
    for (let i = 1; i <= count; i++) {
        result.push(i, i);
    }
    return result;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i +1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    return shuffled;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function createCardElement(number) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.number = number;
    card.textContent = '?';
    return card;
}

function showEndGameModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <p>Хотите продолжить?</p>
            <button id="restart">Да</button>
            <button id="exit">Нет</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('restart').addEventListener('click', () => {
        modal.remove();
        restartGame();
    });

    document.getElementById('exit').addEventListener('click', () => {
        modal.remove();
        document.body.innerHTML = `<h1>Спасибо за игру!</h1>`;
    });
}

function checkGameEnd() {
    const allMatched = document.querySelectorAll(' .card.matched').length
    if (allMatched === count * 2) {
        setTimeout(showEndGameModal, 500);
    }
}

function handleCardClick(event) {
    const clickedCard = event.target;

    if (isBoardLocked || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return;
    }

    clickedCard.classList.add('flipped');
    clickedCard.textContent = clickedCard.dataset.number;

    selectedCards.push(clickedCard);

    if (selectedCards.length === 2) {
        isBoardLocked = true;

        const [card1, card2] = selectedCards;

        if (card1.dataset.number === card2.dataset.number) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            selectedCards = [];
            isBoardLocked = false;

            checkGameEnd();
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?';
                card2.textContent = '?';
                selectedCards = [];
                isBoardLocked = false;
            }, 1000);
        }
    }
}

function createGameBoard(numbers) {
    const container = document.createElement('div');
    container.classList.add('card-container');

    numbers.forEach(number => {
        const card = createCardElement(number);
        card.addEventListener('click', handleCardClick);
        container.appendChild(card);
    });

    document.body.appendChild(container);
}

function restartGame() {
    document.body.innerHTML = '';
    selectedCards = [];
    isBoardLocked = false;
    const pairedArray = createNumbersArray(count);
    const shuffledNumbers = shuffle(pairedArray);
    createGameBoard(shuffledNumbers);
}

const count = 8; 
const pairedArray = createNumbersArray(count);
const shuffledNumbers = shuffle(pairedArray); 
let selectedCards = [];
let isBoardLocked = false;

createGameBoard(shuffledNumbers);

});