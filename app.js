(() => {
  const STORAGE_KEYS = {
    monthlyIncome: 'barya_monthlyIncome',
    expenses: 'barya_expenses',
    recurringExpenses: 'barya_recurringExpenses',
    settings: 'barya_settings',
    aiChatHistory: 'barya_ai_chat_history',
    businessAdvisorHistory: 'barya_business_advisor_history',
    ideaGeneratorHistory: 'barya_idea_generator_history',
    templateLean: 'barya_template_lean',
    templateMarketing: 'barya_template_marketing',
    templateOperations: 'barya_template_operations',
    userStarted: 'barya_user_started',
    theme: 'barya_theme',
    onboardingSeen: 'barya_onboarding_seen',
    businessCategory: 'barya_business_category',
    netSavingsTrend: 'barya_net_savings_trend',
    businessPlanAiGenerated: 'barya_business_plan_ai_generated'
  };

  const LANGUAGES = ['English', 'Hindi', 'Korean', 'Japanese', 'Arabic', 'French', 'Spanish', 'German', 'Russian', 'Portuguese'];
  const LANGUAGE_CODES = {
    English: 'en',
    Hindi: 'hi',
    Korean: 'ko',
    Japanese: 'ja',
    Arabic: 'ar',
    French: 'fr',
    Spanish: 'es',
    German: 'de',
    Russian: 'ru',
    Portuguese: 'pt'
  };
  const TRANSLATIONS = {
    English: {
      dashboard: 'Dashboard',
      aiAssistant: 'AI Chat',
      workspace: 'Workspace',
      memory: 'Memory',
      profile: 'Profile',
      settings: 'Settings',
      save: 'Save',
      saveProfile: 'Save profile',
      saveImageNote: 'Save image context',
      financeIntelligence: 'Finance Intelligence',
      recommendations: 'Recommendations',
      businessGrowth: 'Business Growth',
      localFirstAI: 'Local-first AI',
      founderWorkspace: 'Founder Workspace',
      language: 'Language',
      title: 'Barya Business AI',
      subtitle: 'Professional local-first business intelligence without external AI APIs.',
      businessAdvisor: 'Workspace',
      ideaGenerator: 'Idea Generator',
      fileIntelligence: 'File Intelligence',
      imageContext: 'Image Context',
      monthlyOverview: 'Monthly Overview',
      monthlyIncome: 'Monthly Income',
      totalExpenses: 'Total Expenses',
      netSavings: 'Net Savings',
      recentExpenses: 'Recent Expenses',
      currency: 'Currency',
      goal: 'Goal',
      startConversation: 'Start conversation',
      saveSettings: 'Save',
      chatPlaceholder: 'Ask anything about your business...'
    },
    Hindi: { dashboard: 'डैशबोर्ड', aiAssistant: 'एआई चैट', workspace: 'वर्कस्पेस', memory: 'मेमोरी', profile: 'प्रोफ़ाइल', save: 'सेव करें', saveProfile: 'प्रोफ़ाइल सेव करें', saveImageNote: 'इमेज कॉन्टेक्स्ट सेव करें', financeIntelligence: 'फाइनेंस इंटेलिजेंस', recommendations: 'सिफारिशें', businessGrowth: 'बिजनेस ग्रोथ', localFirstAI: 'लोकल-फर्स्ट एआई', founderWorkspace: 'फाउंडर वर्कस्पेस' },
    Korean: { dashboard: '대시보드', aiAssistant: 'AI 채팅', workspace: '워크스페이스', memory: '메모리', profile: '프로필', save: '저장', saveProfile: '프로필 저장', saveImageNote: '이미지 컨텍스트 저장', financeIntelligence: '재무 인텔리전스', recommendations: '추천', businessGrowth: '비즈니스 성장', localFirstAI: '로컬 우선 AI', founderWorkspace: '창업자 워크스페이스' },
    Japanese: { dashboard: 'ダッシュボード', aiAssistant: 'AIチャット', workspace: 'ワークスペース', memory: 'メモリー', profile: 'プロフィール', save: '保存', saveProfile: 'プロフィールを保存', saveImageNote: '画像コンテキストを保存', financeIntelligence: '財務インテリジェンス', recommendations: 'おすすめ', businessGrowth: 'ビジネス成長', localFirstAI: 'ローカルファーストAI', founderWorkspace: '創業者ワークスペース' },
    Arabic: { dashboard: 'لوحة التحكم', aiAssistant: 'دردشة الذكاء الاصطناعي', workspace: 'مساحة العمل', memory: 'الذاكرة', profile: 'الملف الشخصي', save: 'حفظ', saveProfile: 'حفظ الملف الشخصي', saveImageNote: 'حفظ سياق الصورة', financeIntelligence: 'ذكاء مالي', recommendations: 'التوصيات', businessGrowth: 'نمو الأعمال', localFirstAI: 'ذكاء اصطناعي محلي أولاً', founderWorkspace: 'مساحة المؤسس' },
    French: { dashboard: 'Tableau de bord', aiAssistant: 'Chat IA', workspace: 'Espace de travail', memory: 'Mémoire', profile: 'Profil', save: 'Enregistrer', saveProfile: 'Enregistrer le profil', saveImageNote: "Enregistrer le contexte d'image", financeIntelligence: 'Intelligence financière', recommendations: 'Recommandations', businessGrowth: "Croissance de l'entreprise", localFirstAI: "IA locale d'abord", founderWorkspace: 'Espace Fondateur' },
    Spanish: { dashboard: 'Panel', aiAssistant: 'Chat IA', workspace: 'Espacio de trabajo', memory: 'Memoria', profile: 'Perfil', save: 'Guardar', saveProfile: 'Guardar perfil', saveImageNote: 'Guardar contexto de imagen', financeIntelligence: 'Inteligencia financiera', recommendations: 'Recomendaciones', businessGrowth: 'Crecimiento empresarial', localFirstAI: 'IA local', founderWorkspace: 'Espacio del fundador' },
    German: { dashboard: 'Dashboard', aiAssistant: 'KI-Chat', workspace: 'Arbeitsbereich', memory: 'Speicher', profile: 'Profil', save: 'Speichern', saveProfile: 'Profil speichern', saveImageNote: 'Bildkontext speichern', financeIntelligence: 'Finanzintelligenz', recommendations: 'Empfehlungen', businessGrowth: 'Geschäftswachstum', localFirstAI: 'Lokale KI', founderWorkspace: 'Gründer-Arbeitsbereich' },
    Russian: { dashboard: 'Панель управления', aiAssistant: 'AI-чат', workspace: 'Рабочая область', memory: 'Память', profile: 'Профиль', save: 'Сохранить', saveProfile: 'Сохранить профиль', saveImageNote: 'Сохранить контекст изображения', financeIntelligence: 'Финансовая аналитика', recommendations: 'Рекомендации', businessGrowth: 'Рост бизнеса', localFirstAI: 'Локальный ИИ', founderWorkspace: 'Рабочее место основателя' },
    Portuguese: { dashboard: 'Painel', aiAssistant: 'Chat IA', workspace: 'Espaço de trabalho', memory: 'Memória', profile: 'Perfil', save: 'Salvar', saveProfile: 'Salvar perfil', saveImageNote: 'Salvar contexto da imagem', financeIntelligence: 'Inteligência financeira', recommendations: 'Recomendações', businessGrowth: 'Crescimento do negócio', localFirstAI: 'IA local', founderWorkspace: 'Espaço do fundador' }
  };
  const CURRENCIES = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'SGD'];
  const BUSINESS_PLAN_TEMPLATES = [
    {
      id: 'lean',
      storageKey: STORAGE_KEYS.templateLean,
      title: 'Lean Launch Canvas',
      description: 'Map the core blocks for a fast, testable startup launch.',
      sections: [
        { id: 'problem', title: 'Problem', placeholder: 'Define the main customer problem you are solving.' },
        { id: 'solution', title: 'Solution', placeholder: 'Describe the core solution and experience you will provide.' },
        { id: 'target-customers', title: 'Target Customers', placeholder: 'Who is the primary customer segment?' },
        { id: 'value-proposition', title: 'Value Proposition', placeholder: 'What makes your offer compelling and different?' },
        { id: 'channels', title: 'Channels', placeholder: 'How will customers discover and buy from you?' },
        { id: 'revenue-model', title: 'Revenue Model', placeholder: 'How will the business generate revenue?' }
      ]
    },
    {
      id: 'marketing',
      storageKey: STORAGE_KEYS.templateMarketing,
      title: 'Marketing Campaign Block',
      description: 'Structure your campaign strategy, content, and KPIs in one view.',
      sections: [
        { id: 'campaign-goal', title: 'Campaign Goal', placeholder: 'State the measurable goal for this campaign.' },
        { id: 'target-audience', title: 'Target Audience', placeholder: 'Define who this campaign is built for.' },
        { id: 'channels', title: 'Channels', placeholder: 'Select and justify the channels you will use.' },
        { id: 'content-plan', title: 'Content Plan', placeholder: 'Outline core messages and publishing cadence.' },
        { id: 'budget', title: 'Budget', placeholder: 'List spend allocation and expected return.' },
        { id: 'kpis', title: 'KPIs', placeholder: 'Define success metrics and reporting cadence.' }
      ]
    },
    {
      id: 'operations',
      storageKey: STORAGE_KEYS.templateOperations,
      title: 'Operations Roadmap',
      description: 'Plan people, tools, and execution systems for stable operations.',
      sections: [
        { id: 'team-roles', title: 'Team Roles', placeholder: 'Define core roles and responsibilities.' },
        { id: 'tools', title: 'Tools', placeholder: 'List systems and tools needed for execution.' },
        { id: 'workflow', title: 'Workflow', placeholder: 'Document the workflow from input to delivery.' },
        { id: 'timeline', title: 'Timeline', placeholder: 'Set milestones and implementation phases.' },
        { id: 'risks', title: 'Risks', placeholder: 'Identify operational risks and mitigation plans.' },
        { id: 'execution-plan', title: 'Execution Plan', placeholder: 'Summarize the action plan for consistent execution.' }
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

  let appState = {
    monthlyIncome: 0,
    expenses: [],
    recurringExpenses: [],
    settings: { currency: 'USD', language: 'English', goal: '' },
    aiChatHistory: [],
    businessAdvisorHistory: [],
    ideaGeneratorHistory: [],
    businessPlan: { selectedTemplateId: '', drafts: {}, aiGenerated: {} }
  };
  let expenseChartInstance = null;
  let comparisonChartInstance = null;

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

  function exportData() {
    const exportedData = {};
    Object.keys(localStorage).forEach((key) => {
      exportedData[key] = localStorage.getItem(key);
    });

    const jsonData = JSON.stringify(exportedData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const dateStamp = new Date().toISOString().slice(0, 10);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `barya-backup-${dateStamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  }

  function importData(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      try {
        const parsedData = JSON.parse(readerEvent?.target?.result || '{}');
        Object.keys(parsedData).forEach((key) => {
          localStorage.setItem(key, parsedData[key]);
        });
        alert('Backup imported successfully. The app will now reload.');
        window.location.reload();
      } catch {
        alert('Invalid backup file. Please import a valid JSON backup.');
      } finally {
        if (event.target) event.target.value = '';
      }
    };
    reader.onerror = () => {
      alert('Could not read the selected file. Please try again.');
      if (event.target) event.target.value = '';
    };
    reader.readAsText(file);
  }

  function getTranslations(language) {
    const selected = TRANSLATIONS[language] || TRANSLATIONS.English;
    return { ...TRANSLATIONS.English, ...selected };
  }

  function saveSettings() {
    saveToStorage(STORAGE_KEYS.settings, appState.settings);
  }

  function applyTheme(themeName) {
    const isDark = themeName === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    const themeToggle = $('themeToggle');
    if (themeToggle) themeToggle.checked = isDark;
  }

  function startTour() {
    const steps = [
      {
        selector: '#dashboardTourTarget',
        tab: 'dashboard',
        title: 'Dashboard (Finance)',
        description: 'Track monthly income, expenses, and savings health here.'
      },
      {
        selector: '#aiAssistantTourTarget',
        tab: 'chat',
        title: 'AI Assistant',
        description: 'Ask business strategy questions and get action-oriented suggestions.'
      },
      {
        selector: '#businessPlanningTourTarget',
        tab: 'planning',
        description: 'Use guides and templates to build your business plan.',
        title: 'Business Planning'
      }
    ];

    let current = 0;
    let popup = document.getElementById('tourPopup');

    const cleanup = () => {
      document.querySelectorAll('.tour-highlight').forEach((node) => node.classList.remove('tour-highlight'));
      if (popup) popup.remove();
      popup = null;
    };

    const renderStep = () => {
      cleanup();
      const step = steps[current];
      if (!step) {
        localStorage.setItem(STORAGE_KEYS.onboardingSeen, 'true');
        return;
      }

      setActiveTab(step.tab);
      const target = document.querySelector(step.selector);
      if (!target) return;
      target.classList.add('tour-highlight');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const rect = target.getBoundingClientRect();
      popup = document.createElement('div');
      popup.id = 'tourPopup';
      popup.className = 'tour-popup';
      popup.innerHTML = `
        <p class="text-xs uppercase tracking-[0.18em] text-slate-500">Onboarding Tour</p>
        <h3 class="font-semibold mt-1">${escapeHTML(step.title)}</h3>
        <p class="text-sm mt-2">${escapeHTML(step.description)}</p>
        <div class="mt-3 flex justify-end gap-2">
          <button id="tourSkipBtn" class="px-3 py-1.5 rounded border">Skip</button>
          <button id="tourNextBtn" class="px-3 py-1.5 rounded bg-slate-900 text-white">${current === steps.length - 1 ? 'Finish' : 'Next'}</button>
        </div>
      `;
      document.body.appendChild(popup);
      popup.style.top = `${Math.max(12, window.scrollY + rect.top - 8)}px`;
      popup.style.left = `${Math.min(window.innerWidth - 340, Math.max(12, rect.right - 330))}px`;

      document.getElementById('tourSkipBtn')?.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEYS.onboardingSeen, 'true');
        cleanup();
      });
      document.getElementById('tourNextBtn')?.addEventListener('click', () => {
        current += 1;
        renderStep();
      });
    };

    renderStep();
  }

  function loadSettings() {
    const loaded = loadFromStorage(STORAGE_KEYS.settings, {});
    const language = LANGUAGES.includes(loaded?.language) ? loaded.language : 'English';
    return {
      currency: loaded?.currency || 'USD',
      language,
      goal: loaded?.goal || ''
    };
  }

  function applyLanguage(language) {
    const nextLanguage = LANGUAGES.includes(language) ? language : 'English';
    const t = getTranslations(nextLanguage);
    document.documentElement.lang = LANGUAGE_CODES[nextLanguage] || 'en';
    document.documentElement.dir = nextLanguage === 'Arabic' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (!key || !t[key]) return;
      node.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      const key = node.getAttribute('data-i18n-placeholder');
      if (!key || !t[key]) return;
      node.setAttribute('placeholder', t[key]);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => {
      const key = node.getAttribute('data-i18n-aria-label');
      if (!key || !t[key]) return;
      node.setAttribute('aria-label', t[key]);
    });
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

  function getBusinessCategoryFromStorage() {
    const knownCategoryKeys = [
      STORAGE_KEYS.businessCategory,
      'barya_businessType',
      'businessCategory',
      'businessType'
    ];
    const keyWithValue = knownCategoryKeys.find((key) => {
      const raw = localStorage.getItem(key);
      return typeof raw === 'string' && raw.trim().length > 0;
    });
    return keyWithValue ? localStorage.getItem(keyWithValue).trim() : 'general';
  }

  function buildSystemInfoLine() {
    const totals = calculateTotals();
    const businessCategory = getBusinessCategoryFromStorage();
    return `[System Info: User has ${formatCurrency(totals.netSavings)} savings and is working on a ${businessCategory} business]`;
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

  function renderCharts() {
    if (typeof Chart === 'undefined') return;

    const expenseCanvas = $('expenseChart');
    const comparisonCanvas = $('comparisonChart');
    if (!expenseCanvas || !comparisonCanvas) return;

    const totals = calculateTotals();
    const categoryTotals = {};

    appState.expenses.forEach((expense) => {
      const category = expense?.category || 'Others';
      categoryTotals[category] = (categoryTotals[category] || 0) + (Number(expense?.amount) || 0);
    });

    appState.recurringExpenses.forEach((expense) => {
      const category = expense?.category || 'Others';
      categoryTotals[category] = (categoryTotals[category] || 0) + toMonthlyRecurringAmount(expense);
    });

    const pieLabels = Object.keys(categoryTotals);
    const pieValues = Object.values(categoryTotals);
    const pieColors = ['#1D4ED8', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#14B8A6'];

    const hasExpenseData = pieValues.length > 0;
    const expenseChartEmptyState = $('expenseChartEmptyState');
    expenseCanvas.style.display = hasExpenseData ? 'block' : 'none';
    if (expenseChartEmptyState) expenseChartEmptyState.style.display = hasExpenseData ? 'none' : 'flex';

    if (expenseChartInstance) expenseChartInstance.destroy();
    if (hasExpenseData) expenseChartInstance = new Chart(expenseCanvas, {
      type: 'pie',
      data: {
        labels: pieLabels.length ? pieLabels : ['No Expenses'],
        datasets: [{
          data: pieValues.length ? pieValues : [1],
          backgroundColor: pieLabels.length ? pieColors.slice(0, pieLabels.length) : ['#CBD5E1'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });

    const hasComparisonData = totals.monthlyIncome > 0 || totals.totalExpenses > 0;
    const comparisonChartEmptyState = $('comparisonChartEmptyState');
    comparisonCanvas.style.display = hasComparisonData ? 'block' : 'none';
    if (comparisonChartEmptyState) comparisonChartEmptyState.style.display = hasComparisonData ? 'none' : 'flex';

    if (comparisonChartInstance) comparisonChartInstance.destroy();
    if (hasComparisonData) comparisonChartInstance = new Chart(comparisonCanvas, {
      type: 'bar',
      data: {
        labels: ['Monthly Totals'],
        datasets: [
          {
            label: 'Income',
            data: [totals.monthlyIncome],
            backgroundColor: '#1D4ED8'
          },
          {
            label: 'Expenses',
            data: [totals.totalExpenses],
            backgroundColor: '#EF4444'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
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
        : '<li class="text-slate-400">No expenses yet! Click "Add Expense" to start tracking.</li>';
    }

    const financeEmptyState = $('financeEmptyState');
    if (financeEmptyState) {
      financeEmptyState.classList.toggle('hidden', appState.expenses.length > 0);
    }

    if ($('autoRecommendations')) {
      const items = buildRecommendations(totals);
      $('autoRecommendations').innerHTML = items.map((item) => `<li>${item}</li>`).join('');
    }

    generateAIInsights();
    renderExecutiveSummary(totals);

    renderExpenses();
    renderRecurringExpenses();
    renderCharts();
  }

  function getBiggestExpenseCategory() {
    const allExpenses = [
      ...appState.expenses.map((entry) => ({ category: entry.category, monthlyAmount: Number(entry.amount) || 0 })),
      ...appState.recurringExpenses.map((entry) => ({ category: entry.category, monthlyAmount: toMonthlyRecurringAmount(entry) }))
    ];
    const grouped = allExpenses.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.monthlyAmount;
      return acc;
    }, {});
    const sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
    return sorted.length ? { name: sorted[0][0], amount: sorted[0][1] } : { name: 'N/A', amount: 0 };
  }

  function renderExecutiveSummary(totals) {
    const output = $('executiveSummaryText');
    if (!output) return;
    const biggest = getBiggestExpenseCategory();
    const profitability = totals.netSavings >= 0 ? 'Profitable' : 'At Loss';
    const savingsBuffer = Math.max(0, totals.netSavings);
    const months = totals.totalExpenses > 0 ? (savingsBuffer / totals.totalExpenses) : 0;
    output.textContent = `Your business is currently ${profitability}. Your biggest expense is ${biggest.name}. Based on your ${formatCurrency(savingsBuffer)} savings, you can sustain for ${months.toFixed(1)} months.`;
  }

  function detectIntent(message) {
    const text = String(message || '').toLowerCase();
    const intentRules = [
      { intent: 'idea', keywords: ['idea', 'ideas', 'business idea', 'what business', 'what can i start'] },
      { intent: 'startup', keywords: ['startup', 'start a business', 'start business', 'launch business', 'new venture'] },
      { intent: 'finance', keywords: ['finance', 'financial', 'money', 'income', 'expense', 'expenses', 'budget', 'cashflow', 'profit', 'savings'] },
      { intent: 'marketing', keywords: ['marketing', 'promote', 'promotion', 'advertising', 'audience', 'instagram', 'whatsapp', 'branding'] },
      { intent: 'planning', keywords: ['plan', 'planning', 'roadmap', 'strategy', 'goals', 'milestone', 'steps'] }
    ];

    const matched = intentRules.find((rule) => rule.keywords.some((keyword) => text.includes(keyword)));
    return matched ? matched.intent : 'general';
  }

  function generateResponse(message) {
    const intent = detectIntent(message);

    if (intent === 'startup') {
      return 'To start a business, first identify a real problem, define your target audience, create a simple solution, and test it with real users.';
    }
    if (intent === 'idea') {
      return 'You can start with a small service, digital product, or local solution. Focus on solving one clear problem.';
    }
    if (intent === 'finance') {
      return 'Track your income and expenses, reduce unnecessary costs, and review your savings regularly.';
    }
    if (intent === 'marketing') {
      return 'Start with one target audience, one message, and one platform like Instagram or WhatsApp.';
    }
    if (intent === 'planning') {
      return 'Break your goal into small steps. Focus on one task at a time and track progress weekly.';
    }

    return 'I can help with business ideas, startup planning, finance, and marketing. Ask a clear question.';
  }

  function generateBusinessPlanSummaries(businessIdea) {
    const idea = businessIdea || 'business idea';
    const totals = calculateTotals();
    return {
      valueProposition: `${idea} should solve one urgent customer pain with a clear and measurable outcome. Position it as the fastest, simplest option compared to alternatives in your market. Make the offer easy to try so customers can see value quickly before committing long term.`,
      marketing: `Focus marketing for ${idea} on one primary channel where your ideal customer already spends time. Publish practical educational content with one clear call to action and track conversion each week. Keep campaigns lean and optimize spend based on response quality, especially with current expenses near ${formatCurrency(totals.totalExpenses)}.`,
      operations: `Build operations for ${idea} using a weekly execution rhythm across delivery, feedback, and process improvement. Assign clear owners to each step so quality stays consistent as demand grows. Keep systems and tooling lightweight until repeatable revenue justifies scaling.`
    };
  }

  function applySummaryToField(fieldIds, summaryText) {
    const selectedTemplate = getSelectedBusinessTemplate();
    if (!selectedTemplate) return false;
    const targetField = fieldIds.find((fieldId) => selectedTemplate.sections.some((section) => section.id === fieldId));
    if (!targetField) return false;
    ensureBusinessPlanDraft(selectedTemplate.id);
    appState.businessPlan.drafts[selectedTemplate.id][targetField] = summaryText;
    if (!appState.businessPlan.aiGenerated[selectedTemplate.id]) appState.businessPlan.aiGenerated[selectedTemplate.id] = {};
    appState.businessPlan.aiGenerated[selectedTemplate.id][targetField] = true;
    return true;
  }

  function createSectionAIText(sectionName, idea) {
    const cleanIdea = idea || 'business concept';
    return `Based on the idea ${cleanIdea}, write a professional 2-sentence ${sectionName} for a business plan.`;
  }

  function generateSectionPlanText(sectionName, idea) {
    const lower = sectionName.toLowerCase();
    if (lower.includes('value proposition')) {
      return `${idea} delivers a clear and measurable customer outcome by solving one urgent problem faster than traditional options. This value proposition positions the offer as practical, easy to adopt, and directly tied to customer ROI.`;
    }
    if (lower.includes('marketing')) {
      return `The marketing strategy for ${idea} should prioritize one high-intent channel and publish focused proof-driven content for consistent lead flow. Campaign execution should combine clear calls-to-action with weekly conversion tracking to optimize budget performance.`;
    }
    return `${idea} should define ${sectionName.toLowerCase()} with clear priorities, measurable milestones, and accountable execution owners. This section should communicate professional clarity and demonstrate how the plan will drive sustainable growth.`;
  }

  function fillSectionWithAIMagic(sectionId) {
    const selectedTemplate = getSelectedBusinessTemplate();
    const status = $('businessPlanStatus');
    if (!selectedTemplate) {
      if (status) status.textContent = 'Select a template before using AI Magic.';
      return;
    }
    const section = selectedTemplate.sections.find((item) => item.id === sectionId);
    if (!section) return;
    const idea = appState.ideaGeneratorHistory[0]?.topic || $('ideaGeneratorInput')?.value?.trim();
    if (!idea) {
      if (status) status.textContent = 'Please add a Business Idea in Idea Generator first.';
      return;
    }
    ensureBusinessPlanDraft(selectedTemplate.id);
    if (!appState.businessPlan.aiGenerated[selectedTemplate.id]) appState.businessPlan.aiGenerated[selectedTemplate.id] = {};
    const aiPrompt = createSectionAIText(section.title, idea);
    appState.businessPlan.drafts[selectedTemplate.id][section.id] = generateSectionPlanText(section.title, idea);
    appState.businessPlan.aiGenerated[selectedTemplate.id][section.id] = true;
    saveBusinessPlanState();
    saveToStorage(STORAGE_KEYS.businessPlanAiGenerated, appState.businessPlan.aiGenerated);
    renderBusinessPlanEditor();
    if (status) status.textContent = `AI Magic completed for ${section.title}. Prompt used: ${aiPrompt}`;
  }

  function fillBusinessPlanFromAI() {
    const selectedTemplate = getSelectedBusinessTemplate();
    const status = $('businessPlanStatus');
    if (!selectedTemplate) {
      if (status) status.textContent = 'Select a template before using Generate with AI.';
      return;
    }

    const businessIdea = appState.ideaGeneratorHistory[0]?.topic || $('ideaGeneratorInput')?.value?.trim() || '';
    if (!businessIdea) {
      if (status) status.textContent = 'Add a business idea in Idea Generator first.';
      return;
    }

    const summaries = generateBusinessPlanSummaries(businessIdea);
    const applied = [
      applySummaryToField(['value-proposition', 'problem', 'solution'], summaries.valueProposition),
      applySummaryToField(['marketing', 'campaign-goal', 'channels', 'content-plan'], summaries.marketing),
      applySummaryToField(['operations', 'workflow', 'execution-plan', 'timeline'], summaries.operations)
    ].filter(Boolean).length;

    saveBusinessPlanState();
    renderBusinessPlanEditor();
    if (status) {
      status.textContent = applied
        ? `${selectedTemplate.title} populated with AI summaries from your business idea.`
        : 'No matching fields were found for Value Proposition, Marketing, or Operations.';
    }
  }

  function generateAIInsights() {
    const insightContainer = $('aiInsights');
    if (!insightContainer) return;

    const totals = calculateTotals();
    const insights = [];
    const expenseRatio = totals.monthlyIncome > 0 ? totals.totalExpenses / totals.monthlyIncome : 0;
    if (expenseRatio > 0.7) {
      insights.push('<p class="rounded-xl border border-rose-300 bg-rose-50 text-rose-700 px-3 py-2 text-sm">AI Warning: Your burn rate is high. Consider cutting Marketing costs.</p>');
    }

    const trend = loadFromStorage(STORAGE_KEYS.netSavingsTrend, []);
    const previous = Array.isArray(trend) && trend.length ? Number(trend[trend.length - 1]) : null;
    if (previous !== null && Number.isFinite(previous) && totals.netSavings > previous) {
      insights.push('<p class="rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 px-3 py-2 text-sm">AI Suggestion: You have enough to reinvest in a new tool!</p>');
    }

    insightContainer.innerHTML = insights.join('');
    const nextTrend = Array.isArray(trend) ? [...trend, totals.netSavings].slice(-12) : [totals.netSavings];
    saveToStorage(STORAGE_KEYS.netSavingsTrend, nextTrend);
  }

  async function exportToPDF(target = 'dashboard') {
    const status = $('downloadPdfStatus');
    const planSection = $('planningTemplatesSection');
    const dashboardPanel = $('panel-dashboard');
    const sourceElement = target === 'planning' ? planSection : dashboardPanel;
    if (!sourceElement) return;
    if (status) status.textContent = 'Preparing report...';

    try {
      if (typeof html2canvas === 'undefined' || !window.jspdf?.jsPDF) {
        throw new Error('Missing PDF libraries');
      }

      const canvas = await html2canvas(sourceElement, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = (canvas.height * contentWidth) / canvas.width;
      const headerBlockHeight = 22;
      let remainingHeight = contentHeight;
      let y = margin + headerBlockHeight;
      const reportDate = new Date().toLocaleDateString();

      pdf.setFontSize(16);
      pdf.text('Barya Business Report', margin, margin + 2);
      pdf.setFontSize(10);
      pdf.text(`Date: ${reportDate}`, margin, margin + 8);
      pdf.addImage(imgData, 'PNG', margin, y, contentWidth, contentHeight);
      remainingHeight -= (pageHeight - (margin * 2) - headerBlockHeight);

      while (remainingHeight > 0) {
        y = remainingHeight - contentHeight + margin + headerBlockHeight;
        pdf.addPage('a4', 'p');
        pdf.setFontSize(16);
        pdf.text('Barya Business Report', margin, margin + 2);
        pdf.setFontSize(10);
        pdf.text(`Date: ${reportDate}`, margin, margin + 8);
        pdf.addImage(imgData, 'PNG', margin, y, contentWidth, contentHeight);
        remainingHeight -= (pageHeight - (margin * 2) - headerBlockHeight);
      }

      pdf.save(`barya-${target}-report.pdf`);
      if (status) status.textContent = 'PDF report downloaded.';
    } catch (error) {
      if (status) status.textContent = 'Could not generate PDF report.';
      console.error(error);
    }
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
    const selectedTemplate = getSelectedBusinessTemplate();
    if (!selectedTemplate) return;
    ensureBusinessPlanDraft(selectedTemplate.id);
    saveToStorage(selectedTemplate.storageKey, appState.businessPlan.drafts[selectedTemplate.id]);
    saveToStorage(STORAGE_KEYS.businessPlanAiGenerated, appState.businessPlan.aiGenerated);
  }

  function renderBusinessPlanTemplates() {
    const cards = $('businessPlanTemplateCards');
    const fallback = $('businessPlanFallback');
    if (!cards) {
      if (fallback) fallback.textContent = 'Templates failed to load. Please refresh.';
      return;
    }
    if (!Array.isArray(BUSINESS_PLAN_TEMPLATES) || BUSINESS_PLAN_TEMPLATES.length === 0) {
      cards.innerHTML = '';
      if (fallback) fallback.textContent = 'Templates failed to load. Please refresh.';
      return;
    }
    if (fallback) fallback.textContent = '';
    cards.innerHTML = BUSINESS_PLAN_TEMPLATES.map((template) => {
      const isActive = template.id === appState.businessPlan.selectedTemplateId;
      return `
        <button type="button" class="template-card ${isActive ? 'active' : ''} rounded-2xl p-4 text-left transition" data-template-id="${template.id}">
          <p class="text-[11px] uppercase tracking-[0.22em] text-slate-400">Template</p>
          <h3 class="font-semibold text-lg mt-1">${template.title}</h3>
          <p class="text-sm text-slate-300 mt-2 leading-relaxed">${template.description}</p>
          <p class="text-xs text-slate-400 mt-3">Fields: ${template.sections.length} editable blocks</p>
        </button>
      `;
    }).join('');
  }

  function renderBusinessPlanEditor() {
    const header = $('businessPlanEditorHeader');
    const status = $('businessPlanStatus');
    const form = $('businessPlanEditorForm');
    const helper = $('businessPlanTemplateHelper');
    if (!header || !status || !form) return;

    const selectedTemplate = getSelectedBusinessTemplate();
    if (!selectedTemplate) {
      header.textContent = 'Select a template';
      if (helper) helper.textContent = 'Select a template';
      status.textContent = 'Pick one of the planning templates to start building your document.';
      form.innerHTML = '';
      return;
    }

    ensureBusinessPlanDraft(selectedTemplate.id);
    const draft = appState.businessPlan.drafts[selectedTemplate.id];

    header.textContent = `${selectedTemplate.title} — Editable Blocks`;
    if (helper) helper.textContent = selectedTemplate.description;
    status.textContent = 'Edit any box below. Your inputs stay editable and save locally.';
    const aiMap = appState.businessPlan.aiGenerated[selectedTemplate.id] || {};
    form.innerHTML = selectedTemplate.sections.map((section) => `
      <label class="template-editor-block rounded-2xl p-4 flex flex-col gap-2">
        <span class="flex items-center justify-between gap-2">
          <span class="text-xs uppercase tracking-[0.18em] text-slate-400">${section.title}</span>
          <button type="button" class="founder-btn ai-magic-btn" data-ai-section="${section.id}">✨ AI Magic</button>
        </span>
        <textarea
          data-template-field="${section.id}"
          rows="6"
          class="w-full rounded-xl p-3 text-sm leading-relaxed resize-y ${aiMap[section.id] ? 'ai-generated-field' : ''}"
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
    renderBusinessPlanTemplates();
    renderBusinessPlanEditor();
  }

  function generateIdeas(topic) {
    const seed = topic || 'small business';
    return [
      `${seed}: subscription-based starter package with monthly coaching`,
      `${seed}: low-cost audit service + premium implementation upsell`,
      `${seed}: local community workshop + digital toolkit bundle`
    ];
  }


  function renderWhenNotToStartGuide() {
    const container = $('whenNotToStartGuide');
    if (!container) return;

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

    `;
  }

  function applySettings() {
    const languageSelect = $('languageSelect');
    const settingsLanguageSelect = $('settingsLanguageSelect');
    const currencySelect = $('currencySelect');
    const goalInput = $('goalInput');

    if (languageSelect) languageSelect.value = appState.settings.language;
    if (settingsLanguageSelect) settingsLanguageSelect.value = appState.settings.language;
    if (currencySelect) currencySelect.value = appState.settings.currency;
    if (goalInput) goalInput.value = appState.settings.goal || '';
    applyLanguage(appState.settings.language);

    renderDashboard();
    renderAIChat();
  }


  function setActiveTab(tabName) {
    if (!tabName) return;
    const tabButtons = document.querySelectorAll('#tabs [data-tab]');
    document.querySelectorAll('.panel').forEach((panel) => panel.classList.add('hidden'));
    tabButtons.forEach((btn) => btn.classList.remove('active'));

    const target = document.getElementById(`panel-${tabName}`);
    if (target) target.classList.remove('hidden');
    const activeBtn = document.querySelector(`#tabs [data-tab="${tabName}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (tabName === 'planning') {
      renderBusinessPlanTemplates();
      renderBusinessPlanEditor();
      renderWhenNotToStartGuide();
    }
  }

  function setPlanningSection(sectionName) {
    const sections = {
      guides: $('planningGuidesSection'),
      templates: $('planningTemplatesSection')
    };
    Object.entries(sections).forEach(([key, node]) => {
      if (!node) return;
      node.classList.toggle('active', key === sectionName);
    });

    document.querySelectorAll('[data-planning-section]').forEach((button) => {
      button.classList.toggle('active', button.getAttribute('data-planning-section') === sectionName);
    });
  }

  function initPlanningSections() {
    document.querySelectorAll('[data-planning-section]').forEach((button) => {
      button.addEventListener('click', () => {
        const sectionName = button.getAttribute('data-planning-section');
        if (!sectionName) return;
        setPlanningSection(sectionName);
      });
    });
  }

  function showMainApp(options = {}) {
    const { tab = 'dashboard', rememberStart = false } = options;
    const landingPageContainer = $('landingPageContainer');
    const appContainer = $('appContainer');

    if (landingPageContainer) landingPageContainer.style.display = 'none';
    if (appContainer) appContainer.style.display = 'block';

    if (rememberStart) {
      localStorage.setItem(STORAGE_KEYS.userStarted, 'true');
    }

    setActiveTab(tab);
  }

  function showLandingPage() {
    const landingPageContainer = $('landingPageContainer');
    const appContainer = $('appContainer');

    if (landingPageContainer) landingPageContainer.style.display = 'flex';
    if (appContainer) appContainer.style.display = 'none';
  }

  function initTabs() {
    const tabButtons = document.querySelectorAll('#tabs [data-tab]');
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        setActiveTab(tab);
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
        const category = expenseCategoryInput.value || 'Others';
        const amount = Number(expenseAmountInput.value);
        if (!Number.isFinite(amount) || amount <= 0) return;
        appState.expenses.unshift({ id: crypto.randomUUID(), category, amount, ts: Date.now() });
        saveToStorage(STORAGE_KEYS.expenses, appState.expenses);
        expenseCategoryInput.value = 'Marketing';
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
        const promptWithContext = `${buildSystemInfoLine()} User message: ${message}`;
        appState.aiChatHistory.push({ role: 'ai', text: generateResponse(promptWithContext), ts: Date.now() });
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
        saveSettings();
        applySettings();
      });
    }

    const profileForm = $('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const businessTypeInput = $('businessTypeInput');
        if (businessTypeInput?.value?.trim()) {
          saveToStorage(STORAGE_KEYS.businessCategory, businessTypeInput.value.trim());
        }
      });
    }

    const exportDataBtn = $('exportDataBtn');
    if (exportDataBtn) {
      exportDataBtn.addEventListener('click', exportData);
    }

    const importDataInput = $('importDataInput');
    if (importDataInput) {
      importDataInput.addEventListener('change', importData);
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
        showMainApp({ tab: 'planning', rememberStart: true });
        document.getElementById('appSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    const getStartedBtn = $('getStartedBtn');
    if (getStartedBtn) {
      getStartedBtn.addEventListener('click', (event) => {
        event.preventDefault();
        showMainApp({ tab: 'dashboard', rememberStart: true });
      });
    }

    const languageSelect = $('languageSelect');
    if (languageSelect) {
      languageSelect.addEventListener('change', () => {
        appState.settings.language = languageSelect.value;
        const settingsLanguageSelect = $('settingsLanguageSelect');
        if (settingsLanguageSelect) settingsLanguageSelect.value = languageSelect.value;
        saveSettings();
        applySettings();
      });
    }

    const settingsLanguageSelect = $('settingsLanguageSelect');
    if (settingsLanguageSelect) {
      settingsLanguageSelect.addEventListener('change', () => {
        appState.settings.language = settingsLanguageSelect.value;
        const headerLanguageSelect = $('languageSelect');
        if (headerLanguageSelect) headerLanguageSelect.value = settingsLanguageSelect.value;
        saveSettings();
        applySettings();
      });
    }

    const themeToggle = $('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('change', () => {
        const theme = themeToggle.checked ? 'dark' : 'light';
        localStorage.setItem(STORAGE_KEYS.theme, theme);
        applyTheme(theme);
      });
    }

    const tourHelpBtn = $('tourHelpBtn');
    if (tourHelpBtn) {
      tourHelpBtn.addEventListener('click', () => {
        showMainApp({ tab: 'dashboard', rememberStart: true });
        startTour();
      });
    }

    const businessPlanTemplateCards = $('businessPlanTemplateCards');
    if (businessPlanTemplateCards) {
      businessPlanTemplateCards.addEventListener('click', (event) => {
        const button = event.target.closest('[data-template-id]');
        if (!button) return;
        setPlanningSection('templates');
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
        if (!appState.businessPlan.aiGenerated[selectedTemplate.id]) appState.businessPlan.aiGenerated[selectedTemplate.id] = {};
        appState.businessPlan.aiGenerated[selectedTemplate.id][sectionId] = false;
        input.classList.remove('ai-generated-field');
      });

      businessPlanEditorForm.addEventListener('click', (event) => {
        const btn = event.target.closest('[data-ai-section]');
        if (!btn) return;
        const sectionId = btn.getAttribute('data-ai-section');
        if (!sectionId) return;
        fillSectionWithAIMagic(sectionId);
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

    const businessPlanGenerateAIBtn = $('businessPlanGenerateAIBtn');
    if (businessPlanGenerateAIBtn) {
      businessPlanGenerateAIBtn.addEventListener('click', fillBusinessPlanFromAI);
    }

    const downloadPdfBtn = $('downloadPdfBtn');
    if (downloadPdfBtn) {
      downloadPdfBtn.addEventListener('click', () => {
        exportToPDF('dashboard');
      });
    }

    const planningPdfBtn = $('planningPdfBtn');
    if (planningPdfBtn) {
      planningPdfBtn.addEventListener('click', () => {
        setPlanningSection('templates');
        exportToPDF('planning');
      });
    }
  }

  function hydrateState() {
    appState.monthlyIncome = Number(localStorage.getItem(STORAGE_KEYS.monthlyIncome) || 0);
    appState.expenses = loadFromStorage(STORAGE_KEYS.expenses, []);
    appState.recurringExpenses = loadFromStorage(STORAGE_KEYS.recurringExpenses, []);
    appState.settings = loadSettings();
    appState.aiChatHistory = loadFromStorage(STORAGE_KEYS.aiChatHistory, []);
    appState.businessAdvisorHistory = loadFromStorage(STORAGE_KEYS.businessAdvisorHistory, []);
    appState.ideaGeneratorHistory = loadFromStorage(STORAGE_KEYS.ideaGeneratorHistory, []);
    BUSINESS_PLAN_TEMPLATES.forEach((template) => {
      const saved = loadFromStorage(template.storageKey, {});
      appState.businessPlan.drafts[template.id] = typeof saved === 'object' && saved !== null ? saved : {};
    });
    const savedAiMap = loadFromStorage(STORAGE_KEYS.businessPlanAiGenerated, {});
    appState.businessPlan.aiGenerated = typeof savedAiMap === 'object' && savedAiMap !== null ? savedAiMap : {};
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
    initPlanningSections();
    initControls();
    applySettings();
    renderDashboard();
    renderAIChat();
    renderBusinessAdvisor();
    renderIdeaGenerator();
    renderBusinessPlanTemplates();
    renderBusinessPlanEditor();
    renderWhenNotToStartGuide();
    setPlanningSection('guides');
    applyTheme(localStorage.getItem(STORAGE_KEYS.theme) || 'light');
    window.startTour = startTour;
    window.exportToPDF = exportToPDF;

    const incomeInput = $('incomeInput');
    if (incomeInput) incomeInput.value = String(appState.monthlyIncome || '');

    const hasStarted = localStorage.getItem(STORAGE_KEYS.userStarted) === 'true';
    const isFirstVisit = localStorage.getItem(STORAGE_KEYS.onboardingSeen) !== 'true';
    if (hasStarted) {
      showMainApp({ tab: 'dashboard' });
    } else {
      showLandingPage();
    }

    if (isFirstVisit) {
      showMainApp({ tab: 'dashboard', rememberStart: true });
      setTimeout(() => startTour(), 300);
    }
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
