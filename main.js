let playerChoosed;
let computerChoosed;
const option = ['Kamień', 'Papier', 'Nożyce'];

let playerScore = 0;
let computerScore = 0;
let actualPlayerHealth = 100;
let actualAiHealth = 100;
let playerMaxHitDamage;
let playerMinHitDamage;
let enemyMaxHitDamage;
let enemyMinHitDamage;
let maxRoundValue = 2;
let playerRandomHitDamage;
let enemyRandomHitDamage;
let choosedHardLvl;

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
const hardLevelButtons = document.querySelectorAll('.levelHard input');


let text = {

    playerWinRound: 'Wygrałeś rundę!',
    aiWinRound: 'Przeciwnik wygrał runde!',
    playerWinMatch: 'Wygrałeś mecz!',
    aiWinMatch: 'Komputer wygrał mecz!',
    playerHit: ['Trafiłeś wroga.', 'Wróg nie miał szans na obronę.', 'Świetnie, to był dobry atak', 'Przeciwnik nie miał szans, brawo!'],
    enemyHit: ['Wróg Cię trafił.', 'Wybacz, komputer skopał Ci tyłek', 'Przeciwnik bez problemu Cię uderzył', 'No co jest? Umiesz się obronić?'],
    draw: ['Przeciwnik zablokował twój atak!', 'Obroniłeś się przed atakiem wroga.', 'Znowu remis? Nuuuuuuuudy...'],
    resetGame: 'Gra została zresetowana',
}




const resetGame = (messageForPlayer) => {
    alert(messageForPlayer);
    playerScore = 0;
    computerScore = 0;
    document.querySelector('.playerScore').textContent = playerScore;
    document.querySelector('.computerScore').textContent = computerScore;
    actualPlayerHealth = 100;
    actualAiHealth = 100;
    playerHealthBar.style.right = `-${actualPlayerHealth}%`;
    computerHealthBar.style.left = `-${actualAiHealth}%`;
    resultPlace.textContent = 'Kto zwycięży?';

}

const saveOptions = () => {
    maxRoundValue = roundNumberOptions.value;
    setHardLevel();
    resetGame('W celu zapisu gra została zresetowana.');
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

    document.querySelector('.handInfo').textContent = `Wróg wybrał ${computerChoosed}`;
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
            alert('Wróg zwyciężył w pojedynku.');
            computerScore = 0;
            playerScore = 0;


        } else if (playerScore == maxRoundValue) {
            alert('Wygrałeś mecz! Gratulacje!');
            computerScore = 0;
            playerScore = 0;
        }

    }
}

const checkResults = () => {

    if (choosedHardLvl == "easy") {
        enemyMaxHitDamage = 10;
        playerMinHitDamage = 10;
    } else if (choosedHardLvl == "hard") {
        playerMaxHitDamage = 10;
        enemyMinHitDamage = 10;
    } else {
        playerMaxHitDamage = 15;
        enemyMaxHitDamage = 15;
        playerMinHitDamage = 5;
        enemyMinHitDamage = 5;
    }

    playerRandomHitDamage = Math.floor(Math.random() * (playerMaxHitDamage - playerMinHitDamage + 1) + playerMinHitDamage);
    enemyRandomHitDamage = Math.floor(Math.random() * (enemyMaxHitDamage - enemyMinHitDamage + 1) + enemyMinHitDamage);

    //    document.querySelector('.handInfo').textContent = "";
    if (playerChoosed === option[0] && computerChoosed === option[2] || playerChoosed === option[1] && computerChoosed === option[0] || playerChoosed === option[2] && computerChoosed === option[1]) {
        document.querySelector('.playerChooseField').classList.add('toRight');
        resultPlace.textContent = text.playerHit[Math.floor(Math.random() * text.playerHit.length)];
        actualAiHealth -= playerRandomHitDamage;
        if (playerRandomHitDamage === playerMaxHitDamage) {
            computerHitShow.textContent = `Krytyczne trafienie! ${playerRandomHitDamage} pkt.`;
        } else {
            computerHitShow.textContent = `${playerRandomHitDamage} pkt.`;
        }

        computerHitShow.classList.add('animationHitValue');
        computerHealthBar.style.left = `-${actualAiHealth}%`;

    } else if (playerChoosed === computerChoosed) {
        resultPlace.textContent = text.draw[Math.floor(Math.random() * text.draw.length)];
    } else {
        document.querySelector('.computerChooseField').classList.add('toLeft');
        resultPlace.textContent = text.enemyHit[Math.floor(Math.random() * text.enemyHit.length)];
        actualPlayerHealth -= enemyRandomHitDamage;
        if (enemyRandomHitDamage === enemyMaxHitDamage) {
            playerHitShow.textContent = `Krytyczne trafienie! ${enemyRandomHitDamage} pkt.`;
        } else {
            playerHitShow.textContent = `${enemyRandomHitDamage} pkt.`;
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

const setHardLevel = () => {

    if (hardLevelButtons[0].checked) {
        choosedHardLvl = 'easy';
    } else if (hardLevelButtons[1].checked) {
        choosedHardLvl = 'normal';
    } else if (hardLevelButtons[2].checked) {
        choosedHardLvl = 'hard';
    }

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
        resultPlace.textContent = 'Kto zwycięży?';
        document.querySelector('.playerChooseField').classList.remove('toRight');
        document.querySelector('.computerChooseField').classList.remove('toLeft');
        playerHitShow.classList.remove('animationHitValue');
        computerHitShow.classList.remove('animationHitValue');
    });
}



document.querySelector('.rock').addEventListener('click', (e) => {
    playerChoosed = option[0];
    document.querySelector('.playerChooseField .rockImg').classList.add('active');

    document.querySelector('.handInfo').textContent = `Wybrałeś ${playerChoosed}`;
    setTimeout(compChoose, 2000);
});

document.querySelector('.paper').addEventListener('click', (e) => {
    playerChoosed = option[1];
    document.querySelector('.playerChooseField .paperImg').classList.add('active');

    document.querySelector('.handInfo').textContent = `Wybrałeś ${playerChoosed}`;
    setTimeout(compChoose, 2000);
});

document.querySelector('.scissors').addEventListener('click', (e) => {
    playerChoosed = option[2]
    document.querySelector('.playerChooseField .scissorsImg').classList.add('active');

    document.querySelector('.handInfo').textContent = `Wybrałeś ${playerChoosed}`;
    setTimeout(compChoose, 2000);
});

document.querySelector('.reset').addEventListener('click', (e) => {
    e.preventDefault();
    resetGame('Gra została zresetowana.');
});

menuButton.addEventListener('click', showMenu);
saveOptionsButton.addEventListener('click', saveOptions);
