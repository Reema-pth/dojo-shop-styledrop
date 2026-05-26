# 📋 User Story — Quiz d'entrée "Révèle ton style eXalt"

> **Spec dev complète — prête à implémentation**
> Version 1.0 · Date : 2026-05-26 · Auteur : PM eXalt

---

## 🎯 1. Contexte & objectif business

### Le constat
La boutique eXalt est en ligne depuis 6 mois. Le taux de conversion est bas et certains produits sont sous-exposés (ex. **eXalt Conference Bag**, score de popularité le plus faible à 7/100). Aucun outil d'analytics n'est branché, et l'expérience est aujourd'hui **identique pour tous les visiteurs**, quels que soient leur profil et leur intention.

### Le besoin
Créer un **parcours sur-mesure** qui qualifie le visiteur dès son arrivée, lui propose une sélection adaptée, et fait naître chez lui un sentiment **d'exclusivité** ("cette sélection a été pensée pour moi").

### Le bénéfice attendu
- ↗️ Engagement dès l'arrivée sur la homepage
- ↗️ Mise en avant de produits sous-exposés (Conference Bag, Pen Set, Laptop Sleeve…)
- ↗️ Collecte de données qualitatives sur les visiteurs (futurs leviers PM)
- ↗️ Conversion attendue : visiteur → inscrit → acheteur

---

## 🎭 2. Personas concernés

| Persona | Description | Émotion cible |
|---|---|---|
| 🧑‍💼 **Le consultant fier** | 28-40 ans, CDI cabinet, 2-5 ans d'XP. Porte la marque en mission client. | Fierté + sentiment d'appartenance à un cercle restreint |
| 🎁 **L'acheteur cadeau** | Manager / RH, achète pour son équipe (onboarding, fin de mission). | Générosité + sentiment d'offrir quelque chose de rare |
| 👀 **Le chasseur de drops** | 25-35 ans, early adopter, engagé sur les réseaux. | Exclusivité + sentiment d'avoir été plus rapide que les autres |

**Fil rouge émotionnel transversal : l'EXCLUSIVITÉ.**

---

## ✍️ 3. La User Story

> **En tant que** visiteur arrivant sur la homepage eXalt,
> **je veux** répondre à un quiz court et engageant qui analyse mon profil,
> **afin de** découvrir 3 produits sélectionnés sur mesure pour moi, et ressentir que la boutique me parle vraiment.

---

## ✅ 4. Critères d'acceptation détaillés

### 4.1 Déclenchement du popup

| # | Critère | Détail |
|---|---|---|
| AC-1 | Le popup s'affiche **5 secondes** après le chargement complet de la homepage `/` | Pas sur les autres pages (catalogue, fiche produit, etc.) |
| AC-2 | Le popup s'affiche en **overlay** au-dessus du contenu | Fond semi-transparent noir (60% opacité), popup centré |
| AC-3 | Le popup peut être **fermé** via une croix en haut à droite | Fermer = équivalent à "Skip" |
| AC-4 | Le popup ne s'affiche **pas** si l'utilisateur a déjà complété le quiz dans les 3 derniers mois | Cf. règles de persistance (section 6) |

---

### 4.2 Écran d'introduction (étape "intro")

**Contenu affiché :**
- Sur-titre : *"Et si on faisait connaissance ?"* (en small caps, marron secondaire)
- Titre principal : **"Révèle ton style eXalt"**
- Sous-titre : *"3 questions, 30 secondes, une sélection rien que pour toi."*
- Bouton primaire : **"Commencer"** (marron eXalt, pleine largeur)
- Lien secondaire : **"Passer"** (gris, souligné)

---

### 4.3 Les 3 questions

| # | Question | Réponses possibles | Type | ID interne |
|---|---|---|---|---|
| Q1 | *"Tu es plutôt..."* | Consultant en mission · Manager d'équipe · Client / Partenaire eXalt · Curieux de la marque | Choix unique | `consultant` · `manager` · `client` · `curieux` |
| Q2 | *"Tu cherches une pièce pour..."* | Le quotidien au bureau · Une mission client · Un événement / cadeau · Te démarquer | Choix unique | `quotidien` · `mission` · `cadeau` · `demarquer` |
| Q3 | *"Ton style ?"* | Classique & discret · Décontracté · Affirmé / Statement | Choix unique | `classique` · `decontracte` · `affirme` |

**Comportement :**
- Les questions s'affichent **une par une**
- Une **barre de progression** en haut indique *"Question X sur 3"* + pourcentage
- Un bouton **"← Question précédente"** apparaît dès la Q2
- Cliquer sur une réponse fait passer **automatiquement** à la question suivante
- À la Q3, cliquer sur une réponse lance le calcul des recommandations et affiche l'écran résultat

---

### 4.4 Tableau de mapping — règles fixes

> **Règle de fallback** : si la combinaison de réponses ne correspond à aucune règle, afficher les 3 produits aux scores de popularité les plus élevés (Sticker Pack · eXalt x Flow Hoodie · Pink Cap Drop #1).

| Q1 | Q2 | Q3 | Produits recommandés (IDs) | Produits (noms) |
|---|---|---|---|---|
| `consultant` | `mission` | `classique` | `18`, `3`, `9` | Conference Bag · Polo Navy · Notebook A5 |
| `consultant` | `mission` | `decontracte` | `1`, `6`, `12` | Hoodie Navy · Tote Bag · Sticker Pack |
| `consultant` | `quotidien` | `classique` | `3`, `10`, `8` | Polo Navy · Pen Set · Laptop Sleeve |
| `consultant` | `quotidien` | `decontracte` | `2`, `6`, `9` | T-Shirt Classic · Tote Bag · Notebook A5 |
| `manager` | `cadeau` | `classique` | `7`, `15`, `3` | Premium Backpack · Gold Notebook · Polo Navy |
| `manager` | `cadeau` | `affirme` | `13`, `14`, `16` | eXalt x Flow Hoodie · Pink Cap · Heritage T-Shirt |
| `curieux` | `demarquer` | `affirme` | `13`, `14`, `16` | eXalt x Flow Hoodie · Pink Cap Drop #1 · Heritage T-Shirt |
| `curieux` | `demarquer` | `classique` | `15`, `18`, `8` | Gold Notebook · Conference Bag · Laptop Sleeve |
| *Autres combinaisons* | — | — | Top 3 popularité | Sticker Pack · eXalt x Flow Hoodie · Pink Cap |

---

### 4.5 Écran de résultat (étape "results")

**Contenu affiché :**
- Sur-titre : *"Ta sélection eXalt"*
- Titre : **"3 pièces faites pour toi"**
- 3 cartes produit (grille 3 colonnes desktop, 1 colonne mobile) :
  - Image produit (aspect ratio 1:1)
  - Nom du produit
  - Prix en €
  - Clic = redirection vers `/product/:id`
- Bouton primaire : **"Voir ma sélection"** → redirige vers `/search?recommended=:id1,:id2,:id3`

**Pour les utilisateurs anonymes (non connectés) uniquement :**
- Bloc en bas du résultat :
  - Texte : *"Reçois ta sélection par mail pour la retrouver plus tard 👇"*
  - Champ email (input type="email")
  - Bouton **"Envoyer"**
  - Après soumission : message de confirmation *"✨ Merci ! Ta sélection arrive dans ta boîte mail."*

---

### 4.6 Flux Skip — étape "skipConfirm"

Si l'utilisateur clique sur **"Passer"** (ou ferme le popup avant la fin) :

**Écran de confirmation affiché :**
- Titre : *"Une dernière chose..."*
- Question : *"Veux-tu revoir ce quiz lors de tes prochaines visites ?"*
- Choix 1 : **"Oui, à chaque visite"** (bouton marron)
- Choix 2 : **"Non, me reproposer dans 3 mois"** (bouton bordé)

→ Le choix est stocké en **localStorage** (clé `exalt-quiz`).

---

## 💾 5. Modèle de données local (localStorage)

**Clé :** `exalt-quiz`
**Valeur :** objet JSON sérialisé

```typescript
type StoredQuizState = {
  skippedAt?: number;          // timestamp ms de la dernière fermeture
  remindEveryVisit?: boolean;  // si true, le popup revient à chaque visite
  completedAt?: number;        // timestamp ms de la dernière complétion
  results?: string[];          // IDs des 3 produits recommandés
};
```

---

## 🔄 6. Règles de réaffichage du popup

| Cas | Comportement |
|---|---|
| **Première visite** | Popup affiché après 5s |
| **Quiz complété** (any state) | Popup **non affiché** pendant 3 mois |
| **Quiz complété il y a +3 mois** | Popup réaffiché pour mise à jour du profil |
| **Skip + "Oui revoir chaque visite"** | Popup affiché à **chaque visite** après 5s |
| **Skip + "Non, dans 3 mois"** | Popup **non affiché** pendant 3 mois, puis réaffiché |
| **Utilisateur connecté avec profil sauvegardé** | Popup non affiché ; profil rechargé automatiquement |

---

## 👤 7. Persistance par type d'utilisateur

| Cas | Stockage |
|---|---|
| **Utilisateur connecté** | Profil quiz + résultats sauvegardés côté serveur (à brancher sur API user) · Mise à jour automatique tous les 3 mois |
| **Utilisateur anonyme** | Résultats stockés en **localStorage uniquement** · CTA "Crée un compte pour sauvegarder ta sélection" |
| **Anonyme → s'inscrit après le quiz** | Le profil quiz du localStorage est **rattaché au nouveau compte** lors de l'inscription |

---

## 📧 8. Emails automatiques (US technique séparée)

> ⚠️ **Hors scope de cette US v1** — à traiter en US technique distincte (intégration avec un outil emailing type Brevo, Mailchimp, etc.)

| Déclencheur | Destinataire | Contenu |
|---|---|---|
| Quiz complété par utilisateur **inscrit** | Email du compte | Récap des 3 produits recommandés + liens directs vers fiches produit |
| Quiz complété par utilisateur **anonyme** (email renseigné) | Email saisi en fin de quiz | Même contenu + CTA "Crée un compte pour sauvegarder ta sélection" |
| Inscrit qui n'a **jamais fait** le quiz | Email du compte | Invitation à faire le quiz + lien direct vers `/` avec popup forcé |

**Tous les emails contiennent :**
- Logo eXalt
- Nom du quiz : *"Révèle ton style eXalt"*
- 3 visuels produits avec nom + prix + lien
- Bouton primaire : *"Accéder à ma sélection"*
- Footer eXalt + lien désinscription

---

## 🎨 9. Design & UX

| Élément | Spécification |
|---|---|
| Couleur primaire | `secondaryBrown` (variable Tailwind existante) |
| Police | Inter (déjà chargée) |
| Overlay | `bg-black/60` |
| Container popup | `max-w-2xl`, `max-h-[90vh]`, scroll si débordement |
| Mobile responsive | Grille produit en 1 colonne sous `sm` |
| Animation | Transition douce sur les boutons (`transition`) · Barre de progression animée (`transition-all duration-300`) |
| Accessibilité | Bouton de fermeture avec `aria-label="Fermer"` · Navigation clavier sur les options |

---

## 🚧 10. Hors scope (v1)

- ❌ Configuration du mapping par le métier via une interface admin → **US future**
- ❌ Intégration de l'outil emailing (Brevo, Mailchimp…) → **US technique séparée**
- ❌ A/B testing de différentes versions de questions → **post-v1**
- ❌ Recommandations dynamiques basées sur IA / ML → **v2**
- ❌ Analytics / tracking des taux de complétion → **US analytics séparée** (à faire en parallèle)

---

## 🔗 11. Dépendances

- ✅ Système d'authentification existant (`localStorage.getItem("user")`)
- ✅ API produits existante (`GET /api/products`)
- ✅ Composant `Button` existant pour cohérence visuelle
- ✅ React Router pour la redirection vers `/product/:id` et `/search`
- ⚠️ **À brancher :** outil emailing (cf. US technique séparée)
- ⚠️ **À brancher :** sauvegarde profil quiz côté serveur (cf. US backend séparée)

---

## 📊 12. KPIs à suivre (instrumentation à prévoir)

| KPI | Description | Cible v1 |
|---|---|---|
| Taux d'affichage du popup | % visiteurs homepage ayant vu le popup | > 90% |
| Taux de démarrage | % visiteurs cliquant "Commencer" | > 35% |
| Taux de complétion | % visiteurs allant jusqu'à Q3 | > 70% (des démarreurs) |
| Taux de clic sur "Voir ma sélection" | % de complétions menant à un clic produit | > 50% |
| Taux d'inscription post-quiz (anonymes) | % d'emails renseignés en fin de quiz | > 20% |
| Conversion produit recommandé | % des produits recommandés ajoutés au panier | > 5% |

---

## ✅ 13. Definition of Done

- [ ] Le popup s'affiche correctement après 5s sur la homepage
- [ ] Les 3 questions fonctionnent (avant/arrière, validation, progression)
- [ ] Les règles de mapping sont implémentées et testées sur les 9 combinaisons
- [ ] Le fallback (top 3 popularité) fonctionne pour les combinaisons non couvertes
- [ ] Le flux Skip + "voulez-vous revoir" fonctionne et persiste en localStorage
- [ ] La persistance fonctionne (pas de réaffichage si déjà complété < 3 mois)
- [ ] Le champ email s'affiche uniquement pour les utilisateurs anonymes
- [ ] Le design est responsive (mobile + desktop)
- [ ] Les redirections fonctionnent (fiche produit + page catalogue filtré)
- [ ] Tests manuels OK sur Chrome, Safari, Firefox
- [ ] Code revu et mergé sur `main`

---

## 📎 Annexes

- 📄 Sitemap globale du site : `docs/sitemap-management.md`
- 💻 Code source du composant : `src/components/QuizPopup.tsx`
- 🌳 Branche de dev : `claude/epic-goldberg-QM0ZW`
- 🔗 PR : https://github.com/Reema-pth/dojo-shop-styledrop/pull/1
