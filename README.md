# barya-business-ai-assistant

A beginner-friendly MVP for **Barya Business AI Assistant**: a simple responsive finance tracker built with plain HTML, CSS, JavaScript, and a lightweight Node.js backend.


## Important runtime note

The page users actually see is rendered by **`index.html` + `app.js`**.

`BaryaLandingPage.jsx` is currently an unmounted React draft and is **not imported or executed** by the running app.
If edits to `BaryaLandingPage.jsx` appear ignored, edit `index.html` (landing markup) and `app.js` (behavior/state) instead.

Legacy duplicate frontend files (`script.js` and `styles.css`) were removed because they were not linked from `index.html` and were not part of the live GitHub Pages runtime.

## Backend choice (for this MVP)

This project now uses **Node.js + Express + a JSON file datastore** (`backend/data/store.json`).

Why this is beginner-friendly:
- very small setup
- no database server to install
- easy to inspect and reset data
- can later be upgraded to SQLite/PostgreSQL without changing the frontend design

## What is stored in the backend

The backend stores these core data blocks:
- `finance.income` (monthly income)
- `finance.expenses` (expense list)
- `finance.recurringExpenses` (recurring expense list)
- `settings.currency` and `settings.goal` (user settings)

API endpoints:
- `GET /api/health`
- `GET /api/state`
- `PUT /api/state`
- `GET /api/settings`
- `PUT /api/settings`

## What remains on the frontend

- The existing UI structure and styling are defined in `index.html` (inline CSS + markup).
- Form handling, dashboard rendering, tab behavior, and beginner guidance logic are currently implemented in `app.js`.
- A fallback is included: if the backend is unavailable, the app still works with browser `localStorage`.

## Files

- `index.html` – live page layout, tabs, forms, and inline styling
- `app.js` – live frontend logic + localStorage-first app behavior
- `BaryaLandingPage.jsx` – non-live React draft (not mounted)

## Run locally

```bash
npm install
npm run start
```

Open: http://localhost:3000
