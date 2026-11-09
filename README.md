# INSTITUT CERTIFIÉ DE RECOURS CONTENTIEUX ET DE MÉDIATION PROCÉDURALE (ICRCMP)

Plateforme web institutionnelle, juridique, sobre et haut de gamme conçue pour l'**Institut Certifié de Recours Contentieux et de Médiation Procédurale (ICRCMP)**, association régie par la loi du 1er juillet 1901.

---

## 1. Stack Technique Imposée

- **Framework Web :** [Next.js 14](https://nextjs.org/) (Architecture moderne App Router avec Server Components et Client Components isolés)
- **Langage :** [TypeScript](https://www.typescriptlang.org/) (typage strict de bout en bout)
- **Design System :** [Tailwind CSS](https://tailwindcss.com/)
  - **Bleu Nuit Institutionnel :** `#0B1F3A`
  - **Or Satiné Discret :** `#C9A227`
  - **Gris Pierre :** `#F5F5F0`
  - **Typographies :** `Playfair Display` (Titres / Autorité) & `Inter` (Corps / Lisibilité)
- **Moteur de Recherche Annuaire :** [Fuse.js](https://www.fusejs.io/) (recherche floue full-text instantanée multicritères)
- **Formulaires & Schémas :** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) + `@hookform/resolvers`
- **Sécurité & Middleware :**
  - Nonce cryptographique CSP dynamique (`middleware.ts`)
  - Rate Limiting distribué compatible Upstash Redis
  - Honeypot anti-spam sur toutes les routes publiques
  - Upload sécurisé de justificatifs PDF (stockage chiffré non public)
- **Notifications & Transactionnel :** [Resend API](https://resend.com/) pour les accusés de réception
- **Tests Qualité :**
  - Tests unitaires et d'intégration des schémas avec [Vitest](https://vitest.dev/)
  - Tests End-to-End (E2E) des parcours avec [Playwright](https://playwright.dev/)

---

## 2. Respect des Précautions Juridiques & Déontologiques

1. **Non-substitution à un avocat :** Rappel systématique de la loi n° 71-1130 du 31 décembre 1971 sur l'ensemble des pages d'expertises, fiches experts, pied de page et formulaires.
2. **Statut du Label :** Mention obligatoire stipulant que le Label ICRCMP est un *« label privé associatif délivré par l'ICRCMP, association loi 1901, non reconnu par l'État »*.
3. **Annuaire & RGPD :** Consentement explicite, clause de radiation/retrait à tout moment, et protection contre l'aspiration des emails (relais de contact interne chiffré sans adresses en clair).
4. **Zéro promesse de résultat :** Aucune garantie d'issue contentieuse n'est formulée dans le code ou les contenus doctrinaux.

---

## 3. Installation et Lancement

### Prérequis
- Node.js version 18.17+ ou 20+
- npm ou pnpm

### Démarrage local

```bash
# 1. Cloner et entrer dans le dossier
cd imc

# 2. Configurer les variables d'environnement
cp .env.example .env.local

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev
```
L'application est immédiatement disponible sur [http://localhost:3000](http://localhost:3000).

---

## 4. Variables d'Environnement (.env.local)

Renseignez les valeurs requises en prenant modèle sur `.env.example` :

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique du site | `https://icrcmp.fr` |
| `RESEND_API_KEY` | Clé d'API d'envoi d'emails | `re_123456789_...` |
| `EMAIL_FROM` | Expéditeur vérifié | `Institut ICRCMP <noreply@icrcmp.fr>` |
| `UPSTASH_REDIS_REST_URL` | URL de l'instance Upstash Redis | `https://xxxx.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | Token d'authentification Upstash | `AXxxxxxx...` |

---

## 5. Commandes & Scripts npm

- `npm run dev` : Démarre le serveur de développement avec rechargement à chaud.
- `npm run build` : Compile et optimise l'application pour la production.
- `npm run start` : Lance le serveur en mode production.
- `npm run lint` : Exécute l'analyse statique du code (Next.js ESLint).
- `npm run test` : Lance la suite de tests unitaires Vitest (schémas Zod, déontologie, honeypot).
- `npm run test:e2e` : Lance les tests end-to-end Playwright (parcours accueil, recherche annuaire, formulaire multi-étapes).

---

## 6. Déploiement sur Vercel

La structure App Router de Next.js 14 est nativement optimisée pour un déploiement Vercel :

1. Poussez votre code sur votre gestionnaire Git (GitHub / GitLab / Bitbucket).
2. Liez le dépôt sur le dashboard Vercel.
3. Déclarez les variables d'environnement dans les paramètres du projet (`Settings > Environment Variables`).
4. Lancez le build. Les en-têtes de sécurité (CSP, HSTS, X-Frame-Options, Permissions-Policy) sont automatiquement distribués via `middleware.ts`.

---

## 7. Accessibilité (RGAA / WCAG AA)

- Ratios de contraste conformes aux normes AA et AAA (Texte `#1A2332` sur fond `#F5F5F0` > 10:1).
- Navigation intégrale au clavier et lien d'évitement (`.skip-link` vers `#contenu-principal`).
- Gestion des états ARIA sur la recherche annuaire (`aria-live="polite"` pour les résultats dynamiques).
- Formulaires dotés d'attributs `aria-describedby` et `aria-invalid` pour le retour d'erreurs d'accessibilité.
