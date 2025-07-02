// Hero animated subtitle (typewriter, slide-in, fade out, loop)
const heroSubtitleText = "Effortlessly track expenses, set budgets, and achieve your financial goals with ";
const heroSubtitleElem = document.getElementById('heroSubtitle');

let subtitleIdx = 0;
let subtitleState = "typing"; // typing | pause | erasing | pause2
let subtitleDelay = 0;
function animateHeroSubtitle() {
    if (subtitleState === "typing") {
        if (subtitleIdx <= heroSubtitleText.length) {
            heroSubtitleElem.textContent = heroSubtitleText.slice(0, subtitleIdx);
            subtitleIdx++;
            setTimeout(animateHeroSubtitle, 28);
        } else {
            subtitleState = "pause";
            subtitleDelay = 0;
            setTimeout(animateHeroSubtitle, 900);
        }
    } else if (subtitleState === "pause") {
        subtitleDelay++;
        if (subtitleDelay > 7) {
            subtitleState = "erasing";
            setTimeout(animateHeroSubtitle, 25);
        } else {
            setTimeout(animateHeroSubtitle, 100);
        }
    } else if (subtitleState === "erasing") {
        if (subtitleIdx > 0) {
            subtitleIdx--;
            heroSubtitleElem.textContent = heroSubtitleText.slice(0, subtitleIdx);
            setTimeout(animateHeroSubtitle, 16);
        } else {
            subtitleState = "pause2";
            subtitleDelay = 0;
            setTimeout(animateHeroSubtitle, 350);
        }
    } else if (subtitleState === "pause2") {
        subtitleDelay++;
        if (subtitleDelay > 3) {
            subtitleState = "typing";
            setTimeout(animateHeroSubtitle, 25);
        } else {
            setTimeout(animateHeroSubtitle, 100);
        }
    }
}
animateHeroSubtitle();

// Dev chat bubbles auto-loop with previous chat shown, and clean reset between loops
const chatBox = document.getElementById('devChatBox');
const chatBubbles = Array.from(chatBox.getElementsByClassName('devChatBubble'));
let chatBubbleIdx = 0;

function hideAllChatBubbles() {
    chatBubbles.forEach(bubble => {
        bubble.classList.remove('visible');
    });
}

function showChatBubblesUpTo(idx) {
    chatBubbles.forEach((bubble, i) => {
        if (i <= idx) {
            bubble.classList.add('visible');
        } else {
            bubble.classList.remove('visible');
        }
    });
}

function chatLoop() {
    // If starting a new loop, hide all and start from beginning after a pause
    if (chatBubbleIdx === 0) {
        hideAllChatBubbles();
        setTimeout(() => {
            showChatBubblesUpTo(chatBubbleIdx);
            chatBubbleIdx++;
            setTimeout(chatLoop, 2250);
        }, 600); // Short pause before new loop
    } else {
        showChatBubblesUpTo(chatBubbleIdx);
        chatBubbleIdx++;
        if (chatBubbleIdx >= chatBubbles.length) {
            // Final chat shown, reset index for next loop
            chatBubbleIdx = 0;
        }
        setTimeout(chatLoop, 2250);
    }
}

// Initialize: hide all, show the first bubble, then start loop
hideAllChatBubbles();
setTimeout(() => {
    showChatBubblesUpTo(0);
    chatBubbleIdx = 1;
    setTimeout(chatLoop, 2250);
}, 1200);

// Fancy text animation on load
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.fancyTextAnimation').forEach((el, idx) => {
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }, 400 + idx * 250);
    });
});