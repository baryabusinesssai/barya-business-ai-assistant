const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'store.json');
const FRONTEND_ROOT = path.join(__dirname, '..');
const STORE_VERSION = '1.0.0';

const defaultStore = {
  meta: {
    version: STORE_VERSION,
    lastUpdated: null

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");
const FRONTEND_ROOT = path.join(__dirname, "..");

const defaultStore = {
  meta: {
    appName: "Barya Business AI Assistant",
    version: "1.0.0",
    lastUpdated: new Date().toISOString()
  },
  finance: {
    monthlyIncome: 0,
    expenses: [],
    recurringExpenses: []
  },
  settings: {
    currency: "INR",
    goal: ""
  }
};

app.use(express.json());

function cloneDefaultStore() {
  return JSON.parse(JSON.stringify(defaultStore));
}

function ensureStoreFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultStore, null, 2), "utf8");
  }
}

function sanitizeExpense(item) {
  if (!item || typeof item !== "object") return null;

  return {
    id: typeof item.id === "string" ? item.id : `exp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: typeof item.title === "string" ? item.title.trim() : "",
    category: typeof item.category === "string" ? item.category.trim() : "Other",
    amount: Number(item.amount) || 0,
    date: typeof item.date === "string" ? item.date : ""
  };
}

function sanitizeRecurringExpense(item) {
  if (!item || typeof item !== "object") return null;

  return {
    id: typeof item.id === "string" ? item.id : `rec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: typeof item.title === "string" ? item.title.trim() : "",
    category: typeof item.category === "string" ? item.category.trim() : "Other",
    amount: Number(item.amount) || 0,
    frequency: typeof item.frequency === "string" ? item.frequency : "monthly",
    startDate: typeof item.startDate === "string" ? item.startDate : ""
  };
}

function normalizeStore(parsed) {
  return {
    meta: {
      appName:
        typeof parsed?.meta?.appName === "string"
          ? parsed.meta.appName
          : "Barya Business AI Assistant",
      version:
        typeof parsed?.meta?.version === "string"
          ? parsed.meta.version
          : "1.0.0",
      lastUpdated:
        typeof parsed?.meta?.lastUpdated === "string"
          ? parsed.meta.lastUpdated
          : new Date().toISOString()
    },
    finance: {
      monthlyIncome:
        Number(parsed?.finance?.monthlyIncome ?? parsed?.finance?.income) || 0,
      expenses: Array.isArray(parsed?.finance?.expenses)
        ? parsed.finance.expenses.map(sanitizeExpense).filter(Boolean)
        : [],
      recurringExpenses: Array.isArray(parsed?.finance?.recurringExpenses)
        ? parsed.finance.recurringExpenses
            .map(sanitizeRecurringExpense)
            .filter(Boolean)
        : []
    },
    settings: {
      currency:
        typeof parsed?.settings?.currency === "string"
          ? parsed.settings.currency
          : "INR",
      goal:
        typeof parsed?.settings?.goal === "string"
          ? parsed.settings.goal
          : ""
    }
  };
}

function readStore() {
  ensureStoreFile();

  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      meta: {
        version: typeof parsed?.meta?.version === 'string' ? parsed.meta.version : STORE_VERSION,
        lastUpdated: typeof parsed?.meta?.lastUpdated === 'string' ? parsed.meta.lastUpdated : null
      },
      finance: {
        monthlyIncome: Number(parsed?.finance?.monthlyIncome ?? parsed?.finance?.income) || 0,
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
    return normalizeStore(parsed);
  } catch (error) {
    console.error("Failed to read store.json, resetting file.", error);
    const freshStore = cloneDefaultStore();
    fs.writeFileSync(DATA_FILE, JSON.stringify(freshStore, null, 2), "utf8");
    return freshStore;
  }
}

function writeStore(nextStore) {
  nextStore.meta = {
    version: nextStore?.meta?.version || STORE_VERSION,
    lastUpdated: new Date().toISOString()
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(nextStore, null, 2));
  const safeStore = normalizeStore({
    ...nextStore,
    meta: {
      ...(nextStore.meta || {}),
      lastUpdated: new Date().toISOString()
    }
  });

  const tempFile = `${DATA_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(safeStore, null, 2), "utf8");
  fs.renameSync(tempFile, DATA_FILE);

  return safeStore;
}

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/store", (_req, res) => {
  const store = readStore();
  res.json({
    ...store.finance,
    income: store.finance.monthlyIncome
  });
  res.json(store);
});

app.put("/api/store", (req, res) => {
  try {
    const currentStore = readStore();
    const incoming = req.body || {};

    const nextStore = {
      ...currentStore,
      finance: {
        monthlyIncome:
          Number(incoming?.finance?.monthlyIncome ?? incoming?.finance?.income) ||
          0,
        expenses: Array.isArray(incoming?.finance?.expenses)
          ? incoming.finance.expenses
          : currentStore.finance.expenses,
        recurringExpenses: Array.isArray(incoming?.finance?.recurringExpenses)
          ? incoming.finance.recurringExpenses
          : currentStore.finance.recurringExpenses
      },
      settings: {
        currency:
          typeof incoming?.settings?.currency === "string"
            ? incoming.settings.currency
            : currentStore.settings.currency,
        goal:
          typeof incoming?.settings?.goal === "string"
            ? incoming.settings.goal
            : currentStore.settings.goal
      }
    };

    const savedStore = writeStore(nextStore);
    res.json({ ok: true, store: savedStore });
  } catch (error) {
    console.error("Failed to update store:", error);
    res.status(500).json({ ok: false, error: "Failed to update store" });
  }
});

app.get("/api/state", (_req, res) => {
  const store = readStore();
  const { income, monthlyIncome, expenses, recurringExpenses } = req.body || {};

  store.finance = {
    monthlyIncome: Number(monthlyIncome ?? income) || 0,
    expenses: Array.isArray(expenses) ? expenses : [],
    recurringExpenses: Array.isArray(recurringExpenses) ? recurringExpenses : []
  };
  res.json(store.finance);
});

app.put("/api/state", (req, res) => {
  try {
    const store = readStore();
    const { monthlyIncome, income, expenses, recurringExpenses } = req.body || {};

    store.finance = {
      monthlyIncome: Number(monthlyIncome ?? income) || 0,
      expenses: Array.isArray(expenses)
        ? expenses.map(sanitizeExpense).filter(Boolean)
        : store.finance.expenses,
      recurringExpenses: Array.isArray(recurringExpenses)
        ? recurringExpenses.map(sanitizeRecurringExpense).filter(Boolean)
        : store.finance.recurringExpenses
    };

    const savedStore = writeStore(store);
    res.json({ ok: true, finance: savedStore.finance });
  } catch (error) {
    console.error("Failed to update finance state:", error);
    res.status(500).json({ ok: false, error: "Failed to update finance state" });
  }
});

app.get("/api/settings", (_req, res) => {
  const store = readStore();
  res.json(store.settings);
});

app.put("/api/settings", (req, res) => {
  try {
    const store = readStore();
    const { currency, goal } = req.body || {};

    store.settings = {
      currency: typeof currency === "string" ? currency : store.settings.currency,
      goal: typeof goal === "string" ? goal : store.settings.goal
    };

    const savedStore = writeStore(store);
    res.json({ ok: true, settings: savedStore.settings });
  } catch (error) {
    console.error("Failed to update settings:", error);
    res.status(500).json({ ok: false, error: "Failed to update settings" });
  }
});

app.use(express.static(FRONTEND_ROOT));

app.use((err, _req, res, _next) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({ ok: false, error: "Internal server error" });
});

app.listen(PORT, () => {
  ensureStoreFile();
  console.log(`Barya app running at http://localhost:${PORT}`);
});
