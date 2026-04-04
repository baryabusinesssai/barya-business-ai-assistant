const CURRENCIES = {
  INR: { locale: "en-IN", code: "INR" },
  USD: { locale: "en-US", code: "USD" },
  EUR: { locale: "de-DE", code: "EUR" }
};

const STORAGE_KEYS = {
  monthlyIncome: "barya_income",
  expenses: "barya_expenses",
  recurringExpenses: "barya_recurring_expenses",
  currency: "barya_currency",
  goal: "barya_goal"
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

const state = {
  monthlyIncome: 0,
  expenses: [],
  recurringExpenses: [],
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
  monthlyGoalText: document.getElementById("monthlyGoalText")
};

function todayYMD() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

function parseYMDToDate(ymd) {
  const [y, m, d] = (ymd || "").split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function formatCurrency(value) {
  const cfg = CURRENCIES[state.currency] || CURRENCIES.INR;
  return new Intl.NumberFormat(cfg.locale, { style: "currency", currency: cfg.code }).format(Number(value) || 0);
}

function setStatus(message) {
  if (els.settingsStatusText) {
    els.settingsStatusText.textContent = message;
  }
}

function safeParseArray(raw) {
  try {
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadState() {
  const income = Number(localStorage.getItem(STORAGE_KEYS.monthlyIncome));
  state.monthlyIncome = Number.isFinite(income) ? income : 0;

  state.expenses = safeParseArray(localStorage.getItem(STORAGE_KEYS.expenses));
  state.recurringExpenses = safeParseArray(localStorage.getItem(STORAGE_KEYS.recurringExpenses));

  const savedCurrency = localStorage.getItem(STORAGE_KEYS.currency);
  state.currency = CURRENCIES[savedCurrency] ? savedCurrency : "INR";

  const savedGoal = localStorage.getItem(STORAGE_KEYS.goal);
  state.goal = GOAL_CONTENT[savedGoal] ? savedGoal : "";
}

function persistIncome() {
  localStorage.setItem(STORAGE_KEYS.monthlyIncome, String(state.monthlyIncome));
}

function persistExpenses() {
  localStorage.setItem(STORAGE_KEYS.expenses, JSON.stringify(state.expenses));
}

function persistRecurringExpenses() {
  localStorage.setItem(STORAGE_KEYS.recurringExpenses, JSON.stringify(state.recurringExpenses));
}

function persistPreferences() {
  localStorage.setItem(STORAGE_KEYS.currency, state.currency);
  localStorage.setItem(STORAGE_KEYS.goal, state.goal);
}

function countRecurringOccurrencesInCurrentMonth(item, now) {
  const startDate = parseYMDToDate(item.startDate);
  if (!startDate) return 0;

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  let cursor = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  let count = 0;

  while (cursor <= now) {
    if (cursor >= monthStart && cursor.getMonth() === now.getMonth() && cursor.getFullYear() === now.getFullYear()) {
      count += 1;
    }

    if (item.frequency === "daily") {
      cursor.setDate(cursor.getDate() + 1);
    } else if (item.frequency === "weekly") {
      cursor.setDate(cursor.getDate() + 7);
    } else {
      cursor.setMonth(cursor.getMonth() + 1);
    }
  }

  return count;
}

function getCurrentMonthExpenses() {
  const now = new Date();
  const oneTime = state.expenses.filter((expense) => {
    const date = parseYMDToDate(expense.date) || new Date(expense.date);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });

  const recurringExpanded = state.recurringExpenses.flatMap((item) => {
    const occurrences = countRecurringOccurrencesInCurrentMonth(item, now);
    return Array.from({ length: occurrences }, () => ({
      amount: Number(item.amount) || 0,
      category: item.name || "Recurring",
      date: todayYMD()
    }));
  });

  return [...oneTime, ...recurringExpanded];
}

function getTopCategory(expenses) {
  if (!expenses.length) return "No expenses yet";

  const totalsByCategory = {};
  expenses.forEach((expense) => {
    const category = (expense.category || "Other").trim() || "Other";
    totalsByCategory[category] = (totalsByCategory[category] || 0) + (Number(expense.amount) || 0);
  });

  const [category, amount] = Object.entries(totalsByCategory).sort((a, b) => b[1] - a[1])[0];
  return `${category} (${formatCurrency(amount)})`;
}

function getSavingsStatus(monthlyIncome, monthlyExpenses) {
  if (monthlyIncome <= 0) return "Add monthly income to calculate savings status";

  const difference = monthlyIncome - monthlyExpenses;
  if (difference > 0) return `✅ On track: You are saving ${formatCurrency(difference)} this month.`;
  if (difference === 0) return "⚖️ Break-even: Income and expenses are equal this month.";
  return `⚠️ Overspending: You are over budget by ${formatCurrency(Math.abs(difference))}.`;
}

function renderGoalUI() {
  const hasGoal = Boolean(state.goal);
  const goal = state.goal || DEFAULT_GOAL;
  const content = GOAL_CONTENT[goal];

  if (els.selectedGoalDisplay) {
    els.selectedGoalDisplay.textContent = hasGoal
      ? `Selected Goal: ${state.goal}`
      : "Selected Goal: Not selected yet";
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
    const weekIndex = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 86400000));
    els.weeklyChallengeText.textContent = content.weeklyChallenges[weekIndex % content.weeklyChallenges.length];
  }

  if (els.monthlyGoalText) {
    els.monthlyGoalText.textContent = content.monthlyGoals[now.getMonth() % content.monthlyGoals.length];
  }
}

function renderDashboard() {
  const oneTimeTotal = state.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const recurringTotal = state.recurringExpenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const totalExpenses = oneTimeTotal + recurringTotal;
  const netSavings = state.monthlyIncome - totalExpenses;

  if (els.totalIncome) els.totalIncome.textContent = formatCurrency(state.monthlyIncome);
  if (els.totalExpenses) els.totalExpenses.textContent = formatCurrency(totalExpenses);
  if (els.netSavings) els.netSavings.textContent = formatCurrency(netSavings);

  const monthlyExpenses = getCurrentMonthExpenses();
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const topCategory = getTopCategory(monthlyExpenses);
  const savingsStatus = getSavingsStatus(state.monthlyIncome, monthlyTotal);

  if (els.monthlyExpensesValue) els.monthlyExpensesValue.textContent = formatCurrency(monthlyTotal);
  if (els.topCategoryValue) els.topCategoryValue.textContent = topCategory;
  if (els.savingsStatusValue) els.savingsStatusValue.textContent = savingsStatus;

  if (els.insightTopCategory) {
    els.insightTopCategory.textContent = monthlyExpenses.length
      ? `Your highest spending category is ${topCategory.split(" (")[0]}.`
      : "Your highest spending category is not available yet.";
  }

  if (els.insightMonthlyExpense) {
    els.insightMonthlyExpense.textContent = `Your total monthly expenses are ${formatCurrency(monthlyTotal)}.`;
  }

  if (els.insightSavingsStatus) {
    els.insightSavingsStatus.textContent = savingsStatus;
  }

  if (els.insightSuggestion) {
    els.insightSuggestion.textContent = monthlyExpenses.length
      ? `You can save more by reviewing and reducing ${topCategory.split(" (")[0]} expenses.`
      : "Add expenses to get a saving suggestion.";
  }

  if (els.recentExpenses) {
    els.recentExpenses.innerHTML = state.expenses.length
      ? [...state.expenses]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5)
          .map((expense) => `<li>${new Date(expense.date).toLocaleDateString()} • ${expense.category} • ${formatCurrency(expense.amount)}</li>`)
          .join("")
      : '<li class="empty-state">No expenses added yet.</li>';
  }

  if (els.recurringExpensesList) {
    els.recurringExpensesList.innerHTML = state.recurringExpenses.length
      ? state.recurringExpenses
          .map((item) => `<li>${item.name} • ${formatCurrency(item.amount)} • ${item.frequency}</li>`)
          .join("")
      : '<li class="empty-state">No recurring expenses added yet.</li>';
  }

  renderGoalUI();
}

function syncControlsFromState() {
  if (els.incomeAmount) {
    els.incomeAmount.value = state.monthlyIncome ? String(state.monthlyIncome) : "";
  }

  if (els.expenseDate) {
    els.expenseDate.value = todayYMD();
  }

  if (els.currencySelect) {
    els.currencySelect.value = state.currency;
  }

  if (els.goalSelect) {
    els.goalSelect.value = state.goal || DEFAULT_GOAL;
  }

  if (els.settingsGoalSelect) {
    els.settingsGoalSelect.value = state.goal || DEFAULT_GOAL;
  }
}

function getAssistantResponse(question) {
  const text = question.toLowerCase();
  if (text.includes("save") || text.includes("budget")) {
    return "💡 Track expenses daily and set one fixed monthly savings amount.";
  }
  if (text.includes("expense") || text.includes("cost")) {
    return "📉 Review top categories weekly and reduce one non-essential cost.";
  }
  if (text.includes("business") || text.includes("idea") || text.includes("startup")) {
    return "🚀 Start with one small offer and validate with real customers.";
  }
  if (text.includes("income") || text.includes("earn") || text.includes("growth")) {
    return "📈 Improve value, raise pricing carefully, and add one recurring offer.";
  }
  return "🤖 Ask about saving, expenses, income growth, or business ideas.";
}

function getBusinessAdvice(idea) {
  return `
    <section class="advisor-block">
      <h3>Basic Idea Summary</h3>
      <p>${idea}</p>
    </section>
    <section class="advisor-block">
      <h3>Simple First Steps</h3>
      <ul>
        <li>Describe your customer in one sentence.</li>
        <li>Estimate startup cost and first month operating cost.</li>
        <li>Start with a small pilot offer and collect feedback.</li>
      </ul>
    </section>
    <section class="advisor-block">
      <h3>Helpful Tips</h3>
      <ul>
        <li>Track every rupee/dollar from day one.</li>
        <li>Avoid big fixed costs until demand is proven.</li>
        <li>Set a weekly sales target and review progress.</li>
      </ul>
    </section>
  `;
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
  els.incomeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = Number(els.incomeAmount?.value);
    state.monthlyIncome = Number.isFinite(value) && value >= 0 ? value : 0;
    persistIncome();
    renderDashboard();
    setStatus("Monthly income saved.");
  });

  els.expenseForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const amount = Number(els.expenseAmount?.value);
    const category = els.expenseCategory?.value?.trim();
    const date = els.expenseDate?.value;

    if (!Number.isFinite(amount) || amount < 0 || !category || !date) {
      setStatus("Please enter valid expense details.");
      return;
    }

    state.expenses.push({ amount, category, date });
    persistExpenses();
    renderDashboard();

    els.expenseForm.reset();
    if (els.expenseDate) {
      els.expenseDate.value = todayYMD();
    }

    setStatus("Expense saved.");
  });

  els.recurringExpenseForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = els.recurringExpenseName?.value?.trim();
    const amount = Number(els.recurringExpenseAmount?.value);
    const frequency = els.recurringExpenseFrequency?.value;

    if (!name || !Number.isFinite(amount) || amount < 0 || !["daily", "weekly", "monthly"].includes(frequency)) {
      setStatus("Please enter valid recurring expense details.");
      return;
    }

    state.recurringExpenses.push({ name, amount, frequency, startDate: todayYMD() });
    persistRecurringExpenses();
    renderDashboard();
    els.recurringExpenseForm.reset();
    setStatus("Recurring expense saved.");
  });

  els.goalForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    state.goal = GOAL_CONTENT[els.goalSelect?.value] ? els.goalSelect.value : DEFAULT_GOAL;
    persistPreferences();
    syncControlsFromState();
    renderDashboard();
    setStatus("Goal saved.");
  });

  els.changeGoalButton?.addEventListener("click", () => {
    state.goal = "";
    persistPreferences();
    syncControlsFromState();
    renderDashboard();
    setStatus("Goal reset. Choose a new one when ready.");
  });

  els.settingsForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const nextCurrency = els.currencySelect?.value;
    const nextGoal = els.settingsGoalSelect?.value;

    if (CURRENCIES[nextCurrency]) {
      state.currency = nextCurrency;
    }

    if (GOAL_CONTENT[nextGoal]) {
      state.goal = nextGoal;
    }

    persistPreferences();
    syncControlsFromState();
    renderDashboard();
    setStatus("Settings saved locally.");
  });

  els.resetDataButton?.addEventListener("click", () => {
    state.monthlyIncome = 0;
    state.expenses = [];
    state.recurringExpenses = [];
    state.currency = "INR";
    state.goal = "";

    persistIncome();
    persistExpenses();
    persistRecurringExpenses();
    persistPreferences();

    if (els.incomeAmount) {
      els.incomeAmount.value = "";
    }

    syncControlsFromState();
    renderDashboard();
    setStatus("All local data reset.");
  });

  els.assistantForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = els.assistantQuestion?.value?.trim();
    if (!question || !els.assistantResponse) return;
    els.assistantResponse.textContent = getAssistantResponse(question);
  });

  els.businessAdvisorForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const idea = els.businessIdeaInput?.value?.trim();
    if (!idea || !els.businessAdvisorResponse) return;
    els.businessAdvisorResponse.innerHTML = getBusinessAdvice(idea);
  });

  els.ideaGeneratorForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const category = els.ideaCategorySelect?.value || "all";
    const allIdeas = Object.values(IDEA_LIBRARY).flat();
    const pool = category === "all" ? allIdeas : IDEA_LIBRARY[category] || [];
    const idea = pool[Math.floor(Math.random() * pool.length)] || "No ideas available right now.";
    if (els.generatedIdeaText) {
      els.generatedIdeaText.textContent = idea;
    }
  });
}

function init() {
  loadState();
  syncControlsFromState();
  initTabs();
  initForms();
  renderDashboard();
}

init();
