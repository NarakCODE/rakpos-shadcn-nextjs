# Repository Guidelines

## Project Structure & Module Organization

This is a single Next.js App Router application. Routes, layouts, API handlers, and server actions live in `src/app/`; route groups such as `(pages)` and `(blank)` select the page shell. Build page content in `src/views/`, reuse primitives from `src/components/ui/`, and place shared layout pieces in `src/components/layout/`. Hooks, types, utilities, configuration, and demo data live in their matching `src/` directories. Use `@/` for imports from `src/`. Static images are in `public/images/`; local SVG components and data are in `src/assets/`.

## Build, Test, and Development Commands

- `pnpm install --frozen-lockfile` installs the dependencies recorded in `pnpm-lock.yaml`.
- `pnpm dev` starts the local Next.js development server.
- `pnpm build` creates a production build; `pnpm start` serves that build.
- `pnpm lint` checks source with ESLint; `pnpm check-types` runs TypeScript without emitting files.
- `pnpm format` applies Prettier to JavaScript and TypeScript files under `src/`.

## Coding Style & Naming Conventions

Use TypeScript and TSX for new application code. Prettier uses two spaces, single quotes, no semicolons, and a 120-character line width; its Tailwind plugin sorts utility classes. Follow nearby naming patterns: `page.tsx` for routes, `use-*.ts` for hooks, kebab-case filenames for UI primitives and feature modules, and PascalCase for React component names. Keep shared component aliases in `components.json` and design tokens in `src/app/globals.css`. ESLint is configured in `eslint.config.mjs`; `@shadcn/lint` is registered there, but no design-system rules are enabled. Run `pnpm lint` after code changes.

## Testing Guidelines

There is currently no test runner, test script, test suite, or coverage target. Use `pnpm lint`, `pnpm check-types`, and `pnpm build` for the existing validation gates. If adding automated tests, name them `*.test.ts` or `*.test.tsx` beside the code they cover, and add a documented test command with the chosen runner.

## Commit & Pull Request Guidelines

Recent commits use short subjects such as `feat: ...` and `refactor(sidebar): ...`; follow that pattern with an imperative summary and an optional scope. Pull requests should describe the change, link a relevant issue when one exists, list the checks run, and include before/after screenshots for visible UI changes.
