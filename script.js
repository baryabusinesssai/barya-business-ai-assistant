const STORAGE_KEY = "barya-finance-data-v1";
const CURRENCY_STORAGE_KEY = "barya-selected-currency-v1";

const CURRENCIES = {
  INR: { locale: "en-IN", code: "INR", symbol: "₹" },
  USD: { locale: "en-US", code: "USD", symbol: "$" },
  EUR: { locale: "de-DE", code: "EUR", symbol: "€" }
};

const DAILY_TIPS = [
  "Track your daily expenses to improve savings.",
  "Avoid unnecessary spending on small items.",
  "Start saving a small amount regularly.",
  "Review your business cash flow at the end of each day.",
  "Set a simple weekly budget and follow it consistently.",
  "Keep emergency savings ready for unexpected business costs.",
  "Focus spending on tools that improve your business productivity."
];

const WEEKLY_CHALLENGES = [
  "Track every expense for the next 7 days.",
  "Reduce unnecessary spending this week.",
  "Set a spending limit for one category and stay under it.",
  "Review your business subscriptions and cancel one unused tool.",
  "Avoid impulse purchases for the full week.",
  "Plan your next week's expenses before the weekend."
];

const MONTHLY_GOALS = [
  "Save ₹1000 this month.",
  "Cut shopping expenses by 10%.",
  "Reduce one business cost and keep that saving for next month.",
  "Increase your savings rate by 5%.",
  "Track all cash and online spending for the full month.",
  "Build or add to your emergency fund this month."
];

const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

const incomeForm = document.getElementById("incomeForm");
const expenseForm = document.getElementById("expenseForm");
const recurringExpenseForm = document.getElementById("recurringExpenseForm");
const assistantForm = document.getElementById("assistantForm");
const businessAdvisorForm = document.getElementById("businessAdvisorForm");
const currencySelect = document.getElementById("currencySelect");

const incomeAmountInput = document.getElementById("incomeAmount");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseCategoryInput = document.getElementById("expenseCategory");
const expenseDateInput = document.getElementById("expenseDate");
const recurringExpenseNameInput = document.getElementById("recurringExpenseName");
const recurringExpenseAmountInput = document.getElementById("recurringExpenseAmount");
const recurringExpenseFrequencyInput = document.getElementById("recurringExpenseFrequency");
const assistantQuestionInput = document.getElementById("assistantQuestion");
const businessIdeaInput = document.getElementById("businessIdeaInput");

const totalIncomeElement = document.getElementById("totalIncome");
const totalExpensesElement = document.getElementById("totalExpenses");
const netSavingsElement = document.getElementById("netSavings");
const monthlyExpensesValue = document.getElementById("monthlyExpensesValue");
const topCategoryValue = document.getElementById("topCategoryValue");
const savingsStatusValue = document.getElementById("savingsStatusValue");
const insightTopCategoryElement = document.getElementById("insightTopCategory");
const insightMonthlyExpenseElement = document.getElementById("insightMonthlyExpense");
const insightSavingsStatusElement = document.getElementById("insightSavingsStatus");
const insightSuggestionElement = document.getElementById("insightSuggestion");
const recentExpensesElement = document.getElementById("recentExpenses");
const recurringExpensesListElement = document.getElementById("recurringExpensesList");
const assistantResponseElement = document.getElementById("assistantResponse");
const businessAdvisorResponseElement = document.getElementById("businessAdvisorResponse");
const dailyTipTextElement = document.getElementById("dailyTipText");
const weeklyChallengeTextElement = document.getElementById("weeklyChallengeText");
const monthlyGoalTextElement = document.getElementById("monthlyGoalText");

const state = {
  income: 0,
  expenses: [],
  recurringExpenses: []
};

let selectedCurrency = "INR";

function formatCurrency(value) {
  const currencyConfig = CURRENCIES[selectedCurrency] || CURRENCIES.INR;

  return new Intl.NumberFormat(currencyConfig.locale, {
    style: "currency",
    currency: currencyConfig.code,
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

function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toStartOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysBetween(startDate, endDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.floor((toStartOfDay(endDate) - toStartOfDay(startDate)) / oneDay);
}

function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function getMonthlyOccurrenceDate(year, monthIndex, dayOfMonth) {
  const safeDay = Math.min(dayOfMonth, daysInMonth(year, monthIndex));
  return new Date(year, monthIndex, safeDay);
}

function countRecurringOccurrencesInRange(recurringExpense, rangeStart, rangeEnd) {
  const startDate = parseLocalDate(recurringExpense.startDate);
  const normalizedStartDate = toStartOfDay(startDate);
  const normalizedRangeStart = toStartOfDay(rangeStart);
  const normalizedRangeEnd = toStartOfDay(rangeEnd);

  if (normalizedStartDate > normalizedRangeEnd) {
    return 0;
  }

  if (recurringExpense.frequency === "daily") {
    const effectiveStart = normalizedStartDate > normalizedRangeStart ? normalizedStartDate : normalizedRangeStart;
    return daysBetween(effectiveStart, normalizedRangeEnd) + 1;
  }

  if (recurringExpense.frequency === "weekly") {
    let firstOccurrence = normalizedStartDate;

    if (firstOccurrence < normalizedRangeStart) {
      const diff = daysBetween(firstOccurrence, normalizedRangeStart);
      const weeksToSkip = Math.ceil(diff / 7);
      firstOccurrence = addDays(firstOccurrence, weeksToSkip * 7);
    }

    if (firstOccurrence > normalizedRangeEnd) {
      return 0;
    }

    return Math.floor(daysBetween(firstOccurrence, normalizedRangeEnd) / 7) + 1;
  }

  if (recurringExpense.frequency === "monthly") {
    const dayOfMonth = normalizedStartDate.getDate();
    let year = normalizedStartDate.getFullYear();
    let month = normalizedStartDate.getMonth();
    let occurrence = getMonthlyOccurrenceDate(year, month, dayOfMonth);
    let total = 0;

    while (occurrence < normalizedRangeStart) {
      month += 1;
      if (month > 11) {
        month = 0;
        year += 1;
      }
      occurrence = getMonthlyOccurrenceDate(year, month, dayOfMonth);
    }

    while (occurrence <= normalizedRangeEnd) {
      if (occurrence >= normalizedStartDate) {
        total += 1;
      }
      month += 1;
      if (month > 11) {
        month = 0;
        year += 1;
      }
      occurrence = getMonthlyOccurrenceDate(year, month, dayOfMonth);
    }

    return total;
  }

  return 0;
}

function getCurrentMonthRangeEnd() {
  return toStartOfDay(new Date());
}

function buildRecurringOccurrencesForRange(rangeStart, rangeEnd) {
  const occurrences = [];

  state.recurringExpenses.forEach((recurringExpense) => {
    const count = countRecurringOccurrencesInRange(recurringExpense, rangeStart, rangeEnd);
    for (let index = 0; index < count; index += 1) {
      occurrences.push({
        amount: Number(recurringExpense.amount),
        category: recurringExpense.name,
        date: rangeEnd.toISOString(),
        isRecurring: true
      });
    }
  });

  return occurrences;
}

function getRecurringTotalThroughDate(endDate) {
  return state.recurringExpenses.reduce((sum, recurringExpense) => {
    const occurrences = countRecurringOccurrencesInRange(
      recurringExpense,
      parseLocalDate(recurringExpense.startDate),
      endDate
    );
    return sum + occurrences * Number(recurringExpense.amount);
  }, 0);
}

function saveSelectedCurrency() {
  localStorage.setItem(CURRENCY_STORAGE_KEY, selectedCurrency);
}

function loadSelectedCurrency() {
  const storedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
  if (storedCurrency && CURRENCIES[storedCurrency]) {
    selectedCurrency = storedCurrency;
  }
}

function getMonthlyExpenses() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthStart = new Date(year, month, 1);
  const monthEnd = getCurrentMonthRangeEnd();

  const oneTimeExpenses = state.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
  });

  const recurringOccurrences = buildRecurringOccurrencesForRange(monthStart, monthEnd);
  return [...oneTimeExpenses, ...recurringOccurrences];
}

function getTopCategory(expenses) {
  if (!expenses.length) return "No expenses yet";

  const categories = {};
  expenses.forEach((expense) => {
    const key = expense.category.trim() || "Other";
    categories[key] = (categories[key] || 0) + Number(expense.amount);
  });

  const [category, amount] = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
  return `${category} (${formatCurrency(amount)})`;
}

function getSavingsStatus(income, monthlyExpenseTotal) {
  if (income <= 0) {
    return "Add monthly income to calculate savings status";
  }

  const savings = income - monthlyExpenseTotal;
  if (savings > 0) {
    return `✅ On track: You are saving ${formatCurrency(savings)} this month.`;
  }

  if (savings === 0) {
    return "⚖️ Break-even: Income and expenses are currently equal.";
  }

  return `⚠️ Overspending: You are over budget by ${formatCurrency(Math.abs(savings))}.`;
}

function getHighestSpendingCategory(expenses) {
  if (!expenses.length) {
    return null;
  }

  const categoryTotals = {};
  expenses.forEach((expense) => {
    const category = expense.category.trim() || "Other";
    categoryTotals[category] = (categoryTotals[category] || 0) + Number(expense.amount);
  });

  const [topCategory, topAmount] = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  return { name: topCategory, amount: topAmount };
}

function getSavingsLevel(income, monthlyExpenseTotal) {
  if (income <= 0) {
    return "average";
  }

  const savingsRate = ((income - monthlyExpenseTotal) / income) * 100;

  if (savingsRate >= 20) return "good";
  if (savingsRate >= 10) return "average";
  return "low";
}

function getSavingSuggestion(topCategory) {
  if (!topCategory) {
    return "Add a few expenses this month to get a personalized saving suggestion.";
  }

  return `You can save more by reducing ${topCategory.name} expenses.`;
}

function getDailyTipIndex(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const normalizedDate = new Date(year, month, day);
  const daysSinceEpoch = Math.floor(normalizedDate.getTime() / (24 * 60 * 60 * 1000));
  return daysSinceEpoch % DAILY_TIPS.length;
}

function renderDailyTip() {
  if (!dailyTipTextElement || !DAILY_TIPS.length) return;
  const tipIndex = getDailyTipIndex();
  dailyTipTextElement.textContent = DAILY_TIPS[tipIndex];
}

function getWeekIndex(date = new Date()) {
  const year = date.getFullYear();
  const normalizedDate = new Date(year, date.getMonth(), date.getDate());
  const yearStart = new Date(year, 0, 1);
  const daysSinceYearStart = Math.floor((normalizedDate - yearStart) / (24 * 60 * 60 * 1000));
  return Math.floor(daysSinceYearStart / 7);
}

function getMonthIndex(date = new Date()) {
  return date.getMonth();
}

function renderGrowthEngagement() {
  renderDailyTip();

  if (weeklyChallengeTextElement && WEEKLY_CHALLENGES.length) {
    const weeklyChallengeIndex = getWeekIndex() % WEEKLY_CHALLENGES.length;
    weeklyChallengeTextElement.textContent = WEEKLY_CHALLENGES[weeklyChallengeIndex];
  }

  if (monthlyGoalTextElement && MONTHLY_GOALS.length) {
    const monthlyGoalIndex = getMonthIndex() % MONTHLY_GOALS.length;
    monthlyGoalTextElement.textContent = MONTHLY_GOALS[monthlyGoalIndex];
  }
}

function renderSmartInsights(monthlyExpenses, monthlyExpenseTotal) {
  if (!insightTopCategoryElement || !insightMonthlyExpenseElement || !insightSavingsStatusElement || !insightSuggestionElement) {
    return;
  }

  const topCategory = getHighestSpendingCategory(monthlyExpenses);
  const savingsLevel = getSavingsLevel(state.income, monthlyExpenseTotal);

  insightTopCategoryElement.textContent = topCategory
    ? `Your highest spending category is ${topCategory.name}.`
    : "Your highest spending category is not available yet.";
  insightMonthlyExpenseElement.textContent = `Your total monthly expenses are ${formatCurrency(monthlyExpenseTotal)}.`;
  insightSavingsStatusElement.textContent = `Your savings are ${savingsLevel} this month.`;
  insightSuggestionElement.textContent = getSavingSuggestion(topCategory);
}

function renderRecentExpenses() {
  recentExpensesElement.innerHTML = "";

  if (!state.expenses.length) {
    recentExpensesElement.innerHTML = '<li class="empty-state">No expenses added yet.</li>';
    return;
  }

  const latestFive = [...state.expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  latestFive.forEach((expense) => {
    const item = document.createElement("li");
    const formattedDate = new Date(expense.date).toLocaleDateString();
    item.textContent = `${formattedDate} • ${expense.category} • ${formatCurrency(Number(expense.amount))}`;
    recentExpensesElement.appendChild(item);
  });
}

function renderRecurringExpenses() {
  recurringExpensesListElement.innerHTML = "";

  if (!state.recurringExpenses.length) {
    recurringExpensesListElement.innerHTML = '<li class="empty-state">No recurring expenses added yet.</li>';
    return;
  }

  state.recurringExpenses.forEach((recurringExpense) => {
    const item = document.createElement("li");
    item.textContent = `${recurringExpense.name} • ${formatCurrency(Number(recurringExpense.amount))} • ${recurringExpense.frequency}`;
    recurringExpensesListElement.appendChild(item);
  });
}

function renderDashboard() {
  const oneTimeTotalExpenses = state.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const recurringTotalExpenses = getRecurringTotalThroughDate(getCurrentMonthRangeEnd());
  const totalExpenses = oneTimeTotalExpenses + recurringTotalExpenses;
  const netSavings = state.income - totalExpenses;

  totalIncomeElement.textContent = formatCurrency(state.income);
  totalExpensesElement.textContent = formatCurrency(totalExpenses);
  netSavingsElement.textContent = formatCurrency(netSavings);

  netSavingsElement.classList.remove("positive", "negative");
  if (netSavings > 0) netSavingsElement.classList.add("positive");
  if (netSavings < 0) netSavingsElement.classList.add("negative");

  const monthlyExpenses = getMonthlyExpenses();
  const monthlyExpenseTotal = monthlyExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  monthlyExpensesValue.textContent = formatCurrency(monthlyExpenseTotal);
  topCategoryValue.textContent = getTopCategory(monthlyExpenses);
  savingsStatusValue.textContent = getSavingsStatus(state.income, monthlyExpenseTotal);
  renderSmartInsights(monthlyExpenses, monthlyExpenseTotal);
  renderGrowthEngagement();

  renderRecentExpenses();
  renderRecurringExpenses();
}

function setDefaultDate() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localDate = new Date(today.getTime() - offset * 60 * 1000)
    .toISOString()
    .split("T")[0];
  expenseDateInput.value = localDate;
}

function getAssistantResponse(question) {
  const q = question.toLowerCase();

  if (q.includes("save") || q.includes("saving") || q.includes("budget")) {
    return [
      "💡 Smart Saving Plan:",
      "1) Follow the 50-30-20 method (needs, wants, savings).",
      "2) Set an automatic transfer to savings on income day.",
      "3) Review your top expense category weekly.",
      "4) Reduce one non-essential cost every month."
    ].join("\n");
  }

  if (q.includes("business") || q.includes("startup") || q.includes("idea")) {
    return [
      "🚀 Beginner-Friendly Business Ideas:",
      "1) Niche online reselling (local products).",
      "2) Social media service for local stores.",
      "3) Digital products (templates, guides, mini-courses).",
      "4) Low-cost service business based on your current skill.",
      "Tip: Start with one idea and validate with 5 paying customers first."
    ].join("\n");
  }

  if (q.includes("income") || q.includes("earn") || q.includes("growth")) {
    return [
      "📈 Income Growth Tips:",
      "1) Increase prices gradually after improving value.",
      "2) Add one upsell or premium option.",
      "3) Build recurring revenue (subscription/retainer).",
      "4) Spend 30 minutes daily on lead generation.",
      "Small consistent growth beats one-time big jumps."
    ].join("\n");
  }

  if (q.includes("expense") || q.includes("spending") || q.includes("cost")) {
    return [
      "📉 Expense Control Strategy:",
      "1) Separate fixed and variable costs.",
      "2) Set category spending limits each month.",
      "3) Negotiate recurring vendor bills every quarter.",
      "4) Approve non-essential purchases only after 24 hours.",
      "Track changes in this dashboard to measure improvement."
    ].join("\n");
  }

  return "🤖 I can help with saving money, business ideas, income growth, and expense control. Ask a specific question to get a practical plan.";
}

function getBusinessAdvisorTemplate(type) {
  const templates = {
    clothing: {
      summary: "You are planning a clothing business. Start with one clear style or target audience to keep things simple.",
      steps: [
        "Pick one niche (for example: kidswear, office wear, or streetwear).",
        "Source 5-10 starter products from reliable suppliers.",
        "Test demand by selling to friends, community groups, or social media first.",
        "Set simple pricing that covers product cost, delivery, and profit.",
        "Collect feedback from first buyers and improve quickly."
      ],
      tips: [
        "Use clear size charts to reduce returns.",
        "Start with small inventory to avoid unsold stock.",
        "Share real photos and customer reviews for trust."
      ]
    },
    food: {
      summary: "You are planning a food business. Focus on quality, hygiene, and one strong menu concept.",
      steps: [
        "Choose a simple menu with 3-5 best items.",
        "Calculate food cost per item before setting prices.",
        "Get required local food permits and follow hygiene rules.",
        "Start with home delivery, pre-orders, or weekend stalls.",
        "Track popular items and remove slow sellers."
      ],
      tips: [
        "Consistency in taste matters more than a large menu.",
        "Use clean, practical packaging that keeps food fresh.",
        "Ask every customer for quick feedback and improve weekly."
      ]
    },
    online: {
      summary: "You are planning an online business. Begin with one problem to solve and one audience to serve.",
      steps: [
        "Define who your ideal customer is and what they struggle with.",
        "Create a simple offer (product, service, or digital download).",
        "Set up one sales channel first (social page or simple website).",
        "Post helpful content regularly to build trust and traffic.",
        "Measure clicks, inquiries, and sales every week."
      ],
      tips: [
        "Keep your message simple: problem, solution, benefit.",
        "Start small and improve based on customer behavior.",
        "Build an email or contact list from day one."
      ]
    },
    service: {
      summary: "You are planning a service business. Start with one skill-based service that delivers clear results.",
      steps: [
        "Choose one core service you can deliver confidently.",
        "Create a basic package with clear scope and pricing.",
        "Offer your service to your first 3-5 clients for proof and testimonials.",
        "Use a simple contract, timeline, and payment terms.",
        "Ask for referrals after each successful project."
      ],
      tips: [
        "Be very clear about what is included in your service.",
        "Good communication is as important as technical skill.",
        "Track time and profit per project to avoid underpricing."
      ]
    },
    general: {
      summary: "You have a business idea and want a clear beginner plan. Start small, test early, and learn from real customers.",
      steps: [
        "Write your idea in one sentence and define your target customer.",
        "List startup costs and choose a budget you can manage safely.",
        "Build a basic version of your offer and test it quickly.",
        "Talk to at least 10 potential customers and refine your idea.",
        "Track income, expenses, and feedback from day one."
      ],
      tips: [
        "Progress is better than perfection at the start.",
        "Keep costs low until you see consistent demand.",
        "Review your plan every month and adjust based on results."
      ]
    }
  };

  return templates[type] || templates.general;
}

function detectBusinessType(idea) {
  const text = idea.toLowerCase();

  if (text.includes("clothing")) return "clothing";
  if (text.includes("food")) return "food";
  if (text.includes("online business")) return "online";
  if (text.includes("service business")) return "service";

  return "general";
}

function renderBusinessAdvisorResponse(advice) {
  const stepsHtml = advice.steps.map((step) => `<li>${step}</li>`).join("");
  const tipsHtml = advice.tips.map((tip) => `<li>${tip}</li>`).join("");

  businessAdvisorResponseElement.innerHTML = `
    <section class="advisor-block">
      <h3>Basic Idea Summary</h3>
      <p>${advice.summary}</p>
    </section>
    <section class="advisor-block">
      <h3>Simple Steps to Start</h3>
      <ol>${stepsHtml}</ol>
    </section>
    <section class="advisor-block">
      <h3>Tips for Beginners</h3>
      <ul>${tipsHtml}</ul>
    </section>
  `;
}

function initTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      tabButtons.forEach((tab) => tab.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
}

function initCurrencySelector() {
  if (!currencySelect) return;
  currencySelect.value = selectedCurrency;

  currencySelect.addEventListener("change", (event) => {
    const nextCurrency = event.target.value;
    if (!CURRENCIES[nextCurrency]) return;

    selectedCurrency = nextCurrency;
    saveSelectedCurrency();
    renderDashboard();
  });
}

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(incomeAmountInput.value);
  if (Number.isNaN(amount) || amount < 0) return;

  state.income = amount;
  saveState();
  renderDashboard();
  incomeForm.reset();
});

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(expenseAmountInput.value);
  const category = expenseCategoryInput.value.trim();
  const date = expenseDateInput.value;

  if (Number.isNaN(amount) || amount < 0 || !category || !date) return;

  state.expenses.push({ amount, category, date });
  saveState();
  renderDashboard();
  expenseForm.reset();
  setDefaultDate();
});

recurringExpenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = recurringExpenseNameInput.value.trim();
  const amount = Number(recurringExpenseAmountInput.value);
  const frequency = recurringExpenseFrequencyInput.value;

  if (Number.isNaN(amount) || amount < 0 || !name || !["daily", "weekly", "monthly"].includes(frequency)) return;

  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localDate = new Date(today.getTime() - offset * 60 * 1000)
    .toISOString()
    .split("T")[0];

  state.recurringExpenses.push({
    name,
    amount,
    frequency,
    startDate: localDate
  });

  saveState();
  renderDashboard();
  recurringExpenseForm.reset();
});

assistantForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = assistantQuestionInput.value.trim();
  if (!question) return;

  assistantResponseElement.textContent = "Thinking... 🤖";

  setTimeout(() => {
    assistantResponseElement.textContent = getAssistantResponse(question);
  }, 300);
});

businessAdvisorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const idea = businessIdeaInput.value.trim();
  if (!idea) return;

  const businessType = detectBusinessType(idea);
  const advice = getBusinessAdvisorTemplate(businessType);
  renderBusinessAdvisorResponse(advice);
});

loadSelectedCurrency();
loadState();
setDefaultDate();
initTabs();
initCurrencySelector();
renderDashboard();
