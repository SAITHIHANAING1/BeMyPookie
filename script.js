const CONFIG = {
    yesScaleIncrement: 0.2,
    shrinkThreshold: 5,
    animationDuration: 500
};

const noButtonMessagePool = [
    "No", "Are you sure?", "Really sure?", "Think again", "Last chance",
    "Surely not?", "You might regret this", "Give it another thought",
    "Are you absolutely certain?", "This could be a mistake", "Don't be shy",
    "Just say yes", "Please?", "Pretty please?", "I'm gonna cry...",
    "Reconsider?", "Think twice", "You'll miss out", "Bad choice",
    "Why not?", "Come on now", "Seriously?", "One more chance",
    "Don't do this", "You know you want to", "Please reconsider",
    "Are you even sure?", "That's a mistake", "Wrong answer",
    "Try again", "Nope try again", "Think about it", "Really though?",
    "You're breaking my heart", "Don't be like that", "Give me a chance",
    "But why not?", "I'm sad now", "You're mean", "Aw come on"
];

let noClickCount = 0;
let yesButtonScale = 1;
let usedMessages = new Set();

const yesButton = document.getElementById('yesBtn');
const noButton = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const container = document.querySelector('.container');

function init() {
    yesButton.addEventListener('click', handleYesClick);
    noButton.addEventListener('click', handleNoClick);
    createShakeAnimation();
}

function handleYesClick() {
    container.style.display = 'none';
    successMessage.classList.add('show');
    createCelebration();
}

function handleNoClick() {
    noClickCount++;
    updateNoButtonText();
    growYesButton();
    shakeNoButton();
    shrinkNoButton();
}

function updateNoButtonText() {
    const availableMessages = noButtonMessagePool.filter(msg => !usedMessages.has(msg));
    
    if (availableMessages.length === 0) {
        usedMessages.clear();
        availableMessages.push(...noButtonMessagePool);
    }
    
    const randomIndex = Math.floor(Math.random() * availableMessages.length);
    const randomMessage = availableMessages[randomIndex];
    
    usedMessages.add(randomMessage);
    noButton.textContent = randomMessage;
}

function growYesButton() {
    yesButtonScale += CONFIG.yesScaleIncrement;
    yesButton.style.transform = `rotate(-1deg) scale(${yesButtonScale})`;
    yesButton.style.zIndex = '5';
}

function shakeNoButton() {
    noButton.style.animation = `shake ${CONFIG.animationDuration}ms`;
    setTimeout(() => noButton.style.animation = '', CONFIG.animationDuration);
}

function shrinkNoButton() {
    if (noClickCount <= CONFIG.shrinkThreshold) return;
    
    const currentPadding = parseInt(window.getComputedStyle(noButton).padding);
    const newPaddingVertical = Math.max(5, currentPadding - 2);
    const newPaddingHorizontal = Math.max(10, currentPadding - 5);
    const newFontSize = Math.max(0.8, 1.2 - noClickCount * 0.05);
    
    noButton.style.padding = `${newPaddingVertical}px ${newPaddingHorizontal}px`;
    noButton.style.fontSize = `${newFontSize}rem`;
}

function createShakeAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

function createCelebration() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b9d', '#c44569', '#ffa07a', '#98d8c8', '#f7b731', '#5f27cd'];
    
    for (let i = 0; i < 120; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
        confettiContainer.appendChild(confetti);
    }
    
    setTimeout(() => confettiContainer.innerHTML = '', 6000);
}

init();
