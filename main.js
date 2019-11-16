let playerChoosed;
let computerChoosed;
const option = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;
let actualPlayerHealth = 100;
let actualAiHealth = 100;
let maxHitDamage = 15;
let minHitDamage = 5;
let maxRoundValue = 2;


const resultPlace = document.querySelector('.result');
const allBtns = document.querySelectorAll('.buttons button');
const playerHealthBar = document.querySelector('.yourScore .health .playerHit');
const computerHealthBar = document.querySelector('.aiScore .health .enemyHit');
const playerHitShow = document.querySelector('.playerChooseField .showHitValue');
const computerHitShow = document.querySelector('.computerChooseField .showHitValue');
const menuButton = document.querySelector('.menu i');
const menuContent = document.querySelector('.contentMenu');
const roundNumberOptions = document.querySelector('.roundNumberOptions');
const saveOptionsButton = document.querySelector('.saveOptions');


let text = {

    playerWinRound: 'You win round!',
    aiWinRound: 'Computer win round!',
    playerWinMatch: 'You win match!',
    aiWinMatch: 'Computer win Match!',
    playerHit: ['You hit enemy.', 'Your enemy has not chance to block', 'Beautiful, that\'s be great attack', 'You be a master, kill enemy!'],
    enemyHit: ['Enemy hit You', 'Sorry, enemy kick your ass...', 'What\'s wrong with You? Computer hit your face!', 'Haha, are you be a little girl?'],
    draw: ['Enemy block your attack', 'You block enemy hit', 'You and Enemy block hits', 'Again draw? Booooooring...'],

}

const saveOptions = () => {
    maxRoundValue = roundNumberOptions.value;
}
const showMenu = () => {
    menuContent.classList.toggle('active');
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

    document.querySelector('.handInfo').textContent = `Enemy Choosed ${computerChoosed}`;
    setTimeout(checkResults, 1000);
}

const checkWin = () => {

    //check who win match
    if (actualPlayerHealth <= 0 || actualAiHealth <= 0) {
        if (actualPlayerHealth <= 0) {
            resultPlace.textContent = text.aiWinRound;
            computerScore++;
            document.querySelector('.computerScore').textContent = computerScore;
        } else if (actualAiHealth <= 0) {
            resultPlace.textContent = text.playerWinRound;
            playerScore++;
            document.querySelector('.playerScore').textContent = playerScore;
        }

        actualPlayerHealth = 100;
        actualAiHealth = 100;
        playerHealthBar.style.right = `-${actualPlayerHealth}%`;
        computerHealthBar.style.left = `-${actualAiHealth}%`;
    }

    //Check who win Match
    if (computerScore == maxRoundValue || playerScore == maxRoundValue) {
        if (computerScore == maxRoundValue) {
            alert('Enemy win match.');
            computerScore = 0;
            playerScore = 0;


        } else if (playerScore == maxRoundValue) {
            alert('You win match!');
            computerScore = 0;
            playerScore = 0;
        }

    }
}

const checkResults = () => {
    let randomHitDamage = Math.floor(Math.random() * (maxHitDamage - minHitDamage + 1) + minHitDamage);

    document.querySelector('.handInfo').textContent = "";
    if (playerChoosed === option[0] && computerChoosed === option[2] || playerChoosed === option[1] && computerChoosed === option[0] || playerChoosed === option[2] && computerChoosed === option[1]) {
        document.querySelector('.playerChooseField').classList.add('toRight');
        resultPlace.textContent = text.playerHit[Math.floor(Math.random() * text.playerHit.length)];
        actualAiHealth -= randomHitDamage;
        if (randomHitDamage == maxHitDamage) {
            computerHitShow.textContent = `CRITICAL HIT!${randomHitDamage}`;
        } else {
            computerHitShow.textContent = `${randomHitDamage}hit`;
        }

        computerHitShow.classList.add('animationHitValue');
        computerHealthBar.style.left = `-${actualAiHealth}%`;
    } else if (playerChoosed === computerChoosed) {
        resultPlace.textContent = text.draw[Math.floor(Math.random() * text.draw.length)];
    } else {
        document.querySelector('.computerChooseField').classList.add('toLeft');
        resultPlace.textContent = text.enemyHit[Math.floor(Math.random() * text.enemyHit.length)];


        actualPlayerHealth -= randomHitDamage;
        if (randomHitDamage == maxHitDamage) {
            playerHitShow.textContent = `CRITICAL HIT!${randomHitDamage}`;
        } else {
            playerHitShow.textContent = `${randomHitDamage}hit`;
        }
        playerHitShow.classList.add('animationHitValue');
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
        document.querySelector('.handInfo').textContent = "";
        resultPlace.textContent = 'Who win?';
        document.querySelector('.playerChooseField').classList.remove('toRight');
        document.querySelector('.computerChooseField').classList.remove('toLeft');
        playerHitShow.classList.remove('animationHitValue');
        computerHitShow.classList.remove('animationHitValue');
    });
}



document.querySelector('.rock').addEventListener('click', (e) => {
    playerChoosed = option[0];
    document.querySelector('.playerChooseField .rockImg').classList.add('active');

    document.querySelector('.handInfo').textContent = `You Choosed ${playerChoosed}`;
    setTimeout(compChoose, 2000);
});

document.querySelector('.paper').addEventListener('click', (e) => {
    playerChoosed = option[1];
    document.querySelector('.playerChooseField .paperImg').classList.add('active');

    document.querySelector('.handInfo').textContent = `You Choosed ${playerChoosed}`;
    setTimeout(compChoose, 2000);
});

document.querySelector('.scissors').addEventListener('click', (e) => {
    playerChoosed = option[2]
    document.querySelector('.playerChooseField .scissorsImg').classList.add('active');

    document.querySelector('.handInfo').textContent = `You Choosed ${playerChoosed}`;
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

menuButton.addEventListener('click', showMenu);
saveOptionsButton.addEventListener('click', saveOptions);
