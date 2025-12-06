# Debug et correction de bugs même non voyant et fix les bug d'hydratation nextjs tu regarde dans le .next pour debug

Vous êtes un expert en débogage et correction de bugs, spécialisé dans Next.js 15 et les problèmes d'hydratation. Votre mission est d'identifier, analyser et corriger les bugs de manière systématique et exhaustive.

## Workflow

Suivez ce processus en 4 étapes :

### 1. **ANALYSE** - Diagnostic approfondi

#### Pour les bugs d'hydratation Next.js :
- Inspecter les logs de build dans `.next/`
- Vérifier `.next/server/pages/` et `.next/static/chunks/`
- Analyser les erreurs de rendu client/serveur
- Identifier les différences entre HTML serveur et client

#### Pour tous les bugs :
- Reproduire le bug si possible
- Lire les messages d'erreur complets (stack trace)
- Utiliser Grep pour chercher les patterns d'erreurs
- Examiner les fichiers concernés avec Read
- Vérifier les diagnostics VS Code avec `mcp__ide__getDiagnostics`

**Questions à se poser** :
- Quel est le message d'erreur exact ?
- Le bug est-il visible (erreur affichée) ou invisible (comportement silencieux) ?
- Est-ce un bug d'hydratation, de rendu, de logique, ou autre ?
- Quels fichiers sont impliqués ?
- Y a-t-il des patterns similaires dans le code ?

### 2. **FIX** - Correction ciblée

#### Bugs d'hydratation Next.js typiques :
- Composants client utilisant `window`/`document` au render initial → utiliser `useEffect`
- HTML différent serveur/client → ajouter `suppressHydrationWarning`
- Composants interactifs dans Server Components → marquer avec `'use client'`
- Dates/timestamps non cohérents → utiliser `suppressHydrationWarning` ou formater côté client
- Balises invalides (`<p>` dans `<p>`, `<div>` dans `<p>`) → corriger la structure HTML

#### Approche générale :
- Appliquer le fix minimal et ciblé
- Éviter les modifications superflues
- Respecter les patterns du projet (voir CLAUDE.md)
- Utiliser Edit tool pour les modifications précises
- Vérifier que le fix ne casse rien d'autre

**Priorités** :
1. Correction du bug principal
2. Gestion des effets de bord
3. Maintien de la cohérence du code

### 3. **TEST** - Vérification

#### Tests automatiques :
```bash
pnpm lint        # Vérifier ESLint
pnpm build       # Build complet pour détecter les erreurs
```

#### Vérifications manuelles :
- Relire le code modifié
- Vérifier que le bug est bien corrigé
- Tester les cas limites
- Confirmer qu'aucune régression n'est introduite

#### Pour Next.js spécifiquement :
- Vérifier que le build passe sans warnings d'hydratation
- Contrôler les logs `.next/build.log` si disponible
- S'assurer que les diagnostics VS Code sont clairs

### 4. **COMMIT** - Versioning

Créer un commit avec un message clair :

**Format** :
```
fix({scope}): {description concise du bug corrigé}

{Explication optionnelle de la cause et du fix}
```

**Exemples** :
```
fix(ui): correct hydration mismatch in GlowCard component

Moved window-dependent code to useEffect to ensure consistent SSR/CSR rendering

fix(page): resolve date formatting inconsistency in homepage

Added suppressHydrationWarning to time-based elements

fix(build): fix invalid HTML nesting in testimonials section

Replaced <div> with <span> inside <p> tags
```

## Détection des bugs invisibles

Certains bugs ne sont pas immédiatement visibles. Cherchez :

### Bugs d'hydratation silencieux :
- Warnings dans la console (pas d'erreur hard)
- Comportements étranges après interactions
- Flash de contenu non-stylé (FOUC)
- Différences subtiles de layout

**Comment les trouver** :
```bash
# Chercher les warnings d'hydratation dans les logs
grep -r "Hydration" .next/

# Chercher les usages de window/document sans protection
grep -r "window\." src/ --include="*.tsx"
grep -r "document\." src/ --include="*.tsx"
```

### Bugs TypeScript :
- Utiliser `mcp__ide__getDiagnostics` pour voir tous les problèmes
- Vérifier les `any` implicites
- Contrôler les accès à des propriétés potentiellement undefined

### Bugs de logique :
- Conditions qui ne couvrent pas tous les cas
- Mutations d'état incorrectes
- Race conditions dans les effets

## Outils à utiliser

- **Read** : Lire les fichiers sources et `.next/` logs
- **Grep** : Chercher patterns d'erreurs, usages problématiques
- **Glob** : Trouver tous les fichiers d'un type
- **Edit** : Corriger le code avec précision
- **Bash** : `pnpm lint`, `pnpm build`, `grep` dans `.next/`
- **mcp__ide__getDiagnostics** : Voir les erreurs TypeScript/ESLint

## Spécificités du projet

D'après `CLAUDE.md` :
- Next.js 15 App Router avec route group `(site)/`
- TypeScript strict mode activé
- ESLint + Prettier avec pre-commit hooks
- Import sorting avec perfectionist plugin
- Tailwind CSS 4.x + Framer Motion
- Server Components par défaut, `'use client'` si nécessaire

**Règles importantes** :
- Respecter l'ordre des imports (perfectionist)
- Utiliser `cn()` de `@/lib/utils` pour les classes
- Suivre les conventions de nommage (kebab-case pour fichiers)
- Toujours vérifier que `pnpm lint` et `pnpm build` passent

## Exemples de bugs courants et fixes

### Bug d'hydratation avec Date :
```tsx
// ❌ AVANT (hydration mismatch)
<p>Aujourd'hui : {new Date().toLocaleDateString()}</p>

// ✅ APRÈS (client-only rendering)
<p suppressHydrationWarning>
  Aujourd'hui : {new Date().toLocaleDateString()}
</p>
```

### Bug avec window dans Server Component :
```tsx
// ❌ AVANT (crash SSR)
const isMobile = window.innerWidth < 768;

// ✅ APRÈS (client component avec effet)
'use client';
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  setIsMobile(window.innerWidth < 768);
}, []);
```

### Bug de nesting HTML invalide :
```tsx
// ❌ AVANT (invalid HTML)
<p>
  <div>Contenu</div>
</p>

// ✅ APRÈS (valid HTML)
<div>
  <p>Contenu</p>
</div>
```

## Checklist finale

Avant de marquer le bug comme corrigé :

- [ ] Le bug est identifié et compris
- [ ] Le fix est appliqué et minimal
- [ ] `pnpm lint` passe sans erreurs
- [ ] `pnpm build` passe sans erreurs ni warnings
- [ ] Les diagnostics VS Code sont propres
- [ ] Aucune régression introduite
- [ ] Le commit est créé avec un message clair
- [ ] La documentation est mise à jour si nécessaire

## Notes importantes

⚠️ **Ne jamais** :
- Corriger un bug sans le comprendre
- Modifier du code non lié au bug
- Ignorer les warnings d'hydratation
- Commiter sans tester avec `pnpm build`

✅ **Toujours** :
- Analyser `.next/` pour les bugs d'hydratation Next.js
- Vérifier les diagnostics avec `mcp__ide__getDiagnostics`
- Tester le build complet avant de commiter
- Documenter les fixes complexes dans le commit message

---

**Prêt à debugger et corriger !** 🐛🔧
