(() => {
  const STORAGE_KEYS = {
    monthlyIncome: 'barya_monthlyIncome',
    expenses: 'barya_expenses',
    recurringExpenses: 'barya_recurringExpenses',
    settings: 'barya_settings',
    aiChatHistory: 'barya_ai_chat_history',
    businessAdvisorHistory: 'barya_business_advisor_history',
    ideaGeneratorHistory: 'barya_idea_generator_history',
    aiMemory: 'barya_ai_memory_entries',
    templateLean: 'barya_template_lean',
    templateMarketing: 'barya_template_marketing',
    templateOperations: 'barya_template_operations',
    userStarted: 'barya_user_started',
    theme: 'barya_theme',
    businessCategory: 'barya_business_category',
    netSavingsTrend: 'barya_net_savings_trend',
    businessPlanAiGenerated: 'barya_business_plan_ai_generated',
    startupReadinessTasks: 'barya_startup_readiness_tasks',
    activityLog: 'barya_activity_log',
    taskManagerTasks: 'barya_task_manager_tasks',
    languagePreference: 'barya_language_preference',
    profile: 'barya_profile'
  };

  const LANGUAGES = ['English', 'Urdu', 'Roman Urdu'];
  const LANGUAGE_CODES = {
    English: 'en',
    Urdu: 'ur',
    'Roman Urdu': 'en'
  };
  const translations = {
    English: {
      dashboard: 'Dashboard',
      aiAssistant: 'AI Chat',
      workspace: 'Workspace',
      memory: 'Memory',
      profile: 'Profile',
      settings: 'Settings',
      resources: 'Resources',
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
      addExpense: 'Add Expense',
      addRecurringExpense: 'Add Recurring Expense',
      businessPlan: 'Business Plan',
      currency: 'Currency',
      goal: 'Goal',
      languageSwitcher: 'Language Switcher',
      languageHint: 'Choose your preferred app language.',
      resourcesTitle: 'Resources Directory',
      resourcesSubtitle: 'Helpful tools and communities for founders.',
      visitSite: 'Visit Site',
      shareProgress: 'Share my Progress',
      shareText: 'I just finished my business plan for [Business Name] using Barya Business AI! 🚀',
      shareOnX: 'Share on X',
      shareOnLinkedIn: 'Share on LinkedIn',
      shareOnWhatsApp: 'Share on WhatsApp',
      startConversation: 'Start conversation',
      saveSettings: 'Save',
      chatPlaceholder: 'Ask anything about your business...'
    },
    Urdu: {
      dashboard: 'ڈیش بورڈ',
      aiAssistant: 'اے آئی چیٹ',
      workspace: 'ورک اسپیس',
      memory: 'یادداشت',
      profile: 'پروفائل',
      settings: 'سیٹنگز',
      resources: 'وسائل',
      save: 'محفوظ کریں',
      saveProfile: 'پروفائل محفوظ کریں',
      saveImageNote: 'تصویری نوٹ محفوظ کریں',
      financeIntelligence: 'مالی ذہانت',
      recommendations: 'تجاویز',
      businessGrowth: 'کاروباری ترقی',
      localFirstAI: 'لوکل فرسٹ اے آئی',
      founderWorkspace: 'بانی ورک اسپیس',
      language: 'زبان',
      title: 'باریا بزنس اے آئی',
      subtitle: 'بغیر بیرونی AI APIs کے پیشہ ورانہ لوکل فرسٹ بزنس انٹیلیجنس۔',
      businessAdvisor: 'بزنس ایڈوائزر',
      ideaGenerator: 'آئیڈیا جنریٹر',
      fileIntelligence: 'فائل انٹیلیجنس',
      imageContext: 'امیج کانٹیکسٹ',
      monthlyOverview: 'ماہانہ جائزہ',
      monthlyIncome: 'ماہانہ آمدنی',
      totalExpenses: 'کل اخراجات',
      netSavings: 'خالص بچت',
      recentExpenses: 'حالیہ اخراجات',
      addExpense: 'خرچ شامل کریں',
      addRecurringExpense: 'دہرایا جانے والا خرچ شامل کریں',
      businessPlan: 'بزنس پلان',
      currency: 'کرنسی',
      goal: 'ہدف',
      languageSwitcher: 'زبان تبدیل کریں',
      languageHint: 'ایپ کی پسندیدہ زبان منتخب کریں۔',
      resourcesTitle: 'وسائل ڈائریکٹری',
      resourcesSubtitle: 'بانیوں کے لیے مفید ٹولز اور کمیونٹیز۔',
      visitSite: 'سائٹ کھولیں',
      shareProgress: 'میری پیش رفت شیئر کریں',
      shareText: 'میں نے [Business Name] کے لیے اپنا بزنس پلان باریا بزنس اے آئی سے مکمل کر لیا! 🚀',
      shareOnX: 'X پر شیئر کریں',
      shareOnLinkedIn: 'لنکڈاِن پر شیئر کریں',
      shareOnWhatsApp: 'واٹس ایپ پر شیئر کریں',
      startConversation: 'گفتگو شروع کریں',
      saveSettings: 'محفوظ کریں',
      chatPlaceholder: 'اپنے کاروبار کے بارے میں سوال پوچھیں...'
    },
    'Roman Urdu': {
      dashboard: 'Dashboard',
      aiAssistant: 'AI Chat',
      workspace: 'Workspace',
      memory: 'Memory',
      profile: 'Profile',
      settings: 'Settings',
      resources: 'Resources',
      save: 'Save',
      saveProfile: 'Profile Save karein',
      saveImageNote: 'Image context save karein',
      financeIntelligence: 'Finance Intelligence',
      recommendations: 'Recommendations',
      businessGrowth: 'Business Growth',
      localFirstAI: 'Local-first AI',
      founderWorkspace: 'Founder Workspace',
      language: 'Zabaan',
      title: 'Barya Business AI',
      subtitle: 'Professional local-first business intelligence bina external AI APIs ke.',
      businessAdvisor: 'Business Advisor',
      ideaGenerator: 'Idea Generator',
      fileIntelligence: 'File Intelligence',
      imageContext: 'Image Context',
      monthlyOverview: 'Monthly Overview',
      monthlyIncome: 'Monthly Income',
      totalExpenses: 'Total Expenses',
      netSavings: 'Net Savings',
      recentExpenses: 'Recent Expenses',
      addExpense: 'Expense Add karein',
      addRecurringExpense: 'Recurring Expense Add karein',
      businessPlan: 'Business Plan',
      currency: 'Currency',
      goal: 'Goal',
      languageSwitcher: 'Language Switcher',
      languageHint: 'Apni preferred app language choose karein.',
      resourcesTitle: 'Resources Directory',
      resourcesSubtitle: 'Founders ke liye useful tools aur communities.',
      visitSite: 'Visit Site',
      shareProgress: 'Share my Progress',
      shareText: 'Maine [Business Name] ka business plan Barya Business AI se complete kar liya! 🚀',
      shareOnX: 'X par Share karein',
      shareOnLinkedIn: 'LinkedIn par Share karein',
      shareOnWhatsApp: 'WhatsApp par Share karein',
      startConversation: 'Conversation start karein',
      saveSettings: 'Save',
      chatPlaceholder: 'Apne business ke bare mein kuch bhi poochain...'
    }
  };
  const CURRENCIES = ['USD', 'PKR', 'INR', 'EUR'];
  const BUSINESS_PLAN_TEMPLATES = [
    {
      id: 'coffee-shop',
      storageKey: 'barya_template_lean',
      title: 'Coffee Shop',
      description: 'Local café planning structure focused on menu, footfall, and neighborhood retention.',
      sections: [
        { id: 'concept', title: 'Concept', placeholder: 'Define your café concept and ambiance.' },
        { id: 'target-market', title: 'Target Market', placeholder: 'Describe your main customer segments and location behavior.' },
        { id: 'menu-pricing', title: 'Menu & Pricing', placeholder: 'Outline your hero products, pricing strategy, and margins.' },
        { id: 'operations', title: 'Operations', placeholder: 'Describe staffing, suppliers, and opening-hour workflow.' },
        { id: 'marketing', title: 'Marketing Plan', placeholder: 'List launch and retention marketing actions.' },
        { id: 'financials', title: 'Financial Plan', placeholder: 'Capture startup costs, monthly expenses, and break-even assumptions.' }
      ]
    },
    {
      id: 'saas-startup',
      storageKey: 'barya_template_marketing',
      title: 'SaaS Startup',
      description: 'Software planning template for product, acquisition, retention, and recurring revenue.',
      sections: [
        { id: 'problem', title: 'Problem', placeholder: 'Define the customer workflow pain your SaaS solves.' },
        { id: 'product', title: 'Product Scope', placeholder: 'Describe MVP features and roadmap priorities.' },
        { id: 'pricing', title: 'Pricing & Packaging', placeholder: 'Define tiers, trial model, and upgrade path.' },
        { id: 'go-to-market', title: 'Go-To-Market', placeholder: 'Explain channels, funnel, and sales motion.' },
        { id: 'retention', title: 'Retention Strategy', placeholder: 'Outline onboarding, support, and churn prevention systems.' },
        { id: 'metrics', title: 'Metrics', placeholder: 'Track MRR, CAC, churn, and expansion revenue goals.' }
      ]
    },
    {
      id: 'ecommerce-store',
      storageKey: 'barya_template_operations',
      title: 'E-commerce Store',
      description: 'Commerce template focused on niche, catalog strategy, logistics, and repeat sales.',
      sections: [
        { id: 'niche', title: 'Niche & Audience', placeholder: 'Define store niche and buyer profile.' },
        { id: 'catalog', title: 'Product Catalog', placeholder: 'Describe winning SKUs and margin priorities.' },
        { id: 'storefront', title: 'Storefront & UX', placeholder: 'Plan site structure, conversion path, and trust signals.' },
        { id: 'fulfillment', title: 'Fulfillment', placeholder: 'Define sourcing, inventory, shipping, and returns process.' },
        { id: 'growth', title: 'Growth Channels', placeholder: 'List paid, organic, and partnership channels.' },
        { id: 'forecast', title: 'Sales Forecast', placeholder: 'Estimate traffic, conversion, AOV, and 90-day targets.' }
      ]
    }
  ];
  const INDUSTRY_PREFILLS = {
    'coffee-shop': {
      concept: 'Neighborhood specialty coffee shop with morning commuter service and evening community events.',
      'target-market': 'Primary audience: office commuters, students, and nearby residents within a 2 km radius.',
      'menu-pricing': 'Core menu: espresso, pour-over, bakery combos. Pricing set at premium-local level with 62-68% gross margin on beverages.',
      operations: 'Open 7AM-9PM, two-shift staffing model, weekly local supplier ordering, and daily quality checklist.',
      marketing: 'Launch with geo-targeted social ads, loyalty card program, and local influencer tasting week.',
      financials: 'Startup budget includes rent deposit, espresso machine, interior setup, and 6-month runway with break-even target by month 7.'
    },
    'saas-startup': {
      problem: 'SMB teams lose time due to fragmented task and reporting tools with no unified workflow.',
      product: 'MVP includes workflow automation, reporting dashboard, and team collaboration with role-based access.',
      pricing: 'Three tiers (Starter, Growth, Scale), free 14-day trial, annual plan discount to improve cash flow.',
      'go-to-market': 'Content-led inbound plus founder-led outbound to 100 ICP accounts per month.',
      retention: 'Structured onboarding emails, in-app product tours, and quarterly success reviews for active accounts.',
      metrics: 'Track MRR growth, CAC payback, activation rate, churn under 4%, and expansion revenue ratio.'
    },
    'ecommerce-store': {
      niche: 'D2C store for eco-friendly lifestyle products targeting urban millennial households.',
      catalog: 'Hero SKUs with repeat purchase potential, bundle strategy, and seasonal limited drops.',
      storefront: 'Mobile-first storefront, high-trust PDPs, one-page checkout, and post-purchase upsell.',
      fulfillment: 'Hybrid model with local 3PL, 48-hour dispatch SLA, and clear return/refund policy.',
      growth: 'Meta/TikTok creatives, creator partnerships, email automation, and referral incentives.',
      forecast: 'Quarter-one forecast: 35k visits, 2.2% conversion, $38 AOV, and month-three profitability target.'
    }
  };

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
  const BUSINESS_DICTIONARY = {
    MVP: 'A basic version of a product built to test demand quickly.',
    Scalability: 'How well a business can grow without breaking operations.',
    Equity: 'Ownership percentage in a business.',
    BurnRate: 'How quickly a startup spends cash each month.',
    Runway: 'How many months a startup can operate before money runs out.',
    CAC: 'Customer Acquisition Cost, or what you spend to get one customer.',
    LTV: 'Lifetime Value, or total expected revenue from one customer.',
    Pivot: 'A meaningful change in strategy based on market feedback.',
    Bootstrapping: 'Building the company using your own revenue or savings.',
    Churn: 'The rate at which customers stop using your product.',
    Traction: 'Proof that the business is gaining users, revenue, or momentum.',
    RevenueModel: 'The method the company uses to earn money.',
    ProductMarketFit: 'When your product strongly matches a real market need.',
    ValueProposition: 'The clear reason customers should choose your offer.',
    ConversionRate: 'The percentage of visitors who take a desired action.',
    GrossMargin: 'Revenue left after direct costs are removed.',
    CashFlow: 'Money moving in and out of the business.',
    Benchmark: 'A reference metric used to compare performance.',
    KPI: 'Key Performance Indicator used to track important goals.',
    SeedFunding: 'Early-stage investment used to start and grow a company.'
  };
  const STARTUP_READINESS_WEIGHTS = {
    addedExpense: 20,
    generatedIdea: 30,
    completedPlanTemplate: 50
  };

  const TASK_MANAGER_DEFAULTS = [
    { id: 'define-target-audience', label: 'Define your Target Audience', completed: false, source: 'default' },
    { id: 'set-monthly-budget', label: 'Set a Monthly Budget', completed: false, source: 'default' },
    { id: 'draft-first-business-plan', label: 'Draft 1st Business Plan', completed: false, source: 'default' }
  ];

  const RESOURCES_DIRECTORY = [
    {
      category: 'Free Logo Makers',
      icon: '🎨',
      items: [
        { title: 'Canva Logo Maker', url: 'https://www.canva.com/create/logos/' },
        { title: 'Looka', url: 'https://looka.com/logo-maker/' }
      ]
    },
    {
      category: 'Domain Registration',
      icon: '🌐',
      items: [
        { title: 'Namecheap Domains', url: 'https://www.namecheap.com/domains/' },
        { title: 'Cloudflare Registrar', url: 'https://www.cloudflare.com/products/registrar/' }
      ]
    },
    {
      category: 'Legal Templates',
      icon: '⚖️',
      items: [
        { title: 'SBA Business Forms', url: 'https://www.sba.gov/business-guide/launch-your-business/register-your-business' },
        { title: 'DocuSign Template Library', url: 'https://www.docusign.com/resources/templates' }
      ]
    },
    {
      category: 'Networking Groups',
      icon: '🤝',
      items: [
        { title: 'Meetup Entrepreneurship', url: 'https://www.meetup.com/topics/entrepreneurship/' },
        { title: 'LinkedIn Startup Groups', url: 'https://www.linkedin.com/groups/' }
      ]
    }
  ];

  const StorageService = {
    getItem(key, fallback = null) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
      } catch (error) {
        console.warn(`Storage read failed for key: ${key}`, error);
        return fallback;
      }
    },
    setItem(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (error) {
        console.warn(`Storage write failed for key: ${key}`, error);
        return false;
      }
    },
    keys() {
      try {
        return Object.keys(localStorage);
      } catch (error) {
        console.warn('Storage keys read failed.', error);
        return [];
      }
    }
  };

  let appState = {
    monthlyIncome: 0,
    expenses: [],
    recurringExpenses: [],
    settings: { currency: 'USD', language: 'English', goal: '' },
    aiChatHistory: [],
    aiMemoryEntries: [],
    businessAdvisorHistory: [],
    ideaGeneratorHistory: [],
    profile: { businessType: '', audience: '', preference: '' },
    businessPlan: { selectedTemplateId: '', drafts: {}, aiGenerated: {} },
    sampleDashboardMode: false,
    readinessTasks: loadReadinessTasks(),
    activityLog: loadActivityLog(),
    taskManagerTasks: loadTaskManagerTasks()
  };
  let expenseChartInstance = null;
  let comparisonChartInstance = null;

  const $ = (id) => document.getElementById(id);
  const createId = () => (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;

  function escapeHTML(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function loadFromStorage(key, fallback) {
    const raw = StorageService.getItem(key, null);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      if (typeof fallback === 'number') return Number(raw) || fallback;
      return fallback;
    }
  }

  function ensureArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function ensureObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  }

  function setStatusText(elementId, message, variant = 'muted') {
    const target = $(elementId);
    if (!target) return;
    target.textContent = message;
    target.classList.remove('text-rose-400', 'text-rose-500', 'text-emerald-400', 'text-emerald-500', 'text-slate-400', 'text-slate-500');
    if (variant === 'success') {
      target.classList.add('text-emerald-400');
    } else if (variant === 'error') {
      target.classList.add('text-rose-400');
    } else {
      target.classList.add('text-slate-400');
    }
  }

  function saveToStorage(key, value) {
    const serializable = typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value);
    StorageService.setItem(key, serializable);
  }

  function loadActivityLog() {
    const saved = loadFromStorage(STORAGE_KEYS.activityLog, []);
    return Array.isArray(saved) ? saved : [];
  }

  function logActivity(action) {
    if (!action) return;
    appState.activityLog.unshift({ action, ts: Date.now() });
    appState.activityLog = appState.activityLog.slice(0, 80);
    saveToStorage(STORAGE_KEYS.activityLog, appState.activityLog);
    renderActivityLog();
  }

  function loadTaskManagerTasks() {
    const saved = loadFromStorage(STORAGE_KEYS.taskManagerTasks, []);
    const safeSaved = Array.isArray(saved) ? saved : [];
    const withDefaults = TASK_MANAGER_DEFAULTS.map((task) => {
      const existing = safeSaved.find((item) => item.id === task.id);
      return existing ? { ...task, ...existing } : { ...task };
    });
    const customTasks = safeSaved.filter((task) => task?.source === 'custom' || task?.source === 'roadmap');
    return [...withDefaults, ...customTasks];
  }

  function normalizeSearchText(value) {
    return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function highlightBusinessTerms(text) {
    const escaped = escapeHTML(text);
    const sortedTerms = Object.keys(BUSINESS_DICTIONARY).sort((a, b) => b.length - a.length);
    return sortedTerms.reduce((output, term) => {
      const definition = escapeHTML(BUSINESS_DICTIONARY[term]);
      const prettyTerm = term.replace(/([a-z])([A-Z])/g, '$1 $2');
      const termRegex = new RegExp(`\\b${prettyTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      return output.replace(termRegex, (match) => `<span class="business-term" data-definition="${definition}">${match}</span>`);
    }, escaped);
  }

  function loadReadinessTasks() {
    const saved = loadFromStorage(STORAGE_KEYS.startupReadinessTasks, {});
    return {
      addedExpense: Boolean(saved?.addedExpense),
      generatedIdea: Boolean(saved?.generatedIdea),
      completedPlanTemplate: Boolean(saved?.completedPlanTemplate)
    };
  }

  function exportData() {
    const exportedData = {};
    StorageService.keys().forEach((key) => {
      exportedData[key] = StorageService.getItem(key, '');
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
          StorageService.setItem(key, parsedData[key]);
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
    const selected = translations[language] || translations.English;
    return { ...translations.English, ...selected };
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

  function loadSettings() {
    const loaded = loadFromStorage(STORAGE_KEYS.settings, {});
    const storedLanguage = StorageService.getItem(STORAGE_KEYS.languagePreference, '');
    const candidateLanguage = storedLanguage || loaded?.language;
    const language = LANGUAGES.includes(candidateLanguage) ? candidateLanguage : 'English';
    return {
      currency: loaded?.currency || 'USD',
      language,
      goal: loaded?.goal || '',
      autoSyncCloud: Boolean(loaded?.autoSyncCloud)
    };
  }

  function setLanguage(language) {
    const nextLanguage = LANGUAGES.includes(language) ? language : 'English';
    const t = getTranslations(nextLanguage);
    document.documentElement.lang = LANGUAGE_CODES[nextLanguage] || 'en';
    document.documentElement.dir = nextLanguage === 'Urdu' ? 'rtl' : 'ltr';

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

    appState.settings.language = nextLanguage;
    StorageService.setItem(STORAGE_KEYS.languagePreference, nextLanguage);
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

  function calculateTotals(source = appState) {
    const oneTimeTotal = (source.expenses || []).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const recurringMonthlyTotal = (source.recurringExpenses || []).reduce((sum, e) => sum + toMonthlyRecurringAmount(e), 0);
    const totalExpenses = oneTimeTotal + recurringMonthlyTotal;
    const monthlyIncome = Number(source.monthlyIncome) || 0;
    return {
      monthlyIncome,
      totalExpenses,
      netSavings: monthlyIncome - totalExpenses,
      oneTimeTotal,
      recurringMonthlyTotal
    };
  }

  function hasAnyPlanDraft() {
    const drafts = appState.businessPlan?.drafts || {};
    return Object.values(drafts).some((draft) =>
      Object.values(draft || {}).some((value) => String(value || '').trim().length > 0)
    );
  }

  function shouldShowDashboardEmptyState() {
    const hasFinanceData = Number(appState.monthlyIncome) > 0 || appState.expenses.length > 0 || appState.recurringExpenses.length > 0;
    return !appState.sampleDashboardMode && !hasFinanceData && !hasAnyPlanDraft();
  }

  function getDashboardRenderState() {
    if (!appState.sampleDashboardMode) return appState;
    return {
      monthlyIncome: 7500,
      expenses: [
        { category: 'Marketing', amount: 1100, ts: Date.now() - 5400000 },
        { category: 'Operations', amount: 860, ts: Date.now() - 3400000 },
        { category: 'Salary', amount: 2200, ts: Date.now() - 1900000 }
      ],
      recurringExpenses: [
        { category: 'Subscriptions', amount: 320, frequency: 'monthly', ts: Date.now() - 4900000 },
        { category: 'Rent', amount: 1400, frequency: 'monthly', ts: Date.now() - 8900000 }
      ]
    };
  }

  function calculateReadinessScore() {
    return Object.entries(STARTUP_READINESS_WEIGHTS).reduce((sum, [task, points]) => {
      return sum + (appState.readinessTasks?.[task] ? points : 0);
    }, 0);
  }

  function markReadinessTaskCompleted(taskName) {
    if (!Object.prototype.hasOwnProperty.call(STARTUP_READINESS_WEIGHTS, taskName)) return;
    if (appState.readinessTasks[taskName]) return;
    appState.readinessTasks[taskName] = true;
    saveToStorage(STORAGE_KEYS.startupReadinessTasks, appState.readinessTasks);
    renderReadinessScore();
  }

  function renderReadinessScore() {
    const score = Math.min(100, calculateReadinessScore());
    const progress = $('startupReadinessProgress');
    const scoreText = $('startupReadinessValue');
    const message = $('startupReadinessMessage');
    if (progress) progress.style.width = `${score}%`;
    if (scoreText) scoreText.textContent = `${score}%`;
    if (message) {
      message.textContent = score >= 100
        ? 'You are almost ready to launch!'
        : 'Complete key tasks to build launch readiness.';
    }
  }

  function formatRelativeTime(timestamp) {
    const diffMs = Math.max(0, Date.now() - (Number(timestamp) || 0));
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    if (diffMs < minute) return 'just now';
    if (diffMs < hour) return `${Math.floor(diffMs / minute)} mins ago`;
    if (diffMs < day) return `${Math.floor(diffMs / hour)} hours ago`;
    return `${Math.floor(diffMs / day)} days ago`;
  }

  function renderActivityLog() {
    const activityList = $('activityLogList');
    if (!activityList) return;
    const recent = appState.activityLog.slice(0, 5);
    activityList.innerHTML = recent.length
      ? recent.map((item) => `<li class="bg-slate-900/70 border border-slate-700 rounded-xl px-3 py-2">${escapeHTML(item.action)} - ${formatRelativeTime(item.ts)}</li>`).join('')
      : '<li class="text-slate-400">No activities yet.</li>';
  }

  function saveTaskManagerTasks() {
    saveToStorage(STORAGE_KEYS.taskManagerTasks, appState.taskManagerTasks);
  }

  function taskCompletionRate() {
    const total = appState.taskManagerTasks.length;
    if (!total) return 0;
    const completed = appState.taskManagerTasks.filter((task) => task.completed).length;
    return Math.round((completed / total) * 100);
  }

  function renderTaskManager() {
    const list = $('taskManagerList');
    const progress = $('taskManagerProgress');
    const value = $('taskManagerProgressValue');
    if (!list) return;
    list.innerHTML = appState.taskManagerTasks.map((task) => `
      <li class="flex items-center gap-3 bg-slate-900/70 border border-slate-700 rounded-xl px-3 py-2">
        <input type="checkbox" data-task-id="${escapeHTML(task.id)}" ${task.completed ? 'checked' : ''} class="h-4 w-4" />
        <span class="${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}">${escapeHTML(task.label)}</span>
      </li>
    `).join('');

    const completion = taskCompletionRate();
    if (progress) progress.style.width = `${completion}%`;
    if (value) value.textContent = `${completion}% completed`;
  }

  function addTask(label, source = 'custom') {
    const cleanLabel = String(label || '').trim();
    if (!cleanLabel) return;
    appState.taskManagerTasks.push({
      id: `${source}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
      label: cleanLabel,
      completed: false,
      source
    });
    saveTaskManagerTasks();
    renderTaskManager();
  }

  function generateRoadmapSteps(idea) {
    const focus = idea || 'your business idea';
    return [
      `Validate demand for ${focus} with 10 customer interviews this week.`,
      `Build a one-page offer and landing page for ${focus}.`,
      `Run a small pilot with 3 paying users and collect feedback.`,
      `Define your monthly KPI dashboard (revenue, leads, retention).`,
      `Create a 30-day execution plan with weekly review checkpoints.`
    ];
  }

  function collectGlobalSearchResults(queryText) {
    const term = normalizeSearchText(queryText);
    if (!term) return [];
    const results = [];

    const guideEntries = [
      { label: WHEN_NOT_TO_START_MODULE.title, content: `${WHEN_NOT_TO_START_MODULE.introduction} ${WHEN_NOT_TO_START_MODULE.finalTakeaway}`, anchorId: 'planningGuidesSection' },
      ...WHEN_NOT_TO_START_MODULE.redFlags.map((item, index) => ({
        label: item.title,
        content: `${item.explanation} ${item.warningSign} ${item.whatToDo}`,
        anchorId: `guide-flag-${index + 1}`
      }))
    ];
    guideEntries.forEach((guide) => {
      const haystack = normalizeSearchText(`${guide.label} ${guide.content}`);
      if (haystack.includes(term)) {
        results.push({ type: 'Startup Guide', title: guide.label, description: guide.content.slice(0, 120), anchorId: guide.anchorId });
      }
    });

    BUSINESS_PLAN_TEMPLATES.forEach((template) => {
      const draft = appState.businessPlan.drafts?.[template.id] || {};
      const compiled = `${template.title} ${Object.values(draft).join(' ')}`;
      if (normalizeSearchText(compiled).includes(term)) {
        results.push({ type: 'Business Plan', title: template.title, description: 'Saved template draft', templateId: template.id });
      }
    });

    const expenseCategories = new Set([
      ...appState.expenses.map((entry) => entry.category),
      ...appState.recurringExpenses.map((entry) => entry.category),
      ...Array.from(document.querySelectorAll('#expenseCategoryInput option')).map((option) => option.value)
    ]);
    expenseCategories.forEach((category) => {
      if (normalizeSearchText(category).includes(term)) {
        results.push({ type: 'Expense Category', title: category, description: 'Saved in expense tracker', tab: 'dashboard' });
      }
    });
    appState.aiMemoryEntries.forEach((entry, index) => {
      const haystack = normalizeSearchText(`${entry.type || ''} ${entry.note || ''}`);
      if (haystack.includes(term)) {
        results.push({
          type: 'AI Memory',
          title: entry.type || `Memory ${index + 1}`,
          description: entry.note,
          tab: 'memory',
          memoryId: entry.id
        });
      }
    });

    return results.slice(0, 14);
  }

  function openSearchResult(result) {
    if (!result) return;
    if (result.type === 'Startup Guide') {
      showMainApp({ tab: 'planning', rememberStart: true });
      setPlanningSection('guides');
      setTimeout(() => document.getElementById(result.anchorId)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
      return;
    }
    if (result.type === 'Business Plan') {
      showMainApp({ tab: 'planning', rememberStart: true });
      setPlanningSection('templates');
      if (result.templateId) selectBusinessTemplate(result.templateId);
      document.getElementById('businessPlanning')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    showMainApp({ tab: result.tab || 'dashboard', rememberStart: true });
    if (result.memoryId) {
      setTimeout(() => document.querySelector(`[data-memory-id="${result.memoryId}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
      return;
    }
    document.getElementById(`panel-${result.tab || 'dashboard'}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderGlobalSearchResults(results) {
    const resultsBox = $('globalSearchResults');
    if (!resultsBox) return;
    if (!results.length) {
      resultsBox.innerHTML = '<p class="px-3 py-2 text-sm text-slate-500">No matches found.</p>';
      resultsBox.classList.remove('hidden');
      return;
    }
    resultsBox.innerHTML = results.map((result, index) => `
      <button type="button" class="global-search-result" data-search-index="${index}">
        <p class="text-[11px] uppercase tracking-[0.18em] text-slate-400">${escapeHTML(result.type)}</p>
        <p class="font-medium text-sm text-slate-800 mt-1">${escapeHTML(result.title)}</p>
        ${result.description ? `<p class="text-xs text-slate-500 mt-1">${escapeHTML(result.description)}</p>` : ''}
      </button>
    `).join('');

    const localResults = [...results];
    resultsBox.querySelectorAll('[data-search-index]').forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.getAttribute('data-search-index'));
        openSearchResult(localResults[index]);
        const input = $('globalSearchInput');
        if (input) input.value = '';
        resultsBox.classList.add('hidden');
      });
    });

    resultsBox.classList.remove('hidden');
  }

  function globalSearch(query) {
    const results = collectGlobalSearchResults(query);
    renderGlobalSearchResults(results);
    return results;
  }

  function getBusinessCategoryFromStorage() {
    const knownCategoryKeys = [
      STORAGE_KEYS.businessCategory,
      'barya_businessType',
      'businessCategory',
      'businessType'
    ];
    const keyWithValue = knownCategoryKeys.find((key) => {
      const raw = StorageService.getItem(key, '');
      return typeof raw === 'string' && raw.trim().length > 0;
    });
    return keyWithValue ? StorageService.getItem(keyWithValue, 'general').trim() : 'general';
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

  function renderExpenses(state = appState) {
    const financeInsight = $('financeInsight');
    if (!financeInsight) return;

    const recent = [...(state.expenses || [])]
      .sort((a, b) => (b.ts || 0) - (a.ts || 0))
      .slice(0, 3)
      .map((e) => `${e.category}: ${formatCurrency(e.amount)}`)
      .join(' • ');

    financeInsight.textContent = recent ? `Recent one-time expenses: ${recent}` : 'No one-time expenses added yet.';
  }

  function renderRecurringExpenses(state = appState) {
    const topCategoryOutput = $('topCategoryOutput');
    if (!topCategoryOutput) return;
    if (!(state.recurringExpenses || []).length) {
      topCategoryOutput.textContent = 'No recurring expenses yet.';
      return;
    }

    const top = [...(state.recurringExpenses || [])].sort((a, b) => toMonthlyRecurringAmount(b) - toMonthlyRecurringAmount(a))[0];
    topCategoryOutput.textContent = `Top recurring category: ${top.category} (${formatCurrency(toMonthlyRecurringAmount(top))}/month)`;
  }

  function renderCharts(state = appState) {
    if (typeof Chart === 'undefined') return;

    const expenseCanvas = $('expenseChart');
    const comparisonCanvas = $('comparisonChart');
    if (!expenseCanvas || !comparisonCanvas) return;

    const totals = calculateTotals(state);
    const categoryTotals = {};

    (state.expenses || []).forEach((expense) => {
      const category = expense?.category || 'Others';
      categoryTotals[category] = (categoryTotals[category] || 0) + (Number(expense?.amount) || 0);
    });

    (state.recurringExpenses || []).forEach((expense) => {
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
    const dashboardState = getDashboardRenderState();
    const totals = calculateTotals(dashboardState);
    const showEmpty = shouldShowDashboardEmptyState();
    $('dashboardEmptyState')?.classList.toggle('hidden', !showEmpty);
    document.querySelectorAll('.dashboard-data-block').forEach((node) => node.classList.toggle('hidden', showEmpty));

    if ($('overviewIncome')) $('overviewIncome').textContent = formatCurrency(totals.monthlyIncome);
    if ($('overviewExpenses')) $('overviewExpenses').textContent = formatCurrency(totals.totalExpenses);
    if ($('overviewSavings')) $('overviewSavings').textContent = formatCurrency(totals.netSavings);
    if ($('profitOutput')) $('profitOutput').textContent = formatCurrency(totals.netSavings);

    if ($('dashboardSummary')) {
      const samplePrefix = appState.sampleDashboardMode ? 'Sample View • ' : '';
      $('dashboardSummary').textContent = `${samplePrefix}Income: ${formatCurrency(totals.monthlyIncome)} | Expenses: ${formatCurrency(totals.totalExpenses)} | Net: ${formatCurrency(totals.netSavings)}`;
    }

    if ($('savingsStatus')) {
      $('savingsStatus').textContent = totals.netSavings >= 0 ? 'You are operating at a positive monthly balance.' : 'Warning: your monthly balance is currently negative.';
    }

    const mergedRecent = [
      ...(dashboardState.expenses || []).map((e) => ({ ...e, kind: 'one-time', monthlyAmount: Number(e.amount) || 0 })),
      ...(dashboardState.recurringExpenses || []).map((e) => ({ ...e, kind: 'recurring', monthlyAmount: toMonthlyRecurringAmount(e) }))
    ].sort((a, b) => (b.ts || 0) - (a.ts || 0)).slice(0, 5);

    if ($('recentExpensesList')) {
      $('recentExpensesList').innerHTML = mergedRecent.length
        ? mergedRecent.map((e) => `<li class="bg-slate-900/70 border border-slate-700 rounded-xl px-3 py-2">${e.category} (${e.kind}) — ${formatCurrency(e.monthlyAmount)}</li>`).join('')
        : '<li class="text-slate-400">No expenses yet! Click "Add Expense" to start tracking.</li>';
    }

    const financeEmptyState = $('financeEmptyState');
    if (financeEmptyState) {
      financeEmptyState.classList.toggle('hidden', (dashboardState.expenses || []).length > 0);
    }

    if ($('autoRecommendations')) {
      const items = buildRecommendations(totals);
      $('autoRecommendations').innerHTML = items.map((item) => `<li>${item}</li>`).join('');
    }

    generateAIInsights();
    renderExecutiveSummary(totals);
    renderReadinessScore();
    renderActivityLog();
    renderTaskManager();

    renderExpenses(dashboardState);
    renderRecurringExpenses(dashboardState);
    renderCharts(dashboardState);
  }

  function renderResources() {
    const resourcesList = $('resourcesList');
    if (!resourcesList) return;
    const t = getTranslations(appState.settings.language);
    resourcesList.innerHTML = RESOURCES_DIRECTORY.map((group) => `
      <div class="soft-card rounded-2xl p-4">
        <div class="flex items-center gap-2">
          <span class="text-2xl" aria-hidden="true">${group.icon}</span>
          <h3 class="font-semibold text-lg">${group.category}</h3>
        </div>
        <div class="mt-3 space-y-3">
          ${group.items.map((resource) => `
            <div class="bg-slate-900/70 border border-slate-700 rounded-xl p-3 flex items-center justify-between gap-3">
              <p class="text-sm font-medium">${resource.title}</p>
              <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-2 text-xs font-semibold whitespace-nowrap">${t.visitSite}</a>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function getBusinessNameForShare() {
    const inputValue = $('businessTypeInput')?.value?.trim();
    if (inputValue) return inputValue;
    return 'My Business';
  }

  function buildShareSnippet() {
    const businessName = getBusinessNameForShare();
    const t = getTranslations(appState.settings.language);
    return (t.shareText || translations.English.shareText).replace('[Business Name]', businessName);
  }

  function shareProgress(network) {
    const snippet = buildShareSnippet();
    const encoded = encodeURIComponent(snippet);
    const urls = {
      x: `https://twitter.com/intent/tweet?text=${encoded}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encoded}`,
      whatsapp: `https://wa.me/?text=${encoded}`
    };
    if (urls[network]) window.open(urls[network], '_blank', 'noopener');
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

  function pickVariant(items, seedText) {
    if (!items.length) return '';
    const seed = Array.from(String(seedText || '')).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return items[seed % items.length];
  }

  function generateResponse(message) {
    const userMessage = String(message || '').trim();
    const intent = detectIntent(userMessage);
    const totals = calculateTotals();
    const replies = {
      startup: [
        'Start lean: define one painful customer problem, build a tiny MVP, and run 10 quick validation calls before adding features.',
        'Launch with one offer and one audience first. Use weekly feedback loops, then improve pricing and positioning.',
        'Before full launch, validate demand with a landing page + paid test. Evidence should guide your first 30 days.'
      ],
      idea: [
        'Pick an idea where you can deliver value fast and charge early. Prefer service-first models before heavy product builds.',
        'Choose a problem you understand deeply, then test 2-3 lightweight offers and keep the one with strongest response.',
        'Good ideas are specific: one audience, one pain, one outcome. Start narrow and expand after traction.'
      ],
      finance: [
        `With ${formatCurrency(totals.netSavings)} net savings currently, focus on lowering fixed costs and protecting runway.`,
        'Separate must-have vs optional expenses, then review spending weekly to keep burn rate predictable.',
        'Use a simple rule: revenue first, then controlled spending. Track changes every week, not once a month.'
      ],
      marketing: [
        'Choose one core channel, publish proof-driven content, and end every post with one clear next action.',
        'Start with customer language: problem, outcome, proof. Keep campaigns simple and optimize from real responses.',
        'Build a 30-day content + outreach sprint and measure leads, reply rate, and conversion weekly.'
      ],
      planning: [
        'Break your plan into weekly milestones: customer validation, offer test, distribution, and KPI review.',
        'Use a 90-day roadmap with clear owners, deadlines, and one measurable outcome per milestone.',
        'Plan in sprints: define the next 7 days clearly, execute, review, and refine.'
      ],
      general: [
        'I can help with startup planning, finance, marketing, and idea validation. Share your current goal for focused steps.',
        'Tell me your business stage (idea, early traction, or growth), and I will suggest a practical action plan.',
        'Ask me something specific like pricing, validation, or budgeting, and I’ll provide a step-by-step answer.'
      ]
    };
    return pickVariant(replies[intent] || replies.general, `${intent}-${userMessage}`);
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

  function submitAIMessage(message) {
    const cleanMessage = String(message || '').trim();
    if (!cleanMessage) return;
    appState.aiChatHistory.push({ role: 'user', text: cleanMessage, ts: Date.now() });
    const assistantText = generateResponse(cleanMessage);
    appState.aiChatHistory.push({ role: 'ai', text: assistantText || 'Please share more detail so I can help effectively.', ts: Date.now() });
    saveToStorage(STORAGE_KEYS.aiChatHistory, appState.aiChatHistory);
    renderAIChat();
  }

  function renderIdeaGenerator() {
    const results = $('ideaGeneratorResults');
    if (!results) return;
    const latest = appState.ideaGeneratorHistory.slice(0, 5);
    results.innerHTML = latest.length
      ? latest.flatMap((item) => item.ideas.map((idea) => `<li class="bg-slate-900/70 border border-slate-700 rounded-xl p-2">${idea}</li>`)).join('')
      : '<li class="text-slate-400">No ideas generated yet.</li>';
  }

  function renderMemoryEntries() {
    const memoryList = $('memoryList');
    if (!memoryList) return;
    const entries = appState.aiMemoryEntries || [];
    memoryList.innerHTML = entries.length
      ? entries.slice().reverse().map((item) => `
        <li data-memory-id="${escapeHTML(item.id)}" class="bg-slate-900/70 border border-slate-700 rounded-xl p-3">
          <p class="text-xs uppercase tracking-[0.16em] text-slate-400">${escapeHTML(item.type || 'General')}</p>
          <p class="text-sm text-slate-200 mt-1">${escapeHTML(item.note || '')}</p>
        </li>
      `).join('')
      : '<li class="text-slate-400">No AI memory entries yet.</li>';
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

  function isBusinessPlanTemplateComplete(templateId) {
    const template = BUSINESS_PLAN_TEMPLATES.find((item) => item.id === templateId);
    if (!template) return false;
    ensureBusinessPlanDraft(templateId);
    const draft = appState.businessPlan.drafts[templateId] || {};
    return template.sections.every((section) => String(draft[section.id] || '').trim().length > 0);
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
    applyIndustryPrefill(templateId);
  }

  function applyIndustryPrefill(templateId) {
    const prefill = INDUSTRY_PREFILLS[templateId];
    if (!prefill) return;
    const template = BUSINESS_PLAN_TEMPLATES.find((item) => item.id === templateId);
    if (!template) return;
    ensureBusinessPlanDraft(templateId);
    const draft = appState.businessPlan.drafts[templateId];
    template.sections.forEach((section) => {
      draft[section.id] = prefill[section.id] || draft[section.id] || '';
    });
    saveBusinessPlanState();
    renderBusinessPlanEditor();

    const chatInput = $('chatInput');
    if (chatInput) {
      chatInput.value = `Create an industry-specific ${template.title} business plan with milestones, risks, and a 90-day execution roadmap.`;
    }
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
      <article class="learning-card" id="guide-flag-${index + 1}">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Red Flag ${index + 1}</p>
        <h3 class="text-lg font-semibold mt-1">${highlightBusinessTerms(item.title)}</h3>
        <p class="text-sm text-slate-600 mt-2 leading-relaxed">${highlightBusinessTerms(item.explanation)}</p>
        <div class="warning-box mt-3">
          <p class="text-xs uppercase tracking-[0.16em] text-amber-700 font-semibold">Warning Sign</p>
          <p class="text-sm text-amber-900 mt-1">${highlightBusinessTerms(item.warningSign)}</p>
        </div>
        <div class="action-box mt-3">
          <p class="text-xs uppercase tracking-[0.16em] text-sky-700 font-semibold">What to Do</p>
          <p class="text-sm text-sky-900 mt-1">${highlightBusinessTerms(item.whatToDo)}</p>
        </div>
      </article>
    `).join('');

    container.innerHTML = `
      <article class="learning-card">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Title</p>
        <h2 class="text-2xl font-semibold mt-1">${highlightBusinessTerms(WHEN_NOT_TO_START_MODULE.title)}</h2>
      </article>

      <article class="learning-card">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Introduction</p>
        <p class="text-sm text-slate-600 mt-2 leading-relaxed">${highlightBusinessTerms(WHEN_NOT_TO_START_MODULE.introduction)}</p>
      </article>

      <section class="learning-module-grid">
        ${redFlagCards}
      </section>

      <article class="learning-card">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Final Takeaway</p>
        <p class="text-sm text-slate-600 mt-2 leading-relaxed">${highlightBusinessTerms(WHEN_NOT_TO_START_MODULE.finalTakeaway)}</p>
      </article>

    `;
  }

  function applySettings() {
    const languageSelect = $('languageSelect');
    const settingsLanguageSelect = $('settingsLanguageSelect');
    const currencySelect = $('currencySelect');
    const goalInput = $('goalInput');
    const autoSyncToggle = $('autoSyncToggle');
    const businessTypeInput = $('businessTypeInput');
    const audienceInput = $('audienceInput');
    const preferenceInput = $('preferenceInput');

    if (languageSelect) languageSelect.value = appState.settings.language;
    if (settingsLanguageSelect) settingsLanguageSelect.value = appState.settings.language;
    if (currencySelect) currencySelect.value = appState.settings.currency;
    if (goalInput) goalInput.value = appState.settings.goal || '';
    if (autoSyncToggle) autoSyncToggle.checked = Boolean(appState.settings.autoSyncCloud);
    if (businessTypeInput) businessTypeInput.value = appState.profile.businessType || '';
    if (audienceInput) audienceInput.value = appState.profile.audience || '';
    if (preferenceInput) preferenceInput.value = appState.profile.preference || '';
    setLanguage(appState.settings.language);

    renderDashboard();
    renderAIChat();
    renderResources();
  }


  function setActiveTab(tabName) {
    if (!tabName) return;
    const tabButtons = document.querySelectorAll('#tabs [data-tab]');
    document.querySelectorAll('.panel').forEach((panel) => panel.classList.add('hidden'));
    tabButtons.forEach((btn) => btn.classList.remove('active'));

    const target = document.getElementById(`panel-${tabName}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.remove('fade-in');
      requestAnimationFrame(() => target.classList.add('fade-in'));
    }
    const activeBtn = document.querySelector(`#tabs [data-tab="${tabName}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (tabName === 'planning') {
      renderBusinessPlanTemplates();
      renderBusinessPlanEditor();
      renderWhenNotToStartGuide();
    }
    if (tabName === 'memory') {
      renderMemoryEntries();
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
    const globalSearchShell = $('globalSearchShell');

    if (landingPageContainer) {
      landingPageContainer.classList.remove('is-visible');
      landingPageContainer.classList.add('is-hidden');
      setTimeout(() => {
        landingPageContainer.style.display = 'none';
      }, 280);
    }
    document.querySelectorAll('.landing-only').forEach((node) => {
      node.style.display = 'none';
    });
    if (appContainer) {
      appContainer.style.display = 'block';
      requestAnimationFrame(() => {
        appContainer.classList.remove('is-hidden');
        appContainer.classList.add('is-visible');
      });
    }
    if (globalSearchShell) globalSearchShell.style.display = 'block';

    if (rememberStart) {
      StorageService.setItem(STORAGE_KEYS.userStarted, 'true');
    }

    setActiveTab(tab);
  }

  function showLandingPage() {
    const landingPageContainer = $('landingPageContainer');
    const appContainer = $('appContainer');
    const globalSearchShell = $('globalSearchShell');

    if (appContainer) {
      appContainer.classList.remove('is-visible');
      appContainer.classList.add('is-hidden');
      setTimeout(() => {
        appContainer.style.display = 'none';
      }, 260);
    }
    if (landingPageContainer) {
      landingPageContainer.style.display = 'block';
      requestAnimationFrame(() => {
        landingPageContainer.classList.remove('is-hidden');
        landingPageContainer.classList.add('is-visible');
      });
    }
    document.querySelectorAll('.landing-only').forEach((node) => {
      node.style.display = '';
    });
    if (globalSearchShell) globalSearchShell.style.display = 'none';
  }

  function initTabs() {
    const tabButtons = document.querySelectorAll('#tabs [data-tab]');
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        clearGuidedFocus();
        const tab = btn.getAttribute('data-tab');
        setActiveTab(tab);
      });
    });
  }

  function clearGuidedFocus() {
    // Tour/popup focus mode removed; keep as no-op for compatibility with existing handlers.
  }

  function handleQuickNavigation(entryType) {
    const configs = {
      build: {
        tab: 'planning',
        panelSelector: '#panel-planning'
      },
      track: {
        tab: 'dashboard',
        panelSelector: '#dashboardExpensesTool'
      },
      grow: {
        tab: 'strategy',
        tabSelector: '#tabs [data-tab=\"strategy\"]',
        panelSelector: '#aiAssistantTourTarget'
      }
    };

    const selectedConfig = configs[entryType];
    if (!selectedConfig) return;

    showMainApp({ tab: selectedConfig.tab, rememberStart: true });
    if (selectedConfig.tab === 'planning') setPlanningSection('templates');

    const targetPanel = document.querySelector(selectedConfig.panelSelector);
    if (targetPanel) {
      targetPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function initControls() {
    const incomeInput = $('incomeInput');
    const saveIncomeBtn = $('saveIncomeBtn');
    if (saveIncomeBtn && incomeInput) {
      saveIncomeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        appState.sampleDashboardMode = false;
        const value = Number(incomeInput.value);
        appState.monthlyIncome = Number.isFinite(value) && value >= 0 ? value : 0;
        saveToStorage(STORAGE_KEYS.monthlyIncome, String(appState.monthlyIncome));
        renderDashboard();
        setStatusText('financeInsight', 'Monthly income saved successfully.', 'success');
      });
    }

    const addExpenseBtn = $('addExpenseBtn');
    const expenseCategoryInput = $('expenseCategoryInput');
    const expenseAmountInput = $('expenseAmountInput');
    if (addExpenseBtn && expenseCategoryInput && expenseAmountInput) {
      addExpenseBtn.addEventListener('click', (event) => {
        event.preventDefault();
        appState.sampleDashboardMode = false;
        const category = expenseCategoryInput.value || 'Others';
        const amount = Number(expenseAmountInput.value);
        if (!Number.isFinite(amount) || amount <= 0) {
          setStatusText('financeInsight', 'Please enter a valid one-time expense amount.', 'error');
          return;
        }
        appState.expenses.unshift({ id: createId(), category, amount, ts: Date.now() });
        saveToStorage(STORAGE_KEYS.expenses, appState.expenses);
        logActivity(`Added a new expense (${category})`);
        markReadinessTaskCompleted('addedExpense');
        expenseCategoryInput.value = 'Marketing';
        expenseAmountInput.value = '';
        renderDashboard();
        setStatusText('financeInsight', `Expense added for ${category}.`, 'success');
      });
    }

    const addRecurringExpenseBtn = $('addRecurringExpenseBtn');
    const recurringCategoryInput = $('recurringCategoryInput');
    const recurringAmountInput = $('recurringAmountInput');
    const recurringFrequencyInput = $('recurringFrequencyInput');
    if (addRecurringExpenseBtn && recurringCategoryInput && recurringAmountInput && recurringFrequencyInput) {
      addRecurringExpenseBtn.addEventListener('click', (event) => {
        event.preventDefault();
        appState.sampleDashboardMode = false;
        const category = recurringCategoryInput.value.trim() || 'Recurring';
        const amount = Number(recurringAmountInput.value);
        if (!Number.isFinite(amount) || amount <= 0) {
          setStatusText('financeInsight', 'Please enter a valid recurring expense amount.', 'error');
          return;
        }
        appState.recurringExpenses.unshift({ id: createId(), category, amount, frequency: recurringFrequencyInput.value, ts: Date.now() });
        saveToStorage(STORAGE_KEYS.recurringExpenses, appState.recurringExpenses);
        recurringCategoryInput.value = '';
        recurringAmountInput.value = '';
        recurringFrequencyInput.value = 'monthly';
        renderDashboard();
        setStatusText('financeInsight', `Recurring expense added (${category}).`, 'success');
      });
    }

    const chatForm = $('chatForm');
    const chatInput = $('chatInput');
    if (chatForm && chatInput) {
      chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        submitAIMessage(chatInput.value);
        chatInput.value = '';
      });
    }
    document.querySelectorAll('[data-prompt-chip]').forEach((chip) => {
      chip.addEventListener('click', () => {
        if (!chatInput) return;
        const prompt = chip.getAttribute('data-prompt-chip') || '';
        chatInput.value = prompt;
        submitAIMessage(prompt);
        chatInput.value = '';
      });
    });

    const clearChatBtn = $('clearChatBtn');
    if (clearChatBtn) {
      clearChatBtn.addEventListener('click', (event) => {
        event.preventDefault();
        appState.aiChatHistory = [];
        saveToStorage(STORAGE_KEYS.aiChatHistory, appState.aiChatHistory);
        renderAIChat();
      });
    }
    const voiceInputBtn = $('voiceInputBtn');
    if (voiceInputBtn && chatInput) {
      voiceInputBtn.addEventListener('click', () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          appState.aiChatHistory.push({ role: 'ai', text: 'Voice input is not supported in this browser.', ts: Date.now() });
          renderAIChat();
          return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onresult = (evt) => {
          const transcript = evt?.results?.[0]?.[0]?.transcript || '';
          if (!transcript.trim()) return;
          chatInput.value = transcript.trim();
          submitAIMessage(chatInput.value);
          chatInput.value = '';
        };
        recognition.onerror = () => {
          appState.aiChatHistory.push({ role: 'ai', text: 'Could not capture voice input. Please try again.', ts: Date.now() });
          renderAIChat();
        };
        recognition.start();
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
        logActivity('Generated a new business idea');
        markReadinessTaskCompleted('generatedIdea');
        ideaGeneratorInput.value = '';
        renderIdeaGenerator();
        setStatusText('taskRoadmapStatus', `Generated 3 ideas for "${topic}".`, 'success');
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
          goal: goalInput?.value?.trim() || '',
          autoSyncCloud: Boolean(appState.settings.autoSyncCloud)
        };
        saveSettings();
        applySettings();
        setStatusText('cloudSyncStatus', 'Settings saved successfully.', 'success');
      });
    }

    const profileForm = $('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const businessType = $('businessTypeInput')?.value?.trim() || '';
        const audience = $('audienceInput')?.value?.trim() || '';
        const preference = $('preferenceInput')?.value?.trim() || '';
        appState.profile = { businessType, audience, preference };
        if (businessType) saveToStorage(STORAGE_KEYS.businessCategory, businessType);
        saveToStorage(STORAGE_KEYS.profile, appState.profile);
        setStatusText('cloudSyncStatus', 'Profile saved successfully.', 'success');
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
    const autoSyncToggle = $('autoSyncToggle');
    if (autoSyncToggle) {
      autoSyncToggle.checked = Boolean(appState.settings.autoSyncCloud);
      autoSyncToggle.addEventListener('change', () => {
        appState.settings.autoSyncCloud = autoSyncToggle.checked;
        saveSettings();
      });
    }
    const exportToCloudBtn = $('exportToCloudBtn');
    if (exportToCloudBtn) {
      exportToCloudBtn.addEventListener('click', () => {
        const status = $('cloudSyncStatus');
        exportData();
        if (status) {
          status.textContent = 'Backup exported. Upload this JSON file to your Google Drive for cloud storage.';
        }
      });
    }

    const memoryForm = $('memoryForm');
    if (memoryForm) {
      memoryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const typeInput = $('memoryType');
        const noteInput = $('memoryInput');
        const type = typeInput?.value?.trim() || 'General';
        const note = noteInput?.value?.trim();
        if (!note) return;
        appState.aiMemoryEntries.push({ id: createId(), type, note, ts: Date.now() });
        appState.aiMemoryEntries = appState.aiMemoryEntries.slice(-120);
        saveToStorage(STORAGE_KEYS.aiMemory, appState.aiMemoryEntries);
        if (typeInput) typeInput.value = '';
        if (noteInput) noteInput.value = '';
        renderMemoryEntries();
      });
    }

    const startConversationBtn = $('startConversationBtn');
    if (startConversationBtn) {
      startConversationBtn.addEventListener('click', (event) => {
        event.preventDefault();
        clearGuidedFocus();
        document.querySelector('[data-tab="strategy"]')?.click();
        $('chatInput')?.focus();
      });
    }

    const enterWorkspaceBtn = $('enterWorkspaceBtn');
    if (enterWorkspaceBtn) {
      enterWorkspaceBtn.addEventListener('click', (event) => {
        event.preventDefault();
        clearGuidedFocus();
        showMainApp({ tab: 'dashboard', rememberStart: true });
      });
    }
    const viewSampleDashboardBtn = $('viewSampleDashboardBtn');
    if (viewSampleDashboardBtn) {
      viewSampleDashboardBtn.addEventListener('click', () => {
        appState.sampleDashboardMode = true;
        renderDashboard();
      });
    }
    const backToLandingBtn = $('backToLandingBtn');
    if (backToLandingBtn) {
      backToLandingBtn.addEventListener('click', (event) => {
        event.preventDefault();
        showLandingPage();
      });
    }

    document.querySelectorAll('[data-quick-nav]').forEach((button) => {
      button.addEventListener('click', () => {
        const entryType = button.getAttribute('data-quick-nav');
        if (!entryType) return;
        handleQuickNavigation(entryType);
      });
    });

    const shareProgressBtn = $('shareProgressBtn');
    const shareSnippetOutput = $('shareSnippetOutput');
    if (shareProgressBtn && shareSnippetOutput) {
      shareProgressBtn.addEventListener('click', () => {
        const snippet = buildShareSnippet();
        shareSnippetOutput.textContent = snippet;
        $('shareActions')?.classList.remove('hidden');
      });
    }

    const shareXBtn = $('shareXBtn');
    const shareLinkedInBtn = $('shareLinkedInBtn');
    const shareWhatsAppBtn = $('shareWhatsAppBtn');
    if (shareXBtn) shareXBtn.addEventListener('click', () => shareProgress('x'));
    if (shareLinkedInBtn) shareLinkedInBtn.addEventListener('click', () => shareProgress('linkedin'));
    if (shareWhatsAppBtn) shareWhatsAppBtn.addEventListener('click', () => shareProgress('whatsapp'));

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
        StorageService.setItem(STORAGE_KEYS.theme, theme);
        applyTheme(theme);
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
    const businessPlanning = $('businessPlanning');
    if (businessPlanning) {
      businessPlanning.addEventListener('click', (event) => {
        const button = event.target.closest('.template-hero-card[data-template-id]');
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
        logActivity('Saved a business plan');
        const status = $('businessPlanStatus');
        if (status) status.textContent = `${selectedTemplate.title} saved locally.`;
        if (isBusinessPlanTemplateComplete(selectedTemplate.id)) {
          markReadinessTaskCompleted('completedPlanTemplate');
        }
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

    const taskManagerList = $('taskManagerList');
    if (taskManagerList) {
      taskManagerList.addEventListener('change', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') return;
        const taskId = target.getAttribute('data-task-id');
        if (!taskId) return;
        const task = appState.taskManagerTasks.find((item) => item.id === taskId);
        if (!task) return;
        task.completed = target.checked;
        saveTaskManagerTasks();
        renderTaskManager();
      });
    }

    const addTaskBtn = $('addTaskBtn');
    const taskInput = $('taskInput');
    if (addTaskBtn && taskInput) {
      addTaskBtn.addEventListener('click', () => {
        addTask(taskInput.value, 'custom');
        taskInput.value = '';
      });
    }

    const generateRoadmapBtn = $('generateRoadmapBtn');
    if (generateRoadmapBtn) {
      generateRoadmapBtn.addEventListener('click', () => {
        const businessIdea = appState.ideaGeneratorHistory[0]?.topic || $('ideaGeneratorInput')?.value?.trim() || '';
        const roadmapStatus = $('taskRoadmapStatus');
        if (!businessIdea) {
          if (roadmapStatus) roadmapStatus.textContent = 'Please add a business idea first.';
          return;
        }
        const steps = generateRoadmapSteps(businessIdea);
        steps.forEach((step) => addTask(step, 'roadmap'));
        logActivity('Generated AI roadmap tasks');
        if (roadmapStatus) roadmapStatus.textContent = `Added 5 roadmap tasks for "${businessIdea}".`;
      });
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

    const globalSearchInput = $('globalSearchInput');
    const globalSearchResults = $('globalSearchResults');
    if (globalSearchInput && globalSearchResults) {
      globalSearchInput.addEventListener('input', () => {
        const query = globalSearchInput.value.trim();
        if (!query) {
          globalSearchResults.classList.add('hidden');
          globalSearchResults.innerHTML = '';
          return;
        }
        globalSearch(query);
      });

      document.addEventListener('click', (event) => {
        const target = event.target;
        if (
          target instanceof HTMLElement &&
          !globalSearchInput.contains(target) &&
          !globalSearchResults.contains(target)
        ) {
          globalSearchResults.classList.add('hidden');
        }
      });
    }
  }

  function hydrateState() {
    appState.monthlyIncome = Number(StorageService.getItem(STORAGE_KEYS.monthlyIncome, 0) || 0);
    appState.expenses = ensureArray(loadFromStorage(STORAGE_KEYS.expenses, []));
    appState.recurringExpenses = ensureArray(loadFromStorage(STORAGE_KEYS.recurringExpenses, []));
    appState.settings = loadSettings();
    appState.aiChatHistory = ensureArray(loadFromStorage(STORAGE_KEYS.aiChatHistory, []));
    appState.aiMemoryEntries = ensureArray(loadFromStorage(STORAGE_KEYS.aiMemory, []));
    appState.businessAdvisorHistory = ensureArray(loadFromStorage(STORAGE_KEYS.businessAdvisorHistory, []));
    appState.ideaGeneratorHistory = ensureArray(loadFromStorage(STORAGE_KEYS.ideaGeneratorHistory, []));
    appState.profile = {
      businessType: '',
      audience: '',
      preference: '',
      ...ensureObject(loadFromStorage(STORAGE_KEYS.profile, {}))
    };
    BUSINESS_PLAN_TEMPLATES.forEach((template) => {
      const saved = loadFromStorage(template.storageKey, {});
      appState.businessPlan.drafts[template.id] = ensureObject(saved);
    });
    const savedAiMap = loadFromStorage(STORAGE_KEYS.businessPlanAiGenerated, {});
    appState.businessPlan.aiGenerated = ensureObject(savedAiMap);
    appState.readinessTasks = loadReadinessTasks();
    appState.activityLog = loadActivityLog();
    appState.taskManagerTasks = loadTaskManagerTasks();
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
    renderMemoryEntries();
    renderBusinessPlanTemplates();
    renderBusinessPlanEditor();
    renderWhenNotToStartGuide();
    setPlanningSection('guides');
    applyTheme(StorageService.getItem(STORAGE_KEYS.theme, 'light') || 'light');
    window.exportToPDF = exportToPDF;
    window.globalSearch = globalSearch;
    window.setLanguage = setLanguage;

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').catch((error) => {
          console.warn('Service worker registration failed:', error);
        });
      });
    }

    const incomeInput = $('incomeInput');
    if (incomeInput) incomeInput.value = String(appState.monthlyIncome || '');

    const hasStarted = StorageService.getItem(STORAGE_KEYS.userStarted, 'false') === 'true';
    if (hasStarted) {
      clearGuidedFocus();
      showMainApp({ tab: 'dashboard' });
    } else {
      showLandingPage();
    }
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
