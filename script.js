const STORAGE_KEY = 'barya_dashboard_state_v2';

const state = loadState();
const refs = {};

document.addEventListener('DOMContentLoaded', () => {
  cacheRefs();
  bindEvents();
  renderHeader();
  renderAll();
  syncScreenHeader('dashboard');
  appendChat('Barya', 'Hello! I am your AI business assistant. Ask for savings, finance, or growth guidance.');
});

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      goal: parsed.goal || '',
      monthlyTarget: Number(parsed.monthlyTarget || 0),
      proactiveTips: Boolean(parsed.proactiveTips),
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      recurring: Array.isArray(parsed.recurring) ? parsed.recurring : [],
      selectedPlan: parsed.selectedPlan || ''
    };
  } catch {
    return { goal: '', monthlyTarget: 0, proactiveTips: true, transactions: [], recurring: [], selectedPlan: '' };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function cacheRefs() {
  refs.navLinks = [...document.querySelectorAll('.nav-link')];
  refs.tabs = [...document.querySelectorAll('.tab')];
  refs.sidebar = document.getElementById('sidebar');

  refs.greeting = document.getElementById('greeting');
  refs.dateChip = document.getElementById('date-chip');
  refs.goalBadge = document.getElementById('goal-badge');
  refs.goalStatus = document.getElementById('goal-status');

  refs.screenTitle = document.getElementById('screen-title');
  refs.screenDescription = document.getElementById('screen-description');

  refs.balanceValue = document.getElementById('balance-value');
  refs.incomeValue = document.getElementById('income-value');
  refs.expenseValue = document.getElementById('expense-value');

  refs.transactionForm = document.getElementById('transaction-form');
  refs.txnLabel = document.getElementById('txn-label');
  refs.txnAmount = document.getElementById('txn-amount');
  refs.txnType = document.getElementById('txn-type');

  refs.chartList = document.getElementById('chart-list');
  refs.recentList = document.getElementById('recent-list');
  refs.allTransactions = document.getElementById('all-transactions');
  refs.insightBox = document.getElementById('plan-preview');
  refs.savingsBox = document.getElementById('savings-box');
  refs.budgetHealth = document.getElementById('budget-health');

  refs.recurringForm = document.getElementById('recurring-form');
  refs.recName = document.getElementById('rec-name');
  refs.recAmount = document.getElementById('rec-amount');
  refs.recFrequency = document.getElementById('rec-frequency');
  refs.recurringList = document.getElementById('recurring-list');

  refs.chatForm = document.getElementById('chat-form');
  refs.chatInput = document.getElementById('chat-input');
  refs.chatBox = document.getElementById('chat-box');

  refs.planTitle = document.getElementById('plan-title');
  refs.planBox = document.getElementById('plan-box');
  refs.ideaButton = document.getElementById('idea-button');
  refs.ideaBox = document.getElementById('idea-box');

  refs.settingsForm = document.getElementById('settings-form');
  refs.goalInput = document.getElementById('goal-input');
  refs.targetInput = document.getElementById('target-input');
  refs.tipsToggle = document.getElementById('tips-toggle');
  refs.settingsFeedback = document.getElementById('settings-feedback');

  refs.sidebarOpen = document.getElementById('sidebar-open');
  refs.sidebarClose = document.getElementById('sidebar-close');
  refs.jumpDashboard = document.getElementById('jump-dashboard');
}

function bindEvents() {
  refs.navLinks.forEach((link) => {
    link.addEventListener('click', () => showTab(link.dataset.tab));
  });

  refs.transactionForm.addEventListener('submit', onAddTransaction);
  refs.recurringForm.addEventListener('submit', onAddRecurring);
  refs.chatForm.addEventListener('submit', onAskAi);
  refs.settingsForm.addEventListener('submit', onSaveSettings);

  document.querySelectorAll('[data-jump]').forEach((button) => {
    button.addEventListener('click', () => showTab(button.dataset.jump));
  });

  document.querySelectorAll('[data-plan]').forEach((button) => {
    button.addEventListener('click', () => generatePlan(button.dataset.plan));
  });

  refs.ideaButton.addEventListener('click', generateIdea);
  refs.sidebarOpen.addEventListener('click', () => refs.sidebar.classList.add('open'));
  refs.sidebarClose.addEventListener('click', () => refs.sidebar.classList.remove('open'));
  refs.jumpDashboard.addEventListener('click', () => {
    showTab('dashboard');
    refs.sidebar.classList.remove('open');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) refs.sidebar.classList.remove('open');
  });
}

function showTab(tabId) {
  refs.tabs.forEach((tab) => tab.classList.toggle('active', tab.id === tabId));
  refs.navLinks.forEach((link) => link.classList.toggle('active', link.dataset.tab === tabId));
  syncScreenHeader(tabId);
  refs.sidebar.classList.remove('open');
}

function syncScreenHeader(tabId) {
  const activeTab = refs.tabs.find((tab) => tab.id === tabId);
  if (!activeTab) return;

  refs.screenTitle.textContent = activeTab.dataset.tabName || 'Workspace';
  refs.screenDescription.textContent = activeTab.dataset.tabDescription || 'Focused workspace view.';
}

function onAddTransaction(event) {
  event.preventDefault();
  const label = refs.txnLabel.value.trim();
  const amount = Number(refs.txnAmount.value);
  const type = refs.txnType.value;

  if (!label) return showTemporaryMessage(refs.insightBox, 'Transaction label is required.');
  if (!Number.isFinite(amount) || amount <= 0) return showTemporaryMessage(refs.insightBox, 'Enter a valid amount greater than zero.');

  state.transactions.unshift({
    id: crypto.randomUUID(),
    label,
    amount,
    type,
    createdAt: new Date().toISOString()
  });

  saveState();
  refs.transactionForm.reset();
  refs.txnType.value = 'income';
  renderAll();
}

function onAddRecurring(event) {
  event.preventDefault();
  const name = refs.recName.value.trim();
  const amount = Number(refs.recAmount.value);
  const frequency = refs.recFrequency.value;

  if (!name) return showTemporaryMessage(refs.budgetHealth, 'Recurring expense needs a name.');
  if (!Number.isFinite(amount) || amount <= 0) return showTemporaryMessage(refs.budgetHealth, 'Recurring amount must be greater than zero.');

  state.recurring.unshift({ id: crypto.randomUUID(), name, amount, frequency });
  saveState();
  refs.recurringForm.reset();
  refs.recFrequency.value = 'monthly';
  renderAll();
}

function onAskAi(event) {
  event.preventDefault();
  const prompt = refs.chatInput.value.trim();
  if (!prompt) return;

  appendChat('You', prompt, true);

  const totals = computeTotals();
  const p = prompt.toLowerCase();

  let response = 'Focus on one metric this week: protect at least 20% of income as savings.';
  if (p.includes('expense') || p.includes('spend')) {
    response = `Your tracked expenses are ₹${formatCurrency(totals.expense)}. Reduce your top two categories by 10% and review results in 7 days.`;
  } else if (p.includes('save') || p.includes('savings')) {
    response = `Set an auto-transfer right after income hits. With current balance ₹${formatCurrency(totals.balance)}, prioritize emergency reserve then growth.`;
  } else if (p.includes('business') || p.includes('growth')) {
    response = 'Build a 4-week growth sprint: define one offer, one channel, one KPI, and review weekly conversion + cashflow.';
  } else if (p.includes('goal')) {
    response = state.goal ? `Your active goal is "${state.goal}". Break it into weekly milestones and track completion every Sunday.` : 'Set your main goal in Settings to unlock more tailored guidance.';
  }

  setTimeout(() => appendChat('Barya', response), 260);
  refs.chatForm.reset();
}

function onSaveSettings(event) {
  event.preventDefault();
  state.goal = refs.goalInput.value.trim();
  state.monthlyTarget = Number(refs.targetInput.value) || 0;
  state.proactiveTips = refs.tipsToggle.checked;
  saveState();
  renderHeader();
  renderInsights();
  refs.settingsFeedback.textContent = 'Settings saved successfully. AI guidance is now updated.';
}

function generatePlan(type) {
  const goalText = state.goal || 'grow financial stability';
  const templates = {
    startup: {
      title: 'Startup Guide',
      body: `Validate customer pain, launch a minimum offer in 14 days, and track acquisition cost weekly. Goal context: ${goalText}.`
    },
    business: {
      title: 'Plan Template',
      body: `Define niche, pricing, sales funnel, and a 90-day revenue roadmap. Goal context: ${goalText}.`
    },
    cashflow: {
      title: 'Cashflow Improvement',
      body: `Speed up receivables, cut low-return spend, and build a 3-month safety runway. Goal context: ${goalText}.`
    }
  };

  const selected = templates[type];
  if (!selected) {
    refs.planTitle.textContent = 'No tool selected';
    refs.planBox.textContent = 'Pick a business planning tool to continue.';
    refs.insightBox.textContent = 'Choose a tool to generate and open its dedicated planning section.';
    return;
  }

  state.selectedPlan = type;
  saveState();

  refs.planTitle.textContent = selected.title;
  refs.planBox.textContent = selected.body;
  refs.insightBox.textContent = `${selected.title} prepared. Opened in the dedicated Business Planning Tools screen.`;

  showTab('planning-tools');
}

function generateIdea() {
  const ideas = [
    'AI-assisted bookkeeping service for small retailers.',
    'Local business social media analytics subscription.',
    'Digital expense coaching package for freelancers.',
    'Niche e-commerce toolkit for handmade brands.',
    'Voice-note to invoice assistant for solo founders.'
  ];
  const idea = ideas[Math.floor(Math.random() * ideas.length)];
  refs.ideaBox.textContent = `💡 ${idea}`;
}

function removeTransaction(id) {
  state.transactions = state.transactions.filter((entry) => entry.id !== id);
  saveState();
  renderAll();
}

function removeRecurring(id) {
  state.recurring = state.recurring.filter((entry) => entry.id !== id);
  saveState();
  renderAll();
}

function computeRecurringMonthly() {
  return state.recurring.reduce((total, item) => {
    const multiplier = item.frequency === 'daily' ? 30 : item.frequency === 'weekly' ? 4 : 1;
    return total + (Number(item.amount) * multiplier);
  }, 0);
}

function computeTotals() {
  const income = state.transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
  const manualExpense = state.transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const recurringExpense = computeRecurringMonthly();
  const expense = manualExpense + recurringExpense;
  return { income, expense, balance: income - expense, recurringExpense, manualExpense };
}

function renderAll() {
  const totals = computeTotals();

  refs.incomeValue.textContent = `₹${formatCurrency(totals.income)}`;
  refs.expenseValue.textContent = `₹${formatCurrency(totals.expense)}`;
  refs.balanceValue.textContent = `₹${formatCurrency(totals.balance)}`;

  renderChart(totals);
  renderTransactions();
  renderRecurring();
  renderInsights();
  restorePlanSelection();
}

function restorePlanSelection() {
  if (!state.selectedPlan) return;
  const currentTitle = refs.planTitle.textContent;
  if (currentTitle && currentTitle !== 'No tool selected') return;

  const selectionMap = {
    startup: 'Startup Guide',
    business: 'Plan Template',
    cashflow: 'Cashflow Improvement'
  };

  if (selectionMap[state.selectedPlan]) {
    generatePlan(state.selectedPlan);
    showTab('dashboard');
  }
}

function renderHeader() {
  const now = new Date();
  refs.dateChip.textContent = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const h = now.getHours();
  refs.greeting.textContent = h < 12 ? 'Good morning 👋' : h < 17 ? 'Good afternoon 👋' : 'Good evening 👋';

  const goal = state.goal || 'Not set';
  refs.goalBadge.textContent = `Goal: ${goal}`;
  refs.goalStatus.textContent = goal;

  refs.goalInput.value = state.goal;
  refs.targetInput.value = state.monthlyTarget || '';
  refs.tipsToggle.checked = state.proactiveTips;
}

function renderChart(totals) {
  const rows = [
    ['Income', totals.income, 'bar-income'],
    ['Expenses', totals.expense, 'bar-expense'],
    ['Savings', Math.max(totals.balance, 0), 'bar-savings']
  ];

  const max = Math.max(1, ...rows.map((r) => r[1]));
  refs.chartList.innerHTML = rows.map(([label, value, klass]) => {
    const width = Math.max(8, Math.round((value / max) * 100));
    return `<div class="chart-row"><span>${label}</span><div class="bar"><span class="${klass}" style="width:${width}%"></span></div><strong>₹${formatCurrency(value)}</strong></div>`;
  }).join('');
}

function renderTransactions() {
  const entries = [...state.transactions];

  refs.recentList.innerHTML = entries.length
    ? entries.slice(0, 6).map(renderTransactionItem).join('')
    : emptyItem('No transactions yet. Start by adding an income or expense.');

  refs.allTransactions.innerHTML = entries.length
    ? entries.map(renderTransactionItem).join('')
    : emptyItem('No transaction history found.');

  [...document.querySelectorAll('[data-remove-transaction]')].forEach((button) => {
    button.addEventListener('click', () => removeTransaction(button.dataset.removeTransaction));
  });
}

function renderRecurring() {
  refs.recurringList.innerHTML = state.recurring.length
    ? state.recurring.map((item) => `
      <li class="item">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <div class="meta">${capitalize(item.frequency)} • ₹${formatCurrency(item.amount)}</div>
        </div>
        <button class="btn btn-secondary" type="button" data-remove-recurring="${item.id}">Remove</button>
      </li>
    `).join('')
    : emptyItem('No recurring expenses added yet.');

  [...document.querySelectorAll('[data-remove-recurring]')].forEach((button) => {
    button.addEventListener('click', () => removeRecurring(button.dataset.removeRecurring));
  });
}

function renderInsights() {
  const totals = computeTotals();
  const tips = [];

  if (totals.income <= 0 && totals.expense <= 0) {
    tips.push('Add your first income and expense to unlock tailored guidance.');
  } else {
    if (totals.expense > totals.income * 0.8) tips.push('Expenses are above 80% of income. Reduce your highest-cost category first.');
    if (totals.balance > 0) tips.push(`You are cashflow-positive. Reserve at least ₹${formatCurrency(Math.round(totals.balance * 0.3))} for savings.`);
    if (state.monthlyTarget > 0) {
      const remaining = Math.max(state.monthlyTarget - Math.max(totals.balance, 0), 0);
      tips.push(remaining === 0
        ? 'Great work — your monthly savings target is currently met.'
        : `You need ₹${formatCurrency(remaining)} more to hit your monthly savings target.`);
    }
    if (state.proactiveTips) tips.push('Pro tip: review recurring expenses weekly to avoid silent budget creep.');
  }

  const html = `<ul>${tips.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>`;
  refs.savingsBox.innerHTML = html;

  refs.budgetHealth.textContent = totals.expense > totals.income
    ? 'Budget risk: spending is higher than income. Prioritize reductions immediately.'
    : 'Budget status looks healthy. Continue building consistent savings.';
}

function appendChat(author, text, isUser = false) {
  const item = document.createElement('div');
  item.className = `chat-msg ${isUser ? 'user' : ''}`.trim();
  item.textContent = `${author}: ${text}`;
  refs.chatBox.appendChild(item);
  refs.chatBox.scrollTop = refs.chatBox.scrollHeight;
}

function renderTransactionItem(item) {
  return `
    <li class="item">
      <div>
        <strong>${escapeHtml(item.label)}</strong>
        <div class="meta">${new Date(item.createdAt).toLocaleDateString('en-IN')} • ${capitalize(item.type)}</div>
      </div>
      <div>
        <strong class="${item.type === 'income' ? 'amount-income' : 'amount-expense'}">${item.type === 'income' ? '+' : '-'}₹${formatCurrency(item.amount)}</strong>
        <button class="btn btn-secondary" type="button" data-remove-transaction="${item.id}">Delete</button>
      </div>
    </li>
  `;
}

function showTemporaryMessage(node, message) {
  const old = node.textContent;
  node.textContent = message;
  setTimeout(() => { node.textContent = old; }, 1800);
}

function emptyItem(text) {
  return `<li class="item"><span class="meta">${escapeHtml(text)}</span></li>`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(value));
}

function capitalize(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
