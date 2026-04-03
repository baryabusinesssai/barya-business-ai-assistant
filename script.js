const STORAGE_KEY = "barya-finance-data-v1";
const SETTINGS_STORAGE_KEY = "barya-user-settings-v1";
const LEGACY_CURRENCY_STORAGE_KEY = "barya-selected-currency-v1";
const LEGACY_GOAL_STORAGE_KEY = "barya-selected-goal-v1";

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
      "Set a simple spending limit for one category each week.",
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
      "Build your emergency savings by one extra contribution."
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
      "Create a simple one-page offer for your service or product.",
      "Plan startup costs and remove one non-essential expense."
    ],
    monthlyGoals: [
      "Get your first paying customer this month.",
      "Test one marketing channel and track results.",
      "Create a small starter budget and follow it."
    ]
  },
  "Learn Finance": {
    summary: "Focus on understanding basic money concepts, budgeting, and using clear financial habits.",
    tips: [
      "Learn one finance term each day (budget, savings rate, cash flow).",
      "Review income and expenses once a week to see patterns.",
      "Use simple rules like needs, wants, and savings."
    ],
    dailyTips: [
      "Read one short article or watch one short video about a finance basic.",
      "Classify one expense as need or want.",
      "Check today's total spending before the day ends."
    ],
    weeklyChallenges: [
      "Create a simple weekly budget and compare actual spending.",
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
  onlineEarning: [
    "Sell products on Instagram",
    "Freelancing in graphic design",
    "Online tutoring"
  ],
  smallBusiness: [
    "Start a custom gift packaging business",
    "Open a neighborhood tiffin service",
    "Begin a home-based tailoring service"
  ]
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
  currencySelect: document.querySelector("#currencySelect"),
  settingsGoalSelect: document.querySelector("#settingsGoalSelect"),
  resetDataButton: document.querySelector("#resetDataButton"),
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
  goalSelection: document.getElementById("goalSelection"),
  goalSummary: document.getElementById("goalSummary"),
  selectedGoalText: document.getElementById("selectedGoalText"),
  goalOptionButtons: document.querySelectorAll(".goal-option-button"),
  changeGoalButtons: document.querySelectorAll("#changeGoalButton"),

  dailyTipText: document.getElementById("dailyTipText"),
  weeklyChallengeText: document.getElementById("weeklyChallengeText"),
  monthlyGoalText: document.getElementById("monthlyGoalText")
};

const state = {
  income: 0,
  expenses: [],
  recurringExpenses: []
};

let selectedCurrency = "INR";
let selectedGoal = "";

function safeParseJSON(raw, fallback) {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
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

function todayYMD() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

function parseYMDToDate(ymd) {
  const [year, month, day] = (ymd || "").split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  const parsed = safeParseJSON(raw, null);
  if (!parsed || typeof parsed !== "object") {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  state.income = Number(parsed.income) || 0;
  state.expenses = Array.isArray(parsed.expenses) ? parsed.expenses : [];
  state.recurringExpenses = Array.isArray(parsed.recurringExpenses) ? parsed.recurringExpenses : [];
}

function saveSettings() {
  localStorage.setItem(
    SETTINGS_STORAGE_KEY,
    JSON.stringify({
      currency: selectedCurrency,
      goal: selectedGoal
    })
  );

  // backward-compatible keys requested in prompt
  localStorage.setItem(LEGACY_CURRENCY_STORAGE_KEY, selectedCurrency);
  if (selectedGoal) {
    localStorage.setItem(LEGACY_GOAL_STORAGE_KEY, selectedGoal);
  } else {
    localStorage.removeItem(LEGACY_GOAL_STORAGE_KEY);
  }
}

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
  const parsed = raw ? safeParseJSON(raw, {}) : {};

  const rawCurrency = parsed.currency || localStorage.getItem(LEGACY_CURRENCY_STORAGE_KEY);
  if (rawCurrency && CURRENCIES[rawCurrency]) {
    selectedCurrency = rawCurrency;
  }

  const rawGoal = parsed.goal || localStorage.getItem(LEGACY_GOAL_STORAGE_KEY);
  if (rawGoal && GOAL_CONTENT[rawGoal]) {
    selectedGoal = rawGoal;
  }
}

function toStartOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, n) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
}

function daysBetween(start, end) {
  return Math.floor((toStartOfDay(end) - toStartOfDay(start)) / 86400000);
}

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function getMonthlyOccurrenceDate(year, monthIndex, dayOfMonth) {
  return new Date(year, monthIndex, Math.min(dayOfMonth, daysInMonth(year, monthIndex)));
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
      first = addDays(first, Math.ceil(diff / 7) * 7);
    }
    if (first > to) return 0;
    return Math.floor(daysBetween(first, to) / 7) + 1;
  }

  if (recurringExpense.frequency === "monthly") {
    const day = start.getDate();
    let y = start.getFullYear();
    let m = start.getMonth();
    let occ = getMonthlyOccurrenceDate(y, m, day);
    let count = 0;

    while (occ < from) {
      m += 1;
      if (m > 11) {
        m = 0;
        y += 1;
      }
      occ = getMonthlyOccurrenceDate(y, m, day);
    }

    while (occ <= to) {
      if (occ >= start) count += 1;
      m += 1;
      if (m > 11) {
        m = 0;
        y += 1;
      }
      occ = getMonthlyOccurrenceDate(y, m, day);
    }

    return count;
  }

  return 0;
}

function getCurrentMonthExpenses() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthStart = new Date(year, month, 1);
  const today = toStartOfDay(new Date());

  const oneTime = state.expenses.filter((e) => {
    const d = parseYMDToDate(e.date) || new Date(e.date);
    return d && d.getFullYear() === year && d.getMonth() === month;
  });

  const recurring = [];
  state.recurringExpenses.forEach((expense) => {
    const count = countRecurringOccurrencesInRange(expense, monthStart, today);
    for (let i = 0; i < count; i += 1) {
      recurring.push({ amount: Number(expense.amount), category: expense.name, date: todayYMD(), isRecurring: true });
    }
  });

  return [...oneTime, ...recurring];
}

function getRecurringTotalThroughToday() {
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
  expenses.forEach((e) => {
    const key = (e.category || "Other").trim() || "Other";
    totals[key] = (totals[key] || 0) + (Number(e.amount) || 0);
  });
  const [name, amount] = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  return `${name} (${formatCurrency(amount)})`;
}

function getSavingsStatus(income, expenses) {
  if (income <= 0) return "Add monthly income to calculate savings status";
  const diff = income - expenses;
  if (diff > 0) return `✅ On track: You are saving ${formatCurrency(diff)} this month.`;
  if (diff === 0) return "⚖️ Break-even: Income and expenses are currently equal.";
  return `⚠️ Overspending: You are over budget by ${formatCurrency(Math.abs(diff))}.`;
}

function getGoalContent() {
  return GOAL_CONTENT[selectedGoal] || GOAL_CONTENT[DEFAULT_GOAL];
}

function renderGoalUI() {
  const hasGoal = Boolean(selectedGoal);
  const goalContent = getGoalContent();

  if (els.selectedGoalDisplay) {
    els.selectedGoalDisplay.textContent = hasGoal ? `Selected Goal: ${selectedGoal}` : "Selected Goal: Not selected yet";
  }

  if (els.selectedGoalText) {
    els.selectedGoalText.textContent = hasGoal ? selectedGoal : DEFAULT_GOAL;
  }

  if (els.goalSelection) els.goalSelection.hidden = hasGoal;
  if (els.goalSummary) els.goalSummary.hidden = !hasGoal;
  if (els.goalForm) els.goalForm.classList.toggle("hidden", hasGoal);

  if (els.goalSelect) els.goalSelect.value = hasGoal ? selectedGoal : DEFAULT_GOAL;
  if (els.settingsGoalSelect) els.settingsGoalSelect.value = hasGoal ? selectedGoal : DEFAULT_GOAL;

  if (els.goalGuidanceSummary) {
    els.goalGuidanceSummary.textContent = hasGoal
      ? goalContent.summary
      : "Select a goal in Beginner Mode to see focused guidance.";
  }

  if (els.goalTipsList) {
    els.goalTipsList.innerHTML = "";
    if (!hasGoal) {
      els.goalTipsList.innerHTML = '<li class="empty-state">No goal selected yet.</li>';
    } else {
      goalContent.tips.forEach((tip) => {
        const li = document.createElement("li");
        li.textContent = tip;
        els.goalTipsList.appendChild(li);
      });
    }
  }
}

function renderGrowthAndInsights(monthlyExpenses, monthlyExpenseTotal) {
  const goal = getGoalContent();

  if (els.dailyTipText) {
    const dayIdx = Math.floor(toStartOfDay(new Date()).getTime() / 86400000) % goal.dailyTips.length;
    els.dailyTipText.textContent = goal.dailyTips[dayIdx];
  }

  if (els.weeklyChallengeText) {
    const startYear = new Date(new Date().getFullYear(), 0, 1);
    const weekIdx = Math.floor(daysBetween(startYear, new Date()) / 7) % goal.weeklyChallenges.length;
    els.weeklyChallengeText.textContent = goal.weeklyChallenges[weekIdx];
  }

  if (els.monthlyGoalText) {
    const monthIdx = new Date().getMonth() % goal.monthlyGoals.length;
    els.monthlyGoalText.textContent = goal.monthlyGoals[monthIdx];
  }

  if (els.insightTopCategory && els.insightMonthlyExpense && els.insightSavingsStatus && els.insightSuggestion) {
    const top = getTopCategory(monthlyExpenses);
    els.insightTopCategory.textContent =
      top === "No expenses yet" ? "Your highest spending category is not available yet." : `Your highest spending category is ${top.split(" (")[0]}.`;
    els.insightMonthlyExpense.textContent = `Your total monthly expenses are ${formatCurrency(monthlyExpenseTotal)}.`;
    els.insightSavingsStatus.textContent = getSavingsStatus(state.income, monthlyExpenseTotal);
    els.insightSuggestion.textContent =
      top === "No expenses yet"
        ? "Add expenses to get a saving suggestion."
        : `You can save more by reviewing and reducing ${top.split(" (")[0]} expenses.`;
  }
}

function renderRecentExpenses() {
  if (!els.recentExpenses) return;
  els.recentExpenses.innerHTML = "";

  if (!state.expenses.length) {
    els.recentExpenses.innerHTML = '<li class="empty-state">No expenses added yet.</li>';
    return;
  }

  [...state.expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .forEach((expense) => {
      const li = document.createElement("li");
      const displayDate = parseYMDToDate(expense.date) || new Date(expense.date);
      li.textContent = `${displayDate.toLocaleDateString()} • ${expense.category} • ${formatCurrency(expense.amount)}`;
      els.recentExpenses.appendChild(li);
    });
}

function renderRecurringExpenses() {
  if (!els.recurringExpensesList) return;
  els.recurringExpensesList.innerHTML = "";

  if (!state.recurringExpenses.length) {
    els.recurringExpensesList.innerHTML = '<li class="empty-state">No recurring expenses added yet.</li>';
    return;
  }

  state.recurringExpenses.forEach((expense) => {
    const li = document.createElement("li");
    li.textContent = `${expense.name} • ${formatCurrency(expense.amount)} • ${expense.frequency}`;
    els.recurringExpensesList.appendChild(li);
  });
}

function renderDashboard() {
  const oneTimeExpenseTotal = state.expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const recurringExpenseTotal = getRecurringTotalThroughToday();
  const totalExpenses = oneTimeExpenseTotal + recurringExpenseTotal;
  const netSavings = state.income - totalExpenses;

  if (els.totalIncome) els.totalIncome.textContent = formatCurrency(state.income);
  if (els.totalExpenses) els.totalExpenses.textContent = formatCurrency(totalExpenses);

  if (els.netSavings) {
    els.netSavings.textContent = formatCurrency(netSavings);
    els.netSavings.classList.remove("positive", "negative");
    if (netSavings > 0) els.netSavings.classList.add("positive");
    if (netSavings < 0) els.netSavings.classList.add("negative");
  }

  const monthlyExpenses = getCurrentMonthExpenses();
  const monthlyExpenseTotal = monthlyExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  if (els.monthlyExpensesValue) els.monthlyExpensesValue.textContent = formatCurrency(monthlyExpenseTotal);
  if (els.topCategoryValue) els.topCategoryValue.textContent = getTopCategory(monthlyExpenses);
  if (els.savingsStatusValue) els.savingsStatusValue.textContent = getSavingsStatus(state.income, monthlyExpenseTotal);

  renderGoalUI();
  renderGrowthAndInsights(monthlyExpenses, monthlyExpenseTotal);
  renderRecentExpenses();
  renderRecurringExpenses();
}

function setDefaultDate() {
  if (els.expenseDate) {
    els.expenseDate.value = todayYMD();
  }
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
      summary: "You are planning a clothing business. Start with one target audience and simple inventory.",
      steps: ["Pick one niche.", "Source small starter stock.", "Test demand with a small launch.", "Track profit per item."],
      tips: ["Avoid overstocking.", "Use clear size charts.", "Collect customer feedback early."]
    },
    food: {
      summary: "You are planning a food business. Focus on quality, hygiene, and repeat customers.",
      steps: ["Start with 3-5 menu items.", "Calculate food cost per item.", "Test with pre-orders.", "Track top sellers weekly."],
      tips: ["Keep taste consistent.", "Use practical packaging.", "Improve based on feedback."]
    },
    online: {
      summary: "You are planning an online business. Start with one audience and one offer.",
      steps: ["Define customer problem.", "Create one offer.", "Choose one selling channel.", "Measure leads and sales weekly."],
      tips: ["Keep messaging simple.", "Post regularly.", "Build a customer contact list."]
    },
    service: {
      summary: "You are planning a service business. Package one skill into a clear offer.",
      steps: ["Define one core service.", "Set scope and pricing.", "Get first clients/testimonials.", "Use clear payment terms."],
      tips: ["Communicate clearly.", "Track time per project.", "Ask for referrals."]
    },
    general: {
      summary: "You have a business idea and want a beginner plan. Start small and validate quickly.",
      steps: ["Write a one-line idea.", "Estimate startup cost.", "Test a small version.", "Collect feedback and adjust."],
      tips: ["Keep risk low.", "Track income/expenses from day one.", "Improve monthly."]
    }
  };

  return templates[type] || templates.general;
}

function renderBusinessAdvisorResponse(advice) {
  if (!els.businessAdvisorResponse) return;

  const steps = advice.steps.map((s) => `<li>${s}</li>`).join("");
  const tips = advice.tips.map((s) => `<li>${s}</li>`).join("");
  els.businessAdvisorResponse.innerHTML = `
    <section class="advisor-block">
      <h3>Basic Idea Summary</h3>
      <p>${advice.summary}</p>
    </section>
    <section class="advisor-block">
      <h3>Simple Steps to Start</h3>
      <ol>${steps}</ol>
    </section>
    <section class="advisor-block">
      <h3>Tips for Beginners</h3>
      <ul>${tips}</ul>
    </section>
  `;
}

function getAssistantResponse(question) {
  const q = question.toLowerCase();
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

function getRandomIdea(category) {
  const pool = category === "all" ? Object.values(IDEA_LIBRARY).flat() : IDEA_LIBRARY[category] || [];
  if (!pool.length) return "No ideas available right now. Please try another category.";
  return pool[Math.floor(Math.random() * pool.length)];
}

function updateStatus(text) {
  if (els.settingsStatusText) {
    els.settingsStatusText.textContent = text;
  }
}

function setSelectedGoal(nextGoal) {
  if (!GOAL_CONTENT[nextGoal]) return;
  selectedGoal = nextGoal;
  saveSettings();
  renderDashboard();
}

function initTabs() {
  els.tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      if (!target) return;

      els.tabButtons.forEach((b) => b.classList.remove("active"));
      els.tabPanels.forEach((p) => p.classList.remove("active"));

      button.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });
}

function initForms() {
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

  if (els.expenseForm) {
    els.expenseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const amount = Number(els.expenseAmount?.value);
      const category = els.expenseCategory?.value?.trim();
      const date = els.expenseDate?.value;
      if (Number.isNaN(amount) || amount < 0 || !category || !date) return;

      state.expenses.push({ amount, category, date });
      saveState();
      renderDashboard();
      els.expenseForm.reset();
      setDefaultDate();
    });
  }

  if (els.recurringExpenseForm) {
    els.recurringExpenseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = els.recurringExpenseName?.value?.trim();
      const amount = Number(els.recurringExpenseAmount?.value);
      const frequency = els.recurringExpenseFrequency?.value;

      if (!name || Number.isNaN(amount) || amount < 0 || !["daily", "weekly", "monthly"].includes(frequency)) return;

      state.recurringExpenses.push({
        name,
        amount,
        frequency,
        startDate: todayYMD()
      });

      saveState();
      renderDashboard();
      els.recurringExpenseForm.reset();
    });
  }

  if (els.goalForm) {
    els.goalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const goal = els.goalSelect?.value || DEFAULT_GOAL;
      setSelectedGoal(goal);
      updateStatus("Goal saved.");
    });
  }

  els.goalOptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextGoal = button.dataset.goal;
      if (!nextGoal) return;
      setSelectedGoal(nextGoal);
      updateStatus("Goal saved.");
    });
  });

  els.changeGoalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedGoal = "";
      saveSettings();
      renderDashboard();
      updateStatus("Goal selection is open. Choose a new goal.");
    });
  });

  if (els.settingsForm) {
    els.settingsForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nextCurrency = els.currencySelect?.value || selectedCurrency;
      const nextGoal = els.settingsGoalSelect?.value || selectedGoal || DEFAULT_GOAL;

      if (CURRENCIES[nextCurrency]) {
        selectedCurrency = nextCurrency;
      }
      if (GOAL_CONTENT[nextGoal]) {
        selectedGoal = nextGoal;
      }

      saveSettings();
      renderDashboard();
      updateStatus("Settings saved.");
    });
  }

  if (els.resetDataButton) {
    els.resetDataButton.addEventListener("click", () => {
      state.income = 0;
      state.expenses = [];
      state.recurringExpenses = [];
      selectedCurrency = "INR";
      selectedGoal = "";

      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
      localStorage.removeItem(LEGACY_CURRENCY_STORAGE_KEY);
      localStorage.removeItem(LEGACY_GOAL_STORAGE_KEY);

      if (els.incomeForm) els.incomeForm.reset();
      if (els.expenseForm) els.expenseForm.reset();
      if (els.recurringExpenseForm) els.recurringExpenseForm.reset();
      setDefaultDate();

      if (els.currencySelect) els.currencySelect.value = "INR";
      if (els.settingsGoalSelect) els.settingsGoalSelect.value = DEFAULT_GOAL;
      if (els.goalSelect) els.goalSelect.value = DEFAULT_GOAL;

      renderDashboard();
      updateStatus("All local data has been reset.");
    });
  }

  if (els.assistantForm) {
    els.assistantForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const question = els.assistantQuestion?.value?.trim();
      if (!question || !els.assistantResponse) return;

      els.assistantResponse.textContent = "Thinking... 🤖";
      window.setTimeout(() => {
        els.assistantResponse.textContent = getAssistantResponse(question);
      }, 250);
    });
  }

  if (els.businessAdvisorForm) {
    els.businessAdvisorForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const idea = els.businessIdeaInput?.value?.trim();
      if (!idea) return;

      const type = detectBusinessType(idea);
      renderBusinessAdvisorResponse(getBusinessAdvisorTemplate(type));
    });
  }

  if (els.ideaGeneratorForm) {
    els.ideaGeneratorForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const category = els.ideaCategorySelect?.value || "all";
      if (els.generatedIdeaText) {
        els.generatedIdeaText.textContent = getRandomIdea(category);
      }
    });
  }
}

function init() {
  loadSettings();
  loadState();

  if (els.currencySelect) els.currencySelect.value = selectedCurrency;
  if (els.settingsGoalSelect) els.settingsGoalSelect.value = selectedGoal || DEFAULT_GOAL;
  if (els.goalSelect) els.goalSelect.value = selectedGoal || DEFAULT_GOAL;

  setDefaultDate();
  initTabs();
  initForms();
  renderDashboard();
}

init();
