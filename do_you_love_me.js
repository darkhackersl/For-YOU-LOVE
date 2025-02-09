const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// Sound effects
const audioHover = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
const audioClick = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');

let noBtnHoverCount = 0;
let currentStage = parseInt(localStorage.getItem('loveStage')) || 1;
const maxStages = 3;

// Create heart particles
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

// Create special effects
function createSpecialEffects() {
    // Create multiple hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, i * 100);
    }

    // Create firework particles
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework-particle');
        const hue = Math.random() * 360;
        particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        particle.style.left = '50vw';
        particle.style.top = '50vh';
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        particle.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        particle.style.animationDelay = (Math.random() * 0.5) + 's';
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }
}

// Create love message
function createLoveMessage() {
    const messages = [
        "You're My Everything! 💖",
        "Forever Yours! 💑",
        "My Heart is Yours! 💝",
        "Together Forever! 💕",
        "Love You Always! 💗"
    ];
    
    const container = document.createElement('div');
    container.classList.add('love-messages');
    
    messages.forEach((msg, index) => {
        const message = document.createElement('div');
        message.classList.add('love-message');
        message.textContent = msg;
        message.style.animationDelay = `${index * 0.5}s`;
        container.appendChild(message);
    });
    
    document.body.appendChild(container);
}

// Handle no button interactions
noBtn.addEventListener("mouseover", () => {
    audioHover.play();
    noBtnHoverCount++;
    
    const newX = Math.floor(Math.random() * (window.innerWidth - noBtn.offsetWidth));
    const newY = Math.floor(Math.random() * (window.innerHeight - noBtn.offsetHeight));
    
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    
    // Make button smaller each time it's hovered
    const scale = Math.max(0.5, 1 - (noBtnHoverCount * 0.05));
    noBtn.style.transform = `scale(${scale})`;
});

// Handle yes button click
yesBtn.addEventListener("click", () => {
    audioClick.play();
    
    if (currentStage < maxStages) {
        currentStage++;
        localStorage.setItem('loveStage', currentStage);
        document.querySelector('.question').textContent = [
            "Do you love me?",
            "Are you really sure?",
            "Promise forever?"
        ][currentStage - 1];
        noBtnHoverCount = 0;
        noBtn.style.transform = 'scale(1)';
    } else {
        questionContainer.style.display = "none";
        heartLoader.style.display = "inherit";
        
        setTimeout(() => {
            heartLoader.style.display = "none";
            resultContainer.style.display = "inherit";
            gifResult.play();
            
            // Start special effects sequence
            createSpecialEffects();
            setTimeout(createLoveMessage, 1000);
            
            // Create continuous heart rain
            const heartInterval = setInterval(createHeart, 300);
            setTimeout(() => clearInterval(heartInterval), 10000);
        }, 3000);
    }
});
