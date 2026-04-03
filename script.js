const STORAGE_KEY = "barya-finance-data-v1";
const SETTINGS_STORAGE_KEY = "barya-user-settings-v1";

const CURRENCIES = {
  INR: { locale: "en-IN", code: "INR" },
  USD: { locale: "en-US", code: "USD" },
  EUR: { locale: "de-DE", code: "EUR" }
};

const DEFAULT_GOAL = "Save Money";

const GOAL_CONTENT = {
  "Save Money": {
    summary: "Focus on spending less, tracking expenses, and building savings step by step.",
    tips: [
      "Track every expense daily, even small purchases.",
      "Set a spending limit for one category each week.",
      "Move a fixed amount to savings as soon as income arrives."
    ],
    dailyTips: [
      "Track one expense immediately after spending.",
      "Skip one non-essential purchase today.",
      "Check your wallet and note where money went."
    ],
    weeklyChallenges: [
      "Stay under your spending limit in one category this week.",
      "Review last week expenses and cut one unnecessary cost.",
      "Save the amount of one skipped purchase."
    ],
    monthlyGoals: [
      "Save a fixed amount this month and keep it untouched.",
      "Reduce total monthly expenses by at least 5%.",
      "Build your emergency savings with one extra contribution."
    ]
  },
  "Start a Business": {
    summary: "Focus on validating ideas, understanding customers, and taking small low-risk business steps.",
    tips: [
      "Write your idea in one sentence and who it helps.",
      "Talk to at least 3 potential customers this week.",
      "Start with a low-cost version before spending heavily."
    ],
    dailyTips: [
      "Write one problem your business can solve.",
      "Spend 20 minutes researching your target customer.",
      "Note one competitor and what they do well."
    ],
    weeklyChallenges: [
      "Share your idea with 3 people and collect feedback.",
      "Create a one-page offer for your service or product.",
      "Plan startup costs and remove one non-essential expense."
    ],
    monthlyGoals: [
      "Get your first paying customer this month.",
      "Test one marketing channel and track results.",
      "Create a small starter budget and follow it."
    ]
  },
  "Learn Finance": {
    summary: "Focus on understanding basic money concepts, budgeting, and practical financial habits.",
    tips: [
      "Learn one finance term each day.",
      "Review income and expenses once a week to see patterns.",
      "Use simple rules like needs, wants, and savings."
    ],
    dailyTips: [
      "Read one short lesson about a finance basic.",
      "Classify one expense as need or want.",
      "Check today's total spending before the day ends."
    ],
    weeklyChallenges: [
      "Create a weekly budget and compare actual spending.",
      "Calculate your savings rate for this week.",
      "List three areas where you can reduce spending."
    ],
    monthlyGoals: [
      "Finish one beginner finance learning plan this month.",
      "Track all spending categories for the full month.",
      "Set one realistic savings target and review progress."
    ]
  }
};

const IDEA_LIBRARY = {
  lowInvestment: [
    "Start a home-based snack business",
    "Offer mobile phone photography services for local shops",
    "Start a local errand and delivery service"
  ],
  onlineEarning: ["Sell products on Instagram", "Freelancing in graphic design", "Online tutoring"],
  smallBusiness: [
    "Start a custom gift packaging business",
    "Open a neighborhood tiffin service",
    "Begin a home-based tailoring service"
  ]
};

const state = { income: 0, expenses: [], recurringExpenses: [] };
const settings = { currency: "INR", goal: "" };
let selectedCurrency = "INR";
let selectedGoal = "";

const els = {
  tabButtons: document.querySelectorAll(".tab-button"),
  tabPanels: document.querySelectorAll(".tab-panel"),

  incomeForm: document.getElementById("incomeForm"),
  expenseForm: document.getElementById("expenseForm"),
  recurringExpenseForm: document.getElementById("recurringExpenseForm"),
  goalForm: document.getElementById("goalForm"),
  assistantForm: document.getElementById("assistantForm"),
  businessAdvisorForm: document.getElementById("businessAdvisorForm"),
  ideaGeneratorForm: document.getElementById("ideaGeneratorForm"),
  settingsForm: document.getElementById("settingsForm"),

  incomeAmount: document.getElementById("incomeAmount"),
  expenseAmount: document.getElementById("expenseAmount"),
  expenseCategory: document.getElementById("expenseCategory"),
  expenseDate: document.getElementById("expenseDate"),
  recurringExpenseName: document.getElementById("recurringExpenseName"),
  recurringExpenseAmount: document.getElementById("recurringExpenseAmount"),
  recurringExpenseFrequency: document.getElementById("recurringExpenseFrequency"),
  goalSelect: document.getElementById("goalSelect"),
  currencySelect: document.getElementById("currencySelect"),
  settingsGoalSelect: document.getElementById("settingsGoalSelect"),
  changeGoalButton: document.getElementById("changeGoalButton"),
  resetDataButton: document.getElementById("resetDataButton"),
  settingsStatusText: document.getElementById("settingsStatusText"),

  assistantQuestion: document.getElementById("assistantQuestion"),
  assistantResponse: document.getElementById("assistantResponse"),
  businessIdeaInput: document.getElementById("businessIdeaInput"),
  businessAdvisorResponse: document.getElementById("businessAdvisorResponse"),
  ideaCategorySelect: document.getElementById("ideaCategorySelect"),
  generatedIdeaText: document.getElementById("generatedIdeaText"),

  totalIncome: document.getElementById("totalIncome"),
  totalExpenses: document.getElementById("totalExpenses"),
  netSavings: document.getElementById("netSavings"),
  monthlyExpensesValue: document.getElementById("monthlyExpensesValue"),
  topCategoryValue: document.getElementById("topCategoryValue"),
  savingsStatusValue: document.getElementById("savingsStatusValue"),

  insightTopCategory: document.getElementById("insightTopCategory"),
  insightMonthlyExpense: document.getElementById("insightMonthlyExpense"),
  insightSavingsStatus: document.getElementById("insightSavingsStatus"),
  insightSuggestion: document.getElementById("insightSuggestion"),

  recentExpenses: document.getElementById("recentExpenses"),
  recurringExpensesList: document.getElementById("recurringExpensesList"),

  selectedGoalDisplay: document.getElementById("selectedGoalDisplay"),
  goalTipsList: document.getElementById("goalTipsList"),
  goalGuidanceSummary: document.getElementById("goalGuidanceSummary"),

  dailyTipText: document.getElementById("dailyTipText"),
  weeklyChallengeText: document.getElementById("weeklyChallengeText"),
  monthlyGoalText: document.getElementById("monthlyGoalText")
};

const api = {
  async isAvailable() {
    try {
      const response = await fetch("/api/health");
      return response.ok;
    } catch {
      return false;
    }
  },
  async loadState() {
    const response = await fetch("/api/state");
    if (!response.ok) throw new Error("Could not load state from backend");
    return response.json();
  },
  async saveState(payload) {
    const response = await fetch("/api/state", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Could not save state to backend");
  },
  async loadSettings() {
    const response = await fetch("/api/settings");
    if (!response.ok) throw new Error("Could not load settings from backend");
    return response.json();
  },
  async saveSettings(payload) {
    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Could not save settings to backend");
  }
};

let useBackend = false;

function safeParseJSON(raw, fallback) {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function todayYMD() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

function formatCurrency(value) {
  const currencyConfig = CURRENCIES[settings.currency] || CURRENCIES.INR;
function parseYMDToDate(ymd) {
  const [year, month, day] = (ymd || "").split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function toStartOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysBetween(start, end) {
  return Math.floor((toStartOfDay(end) - toStartOfDay(start)) / 86400000);
}

function getMonthDay(year, month, day) {
  const max = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(day, max));
}

function formatCurrency(value) {
  const currencyConfig = CURRENCIES[selectedCurrency] || CURRENCIES.INR;
  return new Intl.NumberFormat(currencyConfig.locale, {
    style: "currency",
    currency: currencyConfig.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value) || 0);
}

function updateStatus(text) {
  if (els.settingsStatusText) els.settingsStatusText.textContent = text;
}

function saveStateLocal() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadStateLocal() {
  const parsed = safeParseJSON(localStorage.getItem(STORAGE_KEY), {});
function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  const parsed = safeParseJSON(raw, null);
  if (!parsed || typeof parsed !== "object") return;

  state.income = Number(parsed.income) || 0;
  state.expenses = Array.isArray(parsed.expenses) ? parsed.expenses : [];
  state.recurringExpenses = Array.isArray(parsed.recurringExpenses) ? parsed.recurringExpenses : [];
}

function saveSettingsLocal() {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

function loadSettingsLocal() {
  const parsed = safeParseJSON(localStorage.getItem(SETTINGS_STORAGE_KEY), {});
  if (parsed.currency && CURRENCIES[parsed.currency]) settings.currency = parsed.currency;
  if (parsed.goal && GOAL_CONTENT[parsed.goal]) settings.goal = parsed.goal;
}

async function persistState() {
  if (!useBackend) {
    saveStateLocal();
    return;
  }

  await api.saveState(state);
}
function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
  const parsed = raw ? safeParseJSON(raw, {}) : {};

  const rawCurrency = parsed.currency || localStorage.getItem(LEGACY_CURRENCY_STORAGE_KEY);
  if (rawCurrency && CURRENCIES[rawCurrency]) selectedCurrency = rawCurrency;

  const rawGoal = parsed.goal || localStorage.getItem(LEGACY_GOAL_STORAGE_KEY);
  if (rawGoal && GOAL_CONTENT[rawGoal]) selectedGoal = rawGoal;
}

function getGoalContent() {
  return GOAL_CONTENT[selectedGoal] || GOAL_CONTENT[DEFAULT_GOAL];
}

function countRecurringOccurrencesInRange(recurringExpense, rangeStart, rangeEnd) {
  const startDate = parseYMDToDate(recurringExpense.startDate);
  if (!startDate) return 0;

  const start = toStartOfDay(startDate);
  const from = toStartOfDay(rangeStart);
  const to = toStartOfDay(rangeEnd);
  if (start > to) return 0;

  if (recurringExpense.frequency === "daily") {
    const effectiveStart = start > from ? start : from;
    return daysBetween(effectiveStart, to) + 1;
  }

  if (recurringExpense.frequency === "weekly") {
    let first = start;
    if (first < from) {
      const diff = daysBetween(first, from);
      first = new Date(first.getFullYear(), first.getMonth(), first.getDate() + Math.ceil(diff / 7) * 7);
    }
    if (first > to) return 0;
    return Math.floor(daysBetween(first, to) / 7) + 1;
  }

  if (recurringExpense.frequency === "monthly") {
    let y = start.getFullYear();
    let m = start.getMonth();
    const day = start.getDate();
    let occurrence = getMonthDay(y, m, day);
    let count = 0;


    const makeDate = (year, month, dayOfMonth) => {
      const maxDay = new Date(year, month + 1, 0).getDate();
      return new Date(year, month, Math.min(dayOfMonth, maxDay));
    };

    let occurrence = makeDate(y, m, day);
    while (occurrence < from) {
      m += 1;
      if (m > 11) {
        m = 0;
        y += 1;
      }
      occurrence = getMonthDay(y, m, day);
      occurrence = makeDate(y, m, day);
    }

    while (occurrence <= to) {
      if (occurrence >= start) count += 1;
      m += 1;
      if (m > 11) {
        m = 0;
        y += 1;
      }
      occurrence = getMonthDay(y, m, day);
      occurrence = makeDate(y, m, day);
    }

async function persistSettings() {
  if (!useBackend) {
    saveSettingsLocal();
    return;
  }

  await api.saveSettings(settings);
}

function getCurrentMonthExpenses() {
  const now = new Date();
  const oneTime = state.expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const today = toStartOfDay(now);

  const oneTimeExpenses = state.expenses.filter((expense) => {
    const date = parseYMDToDate(expense.date) || new Date(expense.date);
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  });

  const recurringAsExpenses = [];
  state.recurringExpenses.forEach((item) => {
    const occurrenceCount = countRecurringOccurrencesInRange(item, monthStart, today);
    for (let i = 0; i < occurrenceCount; i += 1) {
      recurringAsExpenses.push({
        amount: Number(item.amount) || 0,
        category: item.name || "Recurring",
        date: todayYMD()
      });
    }
  });
  const oneTime = state.expenses.filter((expense) => {
    const d = parseYMDToDate(expense.date) || new Date(expense.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });

  const recurring = state.recurringExpenses.map((expense) => ({
    amount: Number(expense.amount) || 0,
    category: expense.name,
    date: todayYMD()
  }));

  return [...oneTime, ...recurring];
}

function getRecurringTotalToDate() {
  const today = toStartOfDay(new Date());
  return state.recurringExpenses.reduce((sum, expense) => {
    const startDate = parseYMDToDate(expense.startDate) || today;
    const count = countRecurringOccurrencesInRange(expense, startDate, today);
    return sum + count * (Number(expense.amount) || 0);
  }, 0);
}

function getTopCategory(expenses) {
  if (!expenses.length) return "No expenses yet";

  const totals = {};

  expenses.forEach((expense) => {
    const key = (expense.category || "Other").trim() || "Other";
    totals[key] = (totals[key] || 0) + (Number(expense.amount) || 0);
  });
  const [category, amount] = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  return `${category} (${formatCurrency(amount)})`;

  const [name, amount] = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  return `${name} (${formatCurrency(amount)})`;
}

function getSavingsStatus(income, expenseTotal) {
  if (income <= 0) return "Add monthly income to calculate savings status";

  const diff = income - monthlyExpenseTotal;
  const diff = income - expenseTotal;
  if (diff > 0) return `✅ On track: You are saving ${formatCurrency(diff)} this month.`;
  if (diff === 0) return "⚖️ Break-even: Income and expenses are equal this month.";
  return `⚠️ Overspending: You are over budget by ${formatCurrency(Math.abs(diff))}.`;
}

function setDefaultDate() {
  if (els.expenseDate) {
    els.expenseDate.value = todayYMD();
  }
}

function updateStatus(text) {
  if (els.settingsStatusText) {
    els.settingsStatusText.textContent = text;
  }
}

function setSelectedGoal(goal) {
  if (!GOAL_CONTENT[goal]) return;
  selectedGoal = goal;
  saveSettings();
  renderDashboard();
}

function renderGoalUI() {
  const hasGoal = Boolean(settings.goal);
  const content = GOAL_CONTENT[settings.goal || DEFAULT_GOAL];

  if (els.selectedGoalDisplay) {
    els.selectedGoalDisplay.textContent = hasGoal ? `Selected Goal: ${settings.goal}` : "Selected Goal: Not selected yet";
  }

  if (els.goalForm) els.goalForm.classList.toggle("hidden", hasGoal);
  if (els.changeGoalButton) els.changeGoalButton.classList.toggle("hidden", !hasGoal);
  if (els.goalSelect) els.goalSelect.value = hasGoal ? settings.goal : DEFAULT_GOAL;
  if (els.settingsGoalSelect) els.settingsGoalSelect.value = hasGoal ? settings.goal : DEFAULT_GOAL;
  if (els.changeGoalButton) {
    els.changeGoalButton.classList.toggle("hidden", !hasGoal);
  }

  if (els.goalSelect) {
    els.goalSelect.value = hasGoal ? selectedGoal : DEFAULT_GOAL;
  }

  if (els.settingsGoalSelect) {
    els.settingsGoalSelect.value = hasGoal ? selectedGoal : DEFAULT_GOAL;
  }

  if (els.goalGuidanceSummary) {
    els.goalGuidanceSummary.textContent = hasGoal
      ? content.summary
      : "Select a goal in Beginner Mode to see focused guidance.";
  }

  if (els.goalTipsList) {
    els.goalTipsList.innerHTML = "";
    if (hasGoal) {
      content.tips.forEach((tip) => {
        const li = document.createElement("li");
        li.textContent = tip;
        els.goalTipsList.appendChild(li);
      });
    } else {
      els.goalTipsList.innerHTML = '<li class="empty-state">No goal selected yet.</li>';
    }
  }

  const now = new Date();
  if (els.dailyTipText) els.dailyTipText.textContent = content.dailyTips[Math.floor(Date.now() / 86400000) % content.dailyTips.length];
  if (els.weeklyChallengeText) {
    const startYear = new Date(now.getFullYear(), 0, 1);
    const weekIndex = Math.floor((now - startYear) / (7 * 86400000)) % content.weeklyChallenges.length;
    els.weeklyChallengeText.textContent = content.weeklyChallenges[weekIndex];
  const dayIndex = Math.floor(Date.now() / 86400000) % content.dailyTips.length;
  if (els.dailyTipText) {
    const dayIndex = Math.floor(Date.now() / 86400000) % content.dailyTips.length;
    const dayIdx = Math.floor(toStartOfDay(new Date()).getTime() / 86400000) % content.dailyTips.length;
    els.dailyTipText.textContent = content.dailyTips[dayIdx];
    els.dailyTipText.textContent = content.dailyTips[dayIndex];
  }

  if (els.weeklyChallengeText) {
    const now = new Date();
    const startYear = new Date(now.getFullYear(), 0, 1);
    const weekIndex = Math.floor(daysBetween(startYear, now) / 7) % content.weeklyChallenges.length;
    els.weeklyChallengeText.textContent = content.weeklyChallenges[weekIndex];
  }

  if (els.monthlyGoalText) {
    els.monthlyGoalText.textContent = content.monthlyGoals[new Date().getMonth() % content.monthlyGoals.length];
  }
}

function renderInsights(monthlyExpenses, monthlyExpenseTotal) {
  const topCategoryText = getTopCategory(monthlyExpenses);

  if (els.insightTopCategory) {
    els.insightTopCategory.textContent = monthlyExpenses.length
      ? `Your highest spending category is ${topCategoryText.split(" (")[0]}.`
      : "Your highest spending category is not available yet.";
  }

  if (els.insightMonthlyExpense) {
    els.insightMonthlyExpense.textContent = `Your total monthly expenses are ${formatCurrency(monthlyExpenseTotal)}.`;
  }

  if (els.insightSavingsStatus) {
    els.insightSavingsStatus.textContent = getSavingsStatus(state.income, monthlyExpenseTotal);
  }

  if (els.insightSuggestion) {
    els.insightSuggestion.textContent = monthlyExpenses.length
      ? `You can save more by reviewing and reducing ${topCategoryText.split(" (")[0]} expenses.`
      : "Add expenses to get a saving suggestion.";
  }
}

function renderRecentExpenses() {
  if (!els.recentExpenses) return;
  els.recentExpenses.innerHTML = "";

  if (!state.expenses.length) {
    els.recentExpenses.innerHTML = '<li class="empty-state">No expenses added yet.</li>';
    return;
    const weekIdx = Math.floor(daysBetween(startYear, now) / 7) % content.weeklyChallenges.length;
    els.weeklyChallengeText.textContent = content.weeklyChallenges[weekIdx];
  }

  if (els.monthlyGoalText) {
    const monthIdx = new Date().getMonth() % content.monthlyGoals.length;
    els.monthlyGoalText.textContent = content.monthlyGoals[monthIdx];
    const weekIndex = Math.floor(daysBetween(startYear, now) / 7) % content.weeklyChallenges.length;
    els.weeklyChallengeText.textContent = content.weeklyChallenges[weekIndex];
  }

  if (els.monthlyGoalText) {
    els.monthlyGoalText.textContent = content.monthlyGoals[new Date().getMonth() % content.monthlyGoals.length];
  }
  if (els.monthlyGoalText) els.monthlyGoalText.textContent = content.monthlyGoals[now.getMonth() % content.monthlyGoals.length];
}

function renderDashboard() {
  const oneTimeExpenseTotal = state.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const recurringExpenseTotal = state.recurringExpenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const totalExpenses = oneTimeExpenseTotal + recurringExpenseTotal;
  const netSavings = state.income - totalExpenses;

  if (els.totalIncome) els.totalIncome.textContent = formatCurrency(state.income);
  if (els.totalExpenses) els.totalExpenses.textContent = formatCurrency(totalExpenses);
  if (els.netSavings) els.netSavings.textContent = formatCurrency(netSavings);

  const monthlyExpenses = getCurrentMonthExpenses();
  const monthlyExpenseTotal = monthlyExpenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);

function renderDashboard() {
  const oneTimeExpenseTotal = state.expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const recurringExpenseTotal = getRecurringTotalToDate();
  const totalExpense = oneTimeExpenseTotal + recurringExpenseTotal;
  const net = state.income - totalExpense;

  if (els.totalIncome) els.totalIncome.textContent = formatCurrency(state.income);
  if (els.totalExpenses) els.totalExpenses.textContent = formatCurrency(totalExpense);

  if (els.netSavings) {
    els.netSavings.textContent = formatCurrency(net);
    els.netSavings.classList.remove("positive", "negative");
    if (net > 0) els.netSavings.classList.add("positive");
    if (net < 0) els.netSavings.classList.add("negative");
  if (els.monthlyExpensesValue) els.monthlyExpensesValue.textContent = formatCurrency(monthlyExpenseTotal);
  if (els.topCategoryValue) els.topCategoryValue.textContent = getTopCategory(monthlyExpenses);
  if (els.savingsStatusValue) els.savingsStatusValue.textContent = getSavingsStatus(state.income, monthlyExpenseTotal);

  if (els.insightTopCategory) {
    els.insightTopCategory.textContent = monthlyExpenses.length
      ? `Your highest spending category is ${getTopCategory(monthlyExpenses).split(" (")[0]}.`
      : "Your highest spending category is not available yet.";
  }
  if (els.insightMonthlyExpense) {
    els.insightMonthlyExpense.textContent = `Your total monthly expenses are ${formatCurrency(monthlyExpenseTotal)}.`;
  }
  if (els.insightSavingsStatus) {
    els.insightSavingsStatus.textContent = getSavingsStatus(state.income, monthlyExpenseTotal);
  }
  if (els.insightSuggestion) {
    els.insightSuggestion.textContent = monthlyExpenses.length
      ? `You can save more by reviewing and reducing ${getTopCategory(monthlyExpenses).split(" (")[0]} expenses.`
      : "Add expenses to get a saving suggestion.";
  }

  if (els.recentExpenses) {
    els.recentExpenses.innerHTML = "";
    if (!state.expenses.length) {
      els.recentExpenses.innerHTML = '<li class="empty-state">No expenses added yet.</li>';
    } else {
      [...state.expenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .forEach((expense) => {
          const li = document.createElement("li");
          li.textContent = `${new Date(expense.date).toLocaleDateString()} • ${expense.category} • ${formatCurrency(expense.amount)}`;
          els.recentExpenses.appendChild(li);
        });
    }
  }

  if (els.recurringExpensesList) {
    els.recurringExpensesList.innerHTML = "";
    if (!state.recurringExpenses.length) {
      els.recurringExpensesList.innerHTML = '<li class="empty-state">No recurring expenses added yet.</li>';
    } else {
      state.recurringExpenses.forEach((expense) => {
        const li = document.createElement("li");
        li.textContent = `${expense.name} • ${formatCurrency(expense.amount)} • ${expense.frequency}`;
        els.recurringExpensesList.appendChild(li);
      });
    }
  }

  renderGoalUI();
}

function getAssistantResponse(question) {
  const q = question.toLowerCase();
  if (q.includes("save") || q.includes("budget")) return "💡 Track expenses daily and set one fixed monthly savings amount.";
  if (q.includes("expense") || q.includes("cost")) return "📉 Review top categories weekly and reduce one non-essential cost.";
  if (q.includes("business") || q.includes("idea") || q.includes("startup")) return "🚀 Start with one small offer and validate with real customers.";
  return "🤖 Ask about saving, expenses, income growth, or business ideas.";
}

function renderBusinessAdvisorResponse(ideaText) {
  if (!els.businessAdvisorResponse) return;
  if (q.includes("save") || q.includes("budget")) {
    return "💡 Start by tracking all expenses for 7 days, then set one spending limit and auto-save a fixed amount on income day.";
  }
  if (q.includes("expense") || q.includes("cost")) {
    return "📉 Separate fixed and variable costs, cap one variable category, and review weekly for reductions.";
  }
  if (q.includes("business") || q.includes("idea") || q.includes("startup")) {
    return "🚀 Pick one small idea, test with real customers, and validate before making big investments.";
  }
  if (q.includes("income") || q.includes("earn") || q.includes("growth")) {
    return "📈 Improve value, raise pricing carefully, and add one recurring offer for stable monthly income.";
  }
  return "🤖 I can help with saving, expenses, business ideas, and growth. Ask a specific question for a practical answer.";
}

function detectBusinessType(text) {
  const q = text.toLowerCase();
  if (q.includes("cloth")) return "clothing";
  if (q.includes("food") || q.includes("restaurant") || q.includes("snack")) return "food";
  if (q.includes("online") || q.includes("instagram") || q.includes("ecommerce")) return "online";
  if (q.includes("service") || q.includes("agency") || q.includes("consult")) return "service";
  return "general";
}

function getBusinessAdvisorTemplate(type) {
  const templates = {
    clothing: {
      summary: "Great choice. Start with one clear clothing niche and test demand before buying large stock.",
      steps: ["Pick one audience.", "Source 5-10 products.", "Test sales using social media.", "Collect feedback and improve."],
      tips: ["Use clear size charts.", "Start with low inventory.", "Post real product photos."]
    },
    food: {
      summary: "Start with a small menu and strong hygiene. Keep quality consistent.",
      steps: ["Choose 3-5 best items.", "Calculate cost per item.", "Start pre-orders or local delivery.", "Track popular dishes."],
      tips: ["Consistency wins.", "Use clean packaging.", "Collect customer feedback weekly."]
    },
    online: {
      summary: "Focus on one customer problem and one sales channel first.",
      steps: ["Define target customer.", "Create one clear offer.", "Set up one channel.", "Measure inquiries and sales weekly."],
      tips: ["Keep messaging simple.", "Improve based on data.", "Build a contact list early."]
    },
    service: {
      summary: "Start with one service you can deliver well and produce fast results.",
      steps: ["Define your core service.", "Create a starter package.", "Get first clients and testimonials.", "Ask for referrals."],
      tips: ["Set clear scope.", "Communicate consistently.", "Track time and profit."]
    },
    general: {
      summary: "Start small, validate fast, and adjust based on real customer feedback.",
      steps: ["Define customer and problem.", "Set a safe starter budget.", "Launch a basic version.", "Talk to 10 potential customers."],
      tips: ["Progress over perfection.", "Keep early costs low.", "Review and improve monthly."]
    }
  };

  return templates[type] || templates.general;
}

function renderBusinessAdvisorResponse(advice) {
  if (!els.businessAdvisorResponse) return;

  const steps = advice.steps.map((step) => `<li>${step}</li>`).join("");
  const tips = advice.tips.map((tip) => `<li>${tip}</li>`).join("");

  els.businessAdvisorResponse.innerHTML = `
    <section class="advisor-block">
      <h3>Basic Idea Summary</h3>
      <p>${ideaText}</p>
    </section>
    <section class="advisor-block">
      <h3>Simple Steps to Start</h3>
      <ol>
        <li>Define your target customer.</li>
        <li>Start with a low-cost test.</li>
        <li>Track first month income and expenses.</li>
      </ol>
    </section>
  `;
}

function getRandomIdea(category) {
  const allIdeas = Object.values(IDEA_LIBRARY).flat();
  const pool = category === "all" ? allIdeas : IDEA_LIBRARY[category] || [];
  return pool[Math.floor(Math.random() * pool.length)] || "No ideas available right now.";
  const all = Object.values(IDEA_LIBRARY).flat();
  const pool = category === "all" ? all : IDEA_LIBRARY[category] || [];
  if (!pool.length) return "No ideas available right now. Please try another category.";
  return pool[Math.floor(Math.random() * pool.length)];
}

function initTabs() {
  els.tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      els.tabButtons.forEach((btn) => btn.classList.remove("active"));
      els.tabPanels.forEach((panel) => panel.classList.remove("active"));
      button.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });
}

function initForms() {
  els.expenseDate.value = todayYMD();

  els.incomeForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const amount = Number(els.incomeAmount.value);
    if (Number.isNaN(amount) || amount < 0) return;
    state.income = amount;
    await persistState();
    renderDashboard();
    els.incomeForm.reset();
  });
  if (els.incomeForm) {
    els.incomeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const amount = Number(els.incomeAmount?.value);
      if (Number.isNaN(amount) || amount < 0) return;

      state.income = amount;
      saveState();
      renderDashboard();
      els.incomeForm.reset();
    });
  }

  els.expenseForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const amount = Number(els.expenseAmount.value);
    const category = els.expenseCategory.value.trim();
    const date = els.expenseDate.value;
    if (Number.isNaN(amount) || amount < 0 || !category || !date) return;

    state.expenses.push({ amount, category, date });
    await persistState();
    renderDashboard();
    els.expenseForm.reset();
    els.expenseDate.value = todayYMD();
  });

  els.recurringExpenseForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = els.recurringExpenseName.value.trim();
    const amount = Number(els.recurringExpenseAmount.value);
    const frequency = els.recurringExpenseFrequency.value;
    if (!name || Number.isNaN(amount) || amount < 0 || !["daily", "weekly", "monthly"].includes(frequency)) return;

    state.recurringExpenses.push({ name, amount, frequency, startDate: todayYMD() });
    await persistState();
    renderDashboard();
    els.recurringExpenseForm.reset();
  });

  els.goalForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    settings.goal = els.goalSelect.value || DEFAULT_GOAL;
    await persistSettings();
    renderDashboard();
    updateStatus("Goal saved.");
  });

  els.changeGoalButton?.addEventListener("click", async () => {
    settings.goal = "";
    await persistSettings();
    renderDashboard();
    updateStatus("Goal selection is open. Choose a new goal.");
  });

  els.settingsForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const currency = els.currencySelect.value;
    const goal = els.settingsGoalSelect.value;

    if (CURRENCIES[currency]) settings.currency = currency;
    if (GOAL_CONTENT[goal]) settings.goal = goal;

    await persistSettings();
    renderDashboard();
    updateStatus("Settings saved.");
  });

  els.resetDataButton?.addEventListener("click", async () => {
    state.income = 0;
    state.expenses = [];
    state.recurringExpenses = [];
    settings.currency = "INR";
    settings.goal = "";

    if (!useBackend) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
    } else {
      await persistState();
      await persistSettings();
    }

    els.incomeForm?.reset();
    els.expenseForm?.reset();
    els.recurringExpenseForm?.reset();
    els.expenseDate.value = todayYMD();
    renderDashboard();
    updateStatus("Data reset complete.");
  });

  els.assistantForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = els.assistantQuestion.value.trim();
    if (!question) return;
    els.assistantResponse.textContent = getAssistantResponse(question);
  });

  els.businessAdvisorForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = els.businessIdeaInput.value.trim();
    if (!text) return;
    renderBusinessAdvisorResponse(text);
  });

  els.ideaGeneratorForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    els.generatedIdeaText.textContent = getRandomIdea(els.ideaCategorySelect.value || "all");
  });
}

async function initData() {
  useBackend = await api.isAvailable();

  if (!useBackend) {
    loadSettingsLocal();
    loadStateLocal();
    return;
  }

  try {
    const remoteState = await api.loadState();
    state.income = Number(remoteState.income) || 0;
    state.expenses = Array.isArray(remoteState.expenses) ? remoteState.expenses : [];
    state.recurringExpenses = Array.isArray(remoteState.recurringExpenses) ? remoteState.recurringExpenses : [];

    const remoteSettings = await api.loadSettings();
    if (remoteSettings.currency && CURRENCIES[remoteSettings.currency]) settings.currency = remoteSettings.currency;
    if (remoteSettings.goal && GOAL_CONTENT[remoteSettings.goal]) settings.goal = remoteSettings.goal;
  } catch {
    useBackend = false;
    loadSettingsLocal();
    loadStateLocal();
  }
}

async function init() {
  await initData();
  initTabs();
  initForms();
  els.currencySelect.value = settings.currency;
  els.settingsGoalSelect.value = settings.goal || DEFAULT_GOAL;
  els.goalSelect.value = settings.goal || DEFAULT_GOAL;
  renderDashboard();
}

init();
