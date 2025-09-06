# 🛒 E-Commerce Project

Une application **e-commerce full-stack** pensée pour la **performance**, la **scalabilité** et une **expérience d’achat fluide**.

---

## 🔗 Démo en ligne

👉 [Voir la démo](https://e-commerce-project-ik5s.vercel.app)

---

## 📝 Description

HexWeb E-Commerce est une application web qui permet aux utilisateurs de parcourir un catalogue de produits, d’ajouter des articles au panier et de finaliser un achat en ligne de façon simple et sécurisée.  

Ce projet illustre :  
- la construction d’un **front-end moderne** avec React et Vite,  
- la mise en place d’une **API backend** robuste (Node/Express),  
- l’intégration d’un **paiement en ligne sécurisé (Stripe)**,  
- et des **bonnes pratiques** de développement (qualité de code, CI/CD, sécurité).  

---

## 🎯 Problèmes rencontrés & Solutions apportées

### 1. Coordination front & back
- ❌ Complexité à maintenir 2 projets séparés.  
- ✅ Mise en place d’un **monorepo** (`front/` + `back/`) avec scripts unifiés → plus simple à maintenir et déployer.  

### 2. Lenteur du développement
- ❌ CRA trop lent, builds longs.  
- ✅ Adoption de **Vite** → HMR instantané, build rapide.  

### 3. Maintenabilité du code
- ❌ Structure dispersée des composants.  
- ✅ Organisation en **modules clairs** : `components/`, `pages/`, `features/`.  

### 4. Gestion du panier & cohérence
- ❌ Risques de désynchronisation panier ↔ serveur.  
- ✅ Panier persistant côté client + synchro serveur + gestion atomique du stock.  

### 5. Paiement sécurisé
- ❌ Gestion complexe des paiements en ligne (SCA/3DS).  
- ✅ Intégration de **Stripe** (Payment Intents + Webhooks) → conformité et fiabilité.  

### 6. Déploiement & fiabilité
- ❌ Déploiements manuels, erreurs fréquentes.  
- ✅ Mise en place de **CI/CD avec Vercel** (front) et [Railway/Render] (back).  

---

## 🛠️ Stack technique

**Frontend**  
- React 18 + Vite  
- React Router  
- Tailwind CSS  
- State management (Context / Zustand)  

**Backend**  
- Node.js + Express  
- Base de données : PostgreSQL (via Prisma)  
- Authentification : JWT  
- Paiement : Stripe  

**Qualité & Outils**  
- ESLint, Prettier  
- GitHub Actions (CI)  
- Jest / Vitest pour les tests  

**Déploiement**  
- Frontend : Vercel  
- Backend : [à compléter → Railway, Render, ou VPS]  

---

## 📂 Structure du projet

E-Commerce-Project/
├─ front/ # App Web (React/Vite)
│ ├─ src/
│ │ ├─ pages/ # Pages principales
│ │ ├─ features/ # Auth, panier, produits
│ │ ├─ components/ # UI réutilisable
│ │ └─ main.jsx
│ └─ ...
└─ back/ # API REST (Node/Express)
├─ src/
│ ├─ routes/ # endpoints API
│ ├─ services/ # logique métier
│ ├─ prisma/ # ORM & DB
│ └─ server.js
└─ ...

---

## ⚙️ Installation

### Prérequis
- Node.js 18+  
- NPM ou Yarn  
- Compte Stripe (clés API)  

### Étapes

```bash
# Clone du projet
git clone https://github.com/kerryl02/E-Commerce-Project.git
cd E-Commerce-Project

# Frontend
cd front
npm install
npm run dev

# Backend (dans un autre terminal)
cd ../back
npm install
npm run dev
