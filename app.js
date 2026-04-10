(() => {
  const STORAGE_KEYS = {
    monthlyIncome: 'barya_monthlyIncome',
    expenses: 'barya_expenses',
    recurringExpenses: 'barya_recurringExpenses',
    settings: 'barya_settings',
    aiChatHistory: 'barya_ai_chat_history',
    businessAdvisorHistory: 'barya_business_advisor_history',
    ideaGeneratorHistory: 'barya_idea_generator_history',
    businessPlanLeanCanvas: 'barya_business_plan_lean_canvas',
    businessPlanFullPlan: 'barya_business_plan_full_business_plan',
    businessPlanPitchDeck: 'barya_business_plan_pitch_deck_outline',
    businessPlanFinancial: 'barya_business_plan_financial_plan',
    businessPlanMarketing: 'barya_business_plan_marketing_plan'
  };

  const LANGUAGES = ['English', 'Hindi', 'Hinglish', 'Korean', 'Japanese', 'Chinese', 'Arabic', 'French', 'Spanish', 'German', 'Russian', 'Portuguese'];
  const CURRENCIES = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'SGD'];
  const BUSINESS_PLAN_TEMPLATES = [
    {
      id: 'leanCanvas',
      storageKey: STORAGE_KEYS.businessPlanLeanCanvas,
      title: 'Lean Canvas',
      description: 'One-page startup model to validate demand, risks, and core growth logic.',
      helper: 'Use concise statements and clear assumptions to keep your canvas investor-ready.',
      sections: [
        { key: 'problem', label: 'Problem', helper: 'List top 3 urgent customer pains.', placeholder: 'What high-value problem are you solving?' },
        { key: 'customerSegments', label: 'Customer Segments', helper: 'Define primary and secondary target users.', placeholder: 'Who needs this solution most right now?' },
        { key: 'uniqueValueProposition', label: 'Unique Value Proposition', helper: 'Your concise positioning statement.', placeholder: 'Why are you different and better?' },
        { key: 'solution', label: 'Solution', helper: 'Top features that address each problem.', placeholder: 'How exactly will the product solve these pains?' },
        { key: 'channels', label: 'Channels', helper: 'Acquisition and distribution routes.', placeholder: 'Where will users discover and buy from you?' },
        { key: 'revenueStreams', label: 'Revenue Streams', helper: 'How money enters the business.', placeholder: 'Pricing model, packaging, and monetization.' },
        { key: 'costStructure', label: 'Cost Structure', helper: 'Main fixed and variable costs.', placeholder: 'Team, tools, operations, marketing, and overhead.' },
        { key: 'keyMetrics', label: 'Key Metrics', helper: 'Numbers used to track traction.', placeholder: 'Activation, retention, CAC, LTV, conversion, etc.' },
        { key: 'unfairAdvantage', label: 'Unfair Advantage', helper: 'Hard-to-copy edge over competitors.', placeholder: 'Data, partnerships, brand trust, or proprietary tech.' }
      ]
    },
    {
      id: 'fullBusinessPlan',
      storageKey: STORAGE_KEYS.businessPlanFullPlan,
      title: 'Full Business Plan',
      description: 'Comprehensive business planning document for operations, strategy, and execution.',
      helper: 'Treat this as your core operating document with clear decisions and milestones.',
      sections: [
        { key: 'executiveSummary', label: 'Executive Summary', helper: 'Quick overview of business purpose and model.', placeholder: 'Summarize business concept, target market, and objectives.' },
        { key: 'companyOverview', label: 'Company Overview', helper: 'Mission, legal structure, and vision.', placeholder: 'Describe company background and long-term ambition.' },
        { key: 'marketAnalysis', label: 'Market Analysis', helper: 'Industry context, trends, and customer demand.', placeholder: 'Market size, growth signals, and audience behaviors.' },
        { key: 'productsServices', label: 'Products & Services', helper: 'Core offerings and delivery model.', placeholder: 'Explain products, value delivered, and roadmap focus.' },
        { key: 'operationsPlan', label: 'Operations Plan', helper: 'How work gets done day-to-day.', placeholder: 'Team roles, workflow, supply chain, and tooling.' },
        { key: 'managementTeam', label: 'Management Team', helper: 'Leadership structure and ownership.', placeholder: 'Who leads strategy, sales, operations, and finance?' },
        { key: 'salesStrategy', label: 'Sales Strategy', helper: 'Pipeline design and conversion approach.', placeholder: 'Lead generation, qualification, demos, and closing flow.' },
        { key: 'riskManagement', label: 'Risk Management', helper: 'Key business risks and mitigation plan.', placeholder: 'Operational, market, legal, and financial risks.' },
        { key: 'milestones', label: 'Milestones', helper: 'Quarterly goals and timeline.', placeholder: 'What outcomes must be achieved by each phase?' }
      ]
    },
    {
      id: 'pitchDeckOutline',
      storageKey: STORAGE_KEYS.businessPlanPitchDeck,
      title: 'Pitch Deck Outline',
      description: 'Narrative slide flow that communicates vision, traction, and investor potential.',
      helper: 'Keep each section brief and data-backed to translate easily into slides.',
      sections: [
        { key: 'openingHook', label: 'Opening Hook', helper: 'Memorable context in one short paragraph.', placeholder: 'Start with the pain, opportunity, or market shift.' },
        { key: 'problemSlide', label: 'Problem Slide', helper: 'Describe who is affected and why it matters.', placeholder: 'What urgent friction exists today?' },
        { key: 'solutionSlide', label: 'Solution Slide', helper: 'Clear product story and outcome.', placeholder: 'What is your product and core value?' },
        { key: 'marketOpportunity', label: 'Market Opportunity', helper: 'TAM/SAM/SOM and growth trend.', placeholder: 'How large is the addressable opportunity?' },
        { key: 'businessModel', label: 'Business Model', helper: 'How you make money and scale margin.', placeholder: 'Pricing, monetization, and expansion model.' },
        { key: 'traction', label: 'Traction', helper: 'Early proof from customers or revenue.', placeholder: 'Key metrics, growth, customer logos, retention data.' },
        { key: 'goToMarket', label: 'Go-To-Market', helper: 'How you acquire and retain users.', placeholder: 'Channels, partnerships, and demand generation plan.' },
        { key: 'competition', label: 'Competition', helper: 'Positioning against alternatives.', placeholder: 'Competitor map and your strategic edge.' },
        { key: 'financialAsk', label: 'Financial Ask', helper: 'Funding need and use of funds.', placeholder: 'Amount raising, runway, and milestone outcomes.' }
      ]
    },
    {
      id: 'financialPlan',
      storageKey: STORAGE_KEYS.businessPlanFinancial,
      title: 'Financial Plan Template',
      description: 'Plan revenue, costs, runway, and scenario assumptions with practical clarity.',
      helper: 'Use realistic assumptions and keep formulas easy to verify over time.',
      sections: [
        { key: 'revenueAssumptions', label: 'Revenue Assumptions', helper: 'Units, pricing, conversion, and growth expectations.', placeholder: 'Document key assumptions for revenue modeling.' },
        { key: 'expenseForecast', label: 'Expense Forecast', helper: 'Fixed vs variable costs by month.', placeholder: 'Team, software, marketing, operations, and overhead.' },
        { key: 'cashFlowPlan', label: 'Cash Flow Plan', helper: 'Expected inflows and outflows timeline.', placeholder: 'How cash moves month-by-month and where pressure appears.' },
        { key: 'breakEven', label: 'Break-even Analysis', helper: 'Threshold to profitability.', placeholder: 'At what revenue level do you break even?' },
        { key: 'capitalNeeds', label: 'Capital Needs', helper: 'Funding required and timing.', placeholder: 'What capital is needed to hit the next milestones?' },
        { key: 'pricingStrategy', label: 'Pricing Strategy', helper: 'Price architecture and rationale.', placeholder: 'Plans, packaging, discounting, and willingness-to-pay.' },
        { key: 'profitabilityTargets', label: 'Profitability Targets', helper: 'Margin and net income goals.', placeholder: 'Gross margin and net margin targets per quarter.' },
        { key: 'financialRisks', label: 'Financial Risks', helper: 'Risks that impact stability.', placeholder: 'Revenue volatility, churn, cost inflation, cash shortages.' }
      ]
    },
    {
      id: 'marketingPlan',
      storageKey: STORAGE_KEYS.businessPlanMarketing,
      title: 'Marketing Plan Template',
      description: 'Strategic marketing blueprint with clear positioning, channels, and campaign rhythm.',
      helper: 'Focus on one primary audience and measurable outcomes per campaign.',
      sections: [
        { key: 'brandPositioning', label: 'Brand Positioning', helper: 'How you want to be perceived.', placeholder: 'Positioning statement, tone, and messaging pillars.' },
        { key: 'targetAudience', label: 'Target Audience', helper: 'Primary buyer segments and jobs-to-be-done.', placeholder: 'Demographics, psychographics, and buying behavior.' },
        { key: 'marketingGoals', label: 'Marketing Goals', helper: 'Goals tied to business outcomes.', placeholder: 'Lead, CAC, conversion, retention, or awareness targets.' },
        { key: 'channelStrategy', label: 'Channel Strategy', helper: 'Owned, earned, and paid channels.', placeholder: 'Where you will invest and why.' },
        { key: 'contentPlan', label: 'Content Plan', helper: 'Editorial direction and cadence.', placeholder: 'Core themes, content formats, and publishing schedule.' },
        { key: 'campaignCalendar', label: 'Campaign Calendar', helper: 'Quarterly campaign timeline.', placeholder: 'Major campaigns, launch dates, and owners.' },
        { key: 'budgetAllocation', label: 'Budget Allocation', helper: 'Planned spend by channel.', placeholder: 'Budget split and expected ROI by activity.' },
        { key: 'measurementPlan', label: 'Measurement Plan', helper: 'Reporting metrics and cadence.', placeholder: 'Dashboard metrics, review cycle, and optimization loop.' }
      ]
    }
  ];

  let appState = {
    monthlyIncome: 0,
    expenses: [],
    recurringExpenses: [],
    settings: { currency: 'USD', language: 'English', goal: '' },
    aiChatHistory: [],
    businessAdvisorHistory: [],
    ideaGeneratorHistory: [],
    businessPlanTemplates: {},
    activeBusinessPlanTemplateId: ''
  };

  const $ = (id) => document.getElementById(id);

  function escapeHTML(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function loadFromStorage(key, fallback) {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      if (typeof fallback === 'number') return Number(raw) || fallback;
      return fallback;
    }
  }

  function saveToStorage(key, value) {
    const serializable = typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializable);
  }

  function toMonthlyRecurringAmount(item) {
    const amount = Number(item?.amount) || 0;
    if (item?.frequency === 'weekly') return amount * 52 / 12;
    if (item?.frequency === 'yearly') return amount / 12;
    return amount;
  }

  function formatCurrency(amount) {
    const currency = appState.settings.currency || 'USD';
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 2 }).format(Number(amount || 0));
    } catch {
      return `${currency} ${Number(amount || 0).toFixed(2)}`;
    }
  }

  function calculateTotals() {
    const oneTimeTotal = appState.expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const recurringMonthlyTotal = appState.recurringExpenses.reduce((sum, e) => sum + toMonthlyRecurringAmount(e), 0);
    const totalExpenses = oneTimeTotal + recurringMonthlyTotal;
    const monthlyIncome = Number(appState.monthlyIncome) || 0;
    return {
      monthlyIncome,
      totalExpenses,
      netSavings: monthlyIncome - totalExpenses,
      oneTimeTotal,
      recurringMonthlyTotal
    };
  }

  function buildRecommendations(totals) {
    const list = [];
    if (totals.monthlyIncome <= 0) list.push('Set a monthly income target to unlock better guidance.');
    if (totals.netSavings < 0) list.push('Your spending is above income. Reduce low-priority expenses this week.');
    if (totals.recurringMonthlyTotal > totals.monthlyIncome * 0.4) list.push('Recurring costs exceed 40% of income. Audit subscriptions and fixed bills.');
    if (totals.oneTimeTotal > totals.monthlyIncome * 0.3) list.push('One-time spending is high this month. Pause non-urgent purchases.');
    if (!list.length) list.push('Your budget looks healthy. Build an emergency reserve and invest in growth experiments.');
    return list;
  }

  function renderExpenses() {
    const financeInsight = $('financeInsight');
    if (!financeInsight) return;

    const recent = [...appState.expenses]
      .sort((a, b) => (b.ts || 0) - (a.ts || 0))
      .slice(0, 3)
      .map((e) => `${e.category}: ${formatCurrency(e.amount)}`)
      .join(' • ');

    financeInsight.textContent = recent ? `Recent one-time expenses: ${recent}` : 'No one-time expenses added yet.';
  }

  function renderRecurringExpenses() {
    const topCategoryOutput = $('topCategoryOutput');
    if (!topCategoryOutput) return;
    if (!appState.recurringExpenses.length) {
      topCategoryOutput.textContent = 'No recurring expenses yet.';
      return;
    }

    const top = [...appState.recurringExpenses].sort((a, b) => toMonthlyRecurringAmount(b) - toMonthlyRecurringAmount(a))[0];
    topCategoryOutput.textContent = `Top recurring category: ${top.category} (${formatCurrency(toMonthlyRecurringAmount(top))}/month)`;
  }

  function renderDashboard() {
    const totals = calculateTotals();

    if ($('overviewIncome')) $('overviewIncome').textContent = formatCurrency(totals.monthlyIncome);
    if ($('overviewExpenses')) $('overviewExpenses').textContent = formatCurrency(totals.totalExpenses);
    if ($('overviewSavings')) $('overviewSavings').textContent = formatCurrency(totals.netSavings);
    if ($('profitOutput')) $('profitOutput').textContent = formatCurrency(totals.netSavings);

    if ($('dashboardSummary')) {
      $('dashboardSummary').textContent = `Income: ${formatCurrency(totals.monthlyIncome)} | Expenses: ${formatCurrency(totals.totalExpenses)} | Net: ${formatCurrency(totals.netSavings)}`;
    }

    if ($('savingsStatus')) {
      $('savingsStatus').textContent = totals.netSavings >= 0 ? 'You are operating at a positive monthly balance.' : 'Warning: your monthly balance is currently negative.';
    }

    const mergedRecent = [
      ...appState.expenses.map((e) => ({ ...e, kind: 'one-time', monthlyAmount: Number(e.amount) || 0 })),
      ...appState.recurringExpenses.map((e) => ({ ...e, kind: 'recurring', monthlyAmount: toMonthlyRecurringAmount(e) }))
    ].sort((a, b) => (b.ts || 0) - (a.ts || 0)).slice(0, 5);

    if ($('recentExpensesList')) {
      $('recentExpensesList').innerHTML = mergedRecent.length
        ? mergedRecent.map((e) => `<li class="bg-slate-900/70 border border-slate-700 rounded-xl px-3 py-2">${e.category} (${e.kind}) — ${formatCurrency(e.monthlyAmount)}</li>`).join('')
        : '<li class="text-slate-400">No expenses yet.</li>';
    }

    if ($('autoRecommendations')) {
      const items = buildRecommendations(totals);
      $('autoRecommendations').innerHTML = items.map((item) => `<li>${item}</li>`).join('');
    }

    renderExpenses();
    renderRecurringExpenses();
  }

  function buildLocalAIResponse(message) {
    const text = message.toLowerCase();
    const totals = calculateTotals();

    if (text.includes('expense') || text.includes('budget')) {
      return `Your current total monthly expenses are ${formatCurrency(totals.totalExpenses)}. Focus first on recurring costs for faster savings improvement.`;
    }
    if (text.includes('income') || text.includes('sales')) {
      return `Current monthly income is ${formatCurrency(totals.monthlyIncome)}. Try setting a weekly revenue target aligned to your monthly goal.`;
    }
    if (text.includes('save') || text.includes('profit')) {
      return `Net savings are ${formatCurrency(totals.netSavings)}. ${totals.netSavings < 0 ? 'Reduce non-essential spending and raise income in one channel this week.' : 'Great momentum—allocate part of savings to growth and part to reserve.'}`;
    }

    return 'Action plan: 1) Track expenses daily, 2) Review recurring costs weekly, 3) Run one focused growth experiment each week.';
  }

  function renderAIChat() {
    const chatBox = $('chatBox');
    if (!chatBox) return;
    chatBox.innerHTML = appState.aiChatHistory.length
      ? appState.aiChatHistory.map((item) => {
          const roleClass = item.role === 'user' ? 'border-indigo-500/40' : 'border-emerald-500/40';
          const prefix = item.role === 'user' ? 'You' : 'Barya AI';
          return `<div class="rounded-xl border ${roleClass} bg-slate-900/80 p-3"><p class="text-xs text-slate-400">${prefix}</p><p class="mt-1 text-sm">${item.text}</p></div>`;
        }).join('')
      : '<p class="text-slate-400 text-sm">No messages yet. Start a conversation.</p>';
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function renderBusinessAdvisor() {
    const output = $('businessAdvisorOutput');
    const history = $('businessAdvisorHistoryList');
    if (output && !output.textContent && appState.businessAdvisorHistory.length) {
      output.textContent = appState.businessAdvisorHistory[0].advice;
    }
    if (history) {
      history.innerHTML = appState.businessAdvisorHistory.length
        ? appState.businessAdvisorHistory.slice(0, 5).map((entry) => `<li class="bg-slate-900/70 border border-slate-700 rounded-xl p-2"><span class="text-slate-400">Q:</span> ${entry.question}<br><span class="text-slate-400">A:</span> ${entry.advice}</li>`).join('')
        : '<li class="text-slate-400">No advisor history yet.</li>';
    }
  }

  function generateBusinessAdvice(prompt) {
    const totals = calculateTotals();
    if (totals.netSavings < 0) {
      return `Priority plan: reduce monthly spending by at least ${formatCurrency(Math.abs(totals.netSavings) * 0.3)} and launch one short-term revenue offer this week.`;
    }
    if (prompt.toLowerCase().includes('marketing')) {
      return 'Use one core channel: publish 3 educational posts weekly, add one offer CTA, and track lead-to-sale conversion each Friday.';
    }
    return 'Use a 30-day sprint: define one measurable goal, assign weekly actions, and review results every Sunday.';
  }

  function renderIdeaGenerator() {
    const results = $('ideaGeneratorResults');
    if (!results) return;
    const latest = appState.ideaGeneratorHistory.slice(0, 5);
    results.innerHTML = latest.length
      ? latest.flatMap((item) => item.ideas.map((idea) => `<li class="bg-slate-900/70 border border-slate-700 rounded-xl p-2">${idea}</li>`)).join('')
      : '<li class="text-slate-400">No ideas generated yet.</li>';
  }

  function generateIdeas(topic) {
    const seed = topic || 'small business';
    return [
      `${seed}: subscription-based starter package with monthly coaching`,
      `${seed}: low-cost audit service + premium implementation upsell`,
      `${seed}: local community workshop + digital toolkit bundle`
    ];
  }


  function getBusinessTemplateById(templateId) {
    return BUSINESS_PLAN_TEMPLATES.find((template) => template.id === templateId) || null;
  }

  function loadBusinessTemplateState() {
    const nextState = {};
    BUSINESS_PLAN_TEMPLATES.forEach((template) => {
      const saved = loadFromStorage(template.storageKey, {});
      nextState[template.id] = typeof saved === 'object' && saved !== null ? saved : {};
    });
    appState.businessPlanTemplates = nextState;
  }

  function renderBusinessPlanTemplateCards() {
    const cardsContainer = $('businessPlanTemplateCards');
    if (!cardsContainer) return;

    cardsContainer.innerHTML = BUSINESS_PLAN_TEMPLATES.map((template) => {
      const isActive = template.id === appState.activeBusinessPlanTemplateId;
      const savedSections = Object.values(appState.businessPlanTemplates[template.id] || {}).filter(Boolean).length;
      const completion = `${savedSections}/${template.sections.length} sections saved`;
      return `
        <button class="template-card ${isActive ? 'active' : ''}" type="button" data-template-id="${template.id}">
          <p class="template-card-title">${escapeHTML(template.title)}</p>
          <p class="template-card-text">${escapeHTML(template.description)}</p>
          <p class="template-card-meta">${escapeHTML(completion)}</p>
        </button>
      `;
    }).join('');

    cardsContainer.querySelectorAll('[data-template-id]').forEach((btn) => {
      btn.addEventListener('click', () => openBusinessPlanTemplate(btn.getAttribute('data-template-id') || ''));
    });
  }

  function renderBusinessPlanEditor() {
    const template = getBusinessTemplateById(appState.activeBusinessPlanTemplateId);
    const form = $('businessPlanEditorForm');
    const header = $('businessPlanEditorHeader');
    const helper = $('businessPlanTemplateHelper');
    if (!form || !header || !helper) return;

    if (!template) {
      header.textContent = 'Select a template';
      helper.textContent = 'Pick one of the five planning templates to start building your document.';
      form.innerHTML = '';
      return;
    }

    const data = appState.businessPlanTemplates[template.id] || {};
    header.textContent = template.title;
    helper.textContent = template.helper;
    form.innerHTML = template.sections.map((section) => `
      <article class="editor-field-card">
        <label class="editor-field-label" for="${template.id}_${section.key}">${escapeHTML(section.label)}</label>
        <p class="editor-field-helper">${escapeHTML(section.helper)}</p>
        <textarea
          class="editor-textarea"
          id="${template.id}_${section.key}"
          name="${section.key}"
          placeholder="${escapeHTML(section.placeholder)}"
        >${escapeHTML(data[section.key] || '')}</textarea>
      </article>
    `).join('');

    form.querySelectorAll('textarea').forEach((textarea) => {
      textarea.addEventListener('input', (event) => {
        const current = appState.businessPlanTemplates[template.id] || {};
        current[event.target.name] = event.target.value;
        appState.businessPlanTemplates[template.id] = current;
      });
    });
  }

  function setBusinessPlanStatus(message) {
    const status = $('businessPlanStatus');
    if (status) status.textContent = message;
  }

  function openBusinessPlanTemplate(templateId) {
    const template = getBusinessTemplateById(templateId);
    if (!template) return;
    appState.activeBusinessPlanTemplateId = templateId;
    renderBusinessPlanTemplateCards();
    renderBusinessPlanEditor();
    setBusinessPlanStatus(`Editing ${template.title}. Changes are local until you click Save Template.`);
  }

  function saveActiveBusinessPlanTemplate() {
    const template = getBusinessTemplateById(appState.activeBusinessPlanTemplateId);
    if (!template) {
      setBusinessPlanStatus('Select a template before saving.');
      return;
    }
    saveToStorage(template.storageKey, appState.businessPlanTemplates[template.id] || {});
    renderBusinessPlanTemplateCards();
    setBusinessPlanStatus(`${template.title} saved to local storage.`);
  }

  function resetActiveBusinessPlanTemplate() {
    const template = getBusinessTemplateById(appState.activeBusinessPlanTemplateId);
    if (!template) {
      setBusinessPlanStatus('Select a template before resetting.');
      return;
    }
    appState.businessPlanTemplates[template.id] = {};
    localStorage.removeItem(template.storageKey);
    renderBusinessPlanEditor();
    renderBusinessPlanTemplateCards();
    setBusinessPlanStatus(`${template.title} reset. You can start fresh.`);
  }

  function initBusinessPlanning() {
    loadBusinessTemplateState();
    renderBusinessPlanTemplateCards();
    renderBusinessPlanEditor();

    const saveBtn = $('businessPlanSaveBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', saveActiveBusinessPlanTemplate);
    }

    const resetBtn = $('businessPlanResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetActiveBusinessPlanTemplate);
    }
  }

  function applySettings() {
    document.documentElement.lang = appState.settings.language === 'English' ? 'en' : 'en';

    const languageSelect = $('languageSelect');
    const settingsLanguageSelect = $('settingsLanguageSelect');
    const currencySelect = $('currencySelect');
    const goalInput = $('goalInput');

    if (languageSelect) languageSelect.value = appState.settings.language;
    if (settingsLanguageSelect) settingsLanguageSelect.value = appState.settings.language;
    if (currencySelect) currencySelect.value = appState.settings.currency;
    if (goalInput) goalInput.value = appState.settings.goal || '';

    renderDashboard();
    renderAIChat();
  }

  function initTabs() {
    const tabButtons = document.querySelectorAll('#tabs [data-tab]');
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.panel').forEach((panel) => panel.classList.add('hidden'));
        tabButtons.forEach((b) => b.classList.remove('active'));
        const target = document.getElementById(`panel-${tab}`);
        if (target) target.classList.remove('hidden');
        btn.classList.add('active');
      });
    });
  }

  function initControls() {
    const incomeInput = $('incomeInput');
    const saveIncomeBtn = $('saveIncomeBtn');
    if (saveIncomeBtn && incomeInput) {
      saveIncomeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const value = Number(incomeInput.value);
        appState.monthlyIncome = Number.isFinite(value) && value >= 0 ? value : 0;
        saveToStorage(STORAGE_KEYS.monthlyIncome, String(appState.monthlyIncome));
        renderDashboard();
      });
    }

    const addExpenseBtn = $('addExpenseBtn');
    const expenseCategoryInput = $('expenseCategoryInput');
    const expenseAmountInput = $('expenseAmountInput');
    if (addExpenseBtn && expenseCategoryInput && expenseAmountInput) {
      addExpenseBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const category = expenseCategoryInput.value.trim() || 'General';
        const amount = Number(expenseAmountInput.value);
        if (!Number.isFinite(amount) || amount <= 0) return;
        appState.expenses.unshift({ id: crypto.randomUUID(), category, amount, ts: Date.now() });
        saveToStorage(STORAGE_KEYS.expenses, appState.expenses);
        expenseCategoryInput.value = '';
        expenseAmountInput.value = '';
        renderDashboard();
      });
    }

    const addRecurringExpenseBtn = $('addRecurringExpenseBtn');
    const recurringCategoryInput = $('recurringCategoryInput');
    const recurringAmountInput = $('recurringAmountInput');
    const recurringFrequencyInput = $('recurringFrequencyInput');
    if (addRecurringExpenseBtn && recurringCategoryInput && recurringAmountInput && recurringFrequencyInput) {
      addRecurringExpenseBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const category = recurringCategoryInput.value.trim() || 'Recurring';
        const amount = Number(recurringAmountInput.value);
        if (!Number.isFinite(amount) || amount <= 0) return;
        appState.recurringExpenses.unshift({ id: crypto.randomUUID(), category, amount, frequency: recurringFrequencyInput.value, ts: Date.now() });
        saveToStorage(STORAGE_KEYS.recurringExpenses, appState.recurringExpenses);
        recurringCategoryInput.value = '';
        recurringAmountInput.value = '';
        recurringFrequencyInput.value = 'monthly';
        renderDashboard();
      });
    }

    const chatForm = $('chatForm');
    const chatInput = $('chatInput');
    if (chatForm && chatInput) {
      chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;
        appState.aiChatHistory.push({ role: 'user', text: message, ts: Date.now() });
        appState.aiChatHistory.push({ role: 'ai', text: buildLocalAIResponse(message), ts: Date.now() });
        saveToStorage(STORAGE_KEYS.aiChatHistory, appState.aiChatHistory);
        chatInput.value = '';
        renderAIChat();
      });
    }

    const clearChatBtn = $('clearChatBtn');
    if (clearChatBtn) {
      clearChatBtn.addEventListener('click', (event) => {
        event.preventDefault();
        appState.aiChatHistory = [];
        saveToStorage(STORAGE_KEYS.aiChatHistory, appState.aiChatHistory);
        renderAIChat();
      });
    }

    const businessAdvisorForm = $('businessAdvisorForm');
    const businessAdvisorInput = $('businessAdvisorInput');
    if (businessAdvisorForm && businessAdvisorInput) {
      businessAdvisorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const question = businessAdvisorInput.value.trim();
        if (!question) return;
        const advice = generateBusinessAdvice(question);
        appState.businessAdvisorHistory.unshift({ question, advice, ts: Date.now() });
        appState.businessAdvisorHistory = appState.businessAdvisorHistory.slice(0, 20);
        saveToStorage(STORAGE_KEYS.businessAdvisorHistory, appState.businessAdvisorHistory);
        businessAdvisorInput.value = '';
        const output = $('businessAdvisorOutput');
        if (output) output.textContent = advice;
        renderBusinessAdvisor();
      });
    }

    const ideaGeneratorForm = $('ideaGeneratorForm');
    const ideaGeneratorInput = $('ideaGeneratorInput');
    if (ideaGeneratorForm && ideaGeneratorInput) {
      ideaGeneratorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const topic = ideaGeneratorInput.value.trim();
        if (!topic) return;
        const ideas = generateIdeas(topic);
        appState.ideaGeneratorHistory.unshift({ topic, ideas, ts: Date.now() });
        appState.ideaGeneratorHistory = appState.ideaGeneratorHistory.slice(0, 20);
        saveToStorage(STORAGE_KEYS.ideaGeneratorHistory, appState.ideaGeneratorHistory);
        ideaGeneratorInput.value = '';
        renderIdeaGenerator();
      });
    }

    const saveSettingsBtn = $('saveSettingsBtn');
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const currencySelect = $('currencySelect');
        const settingsLanguageSelect = $('settingsLanguageSelect');
        const goalInput = $('goalInput');
        appState.settings = {
          currency: currencySelect?.value || appState.settings.currency,
          language: settingsLanguageSelect?.value || appState.settings.language,
          goal: goalInput?.value?.trim() || ''
        };
        saveToStorage(STORAGE_KEYS.settings, appState.settings);
        applySettings();
      });
    }

    const profileForm = $('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
      });
    }

    const memoryForm = $('memoryForm');
    if (memoryForm) {
      memoryForm.addEventListener('submit', (event) => event.preventDefault());
    }

    const startConversationBtn = $('startConversationBtn');
    if (startConversationBtn) {
      startConversationBtn.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('[data-tab="chat"]')?.click();
        $('chatInput')?.focus();
      });
    }

    const languageSelect = $('languageSelect');
    if (languageSelect) {
      languageSelect.addEventListener('change', () => {
        appState.settings.language = languageSelect.value;
        saveToStorage(STORAGE_KEYS.settings, appState.settings);
        applySettings();
      });
    }
  }

  function hydrateState() {
    appState.monthlyIncome = Number(localStorage.getItem(STORAGE_KEYS.monthlyIncome) || 0);
    appState.expenses = loadFromStorage(STORAGE_KEYS.expenses, []);
    appState.recurringExpenses = loadFromStorage(STORAGE_KEYS.recurringExpenses, []);
    appState.settings = loadFromStorage(STORAGE_KEYS.settings, appState.settings);
    appState.aiChatHistory = loadFromStorage(STORAGE_KEYS.aiChatHistory, []);
    appState.businessAdvisorHistory = loadFromStorage(STORAGE_KEYS.businessAdvisorHistory, []);
    appState.ideaGeneratorHistory = loadFromStorage(STORAGE_KEYS.ideaGeneratorHistory, []);
    loadBusinessTemplateState();
  }

  function initSelects() {
    const languageSelect = $('languageSelect');
    const settingsLanguageSelect = $('settingsLanguageSelect');
    const currencySelect = $('currencySelect');

    if (languageSelect) {
      languageSelect.innerHTML = LANGUAGES.map((lang) => `<option value="${lang}">${lang}</option>`).join('');
    }
    if (settingsLanguageSelect) {
      settingsLanguageSelect.innerHTML = LANGUAGES.map((lang) => `<option value="${lang}">${lang}</option>`).join('');
    }
    if (currencySelect) {
      currencySelect.innerHTML = CURRENCIES.map((code) => `<option value="${code}">${code}</option>`).join('');
    }
  }

  function initApp() {
    hydrateState();
    initSelects();
    initTabs();
    initControls();
    applySettings();
    renderDashboard();
    renderAIChat();
    renderBusinessAdvisor();
    renderIdeaGenerator();
    initBusinessPlanning();

    const incomeInput = $('incomeInput');
    if (incomeInput) incomeInput.value = String(appState.monthlyIncome || '');
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
