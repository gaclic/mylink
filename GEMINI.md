# GEMINI.md

This document provides architectural context and development guidelines for the `my-link` project.

## Project Overview

`my-link` is a monorepo-style workspace containing a primary web application located in the `my-profile` directory.

### Core Technologies (in `my-profile`)
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Linter:** [ESLint](https://eslint.org/)

## Directory Structure

- `/my-profile`: The main Next.js application.
  - `/app`: Contains the application routes and components (Next.js App Router).
  - `/public`: Static assets like images and SVG files.
  - `next.config.ts`: Next.js configuration.
  - `tailwind.config.ts`: Tailwind CSS configuration (inferred from `package.json` dependencies).
  - `tsconfig.json`: TypeScript configuration.

## Building and Running

Commands should be executed within the `my-profile` directory.

### Development
To start the development server with Hot Module Replacement (HMR):
```bash
cd my-profile
npm run dev
```

### Production Build
To create an optimized production build:
```bash
cd my-profile
npm run build
```

### Start Production Server
To run the built application:
```bash
cd my-profile
npm run start
```

### Linting
To check for code quality and style issues:
```bash
cd my-profile
npm run lint
```

## Development Conventions

1.  **App Router:** Follow Next.js App Router conventions for routing and data fetching. Place new routes in `my-profile/app/`.
2.  **Tailwind CSS 4:** Utilize Tailwind CSS v4 for styling. Ensure utility classes are used consistently with the project's design language.
3.  **TypeScript:** Maintain strict type safety. Avoid using `any` and ensure all components and functions are properly typed.
4.  **Component Architecture:** Use functional components and React Hooks. Prefer server components for data fetching where applicable.
5.  **ESLint:** Adhere to the rules defined in `my-profile/eslint.config.mjs`.

## Additional Notes
- The root `README.md` is currently empty and can be used for high-level project documentation.
- The project is configured with Geist and Geist Mono fonts.
