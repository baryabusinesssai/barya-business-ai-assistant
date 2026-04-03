const STORAGE_KEY = "barya-finance-data-v1";
const SETTINGS_STORAGE_KEY = "barya-settings-v1";
const CURRENCY_STORAGE_KEY = "barya-selected-currency-v1"; // legacy
const GOAL_STORAGE_KEY = "barya-selected-goal-v1"; // legacy

const CURRENCIES = {
  INR: { locale: "en-IN", code: "INR" },
  USD: { locale: "en-US", code: "USD" },
  EUR: { locale: "de-DE", code: "EUR" }
};

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

const state = {
  income: 0,
  expenses: [],
  recurringExpenses: []
};

let selectedCurrency = "INR";
let selectedGoal = "";

const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

const incomeForm = document.getElementById("incomeForm");
const expenseForm = document.getElementById("expenseForm");
const recurringExpenseForm = document.getElementById("recurringExpenseForm");
const goalForm = document.getElementById("goalForm");
const assistantForm = document.getElementById("assistantForm");
const businessAdvisorForm = document.getElementById("businessAdvisorForm");
const ideaGeneratorForm = document.getElementById("ideaGeneratorForm");
const settingsForm = document.getElementById("settingsForm");

const incomeAmountInput = document.getElementById("incomeAmount");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseCategoryInput = document.getElementById("expenseCategory");
const expenseDateInput = document.getElementById("expenseDate");
const recurringExpenseNameInput = document.getElementById("recurringExpenseName");
const recurringExpenseAmountInput = document.getElementById("recurringExpenseAmount");
const recurringExpenseFrequencyInput = document.getElementById("recurringExpenseFrequency");
const goalSelect = document.getElementById("goalSelect");
const assistantQuestionInput = document.getElementById("assistantQuestion");
const businessIdeaInput = document.getElementById("businessIdeaInput");
const ideaCategorySelect = document.getElementById("ideaCategorySelect");

const currencySelectElements = document.querySelectorAll("#currencySelect");
const settingsGoalSelectElements = document.querySelectorAll("#settingsGoalSelect");
const changeGoalButtons = document.querySelectorAll("#changeGoalButton");
const resetDataButtons = document.querySelectorAll("#resetDataButton");

const totalIncomeElement = document.getElementById("totalIncome");
const totalExpensesElement = document.getElementById("totalExpenses");
const netSavingsElement = document.getElementById("netSavings");
const monthlyExpensesValue = document.getElementById("monthlyExpensesValue");
const topCategoryValue = document.getElementById("topCategoryValue");
const savingsStatusValue = document.getElementById("savingsStatusValue");
const recentExpensesElement = document.getElementById("recentExpenses");
const recurringExpensesListElement = document.getElementById("recurringExpensesList");
const assistantResponseElement = document.getElementById("assistantResponse");
const businessAdvisorResponseElement = document.getElementById("businessAdvisorResponse");
const generatedIdeaTextElement = document.getElementById("generatedIdeaText");
const insightTopCategoryElement = document.getElementById("insightTopCategory");
const insightMonthlyExpenseElement = document.getElementById("insightMonthlyExpense");
const insightSavingsStatusElement = document.getElementById("insightSavingsStatus");
const insightSuggestionElement = document.getElementById("insightSuggestion");
const dailyTipTextElement = document.getElementById("dailyTipText");
const weeklyChallengeTextElement = document.getElementById("weeklyChallengeText");
const monthlyGoalTextElement = document.getElementById("monthlyGoalText");
const selectedGoalDisplayElement = document.getElementById("selectedGoalDisplay");
const goalGuidanceSummaryElement = document.getElementById("goalGuidanceSummary");
const goalTipsListElement = document.getElementById("goalTipsList");
const goalSelectionElement = document.getElementById("goalSelection");
const goalSummaryElement = document.getElementById("goalSummary");
const selectedGoalTextElement = document.getElementById("selectedGoalText");
const goalOptionButtons = document.querySelectorAll(".goal-option-button");
const settingsStatusText = document.getElementById("settingsStatusText");

function formatCurrency(value) {
  const currency = CURRENCIES[selectedCurrency] || CURRENCIES.INR;
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value) || 0);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    state.income = Number(parsed.income) || 0;
    state.expenses = Array.isArray(parsed.expenses) ? parsed.expenses : [];
    state.recurringExpenses = Array.isArray(parsed.recurringExpenses) ? parsed.recurringExpenses : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveSettings() {
  localStorage.setItem(
    SETTINGS_STORAGE_KEY,
    JSON.stringify({
      currency: selectedCurrency,
      goal: selectedGoal
    })
  );

  // backward compatibility keys
  localStorage.setItem(CURRENCY_STORAGE_KEY, selectedCurrency);
  if (selectedGoal) {
    localStorage.setItem(GOAL_STORAGE_KEY, selectedGoal);
  } else {
    localStorage.removeItem(GOAL_STORAGE_KEY);
  }
}

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (CURRENCIES[parsed.currency]) selectedCurrency = parsed.currency;
      if (GOAL_CONTENT[parsed.goal]) selectedGoal = parsed.goal;
      return;
    } catch {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
    }
  }

  const legacyCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
  const legacyGoal = localStorage.getItem(GOAL_STORAGE_KEY);
  if (CURRENCIES[legacyCurrency]) selectedCurrency = legacyCurrency;
  if (GOAL_CONTENT[legacyGoal]) selectedGoal = legacyGoal;
}

function getCurrentGoalContent() {
  return GOAL_CONTENT[selectedGoal] || GOAL_CONTENT["Save Money"];
}

function setDefaultDate() {
  if (!expenseDateInput) return;
  const today = new Date();
  const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  expenseDateInput.value = iso;
}

function toStartOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function parseDateValue(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function daysBetween(start, end) {
  return Math.floor((toStartOfDay(end) - toStartOfDay(start)) / 86400000);
}

function countRecurringOccurrencesInRange(recurring, rangeStart, rangeEnd) {
  const start = toStartOfDay(parseDateValue(recurring.startDate));
  const from = toStartOfDay(rangeStart);
  const to = toStartOfDay(rangeEnd);

  if (start > to) return 0;

  if (recurring.frequency === "daily") {
    const effectiveStart = start > from ? start : from;
    return daysBetween(effectiveStart, to) + 1;
  }

  if (recurring.frequency === "weekly") {
    let first = start;
    if (first < from) {
      const diff = daysBetween(first, from);
      first = new Date(first.getFullYear(), first.getMonth(), first.getDate() + Math.ceil(diff / 7) * 7);
    }
    if (first > to) return 0;
    return Math.floor(daysBetween(first, to) / 7) + 1;
  }

  if (recurring.frequency === "monthly") {
    let count = 0;
    let y = start.getFullYear();
    let m = start.getMonth();
    const day = start.getDate();

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
      occurrence = makeDate(y, m, day);
    }

    while (occurrence <= to) {
      if (occurrence >= start) count += 1;
      m += 1;
      if (m > 11) {
        m = 0;
        y += 1;
      }
      occurrence = makeDate(y, m, day);
    }

    return count;
  }

  return 0;
}

function getCurrentMonthExpensesWithRecurring() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = toStartOfDay(now);

  const oneTimeExpenses = state.expenses.filter((expense) => {
    const d = new Date(expense.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });

  const recurringAsExpenses = [];
  state.recurringExpenses.forEach((item) => {
    const occurrenceCount = countRecurringOccurrencesInRange(item, monthStart, monthEnd);
    for (let i = 0; i < occurrenceCount; i += 1) {
      recurringAsExpenses.push({
        amount: Number(item.amount) || 0,
        category: item.name || "Recurring",
        date: monthEnd.toISOString().slice(0, 10)
      });
    }
  });

  return [...oneTimeExpenses, ...recurringAsExpenses];
}

function getTopCategory(expenses) {
  if (!expenses.length) return "No expenses yet";
  const totals = {};
  expenses.forEach((expense) => {
    const key = (expense.category || "Other").trim() || "Other";
    totals[key] = (totals[key] || 0) + (Number(expense.amount) || 0);
  });
  const [name, amount] = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  return `${name} (${formatCurrency(amount)})`;
}

function getSavingsStatus(monthlyExpenseTotal) {
  if (state.income <= 0) return "Add monthly income to calculate savings status";
  const diff = state.income - monthlyExpenseTotal;
  if (diff > 0) return `✅ On track: You are saving ${formatCurrency(diff)} this month.`;
  if (diff === 0) return "⚖️ Break-even: Income and expenses are equal this month.";
  return `⚠️ Overspending: You are over budget by ${formatCurrency(Math.abs(diff))}.`;
}

function renderGoalUi() {
  const hasGoal = Boolean(selectedGoal);
  const goalContent = getCurrentGoalContent();

  if (selectedGoalDisplayElement) {
    selectedGoalDisplayElement.textContent = hasGoal
      ? `Selected Goal: ${selectedGoal}`
      : "Selected Goal: Not selected yet";
  }

  if (goalSelect) goalSelect.value = hasGoal ? selectedGoal : "Save Money";
  settingsGoalSelectElements.forEach((el) => {
    el.value = hasGoal ? selectedGoal : "Save Money";
  });

  if (goalSelectionElement && goalSummaryElement && selectedGoalTextElement) {
    goalSelectionElement.hidden = hasGoal;
    goalSummaryElement.hidden = !hasGoal;
    selectedGoalTextElement.textContent = hasGoal ? selectedGoal : "Save Money";
  }

  if (goalForm) {
    goalForm.classList.toggle("hidden", hasGoal);
  }

  if (goalGuidanceSummaryElement) {
    goalGuidanceSummaryElement.textContent = hasGoal
      ? goalContent.summary
      : "Select a goal in Beginner Mode to see focused guidance.";
  }

  if (goalTipsListElement) {
    goalTipsListElement.innerHTML = "";
    if (!hasGoal) {
      goalTipsListElement.innerHTML = '<li class="empty-state">No goal selected yet.</li>';
    } else {
      goalContent.tips.forEach((tip) => {
        const li = document.createElement("li");
        li.textContent = tip;
        goalTipsListElement.appendChild(li);
      });
    }
  }

  if (dailyTipTextElement) {
    const i = Math.floor(Date.now() / 86400000) % goalContent.dailyTips.length;
    dailyTipTextElement.textContent = goalContent.dailyTips[i];
  }

  if (weeklyChallengeTextElement) {
    const now = new Date();
    const weekIndex = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (86400000 * 7));
    weeklyChallengeTextElement.textContent = goalContent.weeklyChallenges[weekIndex % goalContent.weeklyChallenges.length];
  }

  if (monthlyGoalTextElement) {
    monthlyGoalTextElement.textContent = goalContent.monthlyGoals[new Date().getMonth() % goalContent.monthlyGoals.length];
  }
}

function renderRecentExpenses() {
  if (!recentExpensesElement) return;
  recentExpensesElement.innerHTML = "";

  if (!state.expenses.length) {
    recentExpensesElement.innerHTML = '<li class="empty-state">No expenses added yet.</li>';
    return;
  }

  [...state.expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .forEach((expense) => {
      const li = document.createElement("li");
      li.textContent = `${new Date(expense.date).toLocaleDateString()} • ${expense.category} • ${formatCurrency(expense.amount)}`;
      recentExpensesElement.appendChild(li);
    });
}

function renderRecurringExpenses() {
  if (!recurringExpensesListElement) return;
  recurringExpensesListElement.innerHTML = "";

  if (!state.recurringExpenses.length) {
    recurringExpensesListElement.innerHTML = '<li class="empty-state">No recurring expenses added yet.</li>';
    return;
  }

  state.recurringExpenses.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} • ${formatCurrency(item.amount)} • ${item.frequency}`;
    recurringExpensesListElement.appendChild(li);
  });
}

function renderDashboard() {
  const monthlyExpenses = getCurrentMonthExpensesWithRecurring();
  const monthlyExpenseTotal = monthlyExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const historicalExpenseTotal = state.expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const recurringTotalToDate = state.recurringExpenses.reduce((sum, recurring) => {
    const count = countRecurringOccurrencesInRange(recurring, parseDateValue(recurring.startDate), new Date());
    return sum + count * (Number(recurring.amount) || 0);
  }, 0);

  const totalExpenseAllTime = historicalExpenseTotal + recurringTotalToDate;
  const netSavings = state.income - totalExpenseAllTime;

  if (totalIncomeElement) totalIncomeElement.textContent = formatCurrency(state.income);
  if (totalExpensesElement) totalExpensesElement.textContent = formatCurrency(totalExpenseAllTime);
  if (netSavingsElement) {
    netSavingsElement.textContent = formatCurrency(netSavings);
    netSavingsElement.classList.remove("positive", "negative");
    if (netSavings > 0) netSavingsElement.classList.add("positive");
    if (netSavings < 0) netSavingsElement.classList.add("negative");
  }

  if (monthlyExpensesValue) monthlyExpensesValue.textContent = formatCurrency(monthlyExpenseTotal);
  if (topCategoryValue) topCategoryValue.textContent = getTopCategory(monthlyExpenses);
  if (savingsStatusValue) savingsStatusValue.textContent = getSavingsStatus(monthlyExpenseTotal);

  const topCategoryText = getTopCategory(monthlyExpenses);
  if (insightTopCategoryElement) {
    insightTopCategoryElement.textContent = monthlyExpenses.length
      ? `Your highest spending category is ${topCategoryText.split(" (")[0]}.`
      : "Your highest spending category is not available yet.";
  }
  if (insightMonthlyExpenseElement) {
    insightMonthlyExpenseElement.textContent = `Your total monthly expenses are ${formatCurrency(monthlyExpenseTotal)}.`;
  }
  if (insightSavingsStatusElement) {
    const savingsRate = state.income > 0 ? ((state.income - monthlyExpenseTotal) / state.income) * 100 : 0;
    const level = savingsRate >= 20 ? "good" : savingsRate >= 10 ? "average" : "low";
    insightSavingsStatusElement.textContent = `Your savings are ${level} this month.`;
  }
  if (insightSuggestionElement) {
    insightSuggestionElement.textContent = monthlyExpenses.length
      ? `Try reducing ${topCategoryText.split(" (")[0]} costs by 5-10% this month.`
      : "Add expenses to get a saving suggestion.";
  }

  renderRecentExpenses();
  renderRecurringExpenses();
  renderGoalUi();
}

function getAssistantResponse(question) {
  const q = question.toLowerCase();

  if (q.includes("save") || q.includes("budget")) {
    return "💡 Start with 50/30/20, automate savings on income day, and reduce one non-essential category this week.";
  }
  if (q.includes("expense") || q.includes("cost")) {
    return "📉 Split expenses into fixed and variable, set category limits, and review top category every Sunday.";
  }
  if (q.includes("income") || q.includes("earn") || q.includes("grow")) {
    return "📈 Increase value first, then test a small price increase, and add one upsell or recurring offer.";
  }
  if (q.includes("business") || q.includes("startup") || q.includes("idea")) {
    return "🚀 Pick one simple idea, validate with real customers quickly, and keep costs low until demand is proven.";
  }

  return "🤖 Ask about savings, expenses, income growth, or business ideas for practical guidance.";
}

function detectBusinessType(text) {
  const value = text.toLowerCase();
  if (value.includes("cloth") || value.includes("fashion")) return "clothing";
  if (value.includes("food") || value.includes("restaurant")) return "food";
  if (value.includes("online") || value.includes("digital")) return "online";
  if (value.includes("service") || value.includes("agency")) return "service";
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
  if (!businessAdvisorResponseElement) return;
  businessAdvisorResponseElement.innerHTML = `
    <section class="advisor-block">
      <h3>Basic Idea Summary</h3>
      <p>${advice.summary}</p>
    </section>
    <section class="advisor-block">
      <h3>Simple Steps to Start</h3>
      <ol>${advice.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
    </section>
    <section class="advisor-block">
      <h3>Tips for Beginners</h3>
      <ul>${advice.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
    </section>
  `;
}

function getRandomIdea(category) {
  const all = Object.values(IDEA_LIBRARY).flat();
  const pool = category === "all" ? all : IDEA_LIBRARY[category] || [];
  if (!pool.length) return "No ideas available right now. Try another category.";
  return pool[Math.floor(Math.random() * pool.length)];
}

function initTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));
      button.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });
}

function selectGoal(nextGoal) {
  if (!GOAL_CONTENT[nextGoal]) return;
  selectedGoal = nextGoal;
  saveSettings();
  renderDashboard();
}

function initForms() {
  if (incomeForm) {
    incomeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const amount = Number(incomeAmountInput?.value);
      if (Number.isNaN(amount) || amount < 0) return;
      state.income = amount;
      saveState();
      renderDashboard();
      incomeForm.reset();
    });
  }

  if (expenseForm) {
    expenseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const amount = Number(expenseAmountInput?.value);
      const category = (expenseCategoryInput?.value || "").trim();
      const date = expenseDateInput?.value;
      if (Number.isNaN(amount) || amount < 0 || !category || !date) return;

      state.expenses.push({ amount, category, date });
      saveState();
      renderDashboard();
      expenseForm.reset();
      setDefaultDate();
    });
  }

  if (recurringExpenseForm) {
    recurringExpenseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = (recurringExpenseNameInput?.value || "").trim();
      const amount = Number(recurringExpenseAmountInput?.value);
      const frequency = recurringExpenseFrequencyInput?.value;

      if (!name || Number.isNaN(amount) || amount < 0 || !["daily", "weekly", "monthly"].includes(frequency)) {
        return;
      }

      const today = new Date();
      const date = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      state.recurringExpenses.push({ name, amount, frequency, startDate: date });
      saveState();
      renderDashboard();
      recurringExpenseForm.reset();
    });
  }

  if (goalForm) {
    goalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      selectGoal(goalSelect?.value || "Save Money");
    });
  }

  if (assistantForm) {
    assistantForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const q = (assistantQuestionInput?.value || "").trim();
      if (!q || !assistantResponseElement) return;
      assistantResponseElement.textContent = "Thinking... 🤖";
      setTimeout(() => {
        assistantResponseElement.textContent = getAssistantResponse(q);
      }, 200);
    });
  }

  if (businessAdvisorForm) {
    businessAdvisorForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const idea = (businessIdeaInput?.value || "").trim();
      if (!idea) return;
      renderBusinessAdvisorResponse(getBusinessAdvisorTemplate(detectBusinessType(idea)));
    });
  }

  if (ideaGeneratorForm) {
    ideaGeneratorForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const category = ideaCategorySelect?.value || "all";
      if (generatedIdeaTextElement) {
        generatedIdeaTextElement.textContent = getRandomIdea(category);
      }
    });
  }

  if (settingsForm) {
    settingsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const currency = currencySelectElements[0]?.value || selectedCurrency;
      const goal = settingsGoalSelectElements[0]?.value || selectedGoal;
      if (CURRENCIES[currency]) selectedCurrency = currency;
      if (GOAL_CONTENT[goal]) selectedGoal = goal;
      saveSettings();
      syncSettingsInputs();
      renderDashboard();
      if (settingsStatusText) settingsStatusText.textContent = "Settings saved.";
    });
  }
}

function syncSettingsInputs() {
  currencySelectElements.forEach((el) => {
    el.value = selectedCurrency;
  });
  settingsGoalSelectElements.forEach((el) => {
    el.value = selectedGoal || "Save Money";
  });
}

function initStandaloneSelectors() {
  currencySelectElements.forEach((el) => {
    el.addEventListener("change", (event) => {
      const nextCurrency = event.target.value;
      if (!CURRENCIES[nextCurrency]) return;
      selectedCurrency = nextCurrency;
      saveSettings();
      syncSettingsInputs();
      renderDashboard();
      if (settingsStatusText) settingsStatusText.textContent = "Settings saved.";
    });
  });

  settingsGoalSelectElements.forEach((el) => {
    el.addEventListener("change", (event) => {
      selectGoal(event.target.value);
      syncSettingsInputs();
      if (settingsStatusText) settingsStatusText.textContent = "Settings saved.";
    });
  });

  goalOptionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectGoal(btn.dataset.goal);
    });
  });

  changeGoalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedGoal = "";
      saveSettings();
      renderDashboard();
    });
  });

  resetDataButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.income = 0;
      state.expenses = [];
      state.recurringExpenses = [];
      selectedCurrency = "INR";
      selectedGoal = "";

      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
      localStorage.removeItem(CURRENCY_STORAGE_KEY);
      localStorage.removeItem(GOAL_STORAGE_KEY);

      if (incomeForm) incomeForm.reset();
      if (expenseForm) expenseForm.reset();
      if (recurringExpenseForm) recurringExpenseForm.reset();

      setDefaultDate();
      syncSettingsInputs();
      renderDashboard();
      if (settingsStatusText) settingsStatusText.textContent = "All local data has been reset.";
    });
  });
}

function init() {
  loadSettings();
  loadState();
  setDefaultDate();
  initTabs();
  initForms();
  initStandaloneSelectors();
  syncSettingsInputs();
  renderDashboard();
}

init();
