// --- 1. NUQTALARNING TO'XTOVSIZ JONLI SUZISH EFFEKTI (STARFIELD) ---
const canvas = document.getElementById('dots-canvas');
const ctx = canvas.getContext('2d');

let dots = [];
const dotsCount = 75; // Optimal suzish miqdori

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDots();
}

function initDots() {
    dots = [];
    for (let i = 0; i < dotsCount; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.2 + 1, // Kichik o'lchamli mayda nuqtalar
            speedX: (Math.random() - 0.5) * 0.7, // To'xtovsiz sekin harakat
            speedY: (Math.random() - 0.5) * 0.7,
            color: Math.random() > 0.4 ? "#00ff66" : "#ffffff"
        });
    }
}

function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < dots.length; i++) {
        let p = dots[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Uzluksiz siljish mantiqi
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Ekrandan chiqib ketganda aylanma qaytarish
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    }
    
    requestAnimationFrame(animateDots);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
requestAnimationFrame(animateDots);


// --- 2. ALOQA TIZIMI ---
function handleContact(event) {
    event.preventDefault();
    alert('Rahmat! Xabaringiz Diyorbekning tizimiga yuklandi.');
    event.target.reset();
}


// --- 3. AQLLI CHATBOT TIZIMI (Diyorbekning ma'lumotlar bazasi) ---
let isChatOpen = false; let unreadCount = 0;

function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    const chatBadge = document.getElementById('chat-badge');
    if (isChatOpen) { chatBox.style.display = 'none'; isChatOpen = false; } 
    else {
        chatBox.style.display = 'flex'; isChatOpen = true;
        unreadCount = 0; chatBadge.innerText = unreadCount; chatBadge.style.display = 'none';
        scrollToBottom();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    const text = input.value.trim();
    if (text === '') return;

    const userMsg = document.createElement('div');
    userMsg.className = 'msg user-msg'; userMsg.innerText = text;
    messagesContainer.appendChild(userMsg);
    input.value = ''; scrollToBottom();

    const lowerText = text.toLowerCase();
    let botResponse = "Kechirasiz, men Diyorbek haqida faqat uning maktabi, oilasi, yoshi va qiziqishlari bo'yicha ma'lumot bera olaman.";

    if (lowerText.includes("salom") || lowerText.includes("assalom")) {
        botResponse = "Assalomu alaykum! Men Diyorbekning AI yordamchisiman. U haqida nima bilmoqchisiz?";
    } 
    else if (lowerText.includes("yosh") || lowerText.includes("nechada")) {
        botResponse = "Diyorbek hozirda 13 yoshda! 📅";
    } 
    else if (lowerText.includes("maktab") || lowerText.includes("sinf") || lowerText.includes("o'qiydi")) {
        botResponse = "U 32-maktabning 7-'B' sinfida o'qiydi. 🏫";
    } 
    else if (lowerText.includes("hobbi") || lowerText.includes("cs2") || lowerText.includes("futbol") || lowerText.includes("o'yin")) {
        botResponse = "Diyorbek kompyuterda CS2 (Counter-Strike 2) o'ynashni va futbol o'ynashni juda yaxshi ko'radi! 🎮⚽";
    } 
    else if (lowerText.includes("bo'y") || lowerText.includes("vazn") || lowerText.includes("kg") || lowerText.includes("metr")) {
        botResponse = "Uning bo'yi 1.72 metr, vazni esa 53 kg. 🏃‍♂️";
    } 
    else if (lowerText.includes("oila") || lowerText.includes("katta farzand")) {
        botResponse = "U oilada katta farzand hisoblanadi! 👨‍👩‍👧‍👦";
    } 
    else if (lowerText.includes("adam") || lowerText.includes("otasi") || lowerText.includes("baxtiyor")) {
        botResponse = "Diyorbekning adalarining ismi - Baxtiyor. 👨";
    } 
    else if (lowerText.includes("onam") || lowerText.includes("ona") || lowerText.includes("qunduzoy")) {
        botResponse = "Uning onalarining ismi - Qunduzoy. 👩";
    } 
    else if (lowerText.includes("singil") || lowerText.includes("kumushoy")) {
        botResponse = "Diyorbekning singillarining ismi - Kumushoy! 👧";
    } 
    else if (lowerText.includes("rahmat") || lowerText.includes("zo'r")) {
        botResponse = "Arziydi! Diyorbek haqida yana biror narsani bilishni istaysizmi? ✨";
    }

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'msg bot-msg'; botMsg.innerText = botResponse;
        messagesContainer.appendChild(botMsg); scrollToBottom();
    }, 1000);
}

function checkChatEnter(event) { if (event.key === 'Enter') { sendChatMessage(); } }
function scrollToBottom() { const messagesContainer = document.getElementById('chat-messages'); messagesContainer.scrollTop = messagesContainer.scrollHeight; }

// Har 30 soniyada avtomatik xabar
setInterval(() => {
    const messagesContainer = document.getElementById('chat-messages');
    const autoMsg = document.createElement('div');
    autoMsg.className = 'msg bot-msg'; autoMsg.innerText = "Diyorbek haqida savollaringiz bormi? Bemalol yozing!";
    messagesContainer.appendChild(autoMsg);
    if (!isChatOpen) {
        unreadCount++; const chatBadge = document.getElementById('chat-badge');
        chatBadge.innerText = unreadCount; chatBadge.style.display = 'flex';
    } else { scrollToBottom(); }
}, 30000);
