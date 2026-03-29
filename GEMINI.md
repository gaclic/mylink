# MyLink Project Context

This file describes the structure, tech stack, user scenarios, and UI/UX principles of the MyLink project to help Gemini CLI understand and support development effectively.

## 1. Project Overview
MyLink is a free multi-link profile service that allows users to manage and share various scattered links (SNS, blogs, portfolios, etc.) on a single page.

- **Goal**: Intuitive link management and personal brand page building.
- **Core Values**: Seamless Inline Edit UX, automatic favicon integration, modern UI.

## 2. Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Library**: React 19
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Backend**: Firebase (Auth, Firestore)
- **Icons**: Lucide React, Google Favicon API
- **Tooling**: TypeScript, ESLint, Prettier

## 3. Core Features & UI/UX Principles
### 3.1. Inline Edit
- **Seamless Transition**: No separate edit pages or modals. Clicking text (username, bio, link title/URL) immediately switches to an `<input>` or `<textarea>` for editing.
- **Enhanced Edit Awareness (Pencil Icon)**: In the Owner Admin view, a pencil (`✎`) icon is always displayed next to editable elements to increase intuitiveness. (Hidden in Visitor view)

### 3.2. Link & Data Management
- **Automatic Favicon**: When a URL is entered, the official favicon is extracted and displayed in real-time via Google Favicon API (`https://s2.googleusercontent.com/s2/favicons?domain=...`).
- **Delete & Undo**: Links are not deleted immediately; instead, an "Undo" snackbar is shown at the bottom of the screen to prevent accidental deletion.
- **Data Structure**: Uses `users` collection and `links` subcollection for optimized data loading.

### 3.3. Viewer & Navigation
- **Public View**: Mobile-centric simple layout. Provides link opening in new tabs and share functionality.
- **Admin View**: Features a sticky navigation bar with [Copy My Link], [View My Page], and [Logout] buttons.

## 4. User Flow
1. **Landing Page**: Google Social Login integration.
2. **Admin Editor**: Manage profile info (`displayName`, `username`, bio) and link lists.
3. **Public Page**: Accessible via `mylink.com/{displayName}` for link browsing.

## 5. Development Guidelines & Commands
### 5.1. Key Commands
- `npm run dev`: Start development server (Turbopack)
- `npm run build`: Production build
- `npm run lint`: Linting check
- `npm run format`: Prettier formatting (`**/*.{ts,tsx}`)
- `npm run typecheck`: TypeScript type check

### 5.2. Coding Conventions
- **Components**: Built on `shadcn/ui`. All UI components are located in `@components/ui`.
- **Responsive Design**: Supports desktop, tablet, and mobile, with a mobile-first approach for the Public View.
- **State Management**: Actively utilizes Firebase real-time updates for immediate data reflection.

## 6. Project Structure
- `@app/`: Next.js App Router pages and layouts.
- `@components/`: UI components (`@components/ui/`, `@components/theme-provider.tsx`).
- `@docs/`: Planning documents (`@docs/PRD.md`, `@docs/user_scenario.md`, `@docs/wireframe.md`).
- `@lib/`: Common utilities (`@lib/utils.ts`).
- `@public/`: Static assets and icons.

---
This guide is based on planning documents in `@docs/`. Implementation must prioritize the requirements defined in those files.
