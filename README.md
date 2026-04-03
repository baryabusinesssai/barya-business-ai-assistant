# barya-business-ai-assistant

A beginner-friendly MVP for **Barya Business AI Assistant**: a simple responsive finance tracker built with plain HTML, CSS, JavaScript, and a lightweight Node.js backend.

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

- The existing UI structure and styling (`index.html`, `styles.css`) remain unchanged.
- Form handling, dashboard rendering, tab behavior, and beginner guidance logic remain in `script.js`.
- A fallback is included: if the backend is unavailable, the app still works with browser `localStorage`.

## Files

- `index.html` – page layout, tabs, forms
- `styles.css` – responsive styling
- `script.js` – frontend logic + backend/localStorage fallback
- `backend/server.js` – Express API + static file server
- `backend/data/store.json` – simple backend datastore
- `package.json` – Node scripts and dependencies

## Run locally

```bash
npm install
npm run start
```

Open: http://localhost:3000
