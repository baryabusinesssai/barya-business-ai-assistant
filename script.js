const STORAGE_KEY = 'barya_dashboard_state_v2';
const DEFAULT_LANGUAGE = 'en';
const DEFAULT_CURRENCY = 'INR';

const CURRENCY_CONFIG = {
  INR: { locale: 'en-IN', symbol: '₹' },
  USD: { locale: 'en-US', symbol: '$' },
  EUR: { locale: 'de-DE', symbol: '€' },
  GBP: { locale: 'en-GB', symbol: '£' },
  JPY: { locale: 'ja-JP', symbol: '¥' },
  KRW: { locale: 'ko-KR', symbol: '₩' }
};

const TRANSLATIONS = {
  en: {
    appTitle: 'Barya Business AI Assistant',
    appSubtitle: 'A clean AI workspace for tracking finances, generating savings plans, and making business decisions with confidence.',
    workspaceChip: 'Live Workspace',
    languageLabel: 'Language',
    currencyLabel: 'Currency',
    statBalanceLabel: 'Total Balance',
    statBalanceCaption: 'Net from income and expenses.',
    statIncomeLabel: 'Income',
    statIncomeCaption: 'All tracked incoming funds.',
    statExpenseLabel: 'Expenses',
    statExpenseCaption: 'Manual + recurring expenses.',
    txnAmountLabel: 'Amount',
    recAmountLabel: 'Amount',
    targetLabel: 'Monthly Savings Target',
    greetingMorning: 'Good morning 👋',
    greetingAfternoon: 'Good afternoon 👋',
    greetingEvening: 'Good evening 👋',
    goalPrefix: 'Goal',
    notSet: 'Not set',
    chartIncome: 'Income',
    chartExpense: 'Expenses',
    chartSavings: 'Savings'
  },
  hi: {
    appTitle: 'बार्या बिज़नेस एआई असिस्टेंट',
    appSubtitle: 'वित्त ट्रैक करने, बचत योजना बनाने और आत्मविश्वास से व्यावसायिक निर्णय लेने के लिए सरल एआई वर्कस्पेस।',
    workspaceChip: 'लाइव वर्कस्पेस',
    languageLabel: 'भाषा',
    currencyLabel: 'मुद्रा',
    statBalanceLabel: 'कुल बैलेंस',
    statBalanceCaption: 'आय और खर्च के बाद शेष राशि।',
    statIncomeLabel: 'आय',
    statIncomeCaption: 'सभी दर्ज की गई आय।',
    statExpenseLabel: 'खर्च',
    statExpenseCaption: 'मैनुअल + आवर्ती खर्च।',
    txnAmountLabel: 'राशि',
    recAmountLabel: 'राशि',
    targetLabel: 'मासिक बचत लक्ष्य',
    greetingMorning: 'सुप्रभात 👋',
    greetingAfternoon: 'नमस्कार 👋',
    greetingEvening: 'शुभ संध्या 👋',
    goalPrefix: 'लक्ष्य',
    notSet: 'सेट नहीं',
    chartIncome: 'आय',
    chartExpense: 'खर्च',
    chartSavings: 'बचत'
  },
  es: {
    appTitle: 'Asistente de IA Empresarial Barya',
    appSubtitle: 'Un espacio de IA limpio para controlar finanzas, planear ahorros y decidir con confianza.',
    workspaceChip: 'Espacio en vivo',
    languageLabel: 'Idioma',
    currencyLabel: 'Moneda',
    statBalanceLabel: 'Balance total',
    statBalanceCaption: 'Neto de ingresos y gastos.',
    statIncomeLabel: 'Ingresos',
    statIncomeCaption: 'Todos los fondos registrados.',
    statExpenseLabel: 'Gastos',
    statExpenseCaption: 'Gastos manuales + recurrentes.',
    txnAmountLabel: 'Monto',
    recAmountLabel: 'Monto',
    targetLabel: 'Meta mensual de ahorro',
    greetingMorning: 'Buenos días 👋',
    greetingAfternoon: 'Buenas tardes 👋',
    greetingEvening: 'Buenas noches 👋',
    goalPrefix: 'Meta',
    notSet: 'No definida',
    chartIncome: 'Ingresos',
    chartExpense: 'Gastos',
    chartSavings: 'Ahorros'
  },
  de: {
    appTitle: 'Barya Business-KI-Assistent',
    appSubtitle: 'Ein klarer KI-Arbeitsbereich zum Verfolgen von Finanzen, Planen von Ersparnissen und sicheren Geschäftsentscheidungen.',
    workspaceChip: 'Live-Arbeitsbereich',
    languageLabel: 'Sprache',
    currencyLabel: 'Währung',
    statBalanceLabel: 'Gesamtguthaben',
    statBalanceCaption: 'Netto aus Einnahmen und Ausgaben.',
    statIncomeLabel: 'Einnahmen',
    statIncomeCaption: 'Alle erfassten Einnahmen.',
    statExpenseLabel: 'Ausgaben',
    statExpenseCaption: 'Manuelle + wiederkehrende Ausgaben.',
    txnAmountLabel: 'Betrag',
    recAmountLabel: 'Betrag',
    targetLabel: 'Monatliches Sparziel',
    greetingMorning: 'Guten Morgen 👋',
    greetingAfternoon: 'Guten Tag 👋',
    greetingEvening: 'Guten Abend 👋',
    goalPrefix: 'Ziel',
    notSet: 'Nicht festgelegt',
    chartIncome: 'Einnahmen',
    chartExpense: 'Ausgaben',
    chartSavings: 'Ersparnisse'
  }
};

const IDEA_LIBRARY = [
  {
    title: 'Local Social Media Management',
    category: 'Service • Low investment',
    description: 'Manage Instagram/Facebook pages for local shops by creating weekly content calendars, posting, and basic analytics reporting.'
  },
  {
    title: 'Freelancer Invoice & Bookkeeping Support',
    category: 'Service • Online',
    description: 'Offer monthly invoice tracking, expense categorization, and payment reminder support to freelancers and solo founders.'
  },
  {
    title: 'Home-Based Tiffin Delivery',
    category: 'Food • Low investment',
    description: 'Provide healthy subscription meals for office workers with weekly menu options and prepaid monthly plans.'
  },
  {
    title: 'Resume + LinkedIn Profile Studio',
    category: 'Service • Online',
    description: 'Help job seekers improve resumes, optimize LinkedIn profiles, and prepare role-specific application documents.'
  },
  {
    title: 'Micro Digital Marketing Agency',
    category: 'Service • Online',
    description: 'Run focused ad campaigns for small businesses with clear deliverables: ad setup, copywriting, and monthly performance summaries.'
  },
  {
    title: 'Custom Gift Box Business',
    category: 'Product • Low investment',
    description: 'Curate themed gift boxes for birthdays, festivals, and corporate events with local supplier tie-ups.'
  },
  {
    title: 'Neighborhood Laundry Pickup Service',
    category: 'Service • Local',
    description: 'Collect laundry from homes, partner with local laundry units, and charge service margins for pickup and delivery convenience.'
  },
  {
    title: 'Virtual Assistant for Coaches',
    category: 'Service • Online',
    description: 'Support coaches with appointment scheduling, payment follow-up, email management, and client onboarding workflows.'
  },
  {
    title: 'Pet Care Visits',
    category: 'Service • Local',
    description: 'Offer dog walking and pet sitting packages with daily photo updates and flexible subscription-based pricing.'
  },
  {
    title: 'Beginner Coding Bootcamp for Kids',
    category: 'Education • Online',
    description: 'Host weekend coding classes focused on logic, simple app/game projects, and parent progress reports.'
  },
  {
    title: 'Handmade Eco-Friendly Products',
    category: 'Product • Online',
    description: 'Sell reusable cloth bags, natural cleaners, or eco gift kits through social commerce and local pop-up stalls.'
  },
  {
    title: 'Subscription-Based Meal Prep Plans',
    category: 'Food • Service',
    description: 'Design weekly meal prep plans for working professionals with calorie-focused options and routine delivery slots.'
  },
  {
    title: 'Niche Blog + Affiliate Income',
    category: 'Online • Low investment',
    description: 'Create practical guides for one niche topic and monetize with affiliate recommendations and downloadable resources.'
  },
  {
    title: 'Local Event Planning Assistance',
    category: 'Service • Local',
    description: 'Coordinate small functions such as birthdays and engagement events with vendor management and budget tracking.'
  },
  {
    title: 'YouTube Shorts Editing Service',
    category: 'Service • Online',
    description: 'Provide short-form video editing, captions, and thumbnail packaging for creators and small brands.'
  },
  {
    title: 'Print-on-Demand Niche Store',
    category: 'Online • Product',
    description: 'Launch a themed apparel/accessories brand without inventory by using print-on-demand platforms and social selling.'
  },
  {
    title: 'Study Notes Marketplace',
    category: 'Education • Online',
    description: 'Compile and sell structured exam notes, summary sheets, and revision planners for specific student segments.'
  },
  {
    title: 'Mobile Car/Bike Cleaning',
    category: 'Service • Low investment',
    description: 'Offer doorstep cleaning subscriptions in apartment complexes with weekly and monthly plans.'
  },
  {
    title: 'WhatsApp Commerce Setup Service',
    category: 'Service • Local business',
    description: 'Help small stores set up WhatsApp catalogs, order forms, and payment collection workflows.'
  },
  {
    title: 'Corporate Snack Box Supply',
    category: 'Product • B2B',
    description: 'Deliver curated healthy snack packs to offices with recurring corporate contracts and custom branding.'
  },
  {
    title: 'Interior Styling for Small Homes',
    category: 'Service • Local',
    description: 'Provide low-budget room makeover plans with shopping lists, layout suggestions, and execution support.'
  },
  {
    title: 'Online Language Conversation Club',
    category: 'Education • Online',
    description: 'Run paid speaking clubs for beginners with weekly sessions, partner practice, and structured feedback sheets.'
  },
  {
    title: 'Freelance Presentation Design',
    category: 'Service • Online',
    description: 'Design polished pitch decks and sales presentations for founders, agencies, and educators.'
  },
  {
    title: 'Second-Hand Furniture Resale',
    category: 'Product • Low investment',
    description: 'Source used furniture, refurbish basics, and resell via local marketplaces with pickup and delivery options.'
  },
  {
    title: 'Digital Product Templates Shop',
    category: 'Online • Product',
    description: 'Sell Canva/Notion templates for specific users such as freelancers, students, or salon owners.'
  },
  {
    title: 'Local Tour Experience Curation',
    category: 'Service • Tourism',
    description: 'Design half-day local experiences for visitors, including food, markets, and culture-based guided routes.'
  },
  {
    title: 'At-Home Fitness Coaching',
    category: 'Service • Health',
    description: 'Provide beginner-friendly workout plans, accountability check-ins, and progress tracking for busy adults.'
  },
  {
    title: 'School Project Assistance Studio',
    category: 'Education • Service',
    description: 'Help students create practical project models, presentations, and documentation aligned with school rubrics.'
  },
  {
    title: 'CRM Cleanup for Small Teams',
    category: 'Service • B2B',
    description: 'Organize leads, pipelines, and follow-up reminders for small businesses struggling with scattered customer data.'
  },
  {
    title: 'Home Bakery Pre-Order Brand',
    category: 'Food • Product',
    description: 'Sell cakes and desserts through pre-orders, festival specials, and neighborhood referral programs.'
  }
];

const state = loadState();
const refs = {};

document.addEventListener('DOMContentLoaded', () => {
  cacheRefs();
  bindEvents();
  renderHeader();
  renderAll();
  renderBusinessToolsOverview();
  appendChat('Barya', 'Hello! I am your AI business assistant. Ask me about saving money, controlling expenses, increasing income, business basics, or finance learning.');
  syncScreenHeader('dashboard');
});

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      goal: parsed.goal || '',
      monthlyTarget: Number(parsed.monthlyTarget || 0),
      proactiveTips: parsed.proactiveTips !== undefined ? Boolean(parsed.proactiveTips) : true,
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      recurring: Array.isArray(parsed.recurring) ? parsed.recurring : [],
      selectedPlan: parsed.selectedPlan || '',
      language: parsed.language || DEFAULT_LANGUAGE,
      currency: parsed.currency || DEFAULT_CURRENCY
    };
  } catch {
    return {
      goal: '',
      monthlyTarget: 0,
      proactiveTips: true,
      transactions: [],
      recurring: [],
      selectedPlan: '',
      language: DEFAULT_LANGUAGE,
      currency: DEFAULT_CURRENCY
    };
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
  refs.appTitle = document.getElementById('app-title');
  refs.appSubtitle = document.getElementById('app-subtitle');
  refs.workspaceChip = document.getElementById('workspace-chip');
  refs.languageLabel = document.getElementById('language-label');
  refs.currencyLabel = document.getElementById('currency-label');
  refs.languageSelect = document.getElementById('language-select');
  refs.currencySelect = document.getElementById('currency-select');
  refs.goalBadge = document.getElementById('goal-badge');
  refs.goalStatus = document.getElementById('goal-status');

  refs.screenTitle = document.getElementById('screen-title');
  refs.screenDescription = document.getElementById('screen-description');

  refs.balanceValue = document.getElementById('balance-value');
  refs.incomeValue = document.getElementById('income-value');
  refs.expenseValue = document.getElementById('expense-value');
  refs.statBalanceLabel = document.getElementById('stat-balance-label');
  refs.statBalanceCaption = document.getElementById('stat-balance-caption');
  refs.statIncomeLabel = document.getElementById('stat-income-label');
  refs.statIncomeCaption = document.getElementById('stat-income-caption');
  refs.statExpenseLabel = document.getElementById('stat-expense-label');
  refs.statExpenseCaption = document.getElementById('stat-expense-caption');

  refs.transactionForm = document.getElementById('transaction-form');
  refs.txnLabel = document.getElementById('txn-label');
  refs.txnAmount = document.getElementById('txn-amount');
  refs.txnType = document.getElementById('txn-type');
  refs.txnCategoryField = document.getElementById('txn-category-field');
  refs.txnCategoryInputs = [...document.querySelectorAll('input[name="txn-category"]')];

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
  refs.ideaValidatorForm = document.getElementById('idea-validator-form');
  refs.businessIdeaInput = document.getElementById('business-idea-input');
  refs.businessIdeaButton = document.getElementById('business-idea-button');

  refs.ideaButton = document.getElementById('idea-button');
  refs.ideaBox = document.getElementById('idea-box');

  refs.settingsForm = document.getElementById('settings-form');
  refs.goalInput = document.getElementById('goal-input');
  refs.targetInput = document.getElementById('target-input');
  refs.txnAmountLabel = document.getElementById('txn-amount-label');
  refs.recAmountLabel = document.getElementById('rec-amount-label');
  refs.targetLabel = document.getElementById('target-label');
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
  refs.businessIdeaButton?.addEventListener('click', adviseBusinessIdea);
  refs.businessIdeaInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      adviseBusinessIdea();
    }
  });

  refs.sidebarOpen.addEventListener('click', () => refs.sidebar.classList.add('open'));
  refs.sidebarClose.addEventListener('click', () => refs.sidebar.classList.remove('open'));
  refs.languageSelect.addEventListener('change', onLanguageChange);
  refs.currencySelect.addEventListener('change', onCurrencyChange);
  refs.txnType.addEventListener('change', onTransactionTypeChange);
  refs.jumpDashboard.addEventListener('click', () => {
    showTab('dashboard');
    refs.sidebar.classList.remove('open');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) refs.sidebar.classList.remove('open');
  });

  onTransactionTypeChange();
}

function onLanguageChange(event) {
  state.language = event.target.value || DEFAULT_LANGUAGE;
  saveState();
  renderHeader();
  renderAll();
}

function onCurrencyChange(event) {
  state.currency = event.target.value || DEFAULT_CURRENCY;
  saveState();
  renderHeader();
  renderAll();
}

function t(key) {
  return (TRANSLATIONS[state.language] && TRANSLATIONS[state.language][key]) || TRANSLATIONS.en[key] || key;
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
  const category = getSelectedTransactionCategory();

  if (!label) return showTemporaryMessage(refs.insightBox, 'Transaction label is required.');
  if (!Number.isFinite(amount) || amount <= 0) return showTemporaryMessage(refs.insightBox, 'Enter a valid amount greater than zero.');
  if (type === 'expense' && !category) return showTemporaryMessage(refs.insightBox, 'Please choose an expense category.');

  state.transactions.unshift({
    id: crypto.randomUUID(),
    label,
    amount,
    type,
    category: type === 'expense' ? category : '',
    createdAt: new Date().toISOString()
  });

  saveState();
  refs.transactionForm.reset();
  refs.txnType.value = 'income';
  setTransactionCategory('Food');
  onTransactionTypeChange();
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
  const response = createAssistantResponse(prompt, totals);

  setTimeout(() => appendChat('Barya', response), 260);
  refs.chatForm.reset();
}

function createAssistantResponse(prompt, totals) {
  const normalizedPrompt = prompt.toLowerCase();
  const suggestedWeeklySavings = Math.max(300, Math.round(Math.max(totals.income, 3000) * 0.05));

  const categories = [
    {
      id: 'saving-money',
      keywords: ['save', 'saving', 'savings', 'emergency fund', 'money save'],
      shortAnswer: `Start small and save consistently. Based on your current numbers, a realistic start is about ${formatMoney(suggestedWeeklySavings)} per week.`,
      tips: [
        'Move a fixed amount to savings on the same day income arrives.',
        'Use two savings buckets: emergency first, then future goals.',
        'Reduce one recurring cost this week and send that amount to savings.',
        'Track savings progress every Sunday to stay consistent.'
      ],
      motivation: 'Small weekly wins build strong long-term savings.'
    },
    {
      id: 'expense-control',
      keywords: ['expense', 'expenses', 'spend', 'spending', 'cost', 'budget leak'],
      shortAnswer: `Control expenses by tracking where money goes first. Your tracked expense is ${formatMoney(totals.expense)} right now.`,
      tips: [
        'List your top 3 spending categories and set a simple limit for each.',
        'Use a 24-hour pause before non-essential purchases.',
        'Check recurring subscriptions and cancel one low-value item today.',
        'Review spending once a week, not only at month end.'
      ],
      motivation: 'When you control spending, your money starts working for you.'
    },
    {
      id: 'income-growth',
      keywords: ['income', 'earn', 'earning', 'increase income', 'more money', 'side income', 'salary growth'],
      shortAnswer: 'Increase income by improving one skill and offering one clear service people will pay for.',
      tips: [
        'Pick one monetizable skill and practice it daily for 30 minutes.',
        'Offer a small paid service to 5 people in your network first.',
        'Track leads, paid clients, and average earning every week.',
        'Reinvest part of new income into tools or learning to grow faster.'
      ],
      motivation: 'A focused effort can create a new income stream faster than you think.'
    },
    {
      id: 'business-basics',
      keywords: ['start a business', 'business', 'startup', 'customer', 'sales', 'business basics'],
      shortAnswer: 'A good business starts with one customer problem and one simple paid solution.',
      tips: [
        'Choose one target customer group and define their main pain point.',
        'Create a basic offer with clear price, benefit, and delivery timeline.',
        'Validate your idea by talking to at least 5 potential customers.',
        'Start lean: low cost, quick launch, and improve from feedback.'
      ],
      motivation: 'Simple businesses with clear value often grow the strongest.'
    },
    {
      id: 'finance-learning',
      keywords: ['what is budgeting', 'budgeting', 'finance', 'financial literacy', 'learn finance', 'cashflow'],
      shortAnswer: 'Budgeting means planning your income before spending so every rupee has a job.',
      tips: [
        'Use a simple split: needs, wants, and savings.',
        'Track income and expenses daily for at least 14 days.',
        'Learn one topic per week: budgeting, debt, savings, then investing.',
        'Use your dashboard numbers to review progress every Sunday.'
      ],
      motivation: 'Finance becomes easy when you learn and apply one step at a time.'
    }
  ];

  const matchedCategory = categories.find((category) => (
    category.keywords.some((keyword) => normalizedPrompt.includes(keyword))
  ));

  const fallbackCategory = {
    shortAnswer: 'I can help best when your question is specific. Choose one topic: saving money, expense control, income growth, business basics, or finance learning.',
    tips: [
      'Ask one clear question like “How can I save money from my salary?”',
      'Share your goal and timeline for more practical guidance.',
      'Track your dashboard data to get more tailored advice.',
      'Focus on one topic per week so progress is clear.'
    ],
    motivation: 'Clear questions lead to clear progress.'
  };

  const selected = matchedCategory || fallbackCategory;

  return [
    'Short answer:',
    selected.shortAnswer,
    '',
    'Practical tips:',
    ...selected.tips.slice(0, 4).map((tip, index) => `${index + 1}. ${tip}`),
    '',
    `Motivation: ${selected.motivation}`
  ].join('\n');
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
  const goalText = state.goal || 'start with a simple plan and first paying customer';
  toggleIdeaValidator(false);
  setActivePlanButtons(type);

  const templates = {
    startup: {
      title: 'Startup Guide',
      steps: [
        'Pick one customer group. Example: college students, local shop owners, or working parents.',
        'Write the one problem you will solve for them in one clear sentence.',
        'Create a basic offer with one price, one promise, and one delivery timeline.',
        'Talk to at least 5 people from that group and ask if they would pay.',
        'Start small this week: serve your first 1-3 customers and collect feedback.'
      ],
      reality: 'Do not wait for perfect branding or a full website. First proof = first paying customer.'
    },
    business: {
      title: 'Plan Template',
      steps: [
        '<strong>1) Business idea:</strong> What do you sell and why people need it.',
        '<strong>2) Target customer:</strong> Who is the exact buyer (age, location, type).',
        '<strong>3) Problem + solution:</strong> What pain point you solve and how.',
        '<strong>4) Costs:</strong> Monthly fixed costs + per-sale variable costs.',
        '<strong>5) Earnings:</strong> Expected monthly sales × price - total costs.'
      ],
      reality: 'Keep this plan to one page. Update it every month with real numbers.'
    },
    validator: {
      title: 'Idea Validator',
      steps: [
        'Enter your business idea above and click "Validate Idea".',
        'You will get a quick decision: promising, needs work, or risky.',
        'You will also get simple suggestions to improve demand, pricing, and launch clarity.'
      ],
      reality: 'A good idea is helpful only when people are willing to pay for it.'
    }
  };

  const selected = templates[type];
  if (!selected) {
    renderBusinessToolsOverview();
    return;
  }

  refs.planBox.innerHTML = `
    <strong>${escapeHtml(selected.title)}</strong><br>
    Goal context: ${escapeHtml(goalText)}<br><br>
    <strong>Action steps:</strong>
    <ul>${selected.steps.map((step) => `<li>${type === 'business' ? step : escapeHtml(step)}</li>`).join('')}</ul>
    <strong>Reality check:</strong> ${escapeHtml(selected.reality)}<br><br>
    ${type === 'business' ? '<strong>Quick formula:</strong> Profit = Earnings - Costs.' : ''}
  `;

  state.selectedPlan = type;
  saveState();

  refs.planTitle.textContent = selected.title;
  refs.insightBox.textContent = `${selected.title} prepared. Opened in the dedicated Business Planning Tools screen.`;
  toggleIdeaValidator(type === 'validator');

  showTab('planning-tools');
}

function adviseBusinessIdea() {
  const rawIdea = refs.businessIdeaInput?.value.trim() || '';
  if (!rawIdea) {
    showTemporaryMessage(refs.planBox, 'Enter your business idea first (example: “home bakery subscription”).');
    return;
  }

  const idea = rawIdea.toLowerCase();
  const segments = {
    food: ['food', 'bakery', 'tiffin', 'meal', 'cafe', 'restaurant'],
    digital: ['online', 'digital', 'app', 'saas', 'website', 'software'],
    service: ['service', 'agency', 'consult', 'freelance', 'coaching']
  };

  const defaultAdvice = {
    audience: 'busy people who already pay for a similar solution',
    painPoint: 'save time and make one daily task easier',
    steps: [
      'Talk to 10 potential customers and ask what they currently use and what frustrates them.',
      'Create one simple starter package with clear price, delivery time, and expected result.',
      'Start promotion on one channel only (for example: local WhatsApp groups or Instagram).',
      'Track weekly numbers: inquiries, sales, delivery cost, and repeat buyers.'
    ],
    challenges: [
      'Demand may be slow in the first 1-2 months.',
      'You may underprice and work too much for too little margin.',
      'Operations can become messy without a clear weekly process.'
    ],
    tips: [
      'Collect at least 50% payment upfront when possible.',
      'Write one-page SOPs for repeated tasks to save time.',
      'Review costs weekly and increase price if margin is too low.'
    ],
    motivation: 'Start small, stay consistent, and improve every week.'
  };

  const categoryAdvice = [
    {
      type: 'food',
      config: {
        audience: 'working professionals and families who need reliable daily meals',
        painPoint: 'avoid cooking stress and get predictable food quality',
        steps: [
          'Test a small weekly menu with 5-10 trial customers before scaling.',
          'Offer prepaid weekly plans to improve cashflow and reduce cancellations.'
        ],
        challenges: [
          'Maintaining taste and quality during busy days.',
          'Ingredient price changes can reduce profit quickly.'
        ],
        tips: [
          'Standardize portions and recipes to keep quality consistent.',
          'Use a simple daily prep checklist to control wastage.'
        ],
        motivation: 'Great food habits can build loyal customers faster than ads.'
      }
    },
    {
      type: 'digital',
      config: {
        audience: 'small businesses that want growth but do not have technical support',
        painPoint: 'get results faster without learning complex tools',
        steps: [
          'Build a simple landing page and collect interest before building full features.',
          'Launch a minimum version focused on one core outcome.'
        ],
        challenges: [
          'Spending too much time building features nobody pays for.',
          'Customer trust is hard without early testimonials.'
        ],
        tips: [
          'Pre-sell to early users to validate willingness to pay.',
          'Measure activation and retention, not only website traffic.'
        ],
        motivation: 'A simple product that solves one problem can beat a complex product.'
      }
    },
    {
      type: 'service',
      config: {
        audience: 'clients who need done-for-you support and quick execution',
        painPoint: 'save time by outsourcing tasks to one reliable partner',
        steps: [
          'Define scope clearly: what is included, what is extra, and delivery timeline.',
          'Use a client onboarding form and checklist to avoid confusion.'
        ],
        challenges: [
          'Scope creep when requests are not documented clearly.',
          'Delayed client approvals can block your delivery schedule.'
        ],
        tips: [
          'Use milestone-based billing to protect your time.',
          'Share weekly updates to reduce uncertainty and rework.'
        ],
        motivation: 'Clear communication and reliability can become your biggest advantage.'
      }
    }
  ];

  const selectedType = categoryAdvice.find((item) => segments[item.type].some((keyword) => idea.includes(keyword)));
  const selectedAdvice = selectedType ? selectedType.config : {};

  const audience = selectedAdvice.audience || defaultAdvice.audience;
  const painPoint = selectedAdvice.painPoint || defaultAdvice.painPoint;
  const steps = [...defaultAdvice.steps];
  const challenges = [...defaultAdvice.challenges];
  const tips = [...defaultAdvice.tips];

  if (selectedAdvice.steps) {
    steps.splice(1, selectedAdvice.steps.length, ...selectedAdvice.steps);
  }
  if (selectedAdvice.challenges) {
    challenges.unshift(...selectedAdvice.challenges);
  }
  if (selectedAdvice.tips) {
    tips.unshift(...selectedAdvice.tips);
  }

  const ideaSummary = `${rawIdea} is best positioned for ${audience}. Focus your first offer on helping them ${painPoint}.`;
  const score = scoreIdea(rawIdea);
  const verdict = score >= 7 ? 'Good idea to test now ✅' : score >= 5 ? 'Promising but needs improvement ⚠️' : 'Risky right now ❌';
  const chosenChallenges = challenges.slice(0, 3);
  const chosenTips = tips.slice(0, 3);
  const motivationLine = selectedAdvice.motivation || defaultAdvice.motivation;

  refs.planBox.innerHTML = `
    <strong>1. Validation Result</strong><br>
    ${escapeHtml(verdict)} (Score: ${score}/10)<br><br>

    <strong>2. Idea Summary</strong><br>
    ${escapeHtml(ideaSummary)}<br><br>

    <strong>3. Steps to Start (3–5 steps)</strong>
    <ol>${steps.slice(0, 5).map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>

    <strong>4. Challenges</strong>
    <ul>${chosenChallenges.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>

    <strong>5. Improvement Suggestions</strong>
    <ul>${chosenTips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}</ul>

    <strong>6. Motivation line</strong><br>
    ${escapeHtml(motivationLine)}
  `;
}

function renderBusinessToolsOverview() {
  setActivePlanButtons('');
  refs.planBox.innerHTML = `
    <strong>Business tools overview</strong><br>
    Use these built-in tools to make faster beginner decisions:
    <ul>
      <li><strong>Startup Guide:</strong> simple step-by-step launch path for beginners.</li>
      <li><strong>Plan Template:</strong> one-page format with idea, customer, cost, and earnings.</li>
      <li><strong>Idea Validator:</strong> type an idea and get a quick score plus improvements.</li>
    </ul>
    Tip: choose one tool to open it in the panel below.
  `;
  refs.planTitle.textContent = 'No tool selected';
  toggleIdeaValidator(false);
}

function setActivePlanButtons(type) {
  document.querySelectorAll('[data-plan]').forEach((button) => {
    button.classList.toggle('active-tool', button.dataset.plan === type);
  });
}

function generateIdea() {
  const idea = IDEA_LIBRARY[Math.floor(Math.random() * IDEA_LIBRARY.length)];
  refs.ideaBox.innerHTML = `
    <strong>💡 ${escapeHtml(idea.title)}</strong><br>
    <strong>Category:</strong> ${escapeHtml(idea.category)}<br>
    <strong>Description:</strong> ${escapeHtml(idea.description)}
  `;
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

  refs.incomeValue.textContent = formatMoney(totals.income);
  refs.expenseValue.textContent = formatMoney(totals.expense);
  refs.balanceValue.textContent = formatMoney(totals.balance);

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
    validator: 'Idea Validator'
  };

  if (selectionMap[state.selectedPlan]) {
    generatePlan(state.selectedPlan);
    showTab('dashboard');
  }
}

function toggleIdeaValidator(show) {
  if (!refs.ideaValidatorForm) return;
  refs.ideaValidatorForm.classList.toggle('hidden', !show);
}

function scoreIdea(rawIdea) {
  const idea = rawIdea.toLowerCase();
  let score = 4;

  if (idea.split(/\s+/).length >= 3) score += 1;
  if (/(local|online|subscription|service|delivery|coaching|agency|store)/.test(idea)) score += 1;
  if (/(monthly|weekly|package|plan|premium|basic|price)/.test(idea)) score += 1;
  if (/(for|to|help)/.test(idea)) score += 1;
  if (/(busy|students|parents|shops|businesses|freelancers|offices)/.test(idea)) score += 1;

  return Math.max(1, Math.min(10, score));
}

function renderHeader() {
  const now = new Date();
  const currencyConfig = CURRENCY_CONFIG[state.currency] || CURRENCY_CONFIG[DEFAULT_CURRENCY];
  refs.dateChip.textContent = now.toLocaleDateString(currencyConfig.locale, { day: '2-digit', month: 'short', year: 'numeric' });

  const h = now.getHours();
  refs.greeting.textContent = h < 12 ? t('greetingMorning') : h < 17 ? t('greetingAfternoon') : t('greetingEvening');

  refs.appTitle.textContent = t('appTitle');
  refs.appSubtitle.textContent = t('appSubtitle');
  refs.workspaceChip.textContent = t('workspaceChip');
  refs.languageLabel.textContent = t('languageLabel');
  refs.currencyLabel.textContent = t('currencyLabel');
  refs.statBalanceLabel.textContent = t('statBalanceLabel');
  refs.statBalanceCaption.textContent = t('statBalanceCaption');
  refs.statIncomeLabel.textContent = t('statIncomeLabel');
  refs.statIncomeCaption.textContent = t('statIncomeCaption');
  refs.statExpenseLabel.textContent = t('statExpenseLabel');
  refs.statExpenseCaption.textContent = t('statExpenseCaption');
  refs.txnAmountLabel.textContent = `${t('txnAmountLabel')} (${currencyConfig.symbol})`;
  refs.recAmountLabel.textContent = `${t('recAmountLabel')} (${currencyConfig.symbol})`;
  refs.targetLabel.textContent = `${t('targetLabel')} (${currencyConfig.symbol})`;
  refs.languageSelect.value = state.language;
  refs.currencySelect.value = state.currency;

  const goal = state.goal || t('notSet');
  refs.goalBadge.textContent = `${t('goalPrefix')}: ${goal}`;
  refs.goalStatus.textContent = goal;

  refs.goalInput.value = state.goal;
  refs.targetInput.value = state.monthlyTarget || '';
  refs.tipsToggle.checked = state.proactiveTips;
}

function renderChart(totals) {
  const rows = [
    [t('chartIncome'), totals.income, 'bar-income'],
    [t('chartExpense'), totals.expense, 'bar-expense'],
    [t('chartSavings'), Math.max(totals.balance, 0), 'bar-savings']
  ];

  const max = Math.max(1, ...rows.map((r) => r[1]));
  refs.chartList.innerHTML = rows.map(([label, value, klass]) => {
    const width = Math.max(8, Math.round((value / max) * 100));
    return `<div class="chart-row"><span>${label}</span><div class="bar"><span class="${klass}" style="width:${width}%"></span></div><strong>${formatMoney(value)}</strong></div>`;
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
          <div class="meta">${capitalize(item.frequency)} • ${formatMoney(item.amount)}</div>
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
    if (totals.balance > 0) tips.push(`You are cashflow-positive. Reserve at least ${formatMoney(Math.round(totals.balance * 0.3))} for savings.`);
    if (state.monthlyTarget > 0) {
      const remaining = Math.max(state.monthlyTarget - Math.max(totals.balance, 0), 0);
      tips.push(remaining === 0
        ? 'Great work — your monthly savings target is currently met.'
        : `You need ${formatMoney(remaining)} more to hit your monthly savings target.`);
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
  const categoryTag = item.type === 'expense' && item.category
    ? `<div class="txn-category-badge">${escapeHtml(item.category)}</div>`
    : '';

  return `
    <li class="item">
      <div>
        <strong>${escapeHtml(item.label)}</strong>
        <div class="meta">${new Date(item.createdAt).toLocaleDateString(getCurrencyLocale())} • ${capitalize(item.type)}</div>
        ${categoryTag}
      </div>
      <div>
        <strong class="${item.type === 'income' ? 'amount-income' : 'amount-expense'}">${item.type === 'income' ? '+' : '-'}${formatMoney(item.amount)}</strong>
        <button class="btn btn-secondary" type="button" data-remove-transaction="${item.id}">Delete</button>
      </div>
    </li>
  `;
}

function setTransactionCategory(category) {
  refs.txnCategoryInputs.forEach((input) => {
    input.checked = input.value === category;
  });
}

function getSelectedTransactionCategory() {
  const selectedInput = refs.txnCategoryInputs.find((input) => input.checked);
  return selectedInput ? selectedInput.value : '';
}

function onTransactionTypeChange() {
  const isExpense = refs.txnType.value === 'expense';
  refs.txnCategoryField.classList.toggle('hidden', !isExpense);
}

function showTemporaryMessage(node, message) {
  const old = node.textContent;
  node.textContent = message;
  setTimeout(() => { node.textContent = old; }, 1800);
}

function emptyItem(text) {
  return `<li class="item"><span class="meta">${escapeHtml(text)}</span></li>`;
}

function getCurrencyLocale() {
  return (CURRENCY_CONFIG[state.currency] || CURRENCY_CONFIG[DEFAULT_CURRENCY]).locale;
}

function formatNumber(value) {
  return new Intl.NumberFormat(getCurrencyLocale(), { maximumFractionDigits: 0 }).format(Math.round(value));
}

function formatMoney(value) {
  const symbol = (CURRENCY_CONFIG[state.currency] || CURRENCY_CONFIG[DEFAULT_CURRENCY]).symbol;
  return `${symbol}${formatNumber(value)}`;
}

function capitalize(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

function shuffle(items) {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
