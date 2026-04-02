const STORAGE_KEYS = {
  monthlyIncome: "barya_monthly_income",
  expenses: "barya_expenses"
};

const incomeForm = document.getElementById("incomeForm");
const expenseForm = document.getElementById("expenseForm");
const incomeAmountInput = document.getElementById("incomeAmount");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseCategoryInput = document.getElementById("expenseCategory");
const expenseDateInput = document.getElementById("expenseDate");

const totalIncomeElement = document.getElementById("totalIncome");
const totalExpensesElement = document.getElementById("totalExpenses");
const netSavingsElement = document.getElementById("netSavings");
const monthlyOverviewElement = document.getElementById("monthlyOverview");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(value);
}

function getMonthlyIncome() {
  const savedIncome = Number(localStorage.getItem(STORAGE_KEYS.monthlyIncome));
  return Number.isFinite(savedIncome) && savedIncome >= 0 ? savedIncome : 0;
}

function getExpenses() {
  try {
    const savedExpenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.expenses));
    return Array.isArray(savedExpenses) ? savedExpenses : [];
  } catch {
    return [];
  }
}

function saveMonthlyIncome(amount) {
  localStorage.setItem(STORAGE_KEYS.monthlyIncome, String(amount));
}

function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEYS.expenses, JSON.stringify(expenses));
}

function getCurrentMonthExpenses(expenses) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  return expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  });
}

function updateDashboard() {
  const monthlyIncome = getMonthlyIncome();
  const expenses = getExpenses();
  const currentMonthExpenses = getCurrentMonthExpenses(expenses);

  const totalExpenses = currentMonthExpenses.reduce((sum, item) => sum + item.amount, 0);
  const netSavings = monthlyIncome - totalExpenses;

  totalIncomeElement.textContent = formatCurrency(monthlyIncome);
  totalExpensesElement.textContent = formatCurrency(totalExpenses);
  netSavingsElement.textContent = formatCurrency(netSavings);

  netSavingsElement.classList.toggle("positive", netSavings >= 0);
  netSavingsElement.classList.toggle("negative", netSavings < 0);

  const currentMonthLabel = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric"
  });

  if (monthlyIncome === 0 && totalExpenses === 0) {
    monthlyOverviewElement.textContent =
      "No financial data yet. Add income and expenses to see your monthly summary.";
    return;
  }

  const categorySummary = currentMonthExpenses.reduce((summary, expense) => {
    summary[expense.category] = (summary[expense.category] || 0) + expense.amount;
    return summary;
  }, {});

  const topCategory = Object.entries(categorySummary).sort((a, b) => b[1] - a[1])[0];
  const topCategoryText = topCategory
    ? `Top spending category: ${topCategory[0]} (${formatCurrency(topCategory[1])}).`
    : "No expenses added this month.";

  monthlyOverviewElement.textContent = `${currentMonthLabel} summary: Income ${formatCurrency(
    monthlyIncome
  )}, Expenses ${formatCurrency(totalExpenses)}, Net Savings ${formatCurrency(netSavings)}. ${topCategoryText}`;
}

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(incomeAmountInput.value);
  if (!Number.isFinite(amount) || amount < 0) {
    return;
  }

  saveMonthlyIncome(amount);
  incomeForm.reset();
  updateDashboard();
});

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(expenseAmountInput.value);
  const category = expenseCategoryInput.value.trim();
  const date = expenseDateInput.value;

  if (!Number.isFinite(amount) || amount <= 0 || !category || !date) {
    return;
  }

  const expenses = getExpenses();
  expenses.push({
    amount,
    category,
    date
  });

  saveExpenses(expenses);
  expenseForm.reset();
  updateDashboard();
});

updateDashboard();
