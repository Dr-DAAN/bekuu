// Audio Setup
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playMeowSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Meow sound frequency modulation
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
}

// Page Management
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    createHeartShower();
}

// Heart Shower
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    const showerContainers = document.querySelectorAll('.heart-shower');
    if (showerContainers.length > 0) {
        const activeContainer = document.querySelector('.page.active .heart-shower');
        if (activeContainer) {
            activeContainer.appendChild(heart);
        }
    }
    
    setTimeout(() => heart.remove(), 5000);
}

function createHeartShower() {
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createHeart(), i * 200);
    }
    
    // Continue creating hearts every 500ms
    const interval = setInterval(() => {
        if (!document.querySelector('.page.active')) {
            clearInterval(interval);
            return;
        }
        createHeart();
    }, 500);
    
    // Store interval to clear if needed
    window.currentHeartInterval = interval;
}

// Rose Shower (for Valentine Grateful page)
function createRoseShower() {
    const roses = ['🌹', '🥀'];
    for (let i = 0; i < 15; i++) {
        const rose = document.createElement('div');
        rose.className = 'rose';
        rose.textContent = roses[Math.floor(Math.random() * roses.length)];
        rose.style.left = Math.random() * 100 + '%';
        rose.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        
        const roseShower = document.getElementById('roseShower');
        if (roseShower) {
            roseShower.appendChild(rose);
        }
        
        setTimeout(() => rose.remove(), 5000);
    }
}

// Cat Face Shower (for Birthday Yes page)
function createCatFaceShower() {
    const catFaces = ['😻', '😸', '😹', '😺', '😻'];
    for (let i = 0; i < 20; i++) {
        const catFace = document.createElement('div');
        catFace.className = 'cat-face';
        catFace.textContent = catFaces[Math.floor(Math.random() * catFaces.length)];
        catFace.style.left = Math.random() * 100 + '%';
        catFace.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        
        const catFaceShower = document.getElementById('catFaceShower');
        if (catFaceShower) {
            catFaceShower.appendChild(catFace);
        }
        
        setTimeout(() => catFace.remove(), 5000);
    }
}

// Home Button Navigation
document.querySelectorAll('.home-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        playMeowSound();
        showPage('homePage');
    });
});

// Home Page Buttons
document.getElementById('valentineBtn').addEventListener('click', () => {
    playMeowSound();
    showPage('valentineAgePage');
});

document.getElementById('birthdayBtn').addEventListener('click', () => {
    playMeowSound();
    showPage('birthdayMainPage');
    animateCatWalk();
});

// Valentine Age Verification
let ageClickCount = 0;
document.getElementById('age18MinusBtn').addEventListener('click', () => {
    playMeowSound();
    
    if (ageClickCount === 0) {
        // First click - grow and show message
        const btn = document.getElementById('age18PlusBtn');
        btn.classList.add('grow');
        document.getElementById('teaseMessage').classList.remove('hidden');
        ageClickCount++;
    } else if (ageClickCount < 5) {
        // Move button to random position
        const btn = document.getElementById('age18MinusBtn');
        const randomX = Math.random() * (window.innerWidth - 150);
        const randomY = Math.random() * (window.innerHeight - 150);
        btn.style.position = 'fixed';
        btn.style.left = randomX + 'px';
        btn.style.top = randomY + 'px';
        ageClickCount++;
    } else {
        // After 5 clicks, remove button
        document.getElementById('age18MinusBtn').style.display = 'none';
        ageClickCount++;
    }
});

document.getElementById('age18PlusBtn').addEventListener('click', () => {
    playMeowSound();
    ageClickCount = 0;
    document.getElementById('teaseMessage').classList.add('hidden');
    document.getElementById('age18PlusBtn').classList.remove('grow');
    showPage('valentineInterestPage');
});

// Valentine Interest Page
document.getElementById('slapMeBtn').addEventListener('click', () => {
    playMeowSound();
    showPage('valentineSlapPage');
    animateSlapEmoji('👨');
    setTimeout(() => {
        document.getElementById('slapAnimation').textContent = '😭';
    }, 500);
});

document.getElementById('beGratefulBtn').addEventListener('click', () => {
    playMeowSound();
    showPage('valentineGratefulPage');
    createRoseShower();
    // SET YOUR VALENTINE LINK HERE - Replace with your actual link
    document.getElementById('valentineLink').href = 'https://www.canva.com/design/DAHA6aPB51w/NXR_glGiecJ2dsHB0XhstA/edit?utm_content=DAHA6aPB51w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
});

document.getElementById('backToValentineBtn').addEventListener('click', () => {
    playMeowSound();
    document.getElementById('slapAnimation').textContent = '👨';
    showPage('valentineInterestPage');
});

// Birthday Mode
function animateCatWalk() {
    const cat = document.getElementById('catWalk');
    cat.style.animation = 'none';
    setTimeout(() => {
        cat.style.animation = 'catWalkAnim 4s ease-in-out forwards';
    }, 10);
}

document.getElementById('birthdayYesBtn').addEventListener('click', () => {
    playMeowSound();
    showPage('birthdayYesPage');
    createCatFaceShower();
    // SET YOUR BIRTHDAY YES LINK HERE - Replace with your actual link
    document.getElementById('birthdayLink').href = 'https://www.canva.com/design/DAHA6dsPyKY/JDWwrGeG7SjvfLJ1x8-hYQ/edit?utm_content=DAHA6dsPyKY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
});

document.getElementById('birthdayNoBtn').addEventListener('click', () => {
    playMeowSound();
    showPage('birthdayNoPage');
    animateSlapEmoji('👩');
    setTimeout(() => {
        document.getElementById('birthdayEmojiSlap').textContent = '😭';
    }, 500);
});

document.getElementById('backToBirthdayBtn').addEventListener('click', () => {
    playMeowSound();
    document.getElementById('birthdayEmojiSlap').textContent = '👩';
    showPage('birthdayMainPage');
    animateCatWalk();
});

// Slap Animation
function animateSlapEmoji(emoji) {
    const container = document.querySelector('.page.active .emoji-animation') || 
                     document.getElementById('slapAnimation') ||
                     document.getElementById('birthdayEmojiSlap');
    if (container) {
        container.textContent = emoji;
        container.style.animation = 'none';
        setTimeout(() => {
            container.style.animation = 'slapAnimation 1s ease-in-out';
        }, 10);
    }
}

// Click anywhere to create heart
document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
        playMeowSound();
        createHeart();
    }
});

// Initialize with home page
showPage('homePage');
