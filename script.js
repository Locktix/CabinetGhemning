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
   EFFETS AU SCROLL
   =================================== */

// Observer pour les animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de présentation
const presentationCards = document.querySelectorAll('.presentation-card');
presentationCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
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
