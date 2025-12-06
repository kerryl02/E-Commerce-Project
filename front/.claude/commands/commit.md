# Commit automatique intelligent avec message généré

Vous êtes un expert Git qui crée des commits professionnels avec des messages clairs et conventionnels.

## Mission

Analyser les changements git actuels et créer un commit avec un message généré automatiquement suivant les **Conventional Commits** et les standards du projet.

## Workflow

### 1. ANALYSE - Comprendre les changements

Exécutez en parallèle :
```bash
git status --porcelain
git diff --cached
git diff
```

Identifiez :
- Fichiers modifiés/ajoutés/supprimés
- Type de changement : fix, feat, refactor, docs, style, test, chore
- Scope du changement : ui, api, db, config, deps, etc.
- Impact du changement

### 2. STAGING - Préparer les fichiers

Si des fichiers ne sont pas stagés, les ajouter :
```bash
git add {fichiers pertinents}
```

**Règles de sécurité** :
- ✅ Stager les fichiers liés au changement principal
- ❌ Ne JAMAIS stager `.env`, secrets, credentials
- ⚠️ Avertir si détection de `console.log`, `debugger`, TODO

### 3. GÉNÉRATION - Créer le message

**Format Conventional Commits** :
```
{type}({scope}): {description courte}

{corps optionnel avec détails}

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types** :
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `refactor` : Refactoring sans changement fonctionnel
- `perf` : Amélioration de performance
- `style` : Formatage, linting
- `docs` : Documentation
- `test` : Tests
- `build` : Build, dépendances
- `ci` : CI/CD
- `chore` : Maintenance, config

**Scopes** (adapter au projet) :
- `ui` : Interface utilisateur, composants
- `api` : API, endpoints, routes
- `seo` : Métadonnées, JSON-LD, sitemap
- `content` : Services, portfolio, blog
- `analytics` : Tracking, GA, Plausible
- `form` : Formulaires, validation
- `config` : Configuration
- `deps` : Dépendances

**Règles du message** :
- Description courte ≤ 72 caractères
- Impératif présent ("add" pas "added")
- Minuscule après le `:`
- Pas de point final
- Corps explicatif si changement complexe
- Lister les changements avec bullets `-` si multiple

### 4. COMMIT - Créer le commit

```bash
git commit -m "$(cat <<'EOF'
{type}({scope}): {description}

{corps optionnel}

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### 5. VÉRIFICATION - Confirmer

```bash
git log -1 --stat
git status
```

Afficher :
- Hash du commit
- Message complet
- Fichiers inclus
- Stats (+/- lignes)

## Détection Intelligente du Type

**Analyser les fichiers** pour déterminer le type :

| Fichiers | Type probable | Scope |
|----------|---------------|-------|
| `*.tsx`, `*.jsx`, `*.css` | `fix` ou `feat` | `ui` |
| `**/api/**`, routes | `fix` ou `feat` | `api` |
| `package.json`, lockfile | `build` | `deps` |
| `*.md` (docs) | `docs` | - |
| `.github/workflows/**` | `ci` | - |
| `*.test.*`, `*.spec.*` | `test` | - |
| `.eslintrc`, config | `chore` | `config` |
| Formatage only | `style` | - |

**Heuristiques** :
- Nouveau fichier → probablement `feat`
- Modification existant → probablement `fix` ou `refactor`
- Suppression only → `chore` ou `refactor`
- Tests only → `test`

## Exemples

### Fix UI
```
fix(ui): correct hydration mismatch in GlowCard component

- Made useCursorGlow generic to accept HTML element types
- Simplified ref assignment
- Removed unsafe type casting

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Nouvelle fonctionnalité
```
feat(blog): add related articles section

Display 3 related articles at bottom based on shared tags

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Refactoring
```
refactor(api): extract validation to middleware

- Created validation middleware for user routes
- Reduced code duplication
- Improved error messages

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Dependencies
```
build(deps): upgrade Next.js to 15.4.6

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Sécurité

**Bloquer si détecté** :
- Fichiers `.env*`
- API keys, tokens, secrets
- Credentials, passwords
- `node_modules/`, `.next/`, `dist/`

**Avertir** :
- `console.log()`, `debugger`
- TODO/FIXME comments
- Fichiers > 1MB
- Binaires non attendus

## Notes

- Le pre-commit hook du projet lance automatiquement `lint-staged`
- ESLint et Prettier s'exécutent avant le commit
- Message conforme au style du projet (voir git log)
- Toujours vérifier avec `git status` après commit

---

Prêt à créer des commits professionnels automatiquement ! 🚀
