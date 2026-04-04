import { login, logout, signup, watchAuthState } from "./auth.js";
import {
  clearUserData,
  loadUserData,
  saveExpenses,
  saveIncome,
  saveRecurring,
  saveSettings
} from "./firestore.js";

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

const els = Object.fromEntries([...document.querySelectorAll("[id]")].map((el) => [el.id, el]));
els.tabButtons = document.querySelectorAll(".tab-button");
els.tabPanels = document.querySelectorAll(".tab-panel");

const saveFormIds = ["incomeForm", "expenseForm", "recurringExpenseForm", "goalForm", "settingsForm", "resetDataButton"];

const todayYMD = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const parseYMD = (ymd) => {
  const [y, m, d] = (ymd || "").split("-").map(Number);
  return y && m && d ? new Date(y, m - 1, d) : null;
};
const fmt = (v) => new Intl.NumberFormat((CURRENCIES[settings.currency] || CURRENCIES.INR).locale, { style: "currency", currency: (CURRENCIES[settings.currency] || CURRENCIES.INR).code }).format(Number(v) || 0);
const updateStatus = (t) => { if (els.settingsStatusText) els.settingsStatusText.textContent = t; if (els.authMessage) els.authMessage.textContent = t; };

function setSaveEnabled(enabled) {
  saveFormIds.forEach((id) => {
    const el = els[id];
    if (!el) return;
    if (el.tagName === "BUTTON") el.disabled = !enabled;
    el.querySelectorAll?.("button[type='submit'], input, select").forEach((node) => {
      if (node.id === "authEmail" || node.id === "authPassword") return;
      node.disabled = !enabled;
    });
  });
  if (!enabled) updateStatus("Please log in to save your data");
}

async function persistAll() {
  if (!currentUser) {
    setSaveEnabled(false);
    return false;
  }
  await Promise.all([
    saveIncome(currentUser.uid, state.income),
    saveExpenses(currentUser.uid, state.expenses),
    saveRecurring(currentUser.uid, state.recurringExpenses),
    saveSettings(currentUser.uid, settings)
  ]);
  return true;
}

function countRecurringInMonth(expense, now) {
  const startDate = parseYMD(expense.startDate);
  if (!startDate || startDate > now) return 0;
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  let cursor = new Date(startDate);
  let count = 0;
  while (cursor <= now) {
    if (cursor >= monthStart) count += 1;
    cursor = expense.frequency === "daily" ? new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1)
      : expense.frequency === "weekly" ? new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 7)
      : new Date(cursor.getFullYear(), cursor.getMonth() + 1, startDate.getDate());
  }
  return count;
}

function monthlyExpenses() {
  const now = new Date();
  const oneTime = state.expenses.filter((e) => {
    const d = parseYMD(e.date) || new Date(e.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const recurring = state.recurringExpenses.flatMap((e) => Array.from({ length: countRecurringInMonth(e, now) }, () => ({ amount: e.amount, category: e.name, date: todayYMD() })));
  return [...oneTime, ...recurring];
}

function renderGoalUI() {
  const hasGoal = Boolean(settings.goal);
  const content = GOAL_CONTENT[settings.goal || DEFAULT_GOAL];
  if (els.selectedGoalDisplay) els.selectedGoalDisplay.textContent = hasGoal ? `Selected Goal: ${settings.goal}` : "Selected Goal: Not selected yet";
  if (els.goalForm) els.goalForm.classList.toggle("hidden", hasGoal);
  if (els.changeGoalButton) els.changeGoalButton.classList.toggle("hidden", !hasGoal);
  if (els.goalGuidanceSummary) els.goalGuidanceSummary.textContent = hasGoal ? content.summary : "Select a goal in Beginner Mode to see focused guidance.";
  if (els.goalTipsList) {
    els.goalTipsList.innerHTML = hasGoal ? content.tips.map((tip) => `<li>${tip}</li>`).join("") : '<li class="empty-state">No goal selected yet.</li>';
  }
  const now = new Date();
  if (els.dailyTipText) els.dailyTipText.textContent = content.dailyTips[Math.floor(Date.now() / 86400000) % content.dailyTips.length];
  if (els.weeklyChallengeText) els.weeklyChallengeText.textContent = content.weeklyChallenges[Math.floor(((now - new Date(now.getFullYear(), 0, 1)) / 86400000) / 7) % content.weeklyChallenges.length];
  if (els.monthlyGoalText) els.monthlyGoalText.textContent = content.monthlyGoals[now.getMonth() % content.monthlyGoals.length];
}

function renderDashboard() {
  const oneTimeTotal = state.expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const recurringTotal = state.recurringExpenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const total = oneTimeTotal + recurringTotal;
  const net = state.income - total;
  if (els.totalIncome) els.totalIncome.textContent = fmt(state.income);
  if (els.totalExpenses) els.totalExpenses.textContent = fmt(total);
  if (els.netSavings) els.netSavings.textContent = fmt(net);

  const month = monthlyExpenses();
  const monthTotal = month.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const byCat = {};
  month.forEach((e) => { const k = e.category || "Other"; byCat[k] = (byCat[k] || 0) + (Number(e.amount) || 0); });
  const top = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
  const topText = top ? `${top[0]} (${fmt(top[1])})` : "No expenses yet";
  if (els.monthlyExpensesValue) els.monthlyExpensesValue.textContent = fmt(monthTotal);
  if (els.topCategoryValue) els.topCategoryValue.textContent = topText;
  if (els.savingsStatusValue) els.savingsStatusValue.textContent = state.income <= 0 ? "Add monthly income to calculate savings status" : net >= 0 ? `✅ On track: You are saving ${fmt(Math.max(state.income - monthTotal, 0))} this month.` : `⚠️ Overspending: You are over budget by ${fmt(Math.abs(state.income - monthTotal))}.`;

  if (els.recentExpenses) els.recentExpenses.innerHTML = state.expenses.length ? [...state.expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((e) => `<li>${new Date(e.date).toLocaleDateString()} • ${e.category} • ${fmt(e.amount)}</li>`).join("") : '<li class="empty-state">No expenses added yet.</li>';
  if (els.recurringExpensesList) els.recurringExpensesList.innerHTML = state.recurringExpenses.length ? state.recurringExpenses.map((e) => `<li>${e.name} • ${fmt(e.amount)} • ${e.frequency}</li>`).join("") : '<li class="empty-state">No recurring expenses added yet.</li>';

  if (els.insightTopCategory) els.insightTopCategory.textContent = top ? `Your highest spending category is ${top[0]}.` : "Your highest spending category is not available yet.";
  if (els.insightMonthlyExpense) els.insightMonthlyExpense.textContent = `Your total monthly expenses are ${fmt(monthTotal)}.`;
  if (els.insightSavingsStatus) els.insightSavingsStatus.textContent = els.savingsStatusValue?.textContent || "";
  if (els.insightSuggestion) els.insightSuggestion.textContent = top ? `You can save more by reviewing and reducing ${top[0]} expenses.` : "Add expenses to get a saving suggestion.";
  renderGoalUI();
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

  els.authSignupButton?.addEventListener("click", async () => {
    try {
      await signup(els.authEmail.value.trim(), els.authPassword.value);
      updateStatus("Account created and logged in.");
    } catch (error) {
      updateStatus(`Signup failed: ${error.message}`);
    }
  });

  els.authLoginButton?.addEventListener("click", async () => {
    try {
      await login(els.authEmail.value.trim(), els.authPassword.value);
      updateStatus("Logged in successfully.");
    } catch (error) {
      updateStatus(`Login failed: ${error.message}`);
    }
  });

  els.authLogoutButton?.addEventListener("click", async () => {
    await logout();
    updateStatus("Logged out.");
  });

  els.incomeForm?.addEventListener("submit", async (e) => { e.preventDefault(); state.income = Number(els.incomeAmount.value) || 0; if (await persistAll()) renderDashboard(); });
  els.expenseForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    state.expenses.push({ amount: Number(els.expenseAmount.value), category: els.expenseCategory.value.trim(), date: els.expenseDate.value });
    if (await persistAll()) { renderDashboard(); els.expenseForm.reset(); els.expenseDate.value = todayYMD(); }
  });
  els.recurringExpenseForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    state.recurringExpenses.push({ name: els.recurringExpenseName.value.trim(), amount: Number(els.recurringExpenseAmount.value), frequency: els.recurringExpenseFrequency.value, startDate: todayYMD() });
    if (await persistAll()) { renderDashboard(); els.recurringExpenseForm.reset(); }
  });

  els.goalForm?.addEventListener("submit", async (e) => { e.preventDefault(); settings.goal = els.goalSelect.value || DEFAULT_GOAL; if (await persistAll()) renderDashboard(); });
  els.changeGoalButton?.addEventListener("click", async () => { settings.goal = ""; if (await persistAll()) renderDashboard(); });
  els.settingsForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    settings.currency = CURRENCIES[els.currencySelect.value] ? els.currencySelect.value : "INR";
    settings.goal = GOAL_CONTENT[els.settingsGoalSelect.value] ? els.settingsGoalSelect.value : "";
    if (await persistAll()) { renderDashboard(); updateStatus("Settings saved."); }
  });

  els.resetDataButton?.addEventListener("click", async () => {
    if (!currentUser) return;
    state.income = 0; state.expenses = []; state.recurringExpenses = []; settings.currency = "INR"; settings.goal = "";
    await clearUserData(currentUser.uid);
    renderDashboard();
    updateStatus("Data reset complete.");
  });

  els.assistantForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = els.assistantQuestion.value.toLowerCase();
    els.assistantResponse.textContent = q.includes("save") ? "💡 Track expenses daily and set one fixed monthly savings amount." : q.includes("expense") ? "📉 Review top categories weekly and reduce one non-essential cost." : q.includes("business") ? "🚀 Start with one small offer and validate with real customers." : q.includes("income") ? "📈 Improve value, raise pricing carefully, and add one recurring offer." : "🤖 Ask about saving, expenses, income growth, or business ideas.";
  });

  els.businessAdvisorForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = els.businessIdeaInput.value.trim();
    if (!text) return;
    els.businessAdvisorResponse.innerHTML = `<section class="advisor-block"><h3>Basic Idea Summary</h3><p>Your input: ${text}</p></section>`;
  });

  els.ideaGeneratorForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const category = els.ideaCategorySelect.value || "all";
    const pool = category === "all" ? Object.values(IDEA_LIBRARY).flat() : (IDEA_LIBRARY[category] || []);
    els.generatedIdeaText.textContent = pool[Math.floor(Math.random() * pool.length)] || "No ideas available right now.";
  });
}

function initAuthListener() {
  watchAuthState(async (user) => {
    currentUser = user;
    if (!user) {
      state.income = 0; state.expenses = []; state.recurringExpenses = []; settings.currency = "INR"; settings.goal = "";
      if (els.authUserState) els.authUserState.textContent = "Not logged in";
      setSaveEnabled(false);
      renderDashboard();
      return;
    }

    if (els.authUserState) els.authUserState.textContent = `Logged in as ${user.email}`;
    setSaveEnabled(true);

    const remote = await loadUserData(user.uid);
    state.income = Number(remote.income) || 0;
    state.expenses = Array.isArray(remote.expenses) ? remote.expenses : [];
    state.recurringExpenses = Array.isArray(remote.recurringExpenses) ? remote.recurringExpenses : [];
    settings.currency = CURRENCIES[remote.settings?.currency] ? remote.settings.currency : "INR";
    settings.goal = GOAL_CONTENT[remote.settings?.goal] ? remote.settings.goal : "";

    if (els.currencySelect) els.currencySelect.value = settings.currency;
    if (els.settingsGoalSelect) els.settingsGoalSelect.value = settings.goal || DEFAULT_GOAL;
    if (els.goalSelect) els.goalSelect.value = settings.goal || DEFAULT_GOAL;

    updateStatus("Data loaded from cloud storage.");
    renderDashboard();
  });
}

function init() {
  initTabs();
  initForms();
  initAuthListener();
  renderDashboard();
}

init();
