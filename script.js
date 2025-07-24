console.log('JS chargé !');

document.addEventListener('DOMContentLoaded', function () {
  // Chatbot
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const chatbotBubble = document.getElementById('chatbot-bubble');
  const chatbotFab = document.getElementById('chatbot-fab');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotOverlay = document.getElementById('chatbot-overlay');

  let firstUserMessage = true;

  function addMessage(text, sender = 'bot') {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chatbot-message ' + (sender === 'user' ? 'user' : 'bot');
    if (sender === 'bot' && firstUserMessage) {
      msgDiv.innerHTML = '<i class="fa-solid fa-user-doctor"></i> ' + text;
    } else if (sender === 'bot') {
      msgDiv.innerHTML = '<i class="fa-solid fa-robot"></i> ' + text;
    } else {
      msgDiv.textContent = text;
    }
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showLoading() {
    const chatMessages = document.getElementById('chat-messages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'chatbot-loading';
    loadingDiv.innerHTML = '<span class="chatbot-loading-dot"></span><span class="chatbot-loading-dot"></span><span class="chatbot-loading-dot"></span>';
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return loadingDiv;
  }

  function removeLoading(loadingDiv) {
    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }
  }

  // Afficher le message d'accueil uniquement à l'ouverture
  function showWelcomeMessage() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'chatbot-message chatbot-welcome';
    welcomeDiv.innerHTML = '<i class="fa-solid fa-user-doctor"></i> Bonjour et bienvenue sur le Chat du Cabinet médical du Dr Ghemning !<br>Posez votre question, nous vous répondrons dans les plus brefs délais.';
    chatMessages.appendChild(welcomeDiv);
  }

  function openChatbot() {
    chatbotBubble.style.display = 'flex';
    chatbotOverlay.style.display = 'block';
    chatbotFab.style.display = 'none';
    showWelcomeMessage();
    firstUserMessage = true;
  }
  function closeChatbot() {
    chatbotBubble.style.display = 'none';
    chatbotOverlay.style.display = 'none';
    chatbotFab.style.display = 'flex';
    hideEmojiPicker();
  }

  if (chatbotFab) chatbotFab.addEventListener('click', openChatbot);
  if (chatbotClose) chatbotClose.addEventListener('click', closeChatbot);
  if (chatbotOverlay) chatbotOverlay.addEventListener('click', closeChatbot);

  // Formulaire
  if (chatForm) chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;
    addMessage(userMsg, 'user');
    chatInput.value = '';
    if (firstUserMessage) {
      const loadingDiv = showLoading();
      setTimeout(() => {
        removeLoading(loadingDiv);
        addMessage("Merci pour votre message ! Nous vous répondrons très bientôt.", 'bot');
      }, 1000);
      firstUserMessage = false;
    }
  });

  // FAQ Pagination
  const faqQuestions = [
    {
      question: 'Comment prendre rendez-vous ?',
      answer: 'En ligne via <a href="https://progenda.be/">Progenda</a> ou par téléphone au 04 384 30 84.'
    },
    {
      question: 'Les consultations sont-elles remboursées ?',
      answer: 'Oui, le cabinet est conventionné (secteur 1), les consultations sont remboursées par la mutuelle.'
    },
    {
      question: 'Proposez-vous la téléconsultation ?',
      answer: 'Oui, la téléconsultation est disponible via Progenda et remboursée comme une consultation en présentiel.'
    },
    {
      question: 'Quelles langues sont parlées au cabinet ?',
      answer: 'Français, Anglais.'
    }
  ];
  const QUESTIONS_PER_PAGE = 2;
  let currentFaqPage = 1;

  const faqList = document.getElementById('faq-list');
  const faqPrev = document.getElementById('faq-prev');
  const faqNext = document.getElementById('faq-next');
  const faqPageIndicator = document.getElementById('faq-page-indicator');

  function renderFaqPage(page) {
    if (!faqList || !faqPrev || !faqNext || !faqPageIndicator) return;
    faqList.innerHTML = '';
    const start = (page - 1) * QUESTIONS_PER_PAGE;
    const end = start + QUESTIONS_PER_PAGE;
    const pageQuestions = faqQuestions.slice(start, end);
    pageQuestions.forEach(q => {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = q.question;
      details.appendChild(summary);
      const p = document.createElement('p');
      p.innerHTML = q.answer;
      details.appendChild(p);
      faqList.appendChild(details);
    });
    faqPrev.disabled = page === 1;
    faqNext.disabled = end >= faqQuestions.length;
    faqPageIndicator.textContent = `Page ${page}`;
  }

  if (faqPrev && faqNext && faqList && faqPageIndicator) {
    faqPrev.addEventListener('click', function () {
      if (currentFaqPage > 1) {
        currentFaqPage--;
        renderFaqPage(currentFaqPage);
      }
    });
    faqNext.addEventListener('click', function () {
      if ((currentFaqPage * QUESTIONS_PER_PAGE) < faqQuestions.length) {
        currentFaqPage++;
        renderFaqPage(currentFaqPage);
      }
    });
    renderFaqPage(currentFaqPage);
  }

  // Emoji Picker
  const emojiBtn = document.getElementById('emoji-btn');
  const emojiPicker = document.getElementById('emoji-picker');
  const emojis = [
    '😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗','😙','😚','🙂','🤗','🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','😳','🤪','😵','😡','😠','🤬','😷','🤒','🤕','🤢','🤮','🥴','😇','🥳','🥺','🤠','🤡','🤥','🤫','🤭','🧐','🤓','😈','👿','👹','👺','💀','👻','👽','🤖','💩','😺','😸','😹','😻','😼','😽','��','😿','😾'
  ];

  if (!emojiBtn) console.warn('emoji-btn introuvable');
  if (!emojiPicker) console.warn('emoji-picker introuvable');

  function showEmojiPicker() {
    if (!emojiPicker) return;
    emojiPicker.innerHTML = '';
    emojis.forEach(emoji => {
      const span = document.createElement('span');
      span.textContent = emoji;
      span.addEventListener('mousedown', (e) => {
        e.preventDefault();
        console.log('Emoji cliqué:', emoji);
        if (chatInput) chatInput.value += emoji; // test simple
        hideEmojiPicker();
        if (chatInput) chatInput.focus();
      });
      emojiPicker.appendChild(span);
    });
    emojiPicker.style.display = 'grid';
    if (emojiBtn) emojiBtn.classList.add('active');
  }
  function hideEmojiPicker() {
    if (!emojiPicker) return;
    emojiPicker.style.display = 'none';
    if (emojiBtn) emojiBtn.classList.remove('active');
  }
  if (emojiBtn) emojiBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Bouton emoji cliqué');
    if (emojiPicker.style.display === 'grid') {
      hideEmojiPicker();
    } else {
      showEmojiPicker();
    }
  });
  document.addEventListener('mousedown', (e) => {
    if (emojiPicker && !emojiPicker.contains(e.target) && e.target !== emojiBtn) {
      hideEmojiPicker();
    }
  });

  // Image upload
  const imageBtn = document.getElementById('image-btn');
  const imageInput = document.getElementById('image-input');

  if (!imageBtn) console.warn('image-btn introuvable');
  if (!imageInput) console.warn('image-input introuvable');

  if (imageBtn) imageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Bouton image cliqué');
    imageInput && imageInput.click();
  });

  if (imageInput) imageInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      const file = this.files[0];
      console.log('Image sélectionnée:', file.name);
      const reader = new FileReader();
      reader.onload = function(e) {
        addImageMessage(e.target.result, 'user');
      };
      reader.readAsDataURL(file);
      imageInput.value = '';
    }
  });

  function addImageMessage(imgSrc, sender = 'user') {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chatbot-message ' + (sender === 'user' ? 'user' : 'bot');
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Image envoyée';
    img.className = 'chatbot-img-preview';
    msgDiv.appendChild(img);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}); 