let playerChoosed;
let computerChoosed;
const option = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;
let actualPlayerHealth = 100;
let actualAiHealth = 100;

const resultPlace = document.querySelector('.result');
const allBtns = document.querySelectorAll('.buttons button');
const playerHealthBar = document.querySelector('.yourScore .health .playerHit');
const computerHealthBar = document.querySelector('.aiScore .health .enemyHit');

let text = {

    playerWinRound: 'You win round!',
    aiWinRound: 'Computer win round!',
    playerWinMatch: 'You win match!',
    aiWinMatch: 'Computer win Match!',


}



const compChoose = () => {
    let index = Math.floor(Math.random() * option.length);
    computerChoosed = option[index];

    if (computerChoosed === option[0]) {
        document.querySelector('.computerChooseField .rockImg').classList.add('active');
    } else if (computerChoosed === option[1]) {
        document.querySelector('.computerChooseField .paperImg').classList.add('active');
    } else {
        document.querySelector('.computerChooseField .scissorsImg').classList.add('active');
    }

    document.querySelector('.computerChooseField h2').textContent = `Enemy Choosed ${computerChoosed}`;
    setTimeout(checkResults, 1000);
}

const checkWin = () => {
    //check who win match
    if (actualPlayerHealth == 0 || actualAiHealth == 0) {
        if (actualPlayerHealth == 0) {
            alert('Enemy win round.');
            computerScore++;
            document.querySelector('.computerScore').textContent = computerScore;
        } else if (actualAiHealth == 0) {
            alert('You win round.');
            playerScore++;
            document.querySelector('.playerScore').textContent = playerScore;

        }

        actualPlayerHealth = 100;
        actualAiHealth = 100;
        playerHealthBar.style.right = `-${actualPlayerHealth}%`;
        computerHealthBar.style.left = `-${actualAiHealth}%`;
    }

    //Check who win Match
    if (computerScore == 2 || playerScore == 2) {
        if (computerScore == 2) {
            alert('Enemy win match.');
            computerScore = 0;
            playerScore = 0;


        } else if (playerScore == 2) {
            alert('You win match!');
            computerScore = 0;
            playerScore = 0;
        }

    }
}

const checkResults = () => {
    if (playerChoosed === option[0] && computerChoosed === option[2] || playerChoosed === option[1] && computerChoosed === option[0] || playerChoosed === option[2] && computerChoosed === option[1]) {
        document.querySelector('.playerChooseField').classList.add('toRight');
        resultPlace.textContent = 'You win! Contrgatulations.';
        actualAiHealth -= 10;
        computerHealthBar.style.left = `-${actualAiHealth}%`;
    } else if (playerChoosed === computerChoosed) {
        resultPlace.textContent = 'Draw. Try Again';
    } else {
        document.querySelector('.computerChooseField').classList.add('toLeft');
        resultPlace.textContent = 'Sorry, Enemy win. Try again';
        actualPlayerHealth -= 10;
        playerHealthBar.style.right = `-${actualPlayerHealth}%`;
    }

    document.querySelector('.playerScore').textContent = playerScore;
    document.querySelector('.computerScore').textContent = computerScore;



    for (let i = 0; i < allBtns.length; i++) {
        allBtns[i].removeAttribute('disabled');
    }

    checkWin();



}


// default actions for all buttons
for (const button of allBtns) {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < allBtns.length; i++) {
            allBtns[i].setAttribute('disabled', true);
        }
        let allImgs = document.querySelectorAll('img');
        for (let i = 0; i < allImgs.length; i++) {
            allImgs[i].classList.remove('active');
        }
        document.querySelector('.computerChooseField h2').textContent = "";
        resultPlace.textContent = 'Who win?';
        document.querySelector('.playerChooseField').classList.remove('toRight');
        document.querySelector('.computerChooseField').classList.remove('toLeft');
    });
}



document.querySelector('.rock').addEventListener('click', (e) => {
    playerChoosed = option[0];
    document.querySelector('.playerChooseField .rockImg').classList.add('active');
    document.querySelector('.playerChooseField h2').textContent = `You Choosed ${playerChoosed}`;
    setTimeout(compChoose, 2000);
});

document.querySelector('.paper').addEventListener('click', (e) => {
    playerChoosed = option[1];
    document.querySelector('.playerChooseField .paperImg').classList.add('active');
    document.querySelector('.playerChooseField h2').textContent = `You Choosed ${playerChoosed}`;
    setTimeout(compChoose, 2000);
});

document.querySelector('.scissors').addEventListener('click', (e) => {
    playerChoosed = option[2]
    document.querySelector('.playerChooseField .scissorsImg').classList.add('active');
    document.querySelector('.playerChooseField h2').textContent = `You Choosed ${playerChoosed}`;
    setTimeout(compChoose, 2000);
});

document.querySelector('.reset').addEventListener('click', (e) => {
    e.preventDefault();
    alert('You reset match and score');
    playerScore = 0;
    computerScore = 0;
    document.querySelector('.playerScore').textContent = playerScore;
    document.querySelector('.computerScore').textContent = computerScore;
    actualPlayerHealth = 100;
    actualAiHealth = 100;
    playerHealthBar.style.right = `-${actualPlayerHealth}%`;
    computerHealthBar.style.left = `-${actualAiHealth}%`;
    resultPlace.textContent = 'Who win?';
});
