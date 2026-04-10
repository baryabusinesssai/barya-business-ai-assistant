(() => {
  const STORAGE_KEYS = {
    monthlyIncome: 'barya_monthlyIncome',
    expenses: 'barya_expenses',
    recurringExpenses: 'barya_recurringExpenses',
    settings: 'barya_settings',
    aiChatHistory: 'barya_ai_chat_history',
    businessAdvisorHistory: 'barya_business_advisor_history',
    ideaGeneratorHistory: 'barya_idea_generator_history',
    businessPlan: 'barya_business_plan',
    whenNotStartTemplate: 'barya_when_not_start_template'
  };

  const LANGUAGES = ['English', 'Hindi', 'Hinglish', 'Korean', 'Japanese', 'Chinese', 'Arabic', 'French', 'Spanish', 'German', 'Russian', 'Portuguese'];
  const CURRENCIES = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'SGD'];
  const BUSINESS_PLAN_TEMPLATES = [
    {
      id: 'lean-canvas',
      title: 'Lean Launch Canvas',
      description: 'Map the core blocks for a fast, testable startup launch.',
      sections: [
        { id: 'problem', title: 'Problem', placeholder: 'List the top 3 customer pain points.' },
        { id: 'solution', title: 'Solution', placeholder: 'Describe your product/service solution in practical terms.' },
        { id: 'value-prop', title: 'Unique Value Proposition', placeholder: 'What makes this offer clearly different and desirable?' },
        { id: 'channels', title: 'Channels', placeholder: 'Where will customers discover and buy from you?' },
        { id: 'revenue', title: 'Revenue Streams', placeholder: 'How will money come in? Pricing model, upsells, subscriptions, etc.' },
        { id: 'cost', title: 'Cost Structure', placeholder: 'List major recurring and one-time costs.' }
      ]
    },
    {
      id: 'marketing-campaign',
      title: 'Marketing Campaign Block',
      description: 'Structure your campaign strategy, content, and KPIs in one view.',
      sections: [
        { id: 'audience', title: 'Target Audience', placeholder: 'Who exactly are you trying to reach?' },
        { id: 'message', title: 'Core Message', placeholder: 'What single message should this audience remember?' },
        { id: 'content-plan', title: 'Content Plan', placeholder: 'Outline 3–5 campaign assets: reels, posts, landing page, email, etc.' },
        { id: 'timeline', title: 'Timeline & Milestones', placeholder: 'Week-by-week milestones and launch checkpoints.' },
        { id: 'budget', title: 'Budget Allocation', placeholder: 'How will budget be split across channels and production?' },
        { id: 'kpis', title: 'Success Metrics (KPIs)', placeholder: 'Define measurable outcomes: leads, CAC, conversions, revenue.' }
      ]
    },
    {
      id: 'ops-roadmap',
      title: 'Operations Roadmap',
      description: 'Plan people, tools, and execution systems for stable operations.',
      sections: [
        { id: 'workflow', title: 'Workflow Design', placeholder: 'Describe your operational workflow from lead to delivery.' },
        { id: 'team', title: 'Team & Roles', placeholder: 'Who owns what? Define responsibilities and decision owners.' },
        { id: 'tools', title: 'Tools & Automation', placeholder: 'What software/tools support each stage of operations?' },
        { id: 'risks', title: 'Risk Management', placeholder: 'What can fail, and what backup plans are in place?' },
        { id: 'quality', title: 'Quality Standards', placeholder: 'Define measurable standards for quality and consistency.' },
        { id: 'review', title: 'Review Cadence', placeholder: 'When and how will you review metrics and process health?' }
      ]
    }
  ];

  const WHEN_NOT_TO_START_MODULE = {
    title: 'When Not to Start a Business',
    introduction: 'Use this module before launching a new venture. It helps you identify high-risk situations where delaying the start can protect your money, time, and reputation.',
    finalTakeaway: 'A strong founder does not just know when to start. A strong founder also knows when to pause, validate, and prepare before committing fully.',
    redFlags: [
      {
        title: 'No Real Customer Problem',
        explanation: 'If your idea is interesting but does not solve a clear, painful problem, people will not pay consistently.',
        warningSign: 'You cannot explain the customer pain in one clear sentence.',
        whatToDo: 'Interview at least 10 target users and rewrite your offer around their exact language and urgent needs.'
      },
      {
        title: 'Starting From Emotion, Not Evidence',
        explanation: 'Excitement is useful, but business decisions need proof. Launching with assumptions increases failure risk.',
        warningSign: 'Your confidence is high, but you have no test data, no pre-orders, and no pilot users.',
        whatToDo: 'Run a low-cost validation sprint: landing page, outreach, and one paid test offer before building more.'
      },
      {
        title: 'No Financial Runway',
        explanation: 'Without a cushion, short-term pressure can force bad decisions and early shutdown.',
        warningSign: 'You cannot cover personal and business essentials for the next 6 months.',
        whatToDo: 'Create a runway plan: reduce fixed costs, keep income stability, and launch part-time until revenue is predictable.'
      },
      {
        title: 'Lack of Execution Capacity',
        explanation: 'A business needs consistent execution. If you do not have enough time, systems, or support, momentum breaks quickly.',
        warningSign: 'Important tasks are repeatedly delayed and nothing reaches completion.',
        whatToDo: 'Simplify scope to one core offer, set weekly execution blocks, and define a minimum operating workflow.'
      },
      {
        title: 'Avoiding Market Reality',
        explanation: 'Ignoring competition, pricing pressure, or legal requirements creates avoidable risk.',
        warningSign: 'You have not reviewed competitors, customer alternatives, and compliance obligations.',
        whatToDo: 'Do a structured market check: compare three competitors, map pricing, and verify basic legal/tax requirements.'
      }
    ]
  };

  const WHEN_NOT_TO_START_TEMPLATE_FIELDS = [
    { id: 'businessIdea', label: 'Business Idea', placeholder: 'Describe the idea you want to launch.' },
    { id: 'problemEvidence', label: 'Problem Evidence', placeholder: 'What proof do you have that this is a real customer problem?' },
    { id: 'validationPlan', label: 'Validation Plan', placeholder: 'What test will you run in the next 7 days?' },
    { id: 'financialRunway', label: 'Financial Runway Check', placeholder: 'How many months of runway do you currently have?' },
    { id: 'currentRisks', label: 'Top Risks', placeholder: 'List your top 3 risks before launch.' },
    { id: 'nextAction', label: 'Decision & Next Action', placeholder: 'Should you start now, delay, or pivot? What is your immediate next step?' }
  ];

  let appState = {
    monthlyIncome: 0,
    expenses: [],
    recurringExpenses: [],
    settings: { currency: 'USD', language: 'English', goal: '' },
    aiChatHistory: [],
    businessAdvisorHistory: [],
    ideaGeneratorHistory: [],
    businessPlan: { selectedTemplateId: '', drafts: {} },
    whenNotStartTemplate: {}
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

  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getSelectedBusinessTemplate() {
    return BUSINESS_PLAN_TEMPLATES.find((item) => item.id === appState.businessPlan.selectedTemplateId) || null;
  }

  function ensureBusinessPlanDraft(templateId) {
    if (!templateId) return;
    const template = BUSINESS_PLAN_TEMPLATES.find((item) => item.id === templateId);
    if (!template) return;
    if (!appState.businessPlan.drafts[templateId]) {
      appState.businessPlan.drafts[templateId] = {};
    }
    template.sections.forEach((section) => {
      if (typeof appState.businessPlan.drafts[templateId][section.id] !== 'string') {
        appState.businessPlan.drafts[templateId][section.id] = '';
      }
    });
  }

  function saveBusinessPlanState() {
    saveToStorage(STORAGE_KEYS.businessPlan, appState.businessPlan);
  }

  function renderBusinessPlanTemplates() {
    const cards = $('businessPlanTemplateCards');
    if (!cards) return;
    cards.innerHTML = BUSINESS_PLAN_TEMPLATES.map((template) => {
      const isActive = template.id === appState.businessPlan.selectedTemplateId;
      return `
        <button type="button" class="template-card ${isActive ? 'active' : ''} rounded-2xl p-4 text-left transition" data-template-id="${template.id}">
          <p class="text-[11px] uppercase tracking-[0.22em] text-slate-400">Template</p>
          <h3 class="font-semibold text-lg mt-1">${template.title}</h3>
          <p class="text-sm text-slate-300 mt-2 leading-relaxed">${template.description}</p>
          <p class="text-xs text-slate-400 mt-3">${template.sections.length} editable blocks</p>
        </button>
      `;
    }).join('');
  }

  function renderBusinessPlanEditor() {
    const header = $('businessPlanEditorHeader');
    const status = $('businessPlanStatus');
    const form = $('businessPlanEditorForm');
    if (!header || !status || !form) return;

    const selectedTemplate = getSelectedBusinessTemplate();
    if (!selectedTemplate) {
      header.textContent = 'Select a template';
      status.textContent = 'Open a template card to start editing.';
      form.innerHTML = '';
      return;
    }

    ensureBusinessPlanDraft(selectedTemplate.id);
    const draft = appState.businessPlan.drafts[selectedTemplate.id];

    header.textContent = `${selectedTemplate.title} — Editable Blocks`;
    status.textContent = 'Edit any box below. Your inputs stay editable and save locally.';
    form.innerHTML = selectedTemplate.sections.map((section) => `
      <label class="template-editor-block rounded-2xl p-4 flex flex-col gap-2">
        <span class="text-xs uppercase tracking-[0.18em] text-slate-400">${section.title}</span>
        <textarea
          data-template-field="${section.id}"
          rows="6"
          class="w-full rounded-xl p-3 text-sm leading-relaxed resize-y"
          placeholder="${escapeHtml(section.placeholder)}"
        >${escapeHtml(draft[section.id] || '')}</textarea>
      </label>
    `).join('');
  }

  function selectBusinessTemplate(templateId) {
    const templateExists = BUSINESS_PLAN_TEMPLATES.some((item) => item.id === templateId);
    if (!templateExists) return;
    appState.businessPlan.selectedTemplateId = templateId;
    ensureBusinessPlanDraft(templateId);
    saveBusinessPlanState();
    renderBusinessPlanTemplates();
    renderBusinessPlanEditor();
    renderWhenNotToStartGuide();
    initWhenNotToStartTemplate();
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

  function renderWhenNotToStartGuide() {
    const container = $('whenNotToStartGuide');
    if (!container) return;

    const templateFields = WHEN_NOT_TO_START_TEMPLATE_FIELDS.map((field) => {
      const value = appState.whenNotStartTemplate[field.id] || '';
      return `
        <label class="learning-card flex flex-col gap-2" for="template_${field.id}">
          <span class="text-sm font-semibold">${escapeHTML(field.label)}</span>
          <textarea id="template_${field.id}" data-template-input="${field.id}" class="w-full rounded-xl p-3 text-sm" placeholder="${escapeHTML(field.placeholder)}">${escapeHTML(value)}</textarea>
        </label>
      `;
    }).join('');

    const redFlagCards = WHEN_NOT_TO_START_MODULE.redFlags.map((item, index) => `
      <article class="learning-card">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Red Flag ${index + 1}</p>
        <h3 class="text-lg font-semibold mt-1">${escapeHTML(item.title)}</h3>
        <p class="text-sm text-slate-600 mt-2 leading-relaxed">${escapeHTML(item.explanation)}</p>
        <div class="warning-box mt-3">
          <p class="text-xs uppercase tracking-[0.16em] text-amber-700 font-semibold">Warning Sign</p>
          <p class="text-sm text-amber-900 mt-1">${escapeHTML(item.warningSign)}</p>
        </div>
        <div class="action-box mt-3">
          <p class="text-xs uppercase tracking-[0.16em] text-sky-700 font-semibold">What to Do</p>
          <p class="text-sm text-sky-900 mt-1">${escapeHTML(item.whatToDo)}</p>
        </div>
      </article>
    `).join('');

    container.innerHTML = `
      <article class="learning-card">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Title</p>
        <h2 class="text-2xl font-semibold mt-1">${escapeHTML(WHEN_NOT_TO_START_MODULE.title)}</h2>
      </article>

      <article class="learning-card">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Introduction</p>
        <p class="text-sm text-slate-600 mt-2 leading-relaxed">${escapeHTML(WHEN_NOT_TO_START_MODULE.introduction)}</p>
      </article>

      <section class="learning-module-grid">
        ${redFlagCards}
      </section>

      <article class="learning-card">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Final Takeaway</p>
        <p class="text-sm text-slate-600 mt-2 leading-relaxed">${escapeHTML(WHEN_NOT_TO_START_MODULE.finalTakeaway)}</p>
      </article>

      <section class="learning-template">
        <article class="learning-card">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Template</p>
          <h3 class="text-xl font-semibold mt-1">Launch Readiness Reflection</h3>
          <p class="text-sm text-slate-600 mt-2">Complete each textarea to evaluate whether to start now or wait.</p>
          <form id="whenNotToStartTemplateForm" class="mt-4 grid md:grid-cols-2 gap-3">${templateFields}</form>
          <p class="text-xs text-slate-500 mt-4">Your template responses are auto-saved in local storage.</p>
        </article>
      </section>
    `;
  }

  function initWhenNotToStartTemplate() {
    const form = $('whenNotToStartTemplateForm');
    if (!form) return;
    form.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLTextAreaElement)) return;
      const key = target.getAttribute('data-template-input');
      if (!key) return;
      appState.whenNotStartTemplate[key] = target.value;
      saveToStorage(STORAGE_KEYS.whenNotStartTemplate, appState.whenNotStartTemplate);
    });
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

    const startPlanningBtn = $('startPlanningBtn');
    if (startPlanningBtn) {
      startPlanningBtn.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('[data-tab="planning"]')?.click();
        document.getElementById('appSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    const businessPlanTemplateCards = $('businessPlanTemplateCards');
    if (businessPlanTemplateCards) {
      businessPlanTemplateCards.addEventListener('click', (event) => {
        const button = event.target.closest('[data-template-id]');
        if (!button) return;
        selectBusinessTemplate(button.getAttribute('data-template-id'));
      });
    }

    const businessPlanEditorForm = $('businessPlanEditorForm');
    if (businessPlanEditorForm) {
      businessPlanEditorForm.addEventListener('input', (event) => {
        const input = event.target;
        if (!(input instanceof HTMLTextAreaElement)) return;
        const sectionId = input.getAttribute('data-template-field');
        const selectedTemplate = getSelectedBusinessTemplate();
        if (!sectionId || !selectedTemplate) return;
        ensureBusinessPlanDraft(selectedTemplate.id);
        appState.businessPlan.drafts[selectedTemplate.id][sectionId] = input.value;
      });
    }

    const businessPlanSaveBtn = $('businessPlanSaveBtn');
    if (businessPlanSaveBtn) {
      businessPlanSaveBtn.addEventListener('click', () => {
        const selectedTemplate = getSelectedBusinessTemplate();
        if (!selectedTemplate) return;
        saveBusinessPlanState();
        const status = $('businessPlanStatus');
        if (status) status.textContent = `${selectedTemplate.title} saved locally.`;
      });
    }

    const businessPlanResetBtn = $('businessPlanResetBtn');
    if (businessPlanResetBtn) {
      businessPlanResetBtn.addEventListener('click', () => {
        const selectedTemplate = getSelectedBusinessTemplate();
        if (!selectedTemplate) return;
        appState.businessPlan.drafts[selectedTemplate.id] = Object.fromEntries(
          selectedTemplate.sections.map((section) => [section.id, ''])
        );
        saveBusinessPlanState();
        renderBusinessPlanEditor();
        const status = $('businessPlanStatus');
        if (status) status.textContent = `${selectedTemplate.title} cleared.`;
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
    appState.businessPlan = loadFromStorage(STORAGE_KEYS.businessPlan, appState.businessPlan);
    appState.whenNotStartTemplate = loadFromStorage(STORAGE_KEYS.whenNotStartTemplate, {});
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
    renderBusinessPlanTemplates();
    renderBusinessPlanEditor();
    renderWhenNotToStartGuide();
    initWhenNotToStartTemplate();

    const incomeInput = $('incomeInput');
    if (incomeInput) incomeInput.value = String(appState.monthlyIncome || '');
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
