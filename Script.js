let userScore = parseInt(localStorage.getItem('user-score')) || 0;
let compScore = parseInt(localStorage.getItem('comp-score')) || 0;
document.getElementById('user-score').innerText = userScore;
document.getElementById('comp-score').innerText = compScore;

const meta = {
    rock: { color: 'var(--rock)', icon: 'fist' },
    paper: { color: 'var(--paper)', icon: 'hand' },
    scissors: { color: 'var(--scissors)', icon: 'scissors' }
};

function runGame(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const pcChoice = choices[Math.floor(Math.random() * 3)];
    document.getElementById('selection-view').style.display = 'none';
    document.getElementById('result-view').style.display = 'flex';
    renderIcon('user-pick-icon', userChoice);
    renderIcon('pc-pick-icon', pcChoice);

    if (userChoice === pcChoice) {
        setResultUI("TIE UP", false, null);
    } else if (
        (userChoice === 'rock' && pcChoice === 'scissors') ||
        (userChoice === 'paper' && pcChoice === 'rock') ||
        (userChoice === 'scissors' && pcChoice === 'paper')
    ) {
        updateScore('user');
        setResultUI("YOU WIN", true, 'user');
        document.getElementById('next-btn').style.display = 'block';
    } else {
        updateScore('comp');
        setResultUI("YOU LOST", true, 'pc');
    }
}

function renderIcon(id, choice) {
    const el = document.getElementById(id);
    el.style.borderColor = meta[choice].color;
    el.innerHTML = `<div class="icon-inner"><img src="https://img.icons8.com/ios-filled/50/000000/${meta[choice].icon}.png"></div>`;
}

function setResultUI(msg, showSub, winner) {
    document.getElementById('result-text').innerText = msg;
    document.getElementById('against-text').style.display = showSub ? 'block' : 'none';
    document.getElementById('user-ripple').classList.toggle('winner-ripple', winner === 'user');
    document.getElementById('pc-ripple').classList.toggle('winner-ripple', winner === 'pc');
}

function updateScore(winner) {
    if (winner === 'user') userScore++; else compScore++;
    localStorage.setItem('user-score', userScore);
    localStorage.setItem('comp-score', compScore);
    document.getElementById('user-score').innerText = userScore;
    document.getElementById('comp-score').innerText = compScore;
}

function resetGame() {
    document.getElementById('selection-view').style.display = 'block';
    document.getElementById('result-view').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
}

function goToWinPage() {
    document.getElementById('main-game').style.display = 'none';
    document.getElementById('win-page').style.display = 'flex';
}

const modal = document.getElementById('rules-modal');
document.getElementById('rules-open').onclick = () => modal.style.display = 'block';
document.querySelector('.modal-close').onclick = () => modal.style.display = 'none';