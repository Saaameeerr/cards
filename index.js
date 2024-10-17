const gameBoard = document.querySelector('.game-board')
const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    let flippedCards = [];
    let matchedCards = [];
    let canFlip = true;

    function createCard(number) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.number = number;
        card.textContent = '?';
        card.addEventListener('click', flipCard);
        return card;
    }

    function flipCard() {
        if (!canFlip || flippedCards.length >= 2 || this.classList.contains('flipped') || matchedCards.includes(this)) {
            return;
        }
        this.classList.add('flipped');
        this.textContent = this.dataset.number;
        flippedCards.push(this);

        // counter == 2
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        canFlip = false;
        setTimeout(() => {
            const [card1, card2] = flippedCards;
            if (card1.dataset.number === card2.dataset.number) {
                matchedCards.push(card1, card2);
                if (matchedCards.length === numbers.length) {
                    alert('Congratulations! You won!');
                }
            } else {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?';
                card2.textContent = '?';
            }
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }

    function initGame() {
        const gameBoard = document.querySelector('.game-board');
        numbers.sort(() => Math.random() - 0.5);
        numbers.forEach(number => {
            const card = createCard(number);
            gameBoard.appendChild(card);
        });
    }

    initGame();