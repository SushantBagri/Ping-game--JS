'use strict';
let player0Element = document.querySelector('.player--0');
let player1Element = document.querySelector('.player--1');
let score0Element = document.querySelector('#score--0');
let score1Element = document.querySelector('#score--1');
let diceElement = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let currentScore0 = document.querySelector('#current--0');
let currentScore1 = document.querySelector('#current--1');

score0Element.textContent = 0;
score1Element.textContent = 0
let playing = true;

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

diceElement.classList.add('hidden');

const switchPlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}
btnRoll.addEventListener('click', () => {
    if (playing) {

        // generate a random dice no.
        const dice = Math.trunc(Math.random() * 6) + 1;

        // display the dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        // check the number is 1 true next player turn
        if (dice !== 1) {
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore
        console.log(currentScore);
        console.log(scores[activePlayer]);
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            diceElement.classList.add('hidden');
        }
        else {
            switchPlayer()
        }
    }
})

btnNew.addEventListener('click', () => {
    score0Element.textContent = 0;
    score1Element.textContent = 0
    playing = true;
    scores = [0, 0];
    currentScore = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    document.querySelector(`.player--0`).classList.add('player--active')
    document.querySelector(`.player--1`).classList.remove('player--active')
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    diceElement.classList.add('hidden');
    activePlayer = 0;
})

