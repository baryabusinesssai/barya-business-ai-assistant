const STORAGE_KEY = 'barya_hostinger_final_v1';

const currencyConfig = {
  USD: { locale: 'en-US', code: 'USD' },
  INR: { locale: 'en-IN', code: 'INR' },
  EUR: { locale: 'de-DE', code: 'EUR' },
  GBP: { locale: 'en-GB', code: 'GBP' }
};

const translations = {
  en: { subtitle: 'Your clean business command center.' },
  es: { subtitle: 'Tu centro de negocio limpio y moderno.' },
  hi: { subtitle: 'आपका साफ और आसान बिज़नेस कंट्रोल सेंटर।' }
};

const ideaPool = [
  'WhatsApp catalog setup service for local stores.',
  'Simple bookkeeping package for freelancers.',
  'Local short-video editing service for small brands.',
  'Subscription meal prep plan for office workers.',
  'Micro digital agency focused on one niche.'
];

const state = loadState();
const refs = mapRefs();
bindEvents();
renderAll();

function mapRefs() {
  return {
    nav: document.getElementById('nav'),
    tabs: [...document.querySelectorAll('.tab')],
    title: document.getElementById('title'),
    subtitle: document.getElementById('subtitle'),
    totalIncome: document.getElementById('totalIncome'),
    totalExpense: document.getElementById('totalExpense'),
    netSavings: document.getElementById('netSavings'),
    recurringMonthly: document.getElementById('recurringMonthly'),
    snapshotText: document.getElementById('snapshotText'),
    txnForm: document.getElementById('txnForm'),
    txnList: document.getElementById('txnList'),
    recForm: document.getElementById('recForm'),
    recList: document.getElementById('recList'),
    insightList: document.getElementById('insightList'),
    chatLog: document.getElementById('chatLog'),
    chatForm: document.getElementById('chatForm'),
    advisorText: document.getElementById('advisorText'),
    ideaBtn: document.getElementById('ideaBtn'),
    ideaBox: document.getElementById('ideaBox'),
    settingsForm: document.getElementById('settingsForm'),
    ownerName: document.getElementById('ownerName'),
    monthlyTarget: document.getElementById('monthlyTarget'),
    settingsMsg: document.getElementById('settingsMsg'),
    resetBtn: document.getElementById('resetBtn'),
    currencySelect: document.getElementById('currencySelect'),
    languageSelect: document.getElementById('languageSelect')
  };
}

function bindEvents() {
  refs.nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-btn');
    if (!btn) return;
    setTab(btn.dataset.tab);
  });

  refs.txnForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const txn = {
      id: crypto.randomUUID(),
      label: document.getElementById('txnLabel').value.trim(),
      amount: Number(document.getElementById('txnAmount').value),
      type: document.getElementById('txnType').value,
      category: document.getElementById('txnCategory').value.trim(),
      date: new Date().toISOString()
    };
    state.transactions.unshift(txn);
    refs.txnForm.reset();
    persistAndRender();
  });

  refs.recForm.addEventListener('submit', (e) => {
    e.preventDefault();
    state.recurring.unshift({
      id: crypto.randomUUID(),
      label: document.getElementById('recLabel').value.trim(),
      amount: Number(document.getElementById('recAmount').value),
      frequency: document.getElementById('recFrequency').value
    });
    refs.recForm.reset();
    persistAndRender();
  });

  refs.txnList.addEventListener('click', onDelete('transactions'));
  refs.recList.addEventListener('click', onDelete('recurring'));

  refs.chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;
    state.chat.push({ role: 'user', text });
    state.chat.push({ role: 'bot', text: aiReply(text) });
    input.value = '';
    persistAndRender();
  });

  refs.ideaBtn.addEventListener('click', () => {
    const idea = ideaPool[Math.floor(Math.random() * ideaPool.length)];
    refs.ideaBox.innerHTML = `<p>${idea}</p>`;
  });

  refs.settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    state.settings.owner = refs.ownerName.value.trim();
    state.settings.target = Number(refs.monthlyTarget.value || 0);
    refs.settingsMsg.textContent = 'Settings saved.';
    persistAndRender();
  });

  refs.resetBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });

  refs.currencySelect.addEventListener('change', () => {
    state.settings.currency = refs.currencySelect.value;
    persistAndRender();
  });

  refs.languageSelect.addEventListener('change', () => {
    state.settings.language = refs.languageSelect.value;
    persistAndRender();
  });
}

function onDelete(key) {
  return (e) => {
    const id = e.target.closest('button')?.dataset.id;
    if (!id) return;
    state[key] = state[key].filter((item) => item.id !== id);
    persistAndRender();
  };
}

function setTab(tabId) {
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.tab === tabId));
  refs.tabs.forEach((tab) => tab.classList.toggle('active', tab.id === tabId));
  refs.title.textContent = document.querySelector(`.nav-btn[data-tab="${tabId}"]`).textContent;
}

function totals() {
  const income = state.transactions.filter((t) => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expense = state.transactions.filter((t) => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const recurring = state.recurring.reduce((sum, r) => {
    if (r.frequency === 'monthly') return sum + r.amount;
    if (r.frequency === 'weekly') return sum + (r.amount * 4.33);
    return sum + (r.amount * 30);
  }, 0);
  return { income, expense, recurring, net: income - expense - recurring };
}

function renderAll() {
  refs.currencySelect.value = state.settings.currency;
  refs.languageSelect.value = state.settings.language;
  refs.ownerName.value = state.settings.owner;
  refs.monthlyTarget.value = state.settings.target || '';

  const { income, expense, recurring, net } = totals();
  refs.totalIncome.textContent = money(income);
  refs.totalExpense.textContent = money(expense);
  refs.recurringMonthly.textContent = money(recurring);
  refs.netSavings.textContent = money(net);

  refs.snapshotText.textContent = net >= 0
    ? 'Healthy runway. Keep recurring costs under control and reinvest wisely.'
    : 'You are spending more than you earn. Reduce recurring costs and recover margin.';

  refs.subtitle.textContent = translations[state.settings.language]?.subtitle || translations.en.subtitle;

  refs.txnList.innerHTML = state.transactions.map((t) => `
    <li>
      <div>
        <strong>${escapeHtml(t.label)}</strong>
        <div class="muted">${escapeHtml(t.category)}</div>
      </div>
      <div>
        <span class="${t.type === 'income' ? 'pill-income' : 'pill-expense'}">${t.type === 'income' ? '+' : '-'}${money(t.amount)}</span>
        <button data-id="${t.id}" class="secondary">Delete</button>
      </div>
    </li>`).join('') || '<li class="muted">No transactions yet.</li>';

  refs.recList.innerHTML = state.recurring.map((r) => `
    <li>
      <div><strong>${escapeHtml(r.label)}</strong><div class="muted">${r.frequency}</div></div>
      <div>${money(r.amount)} <button data-id="${r.id}" class="secondary">Delete</button></div>
    </li>`).join('') || '<li class="muted">No recurring expenses yet.</li>';

  renderInsights();
  renderAdvisor();
  refs.chatLog.innerHTML = state.chat.map((m) => `<div class="msg ${m.role === 'user' ? 'user' : 'bot'}">${escapeHtml(m.text)}</div>`).join('');
  refs.chatLog.scrollTop = refs.chatLog.scrollHeight;
}

function renderInsights() {
  const { income, expense, recurring, net } = totals();
  const lines = [];
  if (income === 0) lines.push('Add your first income stream to activate planning insights.');
  if (expense > income * 0.7 && income > 0) lines.push('Expenses are above 70% of income — optimize vendor and fixed costs.');
  if (recurring > 0) lines.push(`Recurring costs are ${((recurring / Math.max(income, 1)) * 100).toFixed(1)}% of monthly income.`);
  if (state.settings.target > 0) {
    const progress = Math.max(0, (net / state.settings.target) * 100);
    lines.push(`Savings target progress: ${progress.toFixed(1)}%.`);
  }
  if (!lines.length) lines.push('Strong baseline. Keep tracking weekly to maintain momentum.');
  refs.insightList.innerHTML = lines.map((l) => `<p>${l}</p>`).join('');
}

function renderAdvisor() {
  const { income, expense, recurring, net } = totals();
  const advice = [
    `Focus metric: Net monthly result is ${money(net)}.`,
    'Protect margin first: review top 3 expense categories weekly.',
    recurring > 0 ? 'Negotiate recurring bills every quarter and benchmark alternatives.' : 'Introduce planned recurring budgeting for stability.',
    income < 1000 ? 'Build one additional revenue stream to reduce business risk.' : 'Document your best revenue channel and scale it with repeatable offers.',
    expense > income ? 'Pause non-essential spend for 14 days and recover cash position.' : 'Allocate part of monthly surplus to growth and emergency buffer.'
  ];
  refs.advisorText.innerHTML = advice.map((a) => `<p>${a}</p>`).join('');
}

function aiReply(text) {
  const t = text.toLowerCase();
  if (t.includes('save') || t.includes('savings')) return 'Use the 50-30-20 style split as a start, then tighten recurring expenses first.';
  if (t.includes('price')) return 'Set price from value delivered, then confirm margin after all direct costs.';
  if (t.includes('grow') || t.includes('sales')) return 'Pick one customer segment, one offer, one channel, and run a 2-week sprint.';
  return 'Great question. Start with one measurable goal this week, then track results in Dashboard and Insights.';
}

function money(value) {
  const cfg = currencyConfig[state.settings.currency] || currencyConfig.USD;
  return new Intl.NumberFormat(cfg.locale, { style: 'currency', currency: cfg.code, maximumFractionDigits: 2 }).format(value || 0);
}

function loadState() {
  const base = {
    settings: { language: 'en', currency: 'USD', owner: '', target: 0 },
    transactions: [],
    recurring: [],
    chat: [{ role: 'bot', text: 'Hi! I can help with budgeting, pricing, growth, and savings.' }]
  };
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return raw ? { ...base, ...raw, settings: { ...base.settings, ...(raw.settings || {}) } } : base;
  } catch {
    return base;
  }
}

function persistAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAll();
}

function escapeHtml(v) {
  return String(v).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
