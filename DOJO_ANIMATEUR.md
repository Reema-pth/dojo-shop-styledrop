# Guide Animateur — Dojo Claude Code
## eXalt Promptathon · 3h · PO/PM/Chef de projet

> Ce document est réservé aux animateurs. Ne pas partager avec les participants.

---

## Vue d'ensemble

| | |
|---|---|
| **Durée totale** | 2h30 |
| **Participants** | 4 à 12 consultants PO/PM/Chef de projet |
| **Niveau** | Débutant-intermédiaire — aucun prérequis technique |
| **Format** | Individuel ou binômes |
| **Matériel** | Un navigateur + un compte GitHub par participant |

### Objectifs pédagogiques

À la fin du dojo, chaque participant sera capable de :
- Utiliser Claude Code pour explorer et comprendre une codebase sans lire le code
- Produire des livrables PM (user stories, personas, gap analysis) assistés par l'IA
- Prototyper une feature sur une vraie codebase en vibe coding

---

## Timing détaillé

```
09:00 ──── Accueil & setup ──────────────────── 10 min
09:10 ──── Phase 1 · Discovery ──────────────── 30 min
09:40 ──── Débrief collectif Phase 1 ──────────  5 min
09:45 ──── Phase 2 · Documentation ──────────── 30 min
10:15 ──── Pause ─────────────────────────────── 5 min
10:20 ──── Phase 3 · Vibe Coding ─────────────── 45 min
11:05 ──── Pitches (4 min/groupe + 1 min Q&A) ── 20 min
11:25 ──── Clôture & bilan ───────────────────── 5 min
11:30 ──── FIN
```

---

## Setup animateur (J-1)

### Vérifications à faire la veille

- [ ] Le repo `github.com/Clementmoro/dojo-shop-styledrop` est public
- [ ] Créer un Codespace de test et vérifier que la boutique se lance (port 5173)
- [ ] Vérifier que `npm start` lance bien Vite + json-server simultanément
- [ ] Tester le premier prompt Discovery sur le Codespace de test
- [ ] Préparer le lien court (bit.ly ou équivalent) vers le repo GitHub
- [ ] Avoir le GUIDE_PARTICIPANT.md accessible à projeter

### Préparer les comptes

Option A — comptes partagés (recommandé pour les PC entreprise bloqués) :
- Créer N comptes GitHub génériques : `exalt-dojo-01@gmail.com`, etc.
- Créer N comptes claude.ai sur ces mêmes emails
- Distribuer les credentials au début du dojo

Option B — comptes personnels :
- Demander aux participants de créer leur compte GitHub + claude.ai en amont
- Envoyer le guide d'inscription avec la convocation

---

## Phase 0 · Accueil & Setup (15 min)

### Script animateur

```
"Bienvenue au Dojo Claude Code. Dans les 3 prochaines heures, vous allez
jouer le rôle d'un consultant PM qui vient d'arriver sur une nouvelle mission.
Le client : eXalt. Le produit : leur boutique de goodies.
Votre mission : comprendre le produit, produire de la doc, et prototyper
une amélioration — en utilisant Claude Code comme co-équipier technique."
```

### Actions

1. Projeter le GUIDE_PARTICIPANT.md
2. Guider les participants : GitHub → Codespace → claude.ai/code
3. Vérifier que tout le monde voit la boutique dans son navigateur
4. Vérifier que Claude Code est connecté au Codespace

### Points de vigilance

- **Codespace lent au démarrage** : normal, ça prend 2-3 min la première fois
- **"Port 5173 is available"** : si la notif ne s'affiche pas, taper `npm start` dans le terminal
- **claude.ai/code ne voit pas les fichiers** : vérifier que le bon Codespace est sélectionné

> ⏱️ Si le setup dépasse 20 min, passer en binômes pour économiser les Codespaces

---

## Phase 1 · Discovery (30 min)

### Objectif pédagogique
Montrer que Claude Code peut servir d'onboarding technique : lire le code, expliquer l'archi, identifier les frictions — sans que le PM ait à ouvrir un seul fichier.

### Prompt de lancement (à projeter)

```
Bonjour ! Je viens de rejoindre la mission eXalt en tant que consultant PM.
C'est mon premier jour. Peux-tu me présenter le produit sur lequel je vais travailler ?
```

### Prompts de progression (à suggérer si les participants bloquent)

```
Fais-moi visiter le parcours complet d'un client sur cette boutique,
de l'arrivée sur la homepage jusqu'à la confirmation de commande.
Où est-ce qu'un utilisateur pourrait décrocher selon toi ?
```

```
Compare cette boutique à Zara.com ou ASOS.
Qu'est-ce qui manque ? Qu'est-ce qui est bien fait ?
```

```
Quelles données sont disponibles dans cette appli ?
Que pourrait-on tracker pour améliorer le taux de conversion ?
```

### Débrief collectif (5 min)

Commencer par le défi découverte :

> **"Levez la main : qui a trouvé le produit en rupture de stock ?"**

C'est le **eXalt Logo Cap** (catégorie Accessoires, stock = 0). Il n'est pas signalé visuellement sur le site — seul quelqu'un qui a cliqué sur la fiche produit ou demandé à Claude d'analyser les données le trouve.

Ça lance naturellement la discussion :
- "Comment l'avez-vous trouvé ? Quel prompt ?"
- "Un vrai utilisateur l'aurait-il repéré ?"
- "C'est quoi l'impact business d'un produit fantôme dans le catalogue ?"

Puis enchaîner sur les questions classiques :
- "Claude a-t-il dit quelque chose de faux ou d'approximatif ?"
- "En combien de prompts vous avez eu autant d'infos qu'en 1 semaine de mission ?"

**Point pédagogique clé** : Claude lit le code mais ne l'exécute pas — il peut se tromper sur le comportement réel. Toujours vérifier dans la boutique ce qu'il décrit.

---

## Phase 2 · Documentation (30 min)

### Objectif pédagogique
Produire des livrables PM réels avec Claude : user stories, personas, gap analysis. Insister sur l'itération — le premier output n'est jamais le bon.

### Consigne à donner

```
"Dans cette phase, vous allez produire 2 livrables au choix parmi :
- User Journey Map (tableau : étape / action / émotion / friction)
- 10 User Stories (format En tant que / Je veux / Afin de)
- 2 Personas (consultant eXalt + client externe)
- Gap analysis vs standards e-commerce (format MoSCoW)

Utilisez Claude pour générer un premier jet, puis itérez au moins 2 fois."
```

### Exemples de prompts à projeter

```
Génère une carte du parcours utilisateur complet pour la boutique eXalt,
de la découverte du site à la livraison. Format tableau avec : étape,
action utilisateur, émotion probable, point de friction potentiel.
```

```
Reverse-engineer les User Stories existantes à partir du code.
Format : En tant que [persona], je veux [action] afin de [bénéfice].
Donne-moi les 10 User Stories principales de ce produit.
```

### Défi avancé (pour les participants rapides)

```
Tu es le product manager de la boutique eXalt. Prépare un one-pager
de 1 page A4 pour présenter le produit à un nouveau stakeholder.
Inclus : contexte, valeur, utilisateurs cibles, métriques clés à suivre.
```

### Point pédagogique à souligner

"Claude ne remplace pas votre jugement — il accélère le premier jet. Votre valeur ajoutée, c'est de savoir quelles questions poser et comment affiner l'output."

---

## Phase 3 · Vibe Coding (45 min)

### Objectif pédagogique
Faire vivre l'expérience du vibe coding : décrire une feature en langage naturel, laisser Claude l'implémenter, voir le résultat live dans le navigateur.

### Consigne à donner

```
"Choisissez une feature à prototyper. Décrivez le problème utilisateur
qu'elle résout AVANT de demander à Claude de coder.
Claude doit vous expliquer ce qu'il va faire AVANT de le faire.
Vous avez 45 min pour avoir quelque chose de démontrable."
```

### Idées de features (à projeter)

| Feature | Complexité | Impact visible |
|---------|-----------|----------------|
| Barre de recherche temps réel | ⭐⭐ | Fort |
| Wishlist / favoris | ⭐⭐ | Fort |
| Notes et avis produits | ⭐⭐⭐ | Fort |
| Filtre par prix (slider) | ⭐⭐ | Moyen |
| Sélecteur couleur (pastilles) | ⭐ | Moyen |
| Badge "Stock faible" | ⭐ | Moyen |
| Section "Nouveautés" homepage | ⭐⭐ | Fort |
| Pop-in de bienvenue | ⭐ | Fort |
| Comparateur de produits | ⭐⭐⭐⭐ | Très fort |
| Historique de navigation | ⭐⭐⭐ | Moyen |

### Prompt de lancement à projeter

```
Je veux prototyper [décris ta feature en 1-2 phrases].
Le problème utilisateur que ça résout : [décris le problème].
Avant de coder, dis-moi ce que tu vas faire et comment tu vas le faire.
```

### Gestion du temps

- **T+10 min** : vérifier que tout le monde a démarré, proposer des idées aux indécis
- **T+30 min** : annoncer "15 minutes pour finaliser et préparer la démo"
- **T+45 min** : arrêt du vibe coding, passage aux pitches

### Incidents fréquents

| Problème | Solution |
|----------|----------|
| Claude casse quelque chose | "Reviens à l'état précédent : annule les dernières modifications" |
| La boutique ne se recharge pas | Ctrl+Shift+R dans le navigateur de preview |
| Claude tourne en rond | "Stop. Explique-moi exactement ce que tu as essayé et pourquoi ça n'a pas marché" |
| Feature trop ambitieuse | "Réduis le scope : implémente juste [partie la plus visible]" |

---

## Pitches (30 min)

### Format par groupe (4 min max)

1. **La feature** : en une phrase, ce que vous avez construit
2. **Le problème** : quel utilisateur, quelle friction
3. **La démo** : montrer dans le navigateur (partage d'écran)
4. **Le retour** : ce que vous auriez fait différemment avec plus de temps

### Grille d'évaluation (jury / auto-évaluation)

| Critère | Points | Détail |
|---------|--------|--------|
| Qualité de la Discovery | 20 pts | Insights pertinents, frictions identifiées |
| Livrables Documentation | 35 pts | Clarté, format PM, itération visible |
| Feature prototypée | 30 pts | Fonctionnelle, réponse à un vrai besoin |
| Pitch | 15 pts | Clarté, démo, problème articulé |
| **Bonus** | +10 pts | Feature surprise / insight exceptionnel |
| **Total** | **110 pts** | |

### Questions jury

- "Comment avez-vous formulé vos prompts pour obtenir ce résultat ?"
- "Qu'est-ce que Claude a fait que vous ne vous attendiez pas ?"
- "Si c'était une vraie mission, qu'est-ce qui manque avant de présenter ça au client ?"

---

## Clôture & bilan (10 min)

### Questions de débrief final

- "Qu'est-ce que vous allez réutiliser dès demain sur votre mission ?"
- "Quelle est la limite de Claude Code que vous avez rencontrée ?"
- "Comment voyez-vous l'évolution du rôle de PM avec ces outils ?"

### Wrap-up animateur

```
"Ce que vous venez de faire en 3h — explorer un produit, produire de la doc,
prototyper une feature — c'est ce que vous ferez sur vos missions.
La différence : vous pouvez maintenant le faire 5x plus vite, avec un
partenaire technique disponible 24/7 qui ne juge pas vos questions."
```

---

## Checklist pré-dojo

### J-7
- [ ] Tester le Codespace sur un PC entreprise (VPN, restrictions)
- [ ] Valider que claude.ai/code est accessible depuis le réseau client
- [ ] Préparer les comptes si option A (comptes partagés)

### J-1
- [ ] Vérifier que le repo est public et le Codespace fonctionne
- [ ] Imprimer ou préparer le GUIDE_PARTICIPANT.md (à projeter)
- [ ] Tester la connexion Codespace ↔ Claude Code

### Jour J
- [ ] Arriver 30 min en avance
- [ ] Lancer un Codespace de démonstration sur le PC animateur
- [ ] Avoir les credentials de backup prêts

---

## FAQ incidents

**"Je ne peux pas accéder à GitHub depuis mon PC"**
→ GitHub Codespaces fonctionne dans le navigateur. Si github.com est bloqué, utiliser le hotspot du téléphone ou un PC perso.

**"Claude dit qu'il ne peut pas modifier les fichiers"**
→ Vérifier que le Codespace est bien sélectionné dans l'interface Claude Code (pas juste le chat web).

**"La boutique affiche une page blanche"**
→ Ouvrir le terminal dans le Codespace, taper `npm start`, attendre que les deux serveurs démarrent.

**"Quelqu'un a cassé son Codespace"**
→ Supprimer le Codespace (GitHub → Codespaces → Delete), en recréer un. Ça prend 2 min.

**"Claude Code dit que je n'ai plus de crédits"**
→ Claude.ai free tier : 40 messages/jour. Si dépassé, switcher sur le compte de backup ou continuer en Claude.ai web classique pour les phases 1 et 2.

---

*Guide animateur — Dojo Claude Code eXalt · Promptathon 2025*
*Repo : github.com/Clementmoro/dojo-shop-styledrop*
