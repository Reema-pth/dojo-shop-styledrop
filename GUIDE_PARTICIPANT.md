# 🚀 Guide Participant — Dojo Claude Code
## eXalt Promptathon · 3h · Niveau débutant

> **Pas besoin de coder.** Tout ce dont tu as besoin, c'est d'un navigateur et d'un compte GitHub.

---

## Étape 1 — Crée ton compte GitHub (si ce n'est pas déjà fait)

1. Va sur **[github.com](https://github.com)**
2. Clique sur **"Sign up"**
3. Crée un compte avec ton email (perso ou pro)
4. Vérifie ton email et connecte-toi

> ⏱️ **2 minutes max** — si tu as déjà un compte GitHub, passe directement à l'étape 2.

---

## Étape 2 — Ouvre la boutique eXalt

Va directement sur : **[dojo-shop-styledrop.vercel.app](https://dojo-shop-styledrop.vercel.app)**

✅ **Tu vois la boutique ? Tu es prêt pour les phases 1 et 2.**

> Le code source est disponible ici : **[github.com/Clementmoro/dojo-shop-styledrop](https://github.com/Clementmoro/dojo-shop-styledrop)**

---

## Étape 3 — Connecte-toi à Claude Code

1. Va sur **[claude.ai/code](https://claude.ai/code)** dans un nouvel onglet
2. Connecte-toi avec ton compte Anthropic (ou crée-en un gratuitement)
3. Dans l'interface Claude Code, connecte-toi au repo GitHub :
   - Clique sur **"Connect to GitHub Codespace"**
   - Autorise l'accès à GitHub si demandé
   - Sélectionne le Codespace `dojo-shop-styledrop`

> 💡 **Claude Code voit tout le code du projet.** Il peut lire les fichiers, comprendre l'architecture, et modifier le code en direct.

> ⚠️ **Le Codespace est nécessaire uniquement pour la Phase 3 (Vibe Coding).** Pour les phases 1 et 2, la boutique Vercel suffit — pas besoin de le lancer tout de suite.

---

## Étape 4 — Dis bonjour à Claude

Dans la fenêtre de chat Claude Code, tape :

```
Bonjour ! Je viens de rejoindre la mission eXalt en tant que consultant PM.
C'est mon premier jour. Peux-tu me présenter le produit sur lequel je vais travailler ?
```

Claude va lire le fichier `CLAUDE.md` automatiquement et te briefer comme si tu étais en mission réelle. 🎯

---

## Les 3 phases du dojo

| Phase | Durée | Objectif |
|-------|-------|----------|
| **Phase 1 · Discovery** | 35 min | Explorer le produit, comprendre le code, identifier les frictions |
| **Phase 2 · Documentation** | 40 min | Produire de vrais livrables PM avec Claude |
| **Phase 3 · Vibe Coding** | 55 min | Prototyper une feature de ton choix |

---

## Prompts de démarrage par phase

### 🔍 Phase 1 · Discovery

```
Décris-moi l'architecture de ce projet comme si j'étais un PM non-technique.
Quelles sont les pages principales, les fonctionnalités clés, et comment les données circulent ?
```

```
Fais-moi visiter le parcours complet d'un client sur cette boutique, de l'arrivée
sur la homepage jusqu'à la confirmation de commande. Où est-ce qu'un utilisateur
pourrait décrocher selon toi ?
```

```
Compare cette boutique à ce qu'on trouve sur des sites comme Zara ou ASOS.
Qu'est-ce qui manque ? Qu'est-ce qui est bien fait ?
```

---

### 📋 Phase 2 · Documentation

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

```
Crée 2 personas pour la boutique eXalt goodies : un consultant eXalt régulier
et un client externe découvrant la marque. Format fiche complète avec
nom, âge, contexte, motivations, frustrations.
```

```
Fais une analyse des features manquantes par rapport aux standards
du e-commerce fashion. Priorise-les en MoSCoW et estime l'impact business.
```

---

### 💻 Phase 3 · Vibe Coding

```
Je veux prototyper [décris ta feature en 1-2 phrases].
Le problème utilisateur que ça résout : [décris le problème].
Avant de coder, dis-moi ce que tu vas faire et comment tu vas le faire.
```

**Idées de features à prototyper :**
- 🔍 Barre de recherche en temps réel sur le catalogue
- ❤️ Système de wishlist / favoris
- ⭐ Affichage de notes et avis produits
- 🏷️ Filtre par prix (slider min-max)
- 🎨 Sélecteur de couleur visuel (pastilles colorées)
- 📦 Badge "Stock faible" sur les produits
- 🆕 Section "Nouveautés" sur la homepage
- 💬 Pop-in de bienvenue avec offre de lancement

---

## En cas de problème

| Problème | Solution |
|----------|----------|
| La boutique ne se lance pas | Ouvre le terminal dans le Codespace et tape `npm start` |
| Le Codespace est lent | Attends 30 secondes, il chauffe au démarrage |
| Claude ne voit pas les fichiers | Vérifie que tu es bien connecté au bon Codespace |
| Une page affiche une erreur | Demande à Claude : "J'ai cette erreur : [colle l'erreur]" |
| Je suis bloqué sur une phase | Demande à Claude : "Je suis bloqué, guide-moi étape par étape" |

---

## Tips pour bien bosser avec Claude Code

✅ **Sois précis** : "Ajoute un filtre par prix entre 0 et 100€ sur la page /shop" vaut mieux que "améliore les filtres"

✅ **Demande des explications** : "Explique-moi ce que tu viens de faire en termes non-techniques"

✅ **Valide avant de merger** : "Qu'est-ce que ça change dans le comportement de l'appli ?"

✅ **Itère** : "C'est bien mais je voudrais que le filtre se reset quand je change de catégorie"

❌ **Évite les prompts vagues** : "Rends le site plus joli" → Claude ne sait pas quoi faire

❌ **N'accepte pas aveuglément** : Lis le résumé que Claude donne avant chaque modif

---

## À la fin du dojo — ton pitch (5 min)

Prépare-toi à présenter :
1. **La feature que tu as prototypée** (1 phrase)
2. **Le problème utilisateur qu'elle résout** (1 phrase)
3. **Une démo live** de la feature dans le navigateur
4. **Ce que tu aurais fait différemment** avec plus de temps

---

*Dojo organisé par eXalt — Promptathon 2025*
*Répo : [github.com/Clementmoro/dojo-shop-styledrop](https://github.com/Clementmoro/dojo-shop-styledrop)*
