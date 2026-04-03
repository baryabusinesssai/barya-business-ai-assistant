const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'store.json');
const FRONTEND_ROOT = path.join(__dirname, '..');

const defaultStore = {
  finance: {
    income: 0,
    expenses: [],
    recurringExpenses: []
  },
  settings: {
    currency: 'INR',
    goal: ''
  }
};

app.use(express.json());

function ensureStoreFile() {
  if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultStore, null, 2));
  }
}

function readStore() {
  ensureStoreFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    return {
      finance: {
        income: Number(parsed?.finance?.income) || 0,
        expenses: Array.isArray(parsed?.finance?.expenses) ? parsed.finance.expenses : [],
        recurringExpenses: Array.isArray(parsed?.finance?.recurringExpenses)
          ? parsed.finance.recurringExpenses
          : []
      },
      settings: {
        currency: typeof parsed?.settings?.currency === 'string' ? parsed.settings.currency : 'INR',
        goal: typeof parsed?.settings?.goal === 'string' ? parsed.settings.goal : ''
      }
    };
  } catch {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultStore, null, 2));
    return structuredClone(defaultStore);
  }
}

function writeStore(nextStore) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(nextStore, null, 2));
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/state', (_req, res) => {
  const store = readStore();
  res.json(store.finance);
});

app.put('/api/state', (req, res) => {
  const store = readStore();
  const { income, expenses, recurringExpenses } = req.body || {};

  store.finance = {
    income: Number(income) || 0,
    expenses: Array.isArray(expenses) ? expenses : [],
    recurringExpenses: Array.isArray(recurringExpenses) ? recurringExpenses : []
  };

  writeStore(store);
  res.json({ ok: true });
});

app.get('/api/settings', (_req, res) => {
  const store = readStore();
  res.json(store.settings);
});

app.put('/api/settings', (req, res) => {
  const store = readStore();
  const { currency, goal } = req.body || {};

  store.settings = {
    currency: typeof currency === 'string' ? currency : 'INR',
    goal: typeof goal === 'string' ? goal : ''
  };

  writeStore(store);
  res.json({ ok: true });
});

app.use(express.static(FRONTEND_ROOT));

app.listen(PORT, () => {
  console.log(`Barya app running at http://localhost:${PORT}`);
});
