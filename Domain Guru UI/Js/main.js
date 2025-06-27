// DOM Elements
const bodyRoot = document.getElementById('bodyRoot');
const toggleModeBtn = document.getElementById('toggleModeBtn');
const toggleIcon = document.getElementById('toggleIcon');
const promptInput = document.getElementById('promptInput');
const sendBtn = document.getElementById('sendBtn');
const chatArea = document.getElementById('chatArea');
const promptForm = document.getElementById('promptForm');
const domainButtons = document.querySelectorAll('.domainBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const fullscreenChatSection = document.getElementById('fullscreenChatSection');
const photoBtn = document.getElementById('photoBtn');
const photoInput = document.getElementById('photoInput');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

let selectedDomain = "finance"; // Default selected domain
let chatHistory = [
  {
    sender: 'bot',
    type: 'text',
    message: 'Hi! I am Domain Guru. Ask me anything about your domain!'
  }
];

// Helper: Toggle dark/light mode
toggleModeBtn.addEventListener('click', () => {
  const isDarkMode = bodyRoot.classList.toggle('darkMode');
  bodyRoot.classList.toggle('lightMode', !isDarkMode);
  toggleIcon.classList.toggle('bi-moon-fill', !isDarkMode);
  toggleIcon.classList.toggle('bi-sun-fill', isDarkMode);
});

// Domain selection logic
function updateDomainSelection(domain) {
  domainButtons.forEach(btn => {
    if (btn.dataset.domain === domain) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
  selectedDomain = domain;
}

// On page load, set default domain
window.addEventListener("DOMContentLoaded", () => {
  updateDomainSelection(selectedDomain);
  promptInput.focus();
  renderChat();
});

// Handle domain button click
domainButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    updateDomainSelection(btn.dataset.domain);
    promptInput.focus();
  });
});

// Helper: Create chat bubble
function createChatBubble({message, sender, type = "text", imageSrc}) {
  const bubble = document.createElement('div');
  bubble.className = `chatBubble ${sender}Message animate__fadeIn`;

  const avatar = document.createElement('div');
  avatar.className = `avatar ${sender}Avatar`;
  avatar.textContent = sender === 'bot' ? '🤖' : '🧑';

  if (type === "photo" && imageSrc) {
    const content = document.createElement('div');
    content.className = 'photoBubbleContent';
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = "Chat Photo";
    content.appendChild(img);
    if (message && message.trim() !== "") {
      const caption = document.createElement('div');
      caption.className = 'photoBubbleCaption';
      caption.textContent = message;
      content.appendChild(caption);
    }
    bubble.appendChild(avatar);
    bubble.appendChild(content);
  } else {
    const content = document.createElement('div');
    content.className = 'bubbleContent';
    content.textContent = message;
    bubble.appendChild(avatar);
    bubble.appendChild(content);
  }
  return bubble;
}

// Helper: Dummy API simulation
function getDummyBotResponse(domain, prompt) {
  const responses = {
    finance: [
      "Here's a finance tip: Diversify your investments!",
      "In finance, always keep an eye on your cash flow.",
      `Great finance question! Analysis: ${prompt.slice(0, 35)}...`
    ],
    tech: [
      "Tech evolves rapidly—stay updated!",
      "In tech, learning never stops.",
      `Interesting tech topic: ${prompt.slice(0, 35)}...`
    ],
    health: [
      "Health tip: Stay hydrated and exercise.",
      "Wellness in health is about balance.",
      `For health, consider: ${prompt.slice(0, 35)}...`
    ],
    education: [
      "Education unlocks potential!",
      "Keep your curiosity alive in education.",
      `Learning tip: ${prompt.slice(0, 35)}...`
    ],
    travel: [
      "Travel expands your horizons.",
      "Always check visa rules before traveling.",
      `Travel thought: ${prompt.slice(0, 35)}...`
    ],
    sports: [
      "Sports teach teamwork and discipline.",
      "Consistency is key to sports improvement.",
      `Sports insight: ${prompt.slice(0, 35)}...`
    ],
    general: [
      "Ask me anything!",
      "I'm here to help with any topic.",
      `General info: ${prompt.slice(0, 35)}...`
    ]
  };
  const arr = responses[domain] || responses.general;
  return arr[Math.floor(Math.random() * arr.length)];
}

// Render chat from chatHistory
function renderChat() {
  chatArea.innerHTML = '';
  for (const msg of chatHistory) {
    const bubble = createChatBubble(msg);
    chatArea.appendChild(bubble);
  }
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Handle send button and form
promptForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) {
    promptInput.focus();
    return;
  }

  // Add user message
  chatHistory.push({message: prompt, sender: 'user', type: 'text'});
  renderChat();

  // Clear prompt input
  promptInput.value = '';
  promptInput.disabled = true;
  sendBtn.disabled = true;

  // Simulate API call delay
  setTimeout(() => {
    const botReply = getDummyBotResponse(selectedDomain, prompt);
    chatHistory.push({message: botReply, sender: 'bot', type: 'text'});
    renderChat();

    promptInput.disabled = false;
    sendBtn.disabled = false;
    promptInput.focus();
  }, 850);
});

// Optional: Enter key to send
promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

// Photo button logic
photoBtn.addEventListener('click', () => {
  photoInput.click();
});
photoInput.addEventListener('change', (e) => {
  if (photoInput.files && photoInput.files[0]) {
    const file = photoInput.files[0];
    const reader = new FileReader();
    reader.onload = function(ev) {
      // Show a preview and send as user message
      chatHistory.push({
        message: '', // Optional caption could be asked
        sender: 'user',
        type: 'photo',
        imageSrc: ev.target.result
      });
      renderChat();
      // Simulate bot reply
      setTimeout(() => {
        chatHistory.push({
          message: 'Nice photo! 📷',
          sender: 'bot',
          type: 'text'
        });
        renderChat();
      }, 700);
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be uploaded again if needed
    photoInput.value = '';
  }
});

// Fullscreen toggle logic
let isFullscreen = false;
fullscreenBtn.addEventListener('click', () => {
  if (!isFullscreen) {
    fullscreenChatSection.requestFullscreen?.();
    fullscreenChatSection.classList.add('fullscreen-active');
    isFullscreen = true;
    fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen-exit"></i>';
  } else {
    document.exitFullscreen?.();
    fullscreenChatSection.classList.remove('fullscreen-active');
    isFullscreen = false;
    fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
  }
});
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    isFullscreen = false;
    fullscreenChatSection.classList.remove('fullscreen-active');
    fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
  }
});

// Chat search functionality
searchBtn?.addEventListener('click', () => {
  searchInput.value = '';
  searchResults.innerHTML = '';
});
searchInput?.addEventListener('input', (e) => {
  const val = e.target.value.toLowerCase();
  searchResults.innerHTML = '';
  if (!val) return;
  let resCount = 0;
  chatHistory.forEach((msg, idx) => {
    if (msg.type === "text" && msg.message.toLowerCase().includes(val)) {
      const div = document.createElement('div');
      div.className = 'searchResult';
      div.textContent = (msg.sender === 'user' ? "You: " : "Guru: ") + msg.message;
      div.tabIndex = 0;
      div.addEventListener('click', () => {
        // Scroll to the message in chat
        const bubbles = chatArea.querySelectorAll('.chatBubble');
        if (bubbles[idx]) {
          bubbles[idx].scrollIntoView({behavior: "smooth", block: "center"});
          bubbles[idx].classList.add('active');
          setTimeout(() => bubbles[idx].classList.remove('active'), 1200);
        }
        // Close modal
        document.querySelector('#searchModal .btn-close').click();
      });
      searchResults.appendChild(div);
      resCount++;
    }
  });
  if (resCount === 0) {
    searchResults.innerHTML = "<div class='text-muted'>No results found.</div>";
  }
});