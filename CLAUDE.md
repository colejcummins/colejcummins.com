# colejcummins.com

Personal portfolio website styled as an interactive terminal/console interface. Users navigate a virtual filesystem of projects using shell commands (ls, cd, pwd, whoami, etc.).

## Tech Stack

- **Framework:** Next.js 14 (App Router, `src/` directory)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with dark/light mode (`darkMode: 'selector'`)
- **State:** MobX (AppStore) + Zustand (WindowStore)
- **Animation:** Motion (framer-motion successor)
- **Package Manager:** yarn (lockfile is yarn.lock)

## Project Structure

```
src/
  app/          # Next.js App Router pages and layout
  components/   # React components (Console, Card, Background, etc.)
  lib/          # Core logic — virtual filesystem (fs.ts) and command parser (command.tsx)
  store/        # MobX stores (AppStore, AnimationStore, WindowStore)
public/         # Static assets (resume PDFs, etc.)
```

## Key Concepts

- `src/lib/fs.ts` — defines a virtual filesystem tree as a flat Record keyed by ID. Each node has parent/children references, optional links to GitHub repos, and download paths.
- `src/lib/command.tsx` — command registry. Each command has optional `render`, `autocomplete`, `validate`, and `execute` methods.
- `src/store/AppStore.ts` — MobX store holding console history, current filesystem node, and theme state.

## Commands

```
yarn dev       # Start dev server
yarn build     # Production build
yarn lint       # ESLint
yarn format    # Prettier (all files)
```

## Code Style

- Prettier: single quotes, no trailing commas, 120 print width, 2-space indent
- ESLint: next/core-web-vitals + eslint:recommended + react + prettier plugin
- Commits: conventional commits enforced by commitlint (@commitlint/config-conventional)
- Pre-commit: lint-staged runs eslint --fix and prettier --write on staged files

## Git Hooks (Husky)

- `pre-commit` — runs lint-staged
- `commit-msg` — runs commitlint
