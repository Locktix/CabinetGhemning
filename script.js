/* ===================================
   BADGE DE DISPONIBILITÉ EN TEMPS RÉEL
   =================================== */

function updateStatusBadge() {
    const statusBadge = document.getElementById('statusBadge');
    if (!statusBadge) return;
    
    const now = new Date();
    const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeInMinutes = hour * 60 + minute;
    
    let isOpen = false;
    let nextOpening = '';
    
    // Configuration des horaires (en minutes depuis minuit)
    const schedule = {
        1: { morning: [510, 750], afternoon: [810, 1020] }, // Lundi: 08:30-12:30, 13:30-17:00
        2: { morning: [510, 750], afternoon: [810, 1020] }, // Mardi
        3: { morning: [510, 750], afternoon: [810, 1020] }, // Mercredi
        4: { morning: [510, 750], afternoon: null },         // Jeudi: 08:30-12:30 (fermé après-midi)
        5: { morning: [510, 750], afternoon: [810, 1020] }, // Vendredi
        6: { morning: [540, 780], afternoon: null },         // Samedi: 09:00-13:00
        0: { morning: null, afternoon: null }                // Dimanche: fermé
    };
    
    const todaySchedule = schedule[day];
    
    // Vérifier si ouvert maintenant
    if (todaySchedule.morning && timeInMinutes >= todaySchedule.morning[0] && timeInMinutes <= todaySchedule.morning[1]) {
        isOpen = true;
    } else if (todaySchedule.afternoon && timeInMinutes >= todaySchedule.afternoon[0] && timeInMinutes <= todaySchedule.afternoon[1]) {
        isOpen = true;
    }
    
    // Mettre à jour le badge
    const statusDot = statusBadge.querySelector('.status-dot');
    const statusText = statusBadge.querySelector('.status-text');
    
    if (isOpen) {
        statusBadge.classList.add('open');
        statusBadge.classList.remove('closed');
        statusText.textContent = '🟢 Ouvert maintenant';
    } else {
        statusBadge.classList.add('closed');
        statusBadge.classList.remove('open');
        statusText.textContent = '🔴 Fermé actuellement';
    }
}

// Mettre à jour toutes les minutes
updateStatusBadge();
setInterval(updateStatusBadge, 60000);

/* ===================================
   BOUTON RETOUR EN HAUT
   =================================== */

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ===================================
   BANNIÈRE COOKIES RGPD (BELGIQUE)
   =================================== */

function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const cookieBanner = document.getElementById('cookieBanner');
    
    if (!consent) {
        cookieBanner.classList.add('show');
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookieBanner').classList.remove('show');
    
    // Ici vous pouvez activer Google Analytics ou autres cookies
    console.log('Cookies acceptés - Activation des analytics...');
    // Example: gtag('config', 'GA_MEASUREMENT_ID');
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookieBanner').classList.remove('show');
    console.log('Cookies refusés - Mode minimal');
}

// Vérifier au chargement
checkCookieConsent();

/* ===================================
   ALERTE CONGÉS/FERMETURES
   =================================== */

function closeAlert() {
    const alertBanner = document.getElementById('alertBanner');
    alertBanner.style.display = 'none';
    sessionStorage.setItem('alertClosed', 'true');
}

// Afficher l'alerte si elle n'a pas été fermée dans cette session
// ET si vous voulez l'activer (décommentez la ligne suivante)
 if (!sessionStorage.getItem('alertClosed')) {
     document.getElementById('alertBanner').style.display = 'block';
 }

/* ===================================
   ANIMATIONS AU SCROLL AMÉLIORÉES
   =================================== */

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer tous les éléments à animer
document.querySelectorAll('.presentation-card, .equipe-card, .testimonial-card, .horaires-wrapper, .faq-container').forEach((el) => {
    el.classList.add('scroll-animate');
    scrollObserver.observe(el);
});

/* ===================================
   GESTION DU FORMULAIRE DE CONTACT
   =================================== */

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les éléments
        const btnText = contactForm.querySelector('.btn-text');
        const btnLoading = contactForm.querySelector('.btn-loading');
        const successMsg = contactForm.querySelector('.form-success');
        const errorMsg = contactForm.querySelector('.form-error');
        const submitBtn = contactForm.querySelector('.btn-submit');
        
        // Afficher le loader
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Récupérer les données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || 'Non fourni',
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Mapper les sujets en français
        const sujets_map = {
            'rendez-vous': 'Demande de rendez-vous',
            'information': 'Demande d\'information',
            'urgence': 'URGENCE',
            'autre': 'Autre demande'
        };
        
        const sujet_texte = sujets_map[formData.subject] || formData.subject;
        
        // Construire le corps de l'email
        const emailBody = `
Bonjour,

Nouveau message depuis le site web :

-----------------------------------
NOM COMPLET : ${formData.name}
EMAIL : ${formData.email}
TÉLÉPHONE : ${formData.phone}
SUJET : ${sujet_texte}
-----------------------------------

MESSAGE :
${formData.message}

-----------------------------------
Envoyé depuis le formulaire de contact
Cabinet Médical Dr. Ghemning
${new Date().toLocaleString('fr-BE')}
        `.trim();
        
        // Créer le lien mailto
        const mailtoLink = `mailto:Ghemning@gmail.com?subject=${encodeURIComponent('Nouveau message: ' + sujet_texte)}&body=${encodeURIComponent(emailBody)}`;
        
        // Ouvrir le client email
        window.location.href = mailtoLink;
        
        // Simuler un petit délai puis afficher le succès
        setTimeout(() => {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Afficher le message de succès
            successMsg.textContent = '✅ Votre client email va s\'ouvrir. Cliquez sur "Envoyer" pour finaliser.';
            successMsg.style.display = 'block';
            errorMsg.style.display = 'none';
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Cacher le message après 8 secondes
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 8000);
        }, 500);
    });
}

/* ===================================
   GESTION DE LA FAQ
   =================================== */

// Récupérer tous les éléments de la FAQ
const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

// Ajouter un écouteur d'événement à chaque question
faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
        // Récupérer l'élément parent (faq-item)
        const faqItem = question.parentElement;
        
        // Vérifier si l'élément est déjà actif
        const isActive = faqItem.classList.contains('active');
        
        // Fermer tous les autres éléments
        faqItems.forEach((item) => {
            item.classList.remove('active');
        });
        
        // Ouvrir le nouvel élément s'il n'était pas actif
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

/* ===================================
   NAVIGATION SMOOTH
   =================================== */

// Récupérer tous les liens de navigation
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        // Le lien utilise déjà href avec # donc scroll-behavior: smooth le gère
        // Mais on peut ajouter une logique supplémentaire si nécessaire
    });
});

/* ===================================
   GESTION DE LA NAVBAR STICKY
   =================================== */

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

/* ===================================
   CONFIGURATION MODIFIABLE
   =================================== */

// Configuration des horaires
const horaireConfig = {
    lundi: { matin: '08:30 - 12:30', apremidi: '13:30 - 17:00' },
    mardi: { matin: '08:30 - 12:30', apremidi: '13:30 - 17:00' },
    mercredi: { matin: '08:30 - 12:30', apremidi: '13:30 - 17:00' },
    jeudi: { matin: '08:30 - 12:30', apremidi: 'Fermé' },
    vendredi: { matin: '08:30 - 12:30', apremidi: '13:30 - 17:00' },
    samedi: { matin: '09:00 - 13:00', apremidi: 'Fermé' },
    dimanche: { matin: 'Fermé', apremidi: 'Fermé' }
};

// Configuration des informations de contact
const contactConfig = {
    adresse: '[Votre adresse]',
    telephone: '[Votre numéro]',
    email: '[Votre email]'
};

// Configuration des informations générales
const generalConfig = {
    nom: 'Cabinet Dr. Ghemning',
    urlProgenda: 'https://DrGhemning.progenda.be',
    description: 'Votre santé est notre priorité'
};

/* ===================================
   FONCTION UTILITAIRE DE MISE À JOUR
   =================================== */

/**
 * Fonction pour mettre à jour les informations de contact
 * Exemple d'utilisation: updateContact('adresse', '123 rue de la Santé, 75000 Paris')
 */
function updateContact(type, value) {
    contactConfig[type] = value;
    
    // Mettre à jour le DOM
    const contactItems = document.querySelectorAll('.info-item div:last-child p');
    const index = Object.keys(contactConfig).indexOf(type);
    
    if (contactItems[index]) {
        contactItems[index].textContent = value;
    }
    
    console.log(`Contact ${type} mis à jour: ${value}`);
}

/**
 * Fonction pour mettre à jour les horaires
 * Exemple d'utilisation: updateHoraire('lundi', { matin: '08:00 - 12:00', apremidi: '14:00 - 18:00' })
 */
function updateHoraire(jour, config) {
    horaireConfig[jour] = config;
    console.log(`Horaires ${jour} mis à jour`, config);
}

/**
 * Fonction pour générer le tableau des horaires
 * Utile si vous voulez régénérer le tableau depuis les données
 */
function regenererTableauHoraires() {
    const tbody = document.querySelector('.horaires-table tbody');
    tbody.innerHTML = '';
    
    Object.entries(horaireConfig).forEach(([jour, horaires]) => {
        const row = document.createElement('tr');
        
        // Ajouter la classe spéciale pour jeudi
        if (jour === 'jeudi') {
            row.classList.add('row-special');
        } else if (jour === 'samedi' || jour === 'dimanche') {
            row.classList.add('row-weekend');
        }
        
        const jourCell = document.createElement('td');
        jourCell.className = 'jour';
        jourCell.textContent = jour.charAt(0).toUpperCase() + jour.slice(1);
        
        const matinCell = document.createElement('td');
        matinCell.textContent = horaires.matin;
        
        const apremidiCell = document.createElement('td');
        apremidiCell.textContent = horaires.apremidi;
        
        // Ajouter la classe 'ferme' si fermé
        if (horaires.apremidi === 'Fermé') {
            apremidiCell.classList.add('ferme');
        }
        if (horaires.matin === 'Fermé') {
            matinCell.classList.add('ferme');
        }
        
        row.appendChild(jourCell);
        row.appendChild(matinCell);
        row.appendChild(apremidiCell);
        
        tbody.appendChild(row);
    });
}

/* ===================================
   EXEMPLE D'UTILISATION (À DÉCOMMENTER)
   =================================== */

// Exemple: Mise à jour des coordonnées de contact
// updateContact('adresse', '123 rue de la Santé, 75000 Paris');
// updateContact('telephone', '+33 1 23 45 67 89');
// updateContact('email', 'contact@cabinet-ghemning.fr');

// Exemple: Modification d'un horaire
// updateHoraire('lundi', { matin: '09:00 - 12:00', apremidi: '14:00 - 17:00' });
// regenererTableauHoraires();

/* ===================================
   VALIDATION ET UTILITAIRES
   =================================== */

/**
 * Fonction pour valider et formater un numéro de téléphone
 */
function formaterTelephone(numero) {
    return numero.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
}

/**
 * Fonction pour vérifier si un jour est ouvert
 */
function isJourOuvert(jour) {
    const horaires = horaireConfig[jour.toLowerCase()];
    return horaires && (horaires.matin !== 'Fermé' || horaires.apremidi !== 'Fermé');
}

/**
 * Fonction pour obtenir le prochain jour d'ouverture
 */
function getProchainjOurOuverture() {
    const jours = Object.keys(horaireConfig);
    const aujourd = new Date().getDay();
    const correspondance = [6, 0, 1, 2, 3, 4, 5]; // Conversion JavaScript day to array index
    
    for (let i = 1; i <= 7; i++) {
        const index = (correspondance[aujourd] + i) % 7;
        const jour = jours[index];
        if (isJourOuvert(jour)) {
            return jour.charAt(0).toUpperCase() + jour.slice(1);
        }
    }
    
    return null;
}

/* ===================================
   LOGGING ET DEBUG
   =================================== */

// Afficher les configurations dans la console
console.log('Configuration du cabinet:');
console.log('- Horaires:', horaireConfig);
console.log('- Contact:', contactConfig);
console.log('- General:', generalConfig);
console.log('\nProchain jour d\'ouverture:', getProchainjOurOuverture());
