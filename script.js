import { signup, login, logout, watchAuthState } from "./auth.js";
import { loadUserData, saveUserData } from "./firestore.js";

const CURRENCIES = {
  INR: { locale: "en-IN", code: "INR" },
  USD: { locale: "en-US", code: "USD" },
  EUR: { locale: "de-DE", code: "EUR" }
};

const DEFAULT_GOAL = "Save Money";

const GOAL_CONTENT = {
  "Save Money": {
    summary: "Focus on spending less, tracking expenses, and building savings step by step.",
    tips: ["Track every expense daily, even small purchases.", "Set a spending limit for one category each week.", "Move a fixed amount to savings as soon as income arrives."],
    dailyTips: ["Track one expense immediately after spending.", "Skip one non-essential purchase today.", "Check your wallet and note where money went."],
    weeklyChallenges: ["Stay under your spending limit in one category this week.", "Review last week expenses and cut one unnecessary cost.", "Save the amount of one skipped purchase."],
    monthlyGoals: ["Save a fixed amount this month and keep it untouched.", "Reduce total monthly expenses by at least 5%.", "Build your emergency savings with one extra contribution."]
  },
  "Start a Business": {
    summary: "Focus on validating ideas, understanding customers, and taking small low-risk business steps.",
    tips: ["Write your idea in one sentence and who it helps.", "Talk to at least 3 potential customers this week.", "Start with a low-cost version before spending heavily."],
    dailyTips: ["Write one problem your business can solve.", "Spend 20 minutes researching your target customer.", "Note one competitor and what they do well."],
    weeklyChallenges: ["Share your idea with 3 people and collect feedback.", "Create a one-page offer for your service or product.", "Plan startup costs and remove one non-essential expense."],
    monthlyGoals: ["Get your first paying customer this month.", "Test one marketing channel and track results.", "Create a small starter budget and follow it."]
  },
  "Learn Finance": {
    summary: "Focus on understanding basic money concepts, budgeting, and practical financial habits.",
    tips: ["Learn one finance term each day.", "Review income and expenses once a week to see patterns.", "Use simple rules like needs, wants, and savings."],
    dailyTips: ["Read one short lesson about a finance basic.", "Classify one expense as need or want.", "Check today's total spending before the day ends."],
    weeklyChallenges: ["Create a weekly budget and compare actual spending.", "Calculate your savings rate for this week.", "List three areas where you can reduce spending."],
    monthlyGoals: ["Finish one beginner finance learning plan this month.", "Track all spending categories for the full month.", "Set one realistic savings target and review progress."]
  }
};

const IDEA_LIBRARY = {
  lowInvestment: ["Start a home-based snack business", "Offer mobile phone photography services for local shops", "Start a local errand and delivery service"],
  onlineEarning: ["Sell products on Instagram", "Freelancing in graphic design", "Online tutoring"],
  smallBusiness: ["Start a custom gift packaging business", "Open a neighborhood tiffin service", "Begin a home-based tailoring service"]
};

const state = { income: 0, expenses: [], recurringExpenses: [] };
const settings = { currency: "INR", goal: "" };
let currentUser = null;

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
  authEmail: document.getElementById("authEmail"),
  authPassword: document.getElementById("authPassword"),
  signupButton: document.getElementById("signupButton"),
  loginButton: document.getElementById("loginButton"),
  logoutButton: document.getElementById("logoutButton"),
  authStatus: document.getElementById("authStatus"),
  saveNotice: document.getElementById("saveNotice")
};

function todayYMD() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}
const parseYMDToDate = (ymd) => {
  const [y, m, d] = (ymd || "").split("-").map(Number);
  return y && m && d ? new Date(y, m - 1, d) : null;
};
const formatCurrency = (value) => new Intl.NumberFormat((CURRENCIES[settings.currency] || CURRENCIES.INR).locale, { style: "currency", currency: (CURRENCIES[settings.currency] || CURRENCIES.INR).code }).format(Number(value) || 0);
const updateStatus = (text) => els.settingsStatusText && (els.settingsStatusText.textContent = text);

function setSavingEnabled(enabled) {
  [els.incomeForm, els.expenseForm, els.recurringExpenseForm, els.goalForm, els.settingsForm, els.resetDataButton].forEach((form) => {
    if (!form) return;
    form.querySelectorAll("input, select, button").forEach((el) => {
      if (el.id !== "loginButton" && el.id !== "signupButton" && el.id !== "logoutButton") el.disabled = !enabled;
    });
  });
  if (els.resetDataButton) els.resetDataButton.disabled = !enabled;
  if (els.saveNotice) els.saveNotice.textContent = enabled ? "Cloud save is enabled." : "Please log in to save your data";
}

async function persistAll() {
  if (!currentUser) {
    updateStatus("Please log in to save your data");
    return;
  }
  await saveUserData(currentUser.uid, state, settings);
}

function countRecurringOccurrencesInRange(recurringExpense, rangeStart, rangeEnd) {
  const start = parseYMDToDate(recurringExpense.startDate) || rangeStart;
  let current = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  let count = 0;
  while (current <= rangeEnd) {
    if (current >= rangeStart) count += 1;
    if (recurringExpense.frequency === "daily") current.setDate(current.getDate() + 1);
    else if (recurringExpense.frequency === "weekly") current.setDate(current.getDate() + 7);
    else current.setMonth(current.getMonth() + 1);
  }
  return count;
}

function getCurrentMonthExpenses() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const oneTime = state.expenses.filter((e) => {
    const d = parseYMDToDate(e.date) || new Date(e.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const recurring = [];
  state.recurringExpenses.forEach((e) => {
    const occurrences = countRecurringOccurrencesInRange(e, monthStart, now);
    for (let i = 0; i < occurrences; i += 1) recurring.push({ amount: Number(e.amount) || 0, category: e.name || "Recurring", date: todayYMD() });
  });
  return [...oneTime, ...recurring];
}

function getTopCategory(expenses) {
  if (!expenses.length) return "No expenses yet";
  const totals = {};
  expenses.forEach((e) => {
    const k = (e.category || "Other").trim() || "Other";
    totals[k] = (totals[k] || 0) + (Number(e.amount) || 0);
  });
  const [name, amount] = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  return `${name} (${formatCurrency(amount)})`;
}

function getSavingsStatus(income, expenseTotal) {
  if (income <= 0) return "Add monthly income to calculate savings status";
  const diff = income - expenseTotal;
  if (diff > 0) return `✅ On track: You are saving ${formatCurrency(diff)} this month.`;
  if (diff === 0) return "⚖️ Break-even: Income and expenses are equal this month.";
  return `⚠️ Overspending: You are over budget by ${formatCurrency(Math.abs(diff))}.`;
}

function renderGoalUI() {
  const hasGoal = Boolean(settings.goal);
  const content = GOAL_CONTENT[settings.goal || DEFAULT_GOAL];
  if (els.selectedGoalDisplay) els.selectedGoalDisplay.textContent = hasGoal ? `Selected Goal: ${settings.goal}` : "Selected Goal: Not selected yet";
  if (els.goalForm) els.goalForm.classList.toggle("hidden", hasGoal);
  if (els.changeGoalButton) els.changeGoalButton.classList.toggle("hidden", !hasGoal);
  if (els.goalGuidanceSummary) els.goalGuidanceSummary.textContent = hasGoal ? content.summary : "Select a goal in Beginner Mode to see focused guidance.";
  if (els.goalTipsList) {
    els.goalTipsList.innerHTML = hasGoal ? content.tips.map((t) => `<li>${t}</li>`).join("") : '<li class="empty-state">No goal selected yet.</li>';
  }
  const now = new Date();
  if (els.dailyTipText) els.dailyTipText.textContent = content.dailyTips[Math.floor(Date.now() / 86400000) % content.dailyTips.length];
  if (els.weeklyChallengeText) els.weeklyChallengeText.textContent = content.weeklyChallenges[Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 86400000)) % content.weeklyChallenges.length];
  if (els.monthlyGoalText) els.monthlyGoalText.textContent = content.monthlyGoals[now.getMonth() % content.monthlyGoals.length];
}

function renderDashboard() {
  const recurringTotal = state.recurringExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const oneTimeTotal = state.expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const totalExpense = oneTimeTotal + recurringTotal;
  if (els.totalIncome) els.totalIncome.textContent = formatCurrency(state.income);
  if (els.totalExpenses) els.totalExpenses.textContent = formatCurrency(totalExpense);
  if (els.netSavings) els.netSavings.textContent = formatCurrency(state.income - totalExpense);

  const monthly = getCurrentMonthExpenses();
  const monthlyTotal = monthly.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const topText = getTopCategory(monthly);
  if (els.monthlyExpensesValue) els.monthlyExpensesValue.textContent = formatCurrency(monthlyTotal);
  if (els.topCategoryValue) els.topCategoryValue.textContent = topText;
  if (els.savingsStatusValue) els.savingsStatusValue.textContent = getSavingsStatus(state.income, monthlyTotal);
  if (els.insightTopCategory) els.insightTopCategory.textContent = monthly.length ? `Your highest spending category is ${topText.split(" (")[0]}.` : "Your highest spending category is not available yet.";
  if (els.insightMonthlyExpense) els.insightMonthlyExpense.textContent = `Your total monthly expenses are ${formatCurrency(monthlyTotal)}.`;
  if (els.insightSavingsStatus) els.insightSavingsStatus.textContent = getSavingsStatus(state.income, monthlyTotal);
  if (els.insightSuggestion) els.insightSuggestion.textContent = monthly.length ? `You can save more by reviewing and reducing ${topText.split(" (")[0]} expenses.` : "Add expenses to get a saving suggestion.";

  if (els.recentExpenses) {
    els.recentExpenses.innerHTML = state.expenses.length
      ? [...state.expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((e) => `<li>${new Date(e.date).toLocaleDateString()} • ${e.category} • ${formatCurrency(e.amount)}</li>`).join("")
      : '<li class="empty-state">No expenses added yet.</li>';
  }
  if (els.recurringExpensesList) {
    els.recurringExpensesList.innerHTML = state.recurringExpenses.length
      ? state.recurringExpenses.map((e) => `<li>${e.name} • ${formatCurrency(e.amount)} • ${e.frequency}</li>`).join("")
      : '<li class="empty-state">No recurring expenses added yet.</li>';
  }
  renderGoalUI();
}

function getAssistantResponse(q) {
  const text = q.toLowerCase();
  if (text.includes("save") || text.includes("budget")) return "💡 Track expenses daily and set one fixed monthly savings amount.";
  if (text.includes("expense") || text.includes("cost")) return "📉 Review top categories weekly and reduce one non-essential cost.";
  if (text.includes("business") || text.includes("idea") || text.includes("startup")) return "🚀 Start with one small offer and validate with real customers.";
  if (text.includes("income") || text.includes("earn") || text.includes("growth")) return "📈 Improve value, raise pricing carefully, and add one recurring offer.";
  return "🤖 Ask about saving, expenses, income growth, or business ideas.";
}

function initTabs() {
  els.tabButtons.forEach((button) => button.addEventListener("click", () => {
    const target = button.dataset.tab;
    els.tabButtons.forEach((b) => b.classList.remove("active"));
    els.tabPanels.forEach((p) => p.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(target)?.classList.add("active");
  }));
}

function initForms() {
  if (els.expenseDate) els.expenseDate.value = todayYMD();

  els.incomeForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    state.income = Number(els.incomeAmount?.value) || 0;
    await persistAll();
    renderDashboard();
  });

  els.expenseForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const amount = Number(els.expenseAmount?.value);
    const category = els.expenseCategory?.value.trim();
    const date = els.expenseDate?.value;
    if (!category || Number.isNaN(amount) || amount < 0 || !date) return;
    state.expenses.push({ amount, category, date });
    await persistAll();
    renderDashboard();
    els.expenseForm.reset();
    if (els.expenseDate) els.expenseDate.value = todayYMD();
  });

  els.recurringExpenseForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = els.recurringExpenseName?.value.trim();
    const amount = Number(els.recurringExpenseAmount?.value);
    const frequency = els.recurringExpenseFrequency?.value;
    if (!name || Number.isNaN(amount) || amount < 0 || !["daily", "weekly", "monthly"].includes(frequency)) return;
    state.recurringExpenses.push({ name, amount, frequency, startDate: todayYMD() });
    await persistAll();
    renderDashboard();
    els.recurringExpenseForm.reset();
  });

  els.goalForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    settings.goal = els.goalSelect?.value || DEFAULT_GOAL;
    await persistAll();
    renderDashboard();
    updateStatus("Goal saved.");
  });

  els.changeGoalButton?.addEventListener("click", async () => {
    settings.goal = "";
    await persistAll();
    renderDashboard();
  });

  els.settingsForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (els.currencySelect?.value && CURRENCIES[els.currencySelect.value]) settings.currency = els.currencySelect.value;
    if (els.settingsGoalSelect?.value && GOAL_CONTENT[els.settingsGoalSelect.value]) settings.goal = els.settingsGoalSelect.value;
    await persistAll();
    renderDashboard();
    updateStatus("Settings saved.");
  });

  els.resetDataButton?.addEventListener("click", async () => {
    state.income = 0;
    state.expenses = [];
    state.recurringExpenses = [];
    settings.currency = "INR";
    settings.goal = "";
    if (currentUser) await persistAll();
    renderDashboard();
  });

  els.assistantForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = els.assistantQuestion?.value.trim();
    if (question && els.assistantResponse) els.assistantResponse.textContent = getAssistantResponse(question);
  });

  els.businessAdvisorForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = els.businessIdeaInput?.value.trim();
    if (!text || !els.businessAdvisorResponse) return;
    els.businessAdvisorResponse.innerHTML = `<section class="advisor-block"><h3>Basic Idea Summary</h3><p>Great start: ${text}</p></section>`;
  });

  els.ideaGeneratorForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const category = els.ideaCategorySelect?.value || "all";
    const all = Object.values(IDEA_LIBRARY).flat();
    const pool = category === "all" ? all : IDEA_LIBRARY[category] || [];
    if (els.generatedIdeaText) els.generatedIdeaText.textContent = pool[Math.floor(Math.random() * pool.length)] || "No ideas available right now.";
  });
}

function initAuth() {
  els.signupButton?.addEventListener("click", async () => {
    try {
      await signup(els.authEmail.value.trim(), els.authPassword.value);
      els.authStatus.textContent = "Signup successful.";
    } catch (error) {
      els.authStatus.textContent = error.message;
    }
  });

  els.loginButton?.addEventListener("click", async () => {
    try {
      await login(els.authEmail.value.trim(), els.authPassword.value);
      els.authStatus.textContent = "Login successful.";
    } catch (error) {
      els.authStatus.textContent = error.message;
    }
  });

  els.logoutButton?.addEventListener("click", async () => {
    await logout();
  });

  watchAuthState(async (user) => {
    currentUser = user;
    const isLoggedIn = Boolean(user);
    setSavingEnabled(isLoggedIn);
    if (els.logoutButton) els.logoutButton.disabled = !isLoggedIn;
    if (els.authStatus) els.authStatus.textContent = isLoggedIn ? `Logged in as ${user.email}` : "Not logged in.";

    if (!isLoggedIn) {
      state.income = 0;
      state.expenses = [];
      state.recurringExpenses = [];
      settings.currency = "INR";
      settings.goal = "";
      renderDashboard();
      return;
    }

    // Auto-load cloud data immediately after login, then refresh the UI.
    const remote = await loadUserData(user.uid);
    state.income = Number(remote.income) || 0;
    state.expenses = Array.isArray(remote.expenses) ? remote.expenses : [];
    state.recurringExpenses = Array.isArray(remote.recurringExpenses) ? remote.recurringExpenses : [];
    settings.currency = CURRENCIES[remote.settings.currency] ? remote.settings.currency : "INR";
    settings.goal = GOAL_CONTENT[remote.settings.goal] ? remote.settings.goal : "";
    if (els.currencySelect) els.currencySelect.value = settings.currency;
    if (els.goalSelect) els.goalSelect.value = settings.goal || DEFAULT_GOAL;
    if (els.settingsGoalSelect) els.settingsGoalSelect.value = settings.goal || DEFAULT_GOAL;
    renderDashboard();
  });
}

function init() {
  initTabs();
  initForms();
  initAuth();
  setSavingEnabled(false);
  renderDashboard();
}

init();
