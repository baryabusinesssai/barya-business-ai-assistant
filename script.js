const STORAGE_KEY = 'barya_dashboard_state_v2';

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
  appendChat('Barya', 'Hello! I am your AI business assistant. Ask any question and I will reply with a clear summary, practical advice, and action tips.');
  syncScreenHeader('dashboard');
  appendChat('Barya', 'Hello! I am your AI business assistant. Ask for savings, finance, or growth guidance.');
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
  refs.businessIdeaInput = document.getElementById('business-idea-input');
  refs.businessIdeaButton = document.getElementById('business-idea-button');

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
  refs.businessIdeaButton?.addEventListener('click', adviseBusinessIdea);
  refs.businessIdeaInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      adviseBusinessIdea();
    }
  });

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
  const response = createAssistantResponse(prompt, totals);

  setTimeout(() => appendChat('Barya', response), 260);
  refs.chatForm.reset();
}

function createAssistantResponse(prompt, totals) {
  const p = prompt.toLowerCase();
  const summary = [];
  const advice = [];
  const tips = [];

  const hasFinancialData = totals.income > 0 || totals.expense > 0;

  if (p.includes('expense') || p.includes('spend') || p.includes('cost')) {
    summary.push(`Your current tracked expenses are ₹${formatCurrency(totals.expense)} (manual: ₹${formatCurrency(totals.manualExpense)}, recurring: ₹${formatCurrency(totals.recurringExpense)}).`);
    advice.push('Cut one high-cost area first (not all categories together) so progress is easier to track.');
    advice.push('Set a weekly spending cap for non-essential purchases and review every Sunday.');
    tips.push('Use the Transactions tab daily for 7 days to identify your top 2 avoidable costs.');
    tips.push('Before each non-essential purchase, apply a 24-hour waiting rule.');
  } else if (p.includes('save') || p.includes('savings') || p.includes('emergency')) {
    summary.push(`Current balance is ₹${formatCurrency(totals.balance)} with income ₹${formatCurrency(totals.income)} and total expenses ₹${formatCurrency(totals.expense)}.`);
    advice.push('Automate savings right after income arrives (pay yourself first).');
    advice.push('Split savings into two buckets: emergency fund first, growth/investment second.');
    tips.push(`Start with a small fixed weekly transfer (for example ₹${formatCurrency(Math.max(500, Math.round(Math.max(totals.income, 2000) * 0.05)))}).`);
    tips.push('Pause or renegotiate one recurring payment before reducing essentials.');
  } else if (p.includes('business') || p.includes('growth') || p.includes('customer') || p.includes('sales')) {
    summary.push('Business growth improves fastest when offer, audience, and channel are specific.');
    advice.push('Define one target customer segment and one clear problem you solve this month.');
    advice.push('Run a 4-week sprint with one acquisition channel and one conversion metric.');
    tips.push('Track weekly: leads, conversion rate, average order value, and net cashflow.');
    tips.push('Interview 3 customers before changing pricing or launching a new service.');
  } else if (p.includes('goal') || p.includes('plan')) {
    if (state.goal) {
      summary.push(`Your active goal is: "${state.goal}".`);
      advice.push('Break this into weekly milestones with clear target amounts or outcomes.');
      advice.push('Schedule one fixed weekly review to check progress and blockers.');
      tips.push('Use Sunday review: what worked, what did not, and one action for next week.');
      if (state.monthlyTarget > 0) tips.push(`Monthly savings target is ₹${formatCurrency(state.monthlyTarget)}. Keep progress visible in Dashboard metrics.`);
    } else {
      summary.push('No primary goal is set yet, so guidance is more general right now.');
      advice.push('Set one measurable goal in Settings (amount + timeline).');
      advice.push('Choose only 1–2 focus actions to avoid overplanning.');
      tips.push('Example beginner goal: save one month of essential expenses within 6 months.');
    }
  } else {
    summary.push(hasFinancialData
      ? `Quick snapshot: income ₹${formatCurrency(totals.income)}, expenses ₹${formatCurrency(totals.expense)}, balance ₹${formatCurrency(totals.balance)}.`
      : 'I can provide better guidance once you add at least one income and one expense entry.');
    advice.push('Pick one priority for this week: reduce expense, increase income, or improve sales consistency.');
    advice.push('Use short review cycles (weekly) instead of monthly-only tracking for faster course correction.');
    tips.push('Ask specific questions like “How do I reduce food costs by 15%?” for more precise guidance.');
    tips.push('Keep decisions simple: one experiment, one metric, one deadline.');
  }

  if (totals.balance < 0) {
    advice.push('You are currently cashflow-negative, so focus on immediate cost control before expansion spending.');
    tips.push('List all recurring expenses and pause low-value subscriptions this week.');
  }

  return [
    'Summary:',
    `• ${summary.join(' ')}`,
    'Advice:',
    ...advice.slice(0, 3).map((item) => `• ${item}`),
    'Tips:',
    ...tips.slice(0, 3).map((item) => `• ${item}`)
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
  const totals = computeTotals();
  const goalText = state.goal || 'build stable cashflow and predictable growth';

  const templates = {
    startup: {
      title: 'Startup Launch Guide',
      steps: [
        'Validate the problem with at least 10 target users and note repeated pain points.',
        'Build a minimum offer you can deliver in 7-14 days with clear pricing.',
        'Launch with one low-cost channel (WhatsApp, local groups, or referrals).',
        'Track results weekly: leads, conversions, delivery quality, and profit per customer.'
      ],
      reality: 'Most beginners overbuild early. Validate demand first, then improve delivery after first paying customers.'
    },
    business: {
      title: 'Business Plan Builder',
      steps: [
        'Define customer segment, problem, value proposition, and pricing in one page.',
        'Estimate monthly fixed + variable costs and set a break-even target.',
        'Create a 90-day sales plan with realistic weekly lead targets.',
        'Prepare a simple operations checklist for delivery, support, and follow-up.'
      ],
      reality: 'A useful business plan should be actionable, not long. Keep assumptions testable and update monthly.'
    },
    cashflow: {
      title: 'Cashflow Improvement Plan',
      steps: [
        'Collect payments faster using upfront deposits or shorter billing cycles.',
        'Reduce unnecessary recurring expenses and renegotiate supplier terms.',
        'Prioritize products/services with higher margins and quicker payment turnaround.',
        'Maintain a minimum reserve target for 2-3 months of essential costs.'
      ],
      reality: totals.balance < 0
        ? `Current balance is ₹${formatCurrency(totals.balance)}; prioritize cash survival actions first.`
        : `Current balance is ₹${formatCurrency(totals.balance)}; use positive cashflow to build reserve and reinvest cautiously.`
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
    <ul>${selected.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ul>
    <strong>Reality check:</strong> ${escapeHtml(selected.reality)}<br><br>
    <strong>Business tools you can use now:</strong>
    <ul>
      <li>Break-even estimate = Fixed cost ÷ (Price - Variable cost).</li>
      <li>Weekly runway check = Current cash ÷ weekly essential spend.</li>
      <li>Lead conversion tracker = customers won ÷ qualified leads.</li>
    </ul>
  `;

  state.selectedPlan = type;
  saveState();

  refs.planTitle.textContent = selected.title;
  refs.insightBox.textContent = `${selected.title} prepared. Opened in the dedicated Business Planning Tools screen.`;

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
  const chosenChallenges = challenges.slice(0, 3);
  const chosenTips = tips.slice(0, 3);
  const motivationLine = selectedAdvice.motivation || defaultAdvice.motivation;

  refs.planBox.innerHTML = `
    <strong>1. Idea Summary</strong><br>
    ${escapeHtml(ideaSummary)}<br><br>

    <strong>2. Steps to Start (3–5 steps)</strong>
    <ol>${steps.slice(0, 5).map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>

    <strong>3. Challenges</strong>
    <ul>${chosenChallenges.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>

    <strong>4. Tips</strong>
    <ul>${chosenTips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}</ul>

    <strong>5. Motivation line</strong><br>
    ${escapeHtml(motivationLine)}
  `;
}

function renderBusinessToolsOverview() {
  refs.planBox.innerHTML = `
    <strong>Business tools overview</strong><br>
    Use these built-in tools to make faster beginner decisions:
    <ul>
      <li><strong>Startup Guide:</strong> practical launch sequence for first customers.</li>
      <li><strong>Business Plan:</strong> one-page planning framework with realistic milestones.</li>
      <li><strong>Cashflow Improvement:</strong> actions to reduce financial stress and improve runway.</li>
      <li><strong>Core formulas:</strong> break-even, runway, and conversion tracking included in each response.</li>
    </ul>
    Tip: add your idea below to receive a tailored step-by-step advisor plan.
  `;
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
