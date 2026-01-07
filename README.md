# Cabinet Médical Dr. Ghemning - Site Web Professionnel

## 📋 Description

Site web professionnel et moderne pour le Cabinet Médical Dr. Ghemning. 
Conçu avec un design épuré et moderne, spécialement adapté aux cabinets médicaux.

### Fonctionnalités incluses :
✅ Navigation fluide et intuitive
✅ Présentation du cabinet avec cartes informatives
✅ Tableau des horaires modifiable
✅ Section FAQ interactive
✅ Bouton de prise de rendez-vous (intégration Progenda)
✅ Page responsive (mobile, tablette, desktop)
✅ Design moderne et professionnel
✅ Code modulaire et facile à modifier

---

## 🗂️ Structure des fichiers

```
CabinetGhemning/
├── index.html          # Page principale
├── styles.css          # Feuille de style (tous les styles)
├── script.js           # Fichier JavaScript (interactivité)
└── README.md          # Ce fichier
```

---

## 🎨 Personnalisation Facile

### 1️⃣ Modifier les informations de contact

**Dans `index.html`, Section CONTACT (ligne ~220):**

```html
<p>[Votre adresse]</p>
<!-- Remplacez par votre adresse -->

<p>[Votre numéro]</p>
<!-- Remplacez par votre téléphone -->

<p>[Votre email]</p>
<!-- Remplacez par votre email -->
```

### 2️⃣ Modifier le tableau des horaires

**Dans `index.html`, Section HORAIRES (ligne ~125):**

Modifiez directement les heures dans le tableau :

```html
<tr>
    <td class="jour">Lundi</td>
    <td>08:30 - 12:30</td>  <!-- Modifiez ces horaires -->
    <td>13:30 - 17:00</td>  <!-- Modifiez ces horaires -->
</tr>
```

**OU via JavaScript (script.js, ligne ~95):**

```javascript
// Mettre à jour les horaires programmatiquement
updateHoraire('lundi', { 
    matin: '09:00 - 12:00', 
    apremidi: '14:00 - 18:00' 
});
regenererTableauHoraires();
```

### 3️⃣ Modifier la FAQ

**Dans `index.html`, Section FAQ (ligne ~150):**

Ajoutez ou modifiez les questions/réponses :

```html
<div class="faq-item">
    <button class="faq-question">
        <span>Votre question ici</span>
        <span class="faq-icon">+</span>
    </button>
    <div class="faq-answer">
        <p>Votre réponse ici</p>
    </div>
</div>
```

### 4️⃣ Modifier les informations de présentation

**Dans `index.html`, Section PRÉSENTATION (ligne ~70):**

Modifiez les cartes :

```html
<div class="presentation-card">
    <div class="card-icon">👨‍⚕️</div>  <!-- Changez l'emoji -->
    <h3>Nouveau titre</h3>
    <p>Nouvelle description...</p>
</div>
```

### 5️⃣ Modifier l'URL Progenda

**Dans `index.html`, remplacez tous les liens:**

Cherchez et remplacez : `https://DrGhemning.progenda.be` 
par : `https://votreurl.progenda.be`

Ou utilisez Ctrl+H (Find and Replace) dans votre éditeur.

### 6️⃣ Changer les couleurs

**Dans `styles.css`, variables de couleur (ligne ~10-20):**

```css
:root {
    --primary-color: #0066cc;      /* Bleu principal */
    --secondary-color: #00a8e8;    /* Bleu secondaire */
    --accent-color: #ffc107;       /* Couleur accent */
    --dark-bg: #f8f9fa;            /* Fond clair */
    --text-dark: #1a1a1a;          /* Texte foncé */
    --text-light: #666666;         /* Texte clair */
}
```

Changez les codes couleurs hex pour vos couleurs préférées.

---

## 🚀 Utilisation JavaScript Avancée

### Mettre à jour les coordonnées de contact par JavaScript :

```javascript
// Dans script.js ou en console
updateContact('adresse', '123 rue de la Santé, 75000 Paris');
updateContact('telephone', '+33 1 23 45 67 89');
updateContact('email', 'contact@cabinet-ghemning.fr');
```

### Vérifier si un jour est ouvert :

```javascript
isJourOuvert('lundi');           // true ou false
```

### Obtenir le prochain jour d'ouverture :

```javascript
getProchainjOurOuverture();      // Retourne "Lundi", "Mardi", etc.
```

### Formater un numéro de téléphone :

```javascript
formaterTelephone('0123456789');  // Retourne "01 23 45 67 89"
```

---

## 📱 Responsive Design

Le site s'adapte automatiquement à tous les écrans :
- **Desktop** (1200px+) : Design complet
- **Tablette** (768px-1199px) : Ajustements optimisés
- **Mobile** (< 768px) : Interface mobile complète

---

## 🎯 Points clés du design

### Couleurs professionnelles médicales
- Bleu (#0066cc) : Confiance, professionnalisme
- Gradients subtils : Modernité
- Blanc et gris clair : Propreté, clarté

### Typographie
- Police : Segoe UI (système, plus rapide)
- Tailles adaptables via variables CSS
- Hiérarchie visuelle claire

### Interactions
- Hover effects subtils
- Animations fluides (0.3s ease)
- FAQ avec accordéon interactif
- Scroll smooth sur les ancres

---

## 🔧 Installation / Déploiement

1. **Localement** : Ouvrir `index.html` dans un navigateur
2. **Sur un serveur** : Télécharger les 3 fichiers (HTML, CSS, JS)
3. **Hébergement web** : Uploader sur votre serveur FTP

---

## ✨ Conseils pour maintenir la qualité

1. **Garder l'arborescence simple** : Ne pas créer trop de dossiers
2. **Nommer explicitement** : `index.html`, `styles.css`, `script.js`
3. **Commenter les modifications** : Ajouter des commentaires dans le code
4. **Tester responsive** : Ouvrir devtools (F12) → Mode téléphone
5. **Optimiser images** : Compresser les images avant utilisation

---

## 📝 Personnalisations recommandées

À faire avant le lancement :

- [ ] Remplacer `[Votre adresse]` par l'adresse réelle
- [ ] Remplacer `[Votre numéro]` par le téléphone
- [ ] Remplacer `[Votre email]` par l'email
- [ ] Vérifier l'URL Progenda est correcte
- [ ] Adapter les horaires
- [ ] Modifier la FAQ selon vos besoins
- [ ] Changer le logo/nom si nécessaire
- [ ] Vérifier tous les liens

---

## 🐛 Troubleshooting

**Le site ne s'affiche pas bien ?**
- Vérifier que les 3 fichiers sont dans le même dossier
- Forcer le rechargement (Ctrl+Maj+R)
- Vérifier la console navigateur (F12 > Console)

**Les horaires ne se mettent pas à jour ?**
- Vérifier la syntaxe du tableau HTML
- Vérifier que vous éditez bien le bon jour
- Recharger la page (Ctrl+R)

**Les couleurs ne changent pas ?**
- Forcer le rechargement du cache (Ctrl+Maj+R)
- Vérifier que vous avez bien modifié `styles.css`
- Vérifier les codes hexadécimaux

---

## 📞 Support

Pour toute modification avancée, consultez les commentaires dans chaque fichier.

**Auteur** : Site créé comme template professionnel
**Date** : 2026
**License** : Libre d'utilisation

---

Bonne chance avec votre site ! 🎉
