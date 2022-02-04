'use strict';
let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let diceEl = document.querySelector('.dice');
let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');
let curScore = 0;
let pScore0 = 0, pScore1 = 0;
score0.textContent = 0;
score1.textContent = 0;
let playing = true;
//Pop Up 
alert("Rules of the game\n1.Player who scores more than 30 wins\n2.Player can roll the dice till he gets 1\n3.Player can hold his score");
//NewGame (Resetting Game)

document.querySelector('.btn--new').addEventListener('click', function () {
    score0.textContent = 0;
    score1.textContent = 0;
    current1.textContent = 0;
    current0.textContent = 0;
    //Switching to player 0 (Always player 0 will start first)
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    //Un-Displaying the dice
    diceEl.style.display = 'none';
    //After every game set playing to true
    playing = true;
    //Removing winner effects and making it normal
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    document.querySelector('#name--0').textContent = 'PLAYER 1';
    document.querySelector('#name--1').textContent = 'PLAYER 2';
    //Set pScore varaibles to 0
    pScore0 = 0;
    pScore1 = 0;
});

//Function to switch player0-1
const player01 = function () {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
    current0.textContent = curScore;
}
//Function to switch player1-0
const player10 = function () {
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    current1.textContent = curScore;
}

//Dice-Roll

document.querySelector('.btn--roll').addEventListener('click', function () {

    if (playing) {
        diceEl.style.display = 'block';
        //1.Genaritng a random no
        const dice = Math.trunc(Math.random() * 6) + 1;

        //Displaying corresponding random no in dice
        diceEl.src = `dice-${dice}.png`;

        //If score ==1 switch player & update cursccore =0
        if (dice === 1) {
            curScore = 0;
            if (player0.classList.contains('player--active')) {
                player01();
            }
            else {
                player10();
            }

        }
        //If score!=1 then add diceScore to curScore
        else {
            curScore += dice;
            if (player0.classList.contains('player--active')) {
                current0.textContent = curScore;
            }
            else
                current1.textContent = curScore;
        }

    }
});

//Hold Btn
//During hold the current score shud be added to active player and then switch active player
document.querySelector('.btn--hold').addEventListener('click', function () {

    if (playing) {
        if (player0.classList.contains('player--active')) {
            pScore0 += curScore;
            score0.textContent = pScore0;
            curScore = 0;
            player01();

        }
        else {
            pScore1 += curScore;
            score1.textContent = pScore1;
            curScore = 0;
            player10();

        }

        //  Winning condition
        //After winning update playing to false so that user cant play
        if (pScore0 >= 30) {
            score0.textContent = pScore0;
            player0.classList.add('player--winner');
            document.querySelector('#name--0').textContent = 'PLAYER 1 WON';
            playing = false;

        }
        else if (pScore1 >= 30) {
            score1.textContent = pScore1;
            player1.classList.add('player--winner');
            document.querySelector('#name--1').textContent = 'PLAYER 2 WON';
            playing = false;


        }
    }
});