# WriteForm

A **free, local-first conversational form platform** — build a form in minutes, share it with a single link, and keep every response in your own browser.

> WriteForm is an independent, educational, non-commercial project built to study the conversational-form pattern. It is **not affiliated with Typeform S.L.** No login system, no pricing, no AI features — and nothing you build here ever leaves your device.

## What it does

- **Builder** (`#/builder`) — create forms from a blank canvas or six curated templates. Seven question types (short/long text, multiple choice, yes/no, star rating, number, validated email), required toggles, reordering, duplication, accent themes, and a **live preview** that renders the respondent experience as you type.
- **Name-first option** — every form can optionally open with “Your name?” so you always know who answered (toggle per form, on by default).
- **Share** — one click copies a link that *carries the entire form definition in the URL*. No backend, no accounts. Also: iframe embed snippet, social share links, and one-click JSON export.
- **Results** (`#/results/:id`) — per-question rollups (star averages with distribution bars, choice bars with percentages, yes/no split, number stats), a raw table of every response, and one-click **CSV export**.
- **My forms** (`#/forms`) — your local workspace with response counts, edit/results/share/delete.
- **Home page** — a complete tour of the application: the platform at a glance, how it works, feature grid, templates, FAQ.

## Tech

React 19 · Vite 8 · Tailwind CSS 4 · lucide-react. No backend, no router library — a tiny hand-rolled hash router (`src/lib/useHashRoute.js`) and a localStorage persistence layer (`src/lib/store.js`).

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## Privacy model

Forms and responses live in `localStorage` only. Share links encode the form *questions* in the URL hash — never responses. The browser that collects a submission stores it locally; clear site data and it’s gone. No cookies, no tracking, no analytics, no servers.
