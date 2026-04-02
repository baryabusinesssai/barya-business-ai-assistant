const STORAGE_KEY = "barya-finance-data-v1";

const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

const incomeForm = document.getElementById("incomeForm");
const expenseForm = document.getElementById("expenseForm");
const assistantForm = document.getElementById("assistantForm");

const incomeAmountInput = document.getElementById("incomeAmount");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseCategoryInput = document.getElementById("expenseCategory");
const expenseDateInput = document.getElementById("expenseDate");
const assistantQuestionInput = document.getElementById("assistantQuestion");

const totalIncomeElement = document.getElementById("totalIncome");
const totalExpensesElement = document.getElementById("totalExpenses");
const netSavingsElement = document.getElementById("netSavings");
const monthlyExpensesValue = document.getElementById("monthlyExpensesValue");
const topCategoryValue = document.getElementById("topCategoryValue");
const savingsStatusValue = document.getElementById("savingsStatusValue");
const recentExpensesElement = document.getElementById("recentExpenses");
const assistantResponseElement = document.getElementById("assistantResponse");

const state = {
  income: 0,
  expenses: []
};

function formatCurrency(value) {
  return `₹${value.toFixed(2)}`;
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
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function getMonthlyExpenses() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  return state.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
  });
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

function renderDashboard() {
  const totalExpenses = state.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
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

  renderRecentExpenses();
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

assistantForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = assistantQuestionInput.value.trim();
  if (!question) return;

  assistantResponseElement.textContent = "Thinking... 🤖";

  setTimeout(() => {
    assistantResponseElement.textContent = getAssistantResponse(question);
  }, 300);
});

loadState();
setDefaultDate();
initTabs();
renderDashboard();
