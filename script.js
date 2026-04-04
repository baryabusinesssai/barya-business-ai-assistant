const CURRENCIES = {
  INR: { locale: "en-IN", code: "INR" },
  USD: { locale: "en-US", code: "USD" },
  EUR: { locale: "de-DE", code: "EUR" }
};

const STORAGE_KEYS = {
  income: "barya_income",
  expenses: "barya_expenses",
  recurringExpenses: "barya_recurring_expenses",
  settings: "barya_settings"
};

const DEFAULT_GOAL = "Save Money";
const STORAGE_KEY = "barya.dashboard.state.v1";

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

const state = {
  income: 0,
  expenses: [],
  recurringExpenses: []
};

const settings = {
  currency: "INR",
  goal: ""
};

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
  monthlyGoalText: document.getElementById("monthlyGoalText"),
  saveNotice: document.getElementById("saveNotice")
};

function todayYMD() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

function parseYMDToDate(ymd) {
  const [y, m, d] = (ymd || "").split("-").map(Number);
  return y && m && d ? new Date(y, m - 1, d) : null;
}

function formatCurrency(value) {
  const cfg = CURRENCIES[settings.currency] || CURRENCIES.INR;
  return new Intl.NumberFormat(cfg.locale, { style: "currency", currency: cfg.code }).format(Number(value) || 0);
}

function updateStatus(text) {
  if (els.settingsStatusText) {
    els.settingsStatusText.textContent = text;
  }
}

function saveIncomeToStorage() {
  localStorage.setItem(STORAGE_KEYS.income, JSON.stringify(state.income));
}

function saveExpensesToStorage() {
  localStorage.setItem(STORAGE_KEYS.expenses, JSON.stringify(state.expenses));
}

function saveRecurringToStorage() {
  localStorage.setItem(STORAGE_KEYS.recurringExpenses, JSON.stringify(state.recurringExpenses));
}

function saveSettingsToStorage() {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function loadStateFromStorage() {
  try {
    const income = JSON.parse(localStorage.getItem(STORAGE_KEYS.income) || "0");
    state.income = Number(income) || 0;

    const expenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.expenses) || "[]");
    state.expenses = Array.isArray(expenses) ? expenses : [];

    const recurring = JSON.parse(localStorage.getItem(STORAGE_KEYS.recurringExpenses) || "[]");
    state.recurringExpenses = Array.isArray(recurring) ? recurring : [];

    const savedSettings = JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || "{}");
    settings.currency = CURRENCIES[savedSettings.currency] ? savedSettings.currency : "INR";
    settings.goal = GOAL_CONTENT[savedSettings.goal] ? savedSettings.goal : "";
  } catch (_error) {
    state.income = 0;
    state.expenses = [];
    state.recurringExpenses = [];
    settings.currency = "INR";
    settings.goal = "";
  }
}

function countRecurringOccurrencesInRange(recurringExpense, rangeStart, rangeEnd) {
  const start = parseYMDToDate(recurringExpense.startDate) || rangeStart;
  let current = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  let count = 0;

  while (current <= rangeEnd) {
    if (current >= rangeStart) count += 1;
    if (recurringExpense.frequency === "daily") {
      current.setDate(current.getDate() + 1);
    } else if (recurringExpense.frequency === "weekly") {
      current.setDate(current.getDate() + 7);
    } else {
      current.setMonth(current.getMonth() + 1);
    }
  }

const state = {
  income: 0,
  expenses: [],
  recurringExpenses: [],
  settings: { currency: "INR", goal: "" }
};

const els = Object.fromEntries([...document.querySelectorAll("[id]")].map((el) => [el.id, el]));
els.tabButtons = document.querySelectorAll(".tab-button");
els.tabPanels = document.querySelectorAll(".tab-panel");

const todayYMD = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const parseYMD = (ymd) => {
  const [y, m, d] = (ymd || "").split("-").map(Number);
  return y && m && d ? new Date(y, m - 1, d) : null;
};

function formatCurrency(value) {
  const currencyConfig = CURRENCIES[state.settings.currency] || CURRENCIES.INR;
  return new Intl.NumberFormat(currencyConfig.locale, { style: "currency", currency: currencyConfig.code }).format(Number(value) || 0);
}

function getStorageSnapshot() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      return {
        income: Number(parsed.income) || 0,
        expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
        recurringExpenses: Array.isArray(parsed.recurringExpenses) ? parsed.recurringExpenses : [],
        settings: {
          currency: CURRENCIES[parsed?.settings?.currency] ? parsed.settings.currency : "INR",
          goal: GOAL_CONTENT[parsed?.settings?.goal] ? parsed.settings.goal : ""
        }
      };
    } catch {
      // fall back to legacy keys below
    }
  }

  // Legacy key migration support
  const legacyIncome = Number(localStorage.getItem("monthlyIncome") || localStorage.getItem("income") || 0) || 0;
  let legacyExpenses = [];
  let legacyRecurring = [];
  let legacySettings = {};
  try { legacyExpenses = JSON.parse(localStorage.getItem("expenses") || "[]"); } catch {}
  try { legacyRecurring = JSON.parse(localStorage.getItem("recurringExpenses") || "[]"); } catch {}
  try { legacySettings = JSON.parse(localStorage.getItem("settings") || "{}"); } catch {}

  return {
    income: legacyIncome,
    expenses: Array.isArray(legacyExpenses) ? legacyExpenses : [],
    recurringExpenses: Array.isArray(legacyRecurring) ? legacyRecurring : [],
    settings: {
      currency: CURRENCIES[legacySettings.currency] ? legacySettings.currency : "INR",
      goal: GOAL_CONTENT[legacySettings.goal] ? legacySettings.goal : ""
    }
  };
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function countRecurringInMonth(expense, now) {
  const startDate = parseYMD(expense.startDate);
  if (!startDate || startDate > now) return 0;

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  let cursor = new Date(startDate);
  let count = 0;

  while (cursor <= now) {
    if (cursor >= monthStart) count += 1;
    cursor = expense.frequency === "daily"
      ? new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1)
      : expense.frequency === "weekly"
        ? new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 7)
        : new Date(cursor.getFullYear(), cursor.getMonth() + 1, startDate.getDate());
  }
  return count;
}

function getCurrentMonthExpenses() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const oneTime = state.expenses.filter((expense) => {
    const date = parseYMDToDate(expense.date) || new Date(expense.date);
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  });

  const recurring = [];
  state.recurringExpenses.forEach((expense) => {
    const occurrences = countRecurringOccurrencesInRange(expense, monthStart, now);
    for (let i = 0; i < occurrences; i += 1) {
      recurring.push({
        amount: Number(expense.amount) || 0,
        category: expense.name || "Recurring",
        date: todayYMD()
      });
    }
  });

  const oneTime = state.expenses.filter((expense) => {
    const date = parseYMD(expense.date) || new Date(expense.date);
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  });
  const recurring = state.recurringExpenses.flatMap((expense) =>
    Array.from({ length: countRecurringInMonth(expense, now) }, () => ({
      amount: Number(expense.amount) || 0,
      category: expense.name || "Recurring",
      date: todayYMD()
    }))
  );
  return [...oneTime, ...recurring];
}

function getTopCategory(expenses) {
  if (!expenses.length) return "No expenses yet";
  const totals = {};
  expenses.forEach((expense) => {
    const key = (expense.category || "Other").trim() || "Other";
    totals[key] = (totals[key] || 0) + (Number(expense.amount) || 0);
  const byCategory = {};
  expenses.forEach((expense) => {
    const category = (expense.category || "Other").trim() || "Other";
    byCategory[category] = (byCategory[category] || 0) + (Number(expense.amount) || 0);
  });
  const [topCategory, amount] = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  return `${topCategory} (${formatCurrency(amount)})`;
}

function getSavingsStatus(income, monthlyExpenseTotal) {
  if (income <= 0) return "Add monthly income to calculate savings status";
  const diff = income - monthlyExpenseTotal;
  if (diff > 0) return `✅ On track: You are saving ${formatCurrency(diff)} this month.`;
  if (diff === 0) return "⚖️ Break-even: Income and expenses are equal this month.";
  return `⚠️ Overspending: You are over budget by ${formatCurrency(Math.abs(diff))}.`;
}

function renderGoalUI() {
  const hasGoal = Boolean(settings.goal);
  const content = GOAL_CONTENT[settings.goal || DEFAULT_GOAL];

  if (els.selectedGoalDisplay) {
    els.selectedGoalDisplay.textContent = hasGoal ? `Selected Goal: ${settings.goal}` : "Selected Goal: Not selected yet";
  }
  if (els.goalForm) {
    els.goalForm.classList.toggle("hidden", hasGoal);
  }
  if (els.changeGoalButton) {
    els.changeGoalButton.classList.toggle("hidden", !hasGoal);
  }
  if (els.goalGuidanceSummary) {
    els.goalGuidanceSummary.textContent = hasGoal
      ? content.summary
      : "Select a goal in Beginner Mode to see focused guidance.";
  }
  const hasGoal = Boolean(state.settings.goal);
  const goal = state.settings.goal || DEFAULT_GOAL;
  const content = GOAL_CONTENT[goal];

  if (els.selectedGoalDisplay) els.selectedGoalDisplay.textContent = hasGoal ? `Selected Goal: ${state.settings.goal}` : "Selected Goal: Not selected yet";
  if (els.goalForm) els.goalForm.classList.toggle("hidden", hasGoal);
  if (els.changeGoalButton) els.changeGoalButton.classList.toggle("hidden", !hasGoal);
  if (els.goalGuidanceSummary) els.goalGuidanceSummary.textContent = hasGoal ? content.summary : "Select a goal in Beginner Mode to see focused guidance.";

  if (els.goalTipsList) {
    els.goalTipsList.innerHTML = hasGoal
      ? content.tips.map((tip) => `<li>${tip}</li>`).join("")
      : '<li class="empty-state">No goal selected yet.</li>';
  }

  const now = new Date();
  if (els.dailyTipText) {
    els.dailyTipText.textContent = content.dailyTips[Math.floor(Date.now() / 86400000) % content.dailyTips.length];
  }
  if (els.weeklyChallengeText) {
    els.weeklyChallengeText.textContent =
      content.weeklyChallenges[Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 86400000)) % content.weeklyChallenges.length];
  }
  if (els.monthlyGoalText) {
    els.monthlyGoalText.textContent = content.monthlyGoals[now.getMonth() % content.monthlyGoals.length];
  }
}

function renderDashboard() {
  const recurringTotal = state.recurringExpenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const oneTimeTotal = state.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const totalExpense = recurringTotal + oneTimeTotal;
  }

  const now = new Date();
  if (els.dailyTipText) els.dailyTipText.textContent = content.dailyTips[Math.floor(Date.now() / 86400000) % content.dailyTips.length];
  if (els.weeklyChallengeText) els.weeklyChallengeText.textContent = content.weeklyChallenges[Math.floor(((now - new Date(now.getFullYear(), 0, 1)) / 86400000) / 7) % content.weeklyChallenges.length];
  if (els.monthlyGoalText) els.monthlyGoalText.textContent = content.monthlyGoals[now.getMonth() % content.monthlyGoals.length];
}

function renderDashboard() {
  const oneTimeTotal = state.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const recurringTotal = state.recurringExpenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const totalExpenses = oneTimeTotal + recurringTotal;
  const netSavings = state.income - totalExpenses;

  if (els.totalIncome) els.totalIncome.textContent = formatCurrency(state.income);
  if (els.totalExpenses) els.totalExpenses.textContent = formatCurrency(totalExpenses);
  if (els.netSavings) els.netSavings.textContent = formatCurrency(netSavings);

  const monthly = getCurrentMonthExpenses();
  const monthlyTotal = monthly.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const topCategoryText = getTopCategory(monthly);

  if (els.monthlyExpensesValue) els.monthlyExpensesValue.textContent = formatCurrency(monthlyTotal);
  if (els.topCategoryValue) els.topCategoryValue.textContent = topCategoryText;

  const savingsStatusText = getSavingsStatus(state.income, monthlyTotal);
  if (els.savingsStatusValue) els.savingsStatusValue.textContent = savingsStatusText;

  if (els.insightTopCategory) {
    els.insightTopCategory.textContent = monthly.length
      ? `Your highest spending category is ${topCategoryText.split(" (")[0]}.`
      : "Your highest spending category is not available yet.";
  }
  if (els.insightMonthlyExpense) {
    els.insightMonthlyExpense.textContent = `Your total monthly expenses are ${formatCurrency(monthlyTotal)}.`;
  }
  if (els.insightSavingsStatus) {
    els.insightSavingsStatus.textContent = savingsStatusText;
  }
  if (els.insightSuggestion) {
    els.insightSuggestion.textContent = monthly.length
      ? `You can save more by reviewing and reducing ${topCategoryText.split(" (")[0]} expenses.`
      : "Add expenses to get a saving suggestion.";
  }
  const topCategory = getTopCategory(monthly);
  const savingsStatus = getSavingsStatus(state.income, monthlyTotal);

  if (els.monthlyExpensesValue) els.monthlyExpensesValue.textContent = formatCurrency(monthlyTotal);
  if (els.topCategoryValue) els.topCategoryValue.textContent = topCategory;
  if (els.savingsStatusValue) els.savingsStatusValue.textContent = savingsStatus;

  if (els.insightTopCategory) els.insightTopCategory.textContent = monthly.length ? `Your highest spending category is ${topCategory.split(" (")[0]}.` : "Your highest spending category is not available yet.";
  if (els.insightMonthlyExpense) els.insightMonthlyExpense.textContent = `Your total monthly expenses are ${formatCurrency(monthlyTotal)}.`;
  if (els.insightSavingsStatus) els.insightSavingsStatus.textContent = savingsStatus;
  if (els.insightSuggestion) els.insightSuggestion.textContent = monthly.length ? `You can save more by reviewing and reducing ${topCategory.split(" (")[0]} expenses.` : "Add expenses to get a saving suggestion.";

  if (els.recentExpenses) {
    els.recentExpenses.innerHTML = state.expenses.length
      ? [...state.expenses]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5)
          .map((expense) => `<li>${new Date(expense.date).toLocaleDateString()} • ${expense.category} • ${formatCurrency(expense.amount)}</li>`)
          .join("")
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .map((expense) => `<li>${new Date(expense.date).toLocaleDateString()} • ${expense.category} • ${formatCurrency(expense.amount)}</li>`)
        .join("")
      : '<li class="empty-state">No expenses added yet.</li>';
  }

  if (els.recurringExpensesList) {
    els.recurringExpensesList.innerHTML = state.recurringExpenses.length
      ? state.recurringExpenses.map((expense) => `<li>${expense.name} • ${formatCurrency(expense.amount)} • ${expense.frequency}</li>`).join("")
      : '<li class="empty-state">No recurring expenses added yet.</li>';
  }

  renderGoalUI();
}

function getAssistantResponse(question) {
  const text = question.toLowerCase();
  if (text.includes("save") || text.includes("budget")) return "💡 Track expenses daily and set one fixed monthly savings amount.";
  if (text.includes("expense") || text.includes("cost")) return "📉 Review top categories weekly and reduce one non-essential cost.";
  if (text.includes("business") || text.includes("idea") || text.includes("startup")) return "🚀 Start with one small offer and validate with real customers.";
  if (text.includes("income") || text.includes("earn") || text.includes("growth")) return "📈 Improve value, raise pricing carefully, and add one recurring offer.";
  return "🤖 Ask about saving, expenses, income growth, or business ideas.";
}

function initTabs() {
  els.tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      els.tabButtons.forEach((tabButton) => tabButton.classList.remove("active"));
      els.tabPanels.forEach((panel) => panel.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(target)?.classList.add("active");

  if (els.currencySelect) els.currencySelect.value = state.settings.currency;
  if (els.settingsGoalSelect) els.settingsGoalSelect.value = state.settings.goal || DEFAULT_GOAL;
  if (els.goalSelect) els.goalSelect.value = state.settings.goal || DEFAULT_GOAL;

  renderGoalUI();
}

function saveAndRender() {
  persistState();
  renderDashboard();
}

function initTabs() {
  els.tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.tab;
      els.tabButtons.forEach((b) => b.classList.remove("active"));
      els.tabPanels.forEach((panel) => panel.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(targetId)?.classList.add("active");
    });
  });
}

function initForms() {
  if (els.expenseDate) {
    els.expenseDate.value = todayYMD();
  }

  if (els.saveNotice) {
    els.saveNotice.textContent = "Your data is saved locally in this browser.";
  }

  els.incomeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    state.income = Number(els.incomeAmount?.value) || 0;
    saveIncomeToStorage();
    renderDashboard();
    updateStatus("Monthly income saved.");
  els.incomeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    state.income = Number(els.incomeAmount?.value) || 0;
    saveAndRender();
  });

  els.expenseForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = Number(els.expenseAmount?.value);
    const category = els.expenseCategory?.value?.trim();
    const date = els.expenseDate?.value;
    if (!category || Number.isNaN(amount) || amount < 0 || !date) return;

    state.expenses.push({ amount, category, date });
    saveExpensesToStorage();
    renderDashboard();
    saveAndRender();

    els.expenseForm.reset();
    if (els.expenseDate) els.expenseDate.value = todayYMD();
    updateStatus("Expense saved.");
  });

  els.recurringExpenseForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = els.recurringExpenseName?.value?.trim();
    const amount = Number(els.recurringExpenseAmount?.value);
    const frequency = els.recurringExpenseFrequency?.value;
    if (!name || Number.isNaN(amount) || amount < 0 || !["daily", "weekly", "monthly"].includes(frequency)) return;

    state.recurringExpenses.push({ name, amount, frequency, startDate: todayYMD() });
    saveRecurringToStorage();
    renderDashboard();

    saveAndRender();
    els.recurringExpenseForm.reset();
    updateStatus("Recurring expense saved.");
  });

  els.goalForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    settings.goal = els.goalSelect?.value || DEFAULT_GOAL;
    saveSettingsToStorage();
    renderDashboard();
    updateStatus("Goal saved.");
  });

  els.changeGoalButton?.addEventListener("click", () => {
    settings.goal = "";
    saveSettingsToStorage();
    renderDashboard();
    updateStatus("Goal reset.");
    state.settings.goal = els.goalSelect?.value || DEFAULT_GOAL;
    saveAndRender();
  });

  els.changeGoalButton?.addEventListener("click", () => {
    state.settings.goal = "";
    saveAndRender();
  });

  els.settingsForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (els.currencySelect?.value && CURRENCIES[els.currencySelect.value]) {
      settings.currency = els.currencySelect.value;
    }
    if (els.settingsGoalSelect?.value && GOAL_CONTENT[els.settingsGoalSelect.value]) {
      settings.goal = els.settingsGoalSelect.value;
    }

    saveSettingsToStorage();
    renderDashboard();
    updateStatus("Settings saved.");
    if (els.currencySelect?.value && CURRENCIES[els.currencySelect.value]) state.settings.currency = els.currencySelect.value;
    if (els.settingsGoalSelect?.value && GOAL_CONTENT[els.settingsGoalSelect.value]) state.settings.goal = els.settingsGoalSelect.value;
    saveAndRender();
    if (els.settingsStatusText) els.settingsStatusText.textContent = "Settings saved locally.";
  });

  els.resetDataButton?.addEventListener("click", () => {
    state.income = 0;
    state.expenses = [];
    state.recurringExpenses = [];
    settings.currency = "INR";
    settings.goal = "";

    saveIncomeToStorage();
    saveExpensesToStorage();
    saveRecurringToStorage();
    saveSettingsToStorage();

    if (els.incomeAmount) els.incomeAmount.value = "";
    if (els.currencySelect) els.currencySelect.value = settings.currency;
    if (els.goalSelect) els.goalSelect.value = DEFAULT_GOAL;
    if (els.settingsGoalSelect) els.settingsGoalSelect.value = DEFAULT_GOAL;

    renderDashboard();
    updateStatus("All local data reset.");
    state.settings = { currency: "INR", goal: "" };
    saveAndRender();
    if (els.settingsStatusText) els.settingsStatusText.textContent = "All local data reset.";
  });

  els.assistantForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = els.assistantQuestion?.value.trim();
    if (question && els.assistantResponse) {
      els.assistantResponse.textContent = getAssistantResponse(question);
    }
    const text = (els.assistantQuestion?.value || "").toLowerCase();
    if (!els.assistantResponse) return;
    if (text.includes("save") || text.includes("budget")) els.assistantResponse.textContent = "💡 Track expenses daily and set one fixed monthly savings amount.";
    else if (text.includes("expense") || text.includes("cost")) els.assistantResponse.textContent = "📉 Review top categories weekly and reduce one non-essential cost.";
    else if (text.includes("business") || text.includes("idea") || text.includes("startup")) els.assistantResponse.textContent = "🚀 Start with one small offer and validate with real customers.";
    else if (text.includes("income") || text.includes("earn") || text.includes("growth")) els.assistantResponse.textContent = "📈 Improve value, raise pricing carefully, and add one recurring offer.";
    else els.assistantResponse.textContent = "🤖 Ask about saving, expenses, income growth, or business ideas.";
  });

  els.businessAdvisorForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = els.businessIdeaInput?.value?.trim();
    if (!text || !els.businessAdvisorResponse) return;
    els.businessAdvisorResponse.innerHTML = `<section class="advisor-block"><h3>Basic Idea Summary</h3><p>Great start: ${text}</p></section>`;
  });

  els.ideaGeneratorForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const category = els.ideaCategorySelect?.value || "all";
    const all = Object.values(IDEA_LIBRARY).flat();
    const pool = category === "all" ? all : IDEA_LIBRARY[category] || [];
    if (els.generatedIdeaText) {
      els.generatedIdeaText.textContent = pool[Math.floor(Math.random() * pool.length)] || "No ideas available right now.";
    }
  });
}

function syncControlsFromState() {
  if (els.incomeAmount) els.incomeAmount.value = state.income ? String(state.income) : "";
  if (els.currencySelect) els.currencySelect.value = settings.currency;
  if (els.goalSelect) els.goalSelect.value = settings.goal || DEFAULT_GOAL;
  if (els.settingsGoalSelect) els.settingsGoalSelect.value = settings.goal || DEFAULT_GOAL;
}

function init() {
  loadStateFromStorage();
  syncControlsFromState();
    if (els.generatedIdeaText) els.generatedIdeaText.textContent = pool[Math.floor(Math.random() * pool.length)] || "No ideas available right now.";
  });
}

function loadFromLocalStorage() {
  const snapshot = getStorageSnapshot();
  state.income = snapshot.income;
  state.expenses = snapshot.expenses;
  state.recurringExpenses = snapshot.recurringExpenses;
  state.settings = snapshot.settings;
}

function init() {
  loadFromLocalStorage();
  initTabs();
  initForms();
  renderDashboard();

}

init();
