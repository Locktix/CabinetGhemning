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
  }

  chatbotFab.addEventListener('click', openChatbot);
  chatbotClose.addEventListener('click', closeChatbot);
  chatbotOverlay.addEventListener('click', closeChatbot);

  // Formulaire
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;
    addMessage(userMsg, 'user');
    chatInput.value = '';
    if (firstUserMessage) {
      setTimeout(() => {
        addMessage("Merci pour votre message ! Nous vous répondrons très bientôt.", 'bot');
      }, 700);
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
}); 