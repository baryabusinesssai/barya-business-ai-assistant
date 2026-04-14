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
    startupGuideProgress: 'barya_startup_guide_progress',
    languagePreference: 'barya_language_preference',
    profile: 'barya_profile',
    feedbackEntries: 'barya_feedback_entries',
    contactMessages: 'barya_contact_messages',
    aiResponseMeta: 'barya_ai_response_meta',
    founderProfile: 'barya_founder_profile',
    goalDirection: 'barya_goal_direction',
    workspacePreferences: 'barya_workspace_preferences',
    aiBehaviorSettings: 'barya_ai_behavior_settings',
    businessContext: 'barya_business_context',
    learningPreferences: 'barya_learning_preferences'
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
      aiAssistant: 'Barya AI',
      workspace: 'Workspace',
      memory: 'Memory',
      profile: 'Profile',
      settings: 'Settings',
      resources: 'Resources',
      save: 'Save',
      saveProfile: 'Save Profile',
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
      saveSettings: 'Save Changes',
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
      saveSettings: 'تبدیلیاں محفوظ کریں',
      chatPlaceholder: 'اپنے کاروبار کے بارے میں سوال پوچھیں...'
    },
    'Roman Urdu': {
      dashboard: 'Dashboard',
      aiAssistant: 'Barya AI',
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
      saveSettings: 'Save Changes',
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
      useCase: 'Best for founders launching a neighborhood café or specialty coffee concept.',
      sections: [
        { id: 'concept', title: 'Concept', helper: 'Define the business model, customer experience, and positioning.', placeholder: 'Define your café concept and ambiance.' },
        { id: 'target-market', title: 'Target Market', helper: 'Identify who buys from you, where they are, and why they choose you.', placeholder: 'Describe your main customer segments and location behavior.' },
        { id: 'menu-pricing', title: 'Menu & Pricing', helper: 'Document key offerings, price points, and gross margin targets.', placeholder: 'Outline your hero products, pricing strategy, and margins.' },
        { id: 'operations', title: 'Operations', helper: 'Map staffing, supplier management, and daily execution standards.', placeholder: 'Describe staffing, suppliers, and opening-hour workflow.' },
        { id: 'marketing', title: 'Marketing Plan', helper: 'Set clear channels, campaign priorities, and retention initiatives.', placeholder: 'List launch and retention marketing actions.' },
        { id: 'financials', title: 'Financial Plan', helper: 'Summarize startup budget, monthly costs, and break-even timing.', placeholder: 'Capture startup costs, monthly expenses, and break-even assumptions.' }
      ]
    },
    {
      id: 'saas-startup',
      storageKey: 'barya_template_marketing',
      title: 'SaaS Startup',
      description: 'Software planning template for product, acquisition, retention, and recurring revenue.',
      useCase: 'Designed for founders validating and scaling subscription software products.',
      sections: [
        { id: 'problem', title: 'Problem', helper: 'State the operational pain, impact, and current workaround.', placeholder: 'Define the customer workflow pain your SaaS solves.' },
        { id: 'product', title: 'Product Scope', helper: 'Prioritize MVP capabilities and near-term roadmap milestones.', placeholder: 'Describe MVP features and roadmap priorities.' },
        { id: 'pricing', title: 'Pricing & Packaging', helper: 'Define package structure, monetization logic, and upgrade flow.', placeholder: 'Define tiers, trial model, and upgrade path.' },
        { id: 'go-to-market', title: 'Go-To-Market', helper: 'Outline demand channels, funnel targets, and sales process.', placeholder: 'Explain channels, funnel, and sales motion.' },
        { id: 'retention', title: 'Retention Strategy', helper: 'Describe onboarding, customer success, and churn controls.', placeholder: 'Outline onboarding, support, and churn prevention systems.' },
        { id: 'metrics', title: 'Metrics', helper: 'Track core KPIs used for weekly and monthly decisions.', placeholder: 'Track MRR, CAC, churn, and expansion revenue goals.' }
      ]
    },
    {
      id: 'ecommerce-store',
      storageKey: 'barya_template_operations',
      title: 'E-commerce Store',
      description: 'Commerce template focused on niche, catalog strategy, logistics, and repeat sales.',
      useCase: 'Ideal for founders building a direct-to-consumer online retail operation.',
      sections: [
        { id: 'niche', title: 'Niche & Audience', helper: 'Define target segment, needs, and purchase motivations.', placeholder: 'Define store niche and buyer profile.' },
        { id: 'catalog', title: 'Product Catalog', helper: 'Prioritize products based on demand, margin, and repeat potential.', placeholder: 'Describe winning SKUs and margin priorities.' },
        { id: 'storefront', title: 'Storefront & UX', helper: 'Map user journey from landing page to completed checkout.', placeholder: 'Plan site structure, conversion path, and trust signals.' },
        { id: 'fulfillment', title: 'Fulfillment', helper: 'Document sourcing, inventory controls, shipping, and returns SOPs.', placeholder: 'Define sourcing, inventory, shipping, and returns process.' },
        { id: 'growth', title: 'Growth Channels', helper: 'Set channel mix, campaign cadence, and acquisition targets.', placeholder: 'List paid, organic, and partnership channels.' },
        { id: 'forecast', title: 'Sales Forecast', helper: 'Estimate traffic, conversion, revenue, and cash requirements.', placeholder: 'Estimate traffic, conversion, AOV, and 90-day targets.' }
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

  const STARTUP_GUIDES = [
    {
      id: 'when-not-to-start',
      title: 'When NOT to Start a Business',
      introduction: 'This guide helps you avoid expensive founder mistakes. Sometimes the smartest move is to pause, prepare, and then launch with better timing and better data.',
      keyConcepts: [
        'Readiness beats hype. Business momentum comes from systems, not motivation alone.',
        'Pain-first thinking: people pay to solve painful and urgent problems.',
        'Personal stability matters. If your personal life is in crisis, startup pressure can multiply risk.',
        'Validation before build. Evidence should come before heavy spending.',
        'A delayed launch can be a strategic advantage if preparation increases your odds of survival.'
      ],
      warningSigns: [
        'You cannot explain the exact customer pain in one sentence.',
        'You are building features before talking to real buyers.',
        'You have less than 3-6 months of personal and business runway.',
        'You keep changing ideas weekly because there is no clear focus.',
        'You have not checked legal, tax, or compliance basics for your market.'
      ],
      actionSteps: [
        'Run 10 customer problem interviews and write down exact pain language.',
        'Test one low-cost offer first (a paid pilot, preorder, or service version).',
        'Create a survival budget and reduce fixed costs before full-time commitment.',
        'Pick one customer segment and one core outcome for 90 days.',
        'List your legal and financial setup checklist and complete it before scaling.'
      ],
      founderInsights: [
        'A strong founder is not the fastest starter, but the one who makes fewer fatal mistakes.',
        'If stress is making you reactive, pause. Calm founders make better strategic decisions.',
        'Do not confuse activity with progress. Revenue and retention are better proof than busy days.'
      ],
      executionPlan: [
        { id: 'audit-readiness', step: 'Complete a founder readiness audit for money, time, and support.', toolLabel: 'Add to Task Manager', actionType: 'add_task' },
        { id: 'run-problem-calls', step: 'Run 10 customer problem calls before building anything.', toolLabel: 'Open Barya AI', actionType: 'open_strategy', prompt: 'Help me design 10 customer discovery questions to validate a business problem.' },
        { id: 'validate-offer', step: 'Test one paid pilot offer this month and collect objections.', toolLabel: 'Open Idea Generator', actionType: 'open_idea_generator' },
        { id: 'document-risks', step: 'Create a risk checklist in your memory so decisions stay evidence-based.', toolLabel: 'Open Memory', actionType: 'open_memory' }
      ]
    },
    {
      id: 'how-to-start-step-by-step',
      title: 'How to Start a Business (Step-by-Step)',
      introduction: 'Use this playbook as a practical launch system. It is designed for beginners who need clear order, clear decisions, and measurable weekly progress.',
      keyConcepts: [
        'Start with customer and problem clarity before product design.',
        'Build a lean first offer you can deliver quickly and improve from feedback.',
        'Cash flow focus from day one: know your pricing, costs, and margin.',
        'Execution rhythm matters more than occasional big effort.',
        'Simple operating systems (weekly planning, KPI check, follow-up loop) create consistency.'
      ],
      warningSigns: [
        'You are writing long plans but taking no customer-facing action.',
        'Your offer is too broad and not targeted to one clear buyer.',
        'You cannot explain how money enters and leaves the business monthly.',
        'You keep delaying launch because your branding or website is not perfect.',
        'You have no follow-up process for leads or interested prospects.'
      ],
      actionSteps: [
        'Step 1: Define one target segment, one painful problem, and one promised outcome.',
        'Step 2: Create a simple offer page (what you solve, for whom, price, next step).',
        'Step 3: Talk to 20 potential customers and ask for paid interest, not just opinions.',
        'Step 4: Deliver to your first 3 paying customers and document what worked.',
        'Step 5: Build your weekly operating dashboard (leads, calls, conversion, revenue, retention).',
        'Step 6: Improve offer, pricing, and process every 7 days based on evidence.'
      ],
      founderInsights: [
        'Your first version should be useful, not impressive.',
        'The market rewards clarity: who you help, what result you deliver, and why your method is different.',
        'Weekly reviews are founder leverage. Small adjustments compound quickly.'
      ],
      executionPlan: [
        { id: 'choose-segment', step: 'Choose one customer segment and one painful problem to solve first.', toolLabel: 'Add to Task Manager', actionType: 'add_task' },
        { id: 'draft-offer', step: 'Draft your first paid offer and value promise in plain language.', toolLabel: 'Open Barya AI', actionType: 'open_strategy', prompt: 'Help me write a simple first offer with pricing, audience, and promise.' },
        { id: 'launch-template', step: 'Build your launch plan in a template and define 30/60/90-day milestones.', toolLabel: 'Open SaaS Template', actionType: 'open_template', templateId: 'saas-startup' },
        { id: 'weekly-review', step: 'Run a weekly scorecard review: leads, conversions, revenue, and delivery quality.', toolLabel: 'Open Dashboard', actionType: 'open_tab', tab: 'dashboard' }
      ]
    },
    {
      id: 'market-research-validation',
      title: 'Market Research & Validation',
      introduction: 'This guide shows you how to test demand before scaling. Good validation helps you avoid building products people do not actually want to buy.',
      keyConcepts: [
        'Research has two parts: understanding the market and confirming willingness to pay.',
        'Qualitative data (interviews) explains why buyers behave in certain ways.',
        'Quantitative data (conversion rates, signup rates, pilot revenue) shows if demand is real.',
        'Competition is useful data, not a reason to quit.',
        'Validation is continuous. You keep testing messaging, pricing, and channels as you grow.'
      ],
      warningSigns: [
        'You say “everyone is my customer.”',
        'Your decision making is based on social media likes instead of buyer actions.',
        'You avoid calling customers because you fear negative feedback.',
        'You ignore competitor offers and pricing benchmarks.',
        'Your tests are not time-bound, so learning is slow and unclear.'
      ],
      actionSteps: [
        'Map top 5 competitors: offer, pricing, audience, promise, and trust signals.',
        'Interview 10 ideal buyers and classify their pain by urgency and budget.',
        'Create a test offer with clear value and a real price point.',
        'Run a 14-day validation sprint using direct outreach and one landing page.',
        'Track signal metrics: response rate, booked calls, paid conversions, objections.',
        'Use feedback to sharpen positioning and remove low-value features.'
      ],
      founderInsights: [
        'If people hesitate to pay, the issue is usually positioning or urgency, not effort.',
        'Objections are market intelligence. Document them and improve your offer around them.',
        'The fastest path to product-market fit is frequent customer conversations.'
      ],
      executionPlan: [
        { id: 'competitor-map', step: 'Create a competitor map with offers, pricing, and positioning gaps.', toolLabel: 'Add to Task Manager', actionType: 'add_task' },
        { id: 'interview-script', step: 'Prepare and run interview scripts for your top customer segment.', toolLabel: 'Open Barya AI', actionType: 'open_strategy', prompt: 'Generate a customer interview script for market research and validation.' },
        { id: 'validation-sprint', step: 'Run a 14-day validation sprint and track conversion signals daily.', toolLabel: 'Open Idea Generator', actionType: 'open_idea_generator' },
        { id: 'store-insights', step: 'Save objections and insight notes to memory for future offer updates.', toolLabel: 'Open Memory', actionType: 'open_memory' }
      ]
    },
    {
      id: 'branding-positioning-basics',
      title: 'Branding & Positioning Basics',
      introduction: 'Branding is how people remember and trust your business. Positioning is the strategic choice of how you are different. This guide helps you build both in a practical way.',
      keyConcepts: [
        'Brand is not just logo and color; it is promise, voice, and customer experience.',
        'Positioning means owning a clear lane in the customer mind.',
        'Specific messaging converts better than generic claims.',
        'Consistency builds trust across website, sales calls, and delivery.',
        'Strong positioning makes sales easier because buyers understand your value fast.'
      ],
      warningSigns: [
        'Your message sounds like every competitor in your category.',
        'Customers are confused about what you actually do.',
        'You keep changing your brand voice every week.',
        'Your social content and sales pitch communicate different promises.',
        'Price objections are high because your value is not clearly framed.'
      ],
      actionSteps: [
        'Define your positioning statement: “We help [audience] achieve [outcome] without [common pain] through [unique method].”',
        'Write 3 core brand pillars (e.g., speed, clarity, reliability) and use them in all communication.',
        'Create a message hierarchy: headline, proof points, offer details, and call-to-action.',
        'Collect customer language from reviews, calls, and feedback; reuse that language in copy.',
        'Audit all touchpoints monthly (website, deck, profile, onboarding) for consistency.'
      ],
      founderInsights: [
        'Confused prospects do not buy. Clear positioning reduces friction.',
        'Brand trust grows when your delivery matches your promise repeatedly.',
        'The best beginner brand strategy is simple: be clear, be useful, and be consistent.'
      ],
      executionPlan: [
        { id: 'positioning-statement', step: 'Write one clear positioning statement and test it on 5 prospects.', toolLabel: 'Add to Task Manager', actionType: 'add_task' },
        { id: 'message-hierarchy', step: 'Build your message hierarchy (headline, proof, offer, CTA).', toolLabel: 'Open Barya AI', actionType: 'open_strategy', prompt: 'Help me create a clear brand message hierarchy for a beginner startup.' },
        { id: 'brand-plan', step: 'Document your brand pillars inside a business plan template for consistency.', toolLabel: 'Open E-commerce Template', actionType: 'open_template', templateId: 'ecommerce-store' },
        { id: 'channel-audit', step: 'Audit website, profile, and sales messages to ensure one consistent voice.', toolLabel: 'Open Settings', actionType: 'open_tab', tab: 'settings' }
      ]
    }
  ];
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
      icon: '◧',
      items: [
        { title: 'Canva Logo Maker', url: 'https://www.canva.com/create/logos/' },
        { title: 'Looka', url: 'https://looka.com/logo-maker/' }
      ]
    },
    {
      category: 'Domain Registration',
      icon: '◎',
      items: [
        { title: 'Namecheap Domains', url: 'https://www.namecheap.com/domains/' },
        { title: 'Cloudflare Registrar', url: 'https://www.cloudflare.com/products/registrar/' }
      ]
    },
    {
      category: 'Legal Templates',
      icon: '∥',
      items: [
        { title: 'SBA Business Forms', url: 'https://www.sba.gov/business-guide/launch-your-business/register-your-business' },
        { title: 'DocuSign Template Library', url: 'https://www.docusign.com/resources/templates' }
      ]
    },
    {
      category: 'Networking Groups',
      icon: '⌘',
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
    aiResponseMeta: { lastDomain: 'general', lastVariantByDomain: {} },
    profile: { name: '', businessType: '', stage: '', audience: '', preference: '' },
    goalDirection: { currentGoal: '', timeline: '', priorityFocus: '' },
    aiBehavior: { responseStyle: 'structured', focusMode: 'startup' },
    businessContext: { building: '', revenueStage: '', biggestChallenge: '' },
    learningPreferences: { level: 'beginner', showSuggestions: true },
    businessPlan: { selectedTemplateId: '', drafts: {}, aiGenerated: {} },
    sampleDashboardMode: false,
    readinessTasks: loadReadinessTasks(),
    activityLog: loadActivityLog(),
    taskManagerTasks: loadTaskManagerTasks(),
    startupGuideProgress: loadStartupGuideProgress()
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

  function loadStartupGuideProgress() {
    const saved = loadFromStorage(STORAGE_KEYS.startupGuideProgress, {});
    return ensureObject(saved);
  }

  function saveStartupGuideProgress() {
    saveToStorage(STORAGE_KEYS.startupGuideProgress, appState.startupGuideProgress);
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
    const workspacePreferences = loadFromStorage(STORAGE_KEYS.workspacePreferences, {});
    const storedLanguage = StorageService.getItem(STORAGE_KEYS.languagePreference, '');
    const candidateLanguage = storedLanguage || workspacePreferences?.language || loaded?.language;
    const language = LANGUAGES.includes(candidateLanguage) ? candidateLanguage : 'English';
    return {
      currency: workspacePreferences?.currency || loaded?.currency || 'USD',
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
      ? recent.map((item) => `<li class="border border-[#eeeeee] rounded px-3 py-2 bg-white text-slate-700">${escapeHTML(item.action)} - ${formatRelativeTime(item.ts)}</li>`).join('')
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

    const guideEntries = STARTUP_GUIDES.flatMap((guide) => ([
      {
        label: guide.title,
        content: `${guide.introduction} ${guide.keyConcepts.join(' ')} ${guide.warningSigns.join(' ')} ${guide.actionSteps.join(' ')} ${guide.founderInsights.join(' ')}`,
        anchorId: `guide-${guide.id}`
      },
      ...guide.warningSigns.map((warningSign, index) => ({
        label: `${guide.title}: Warning ${index + 1}`,
        content: warningSign,
        anchorId: `guide-${guide.id}`
      }))
    ]));
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
    $('workspaceOverviewState')?.classList.toggle('hidden', !showEmpty);
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

  function detectIntentAndDomain(message) {
    const text = String(message || '').toLowerCase();
    const domainRules = [
      { domain: 'business_idea', intent: 'idea_generation', keywords: ['idea', 'ideas', 'business idea', 'what business', 'what can i start', 'new idea', 'niche'] },
      { domain: 'startup', intent: 'startup_setup', keywords: ['startup', 'start a business', 'start business', 'launch business', 'new venture', 'mvp', 'how to start', 'validate'] },
      { domain: 'finance', intent: 'finance_optimization', keywords: ['finance', 'financial', 'money', 'income', 'expense', 'expenses', 'budget', 'cashflow', 'profit', 'savings', 'reduce expenses', 'cost', 'runway', 'burn'] },
      { domain: 'marketing', intent: 'marketing_execution', keywords: ['marketing', 'promote', 'promotion', 'advertising', 'audience', 'instagram', 'whatsapp', 'branding', 'content', 'campaign', 'positioning', 'messaging'] },
      { domain: 'growth', intent: 'growth_execution', keywords: ['growth', 'scale', 'scaling', 'customer acquisition', 'acquisition', 'retention', 'funnel', 'conversion', 'leads'] },
      { domain: 'product', intent: 'product_thinking', keywords: ['product', 'feature', 'roadmap', 'onboarding', 'ux', 'user feedback', 'churn'] },
      { domain: 'founder_mindset', intent: 'founder_mindset', keywords: ['mindset', 'focus', 'discipline', 'founder', 'motivation', 'overwhelm', 'confidence'] },
      { domain: 'templates', intent: 'business_templates', keywords: ['template', 'framework', 'checklist', 'canvas', 'business plan template'] },
      { domain: 'planning', intent: 'planning_execution', keywords: ['plan', 'planning', 'strategy', 'goals', 'milestone', 'decision', 'priorities', 'quarterly plan', '90-day'] }
    ];
    const matched = domainRules.find((rule) => rule.keywords.some((keyword) => text.includes(keyword)));
    return matched || { domain: 'general', intent: 'general_support' };
  }

  function getRecentUserContext(limit = 3) {
    const history = ensureArray(appState.aiChatHistory);
    return history
      .filter((item) => item && item.role === 'user' && item.text)
      .slice(-limit)
      .map((item) => String(item.text));
  }

  function pickRandomVariant(items, domain) {
    if (!Array.isArray(items) || !items.length) return null;
    const meta = ensureObject(appState.aiResponseMeta);
    const lastMap = ensureObject(meta.lastVariantByDomain);
    let index = Math.floor(Math.random() * items.length);
    const lastIndex = Number(lastMap[domain]);
    if (items.length > 1 && Number.isFinite(lastIndex) && index === lastIndex) {
      index = (index + 1 + Math.floor(Math.random() * (items.length - 1))) % items.length;
    }
    appState.aiResponseMeta = {
      lastDomain: domain,
      lastVariantByDomain: { ...lastMap, [domain]: index }
    };
    saveToStorage(STORAGE_KEYS.aiResponseMeta, appState.aiResponseMeta);
    return items[index];
  }

  function getUsefulResourcesForDomain(domain) {
    const resourceMap = {
      startup: ['Startup Guides', 'Lean Launch Canvas', 'Startup Readiness Check'],
      business_idea: ['Startup Guides', 'Lean Launch Canvas', 'Founder Workspace sections'],
      marketing: ['Marketing Campaign Block', 'Founder Workspace sections', 'Memory'],
      growth: ['Operations Roadmap', 'Founder Workspace sections', 'Memory'],
      finance: ['Business Plan Templates', 'Operations Roadmap', 'Founder Workspace sections'],
      planning: ['Business Plan Templates', 'Operations Roadmap', 'Lean Launch Canvas'],
      founder_mindset: ['Memory', 'Startup Readiness Check', 'Founder Workspace sections'],
      templates: ['Business Plan Templates', 'Lean Launch Canvas', 'Startup Guides'],
      product: ['Lean Launch Canvas', 'Founder Workspace sections', 'Memory'],
      general: ['Startup Guides', 'Founder Workspace sections', 'Memory']
    };
    const selected = resourceMap[domain] || resourceMap.general;
    return selected.slice(0, 3);
  }

  function buildStructuredReply(config, userMessage, contextSnippets, domain) {
    if (!config) return '';
    const contextLine = contextSnippets.length > 1
      ? `Based on your recent context: ${contextSnippets.slice(0, 2).join(' → ')}.`
      : '';
    const resources = getUsefulResourcesForDomain(domain);
    const parts = [
      `1. Clear Answer\n${config.clearAnswer}${contextLine ? ` ${contextLine}` : ''}`,
      `2. Why It Matters\n${config.whyItMatters}`,
      `3. Action Steps\n${config.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}`,
      `4. Useful Resources\n${resources.map((resource) => `- ${resource}`).join('\n')}`,
      `5. Founder Note\n${config.founderTip}`
    ];
    if (config.nextMove) {
      parts.push(`Next Move:\n${config.nextMove}`);
    }
    return parts.join('\n\n');
  }

  function generateResponse(message) {
    const userMessage = String(message || '').trim();
    const recentContext = getRecentUserContext(3);
    const totals = calculateTotals();
    const { domain } = detectIntentAndDomain(userMessage);
    const tooVague = userMessage.split(/\s+/).filter(Boolean).length < 3;
    if (!userMessage || tooVague) {
      return [
        '1. Clear Answer',
        'I can give you a founder-quality plan, but I need one clear business context first.',
        '',
        '2. Why It Matters',
        'Without a concrete context, advice becomes generic and hard to execute.',
        '',
        '3. Action Steps',
        '1. Share your domain: startup, marketing, growth, finance, product, or planning.',
        '2. Tell me your current stage: idea, early traction, or scaling.',
        '3. Add one hard target and deadline (example: 20 qualified leads in 30 days).',
        '',
        '4. Useful Resources',
        '- Startup Guides',
        '- Founder Workspace sections',
        '- Memory',
        '',
        '5. Founder Note',
        'The quality of your decision-making is proportional to the clarity of your constraints.',
        '',
        'Next Move:',
        'Reply with: "I run [business type], my goal is [metric], and my deadline is [date]."'
      ].join('\n');
    }

    const responseMap = {
      startup: [
        {
          clearAnswer: 'Start by narrowing to one painful customer problem, one target segment, and one minimal paid offer.',
          whyItMatters: 'Most early startups fail from broad scope and delayed validation, not from lack of ideas.',
          steps: ['Define the customer pain in one sentence and one segment.', 'Create a minimum offer you can sell this week.', 'Run 10 interviews and capture objections word-for-word.', 'Launch a paid pilot before expanding product scope.'],
          founderTip: 'Revenue is stronger validation than positive feedback.',
          nextMove: 'Ask me for a 14-day startup validation sprint tailored to your idea.'
        },
        {
          clearAnswer: 'Treat your launch as a controlled experiment with a strict timeline and measurable outcomes.',
          whyItMatters: 'Founders lose months polishing products before proving demand.',
          steps: ['Select one audience segment with urgent pain.', 'Write one clear promise and measurable result.', 'Test through a simple page plus direct outreach.', 'Review weekly signals and cut non-performing features quickly.'],
          founderTip: 'Speed to learning beats feature completeness.',
          nextMove: 'Ask for a launch scorecard to evaluate traction each week.'
        }
      ],
      marketing: [
        {
          clearAnswer: 'Choose one channel, one audience, and one conversion goal before creating more content.',
          whyItMatters: 'Marketing without focus creates activity, not pipeline.',
          steps: ['Pick your highest-probability channel for the next 30 days.', 'Build messaging around one painful customer outcome.', 'Publish proof-backed content 4 times weekly.', 'Track lead-to-call and call-to-close conversion weekly.'],
          founderTip: 'Distribution consistency is usually more important than content volume.',
          nextMove: 'Ask me for a 2-week content and outreach calendar.'
        },
        {
          clearAnswer: 'Improve growth by upgrading your message-market fit before increasing ad spend.',
          whyItMatters: 'Weak messaging inflates CAC and lowers conversion across every channel.',
          steps: ['List top five customer pains in their own words.', 'Turn each pain into a single offer angle.', 'Add one proof point in every campaign asset.', 'Retarget engaged non-buyers with objection-handling content.'],
          founderTip: 'If people do not understand your value in 10 seconds, they will not buy in 10 days.',
          nextMove: 'Ask me for conversion-focused messaging rewrites for your current offer.'
        }
      ],
      finance: [
        {
          clearAnswer: `Protect runway first: cut low-ROI spending and redirect cash toward revenue-generating activities. Current net savings: ${formatCurrency(totals.netSavings)}.`,
          whyItMatters: 'Cash constraints kill otherwise good businesses when decisions are delayed.',
          steps: ['Split expenses into must-have vs optional immediately.', 'Cut or pause the bottom 20% ROI tools and subscriptions.', 'Negotiate your top recurring costs this week.', 'Set category spending caps and review every Monday.'],
          founderTip: 'Runway buys time; time buys strategic options.',
          nextMove: 'Ask me for a 30-day cash preservation and revenue recovery plan.'
        },
        {
          clearAnswer: 'Build a simple operating finance system that drives weekly decisions, not monthly surprises.',
          whyItMatters: 'Founders who track only totals miss where profit is leaking.',
          steps: ['Set a weekly P&L review cadence.', 'Track revenue per major expense category.', 'Pause non-critical spend for 30 days.', 'Reinvest only where payback is measurable.'],
          founderTip: 'What you measure weekly, you can improve quarterly.',
          nextMove: 'Ask me for a founder-friendly budget tracker structure.'
        }
      ],
      growth: [
        {
          clearAnswer: 'Scale only the channel and offer combination that already converts profitably.',
          whyItMatters: 'Premature scaling amplifies inefficiencies and burns cash faster.',
          steps: ['Identify your strongest acquisition channel by conversion quality.', 'Improve landing page and sales conversion before adding budget.', 'Add one referral or partner loop for lower-cost growth.', 'Fix onboarding drop-offs to improve retention.'],
          founderTip: 'Retention is compounding growth, not a support function.',
          nextMove: 'Ask for a full-funnel diagnostic from click to retained customer.'
        },
        {
          clearAnswer: 'Build a repeatable growth engine by standardizing what works and testing one variable at a time.',
          whyItMatters: 'Unstructured experimentation creates noisy data and weak decisions.',
          steps: ['Document your current winning funnel stages.', 'Automate follow-ups on warm leads.', 'Run one controlled growth experiment per week.', 'Scale spend only after stable conversion for two cycles.'],
          founderTip: 'A 1% conversion gain can outperform a 30% budget increase.',
          nextMove: 'Ask me to design a 4-week experiment roadmap.'
        }
      ],
      product: [
        {
          clearAnswer: 'Prioritize product decisions based on user pain severity, frequency, and willingness to pay.',
          whyItMatters: 'Feature-heavy roadmaps without customer value increase churn and delivery waste.',
          steps: ['Rank top user pain points from interviews or support data.', 'Choose one problem for the next sprint.', 'Ship the smallest usable improvement fast.', 'Measure activation, retention, or conversion impact after release.'],
          founderTip: 'Roadmaps should follow customer pain, not internal preference.',
          nextMove: 'Ask me to build a product prioritization matrix for your backlog.'
        },
        {
          clearAnswer: 'Use a tight build-measure-learn loop to reduce product risk quickly.',
          whyItMatters: 'Slow feedback loops delay course corrections and waste engineering cycles.',
          steps: ['Define one success metric before building.', 'Release in small increments to real users.', 'Collect behavior plus qualitative feedback.', 'Decide to double down, iterate, or remove quickly.'],
          founderTip: 'The fastest learning loop usually wins the market.',
          nextMove: 'Ask for a weekly product decision review template.'
        }
      ],
      founder_mindset: [
        {
          clearAnswer: 'Operate like an investor in your own time: focus on high-leverage decisions and remove low-value work.',
          whyItMatters: 'Founder overwhelm is usually a prioritization failure, not a workload problem.',
          steps: ['Define your top business outcome for this quarter.', 'Schedule daily deep work for mission-critical tasks.', 'Delegate or eliminate low-leverage admin work.', 'Run a weekly founder review: wins, blockers, next priorities.'],
          founderTip: 'Discipline in prioritization is a competitive advantage.',
          nextMove: 'Ask for a founder operating system for weekly execution.'
        }
      ],
      templates: [
        {
          clearAnswer: 'Use decision templates to increase speed and consistency in execution.',
          whyItMatters: 'Founders often lose momentum recreating structure for repeat decisions.',
          steps: ['Pick one template: validation plan, marketing sprint, or budget review.', 'Customize it for your current stage and constraints.', 'Use it for one weekly cycle.', 'Refine based on what improved decision quality.'],
          founderTip: 'Templates reduce decision fatigue so you can focus on leverage.',
          nextMove: 'Ask me to generate a specific template for your business stage.'
        }
      ],
      planning: [
        {
          clearAnswer: 'Build a 90-day plan with one primary objective, three milestones, and weekly metrics.',
          whyItMatters: 'Founders with vague plans drift into reactive execution.',
          steps: ['Set one quarterly objective tied to revenue or growth.', 'Define three milestone outcomes.', 'Break milestones into weekly priorities.', 'Review performance every Friday and reallocate resources.'],
          founderTip: 'Strategic clarity is the antidote to busy but ineffective work.',
          nextMove: 'Ask me for a complete 90-day operating plan.'
        }
      ],
      business_idea: [
        {
          clearAnswer: 'Choose ideas by speed-to-validation and speed-to-cash, not by complexity.',
          whyItMatters: 'Great founders optimize for fast signal gathering before deep investment.',
          steps: ['Generate three ideas around one painful customer problem.', 'Score ideas by setup time, margin potential, and demand proof.', 'Pick one and test with direct outreach this week.', 'Run a paid micro-offer to validate real intent.'],
          founderTip: 'The best first business is the one that reaches paying users fastest.',
          nextMove: 'Ask for idea options based on your skills, budget, and available time.'
        },
        {
          clearAnswer: 'Use a structured idea filter so you pursue opportunities with strong market pull.',
          whyItMatters: 'Most idea failure comes from selecting based on excitement instead of demand.',
          steps: ['Write five problem-solution ideas in one page.', 'Rate each on demand, margin, and delivery feasibility.', 'Test top two offers with real prospects.', 'Keep only the idea with strongest paid traction.'],
          founderTip: 'Paid intent is a stronger signal than compliments.',
          nextMove: 'Ask me for a plug-and-play idea scoring sheet.'
        }
      ],
      general: [
        {
          clearAnswer: 'I can help you make practical business decisions across startup planning, growth, marketing, finance, product, and execution.',
          whyItMatters: 'Structured decisions reduce confusion and accelerate founder progress.',
          steps: ['State your current challenge in one sentence.', 'Add your stage and available resources.', 'Define one measurable result and timeline.', 'Pick one domain so we create a focused plan.'],
          founderTip: 'General questions create general answers; precise inputs create strategic outputs.',
          nextMove: 'Ask a specific question like: "How do I acquire 20 qualified leads in 30 days?"'
        }
      ]
    };

    const selected = pickRandomVariant(responseMap[domain] || responseMap.general, domain);
    return buildStructuredReply(selected, userMessage, recentContext, domain);
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
      if (status) status.textContent = 'Select a template before requesting an AI suggestion.';
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
    if (status) status.textContent = `AI suggestion generated for ${section.title}. Prompt used: ${aiPrompt}`;
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
          const roleClass = item.role === 'user'
            ? 'workspace-minimal-card border-slate-300 bg-white'
            : 'workspace-minimal-card border-blue-100 bg-blue-50';
          const prefix = item.role === 'user' ? 'You' : 'Barya AI';
          return `<div class="rounded-xl border ${roleClass} p-3"><p class="text-xs text-slate-500">${prefix}</p><p class="mt-1 text-sm text-slate-800 whitespace-pre-line">${item.text}</p></div>`;
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
        ? appState.businessAdvisorHistory.slice(0, 5).map((entry) => `<li class="workspace-minimal-card rounded-xl p-3"><span class="text-slate-500">Q:</span> ${entry.question}<br><span class="text-slate-500">A:</span> ${entry.advice}</li>`).join('')
        : '<li class="text-slate-400">No advisor history yet.</li>';
    }
  }

  function generateBusinessAdvice(prompt) {
    const challengeType = analyzeChallenge(prompt);
    const lowerPrompt = String(prompt || '').toLowerCase();
    const totals = calculateTotals();
    const formatAdvice = (content) => [
      `1. Clear Advice\n${content.clearAdvice}`,
      `2. Why This Matters\n${content.whyThisMatters}`,
      `3. Action Steps\n${content.actionSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}`,
      `4. Resource Suggestions\n${content.resourceSuggestions.map((item) => `- ${item}`).join('\n')}`,
      `5. Founder Note\n${content.founderNote}`
    ].join('\n\n');

    const challengeAdviceMap = {
      finance: {
        clearAdvice: 'You do not need a website to start. Focus on validation before spending money.',
        whyThisMatters: `Early spending without proof of demand increases risk and shortens runway. Your current net savings is ${formatCurrency(totals.netSavings)}, so every dollar should be tied to customer learning or sales.`,
        actionSteps: [
          'Use free tools like Instagram, WhatsApp, or Google Forms.',
          'Create a simple offer and share it manually with your target audience.',
          'Talk directly to at least 10 potential customers and capture objections.',
          'Validate demand with pre-orders, deposits, or paid pilots before investing in tools.'
        ],
        resourceSuggestions: ['Startup Guide: Validate Idea', 'Template: Lean Launch Canvas', 'Founder Workspace: Budget Review'],
        founderNote: 'Spending money early is not required. Clarity and validation matter more.'
      },
      idea: {
        clearAdvice: 'Start with one clear customer pain, not a random business concept.',
        whyThisMatters: 'Strong ideas come from specific, repeated customer frustrations and willingness to pay for a solution.',
        actionSteps: [
          'List 3 customer groups you understand well.',
          'For each group, write the top 3 urgent problems they already spend time or money on.',
          'Choose one problem with clear pain and propose a simple paid solution.',
          'Test interest by pitching that offer to real people this week.'
        ],
        resourceSuggestions: ['Startup Guide: Problem Discovery', 'Template: Lean Launch Canvas', 'Idea Generator'],
        founderNote: 'A practical idea tested with real buyers beats a perfect idea kept in your head.'
      },
      startup: {
        clearAdvice: 'Start lean: define the problem, test one small offer, and collect real customer feedback fast.',
        whyThisMatters: 'Most founders fail at the start by building too much before validating demand.',
        actionSteps: [
          'Define your target customer and their top painful problem in one sentence.',
          'Create a minimum offer you can deliver manually this week.',
          'Get 10 direct conversations and ask for paid commitment where possible.',
          'Improve the offer based on objections before expanding operations.'
        ],
        resourceSuggestions: ['Startup Guide: Getting Started', 'Startup Readiness Check', 'Template: Lean Launch Canvas'],
        founderNote: 'Momentum comes from fast learning cycles, not from perfect planning.'
      },
      growth: {
        clearAdvice: 'Scale only what is already working and fix bottlenecks before increasing spend.',
        whyThisMatters: 'Growth without process control increases costs and creates operational chaos.',
        actionSteps: [
          'Identify your best-performing channel by lead quality and conversion.',
          'Improve conversion at each funnel step before adding more traffic.',
          'Strengthen onboarding and retention to increase lifetime value.',
          'Run one growth experiment weekly and document results.'
        ],
        resourceSuggestions: ['Operations Roadmap', 'Founder Workspace: Metrics', 'Template: Growth Experiment Tracker'],
        founderNote: 'Sustainable growth is system-driven, not campaign-driven.'
      },
      marketing: {
        clearAdvice: 'Focus on one audience, one channel, and one clear message tied to a customer outcome.',
        whyThisMatters: 'Scattered marketing efforts create noise, while focused positioning improves conversions.',
        actionSteps: [
          'Choose your primary channel for the next 30 days.',
          'Write a single offer message that solves one urgent problem.',
          'Publish proof-based content 3-4 times weekly with one CTA.',
          'Track lead quality, conversion rate, and cost per result each week.'
        ],
        resourceSuggestions: ['Template: Marketing Sprint', 'Founder Workspace: Offer Positioning', 'Resource: Content Planning Guide'],
        founderNote: 'Consistency with the right message beats posting everywhere.'
      },
      strategy: {
        clearAdvice: 'Reduce confusion by making one strategic decision at a time with clear criteria.',
        whyThisMatters: 'Unclear strategy leads to reactive actions, wasted effort, and slow progress.',
        actionSteps: [
          'Define your single top goal for the next 30-90 days.',
          'List 2-3 options and score them by impact, effort, and risk.',
          'Pick one direction and commit resources for a fixed test window.',
          'Review results weekly and adjust only based on evidence.'
        ],
        resourceSuggestions: ['Template: Decision Matrix', 'Founder Workspace: Quarterly Plan', 'Memory: Key Learnings'],
        founderNote: 'Clarity is built through decisions and evidence, not through overthinking.'
      }
    };

    if (challengeType === 'general') {
      return 'Can you describe your challenge more specifically?';
    }

    if (challengeType === 'finance' && /website|site|landing page/.test(lowerPrompt)) {
      return formatAdvice(challengeAdviceMap.finance);
    }

    return formatAdvice(challengeAdviceMap[challengeType]);
  }

  function analyzeChallenge(input) {
    const message = String(input || '').toLowerCase().trim();
    if (!message) return 'general';

    const hasAny = (keywords) => keywords.some((word) => message.includes(word));

    if (hasAny(['no money', 'no budget', "can't afford", 'cannot afford', 'too expensive', 'budget issue'])) {
      return 'finance';
    }
    if (hasAny(['no idea', "don't know what business", 'what should i start', 'which business idea', 'idea nhi', 'idea nahi'])) {
      return 'idea';
    }
    if (hasAny(['how to start', 'starting problem', 'start business', 'just starting', 'beginning stage', 'where to start'])) {
      return 'startup';
    }
    if (hasAny(['not growing', 'slow growth', 'scale', 'scaling', 'plateau', 'stuck in growth', 'increase revenue'])) {
      return 'growth';
    }
    if (hasAny(['marketing', 'ads', 'facebook ads', 'instagram ads', 'lead generation', 'traffic', 'promotion'])) {
      return 'marketing';
    }
    if (hasAny(['confused', 'unclear', 'not sure', 'strategy', 'direction', 'what should i do first'])) {
      return 'strategy';
    }

    if (message.split(/\s+/).length < 3) return 'general';

    return 'general';
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
        <li data-memory-id="${escapeHTML(item.id)}" class="memory-item">
          <p class="text-xs uppercase tracking-[0.16em] text-slate-500">${escapeHTML(item.type || 'General')}</p>
          <p class="text-sm text-slate-700 mt-1">${escapeHTML(item.note || '')}</p>
        </li>
      `).join('')
      : '<li class="memory-empty-state">No saved strategies yet.</li>';
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
          <p class="text-xs text-slate-500 mt-2">Use case: ${template.useCase}</p>
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

    header.textContent = selectedTemplate.title;
    if (helper) helper.textContent = selectedTemplate.description;
    status.textContent = 'Edit any box below. Your inputs stay editable and save locally.';
    const aiMap = appState.businessPlan.aiGenerated[selectedTemplate.id] || {};
    form.innerHTML = selectedTemplate.sections.map((section) => `
      <label class="template-editor-block rounded-2xl p-5 flex flex-col gap-3">
        <span class="flex items-center justify-between gap-2">
          <span class="text-xs uppercase tracking-[0.18em] text-slate-400">${section.title}</span>
          <button type="button" class="founder-btn ai-magic-btn" data-ai-section="${section.id}">Generate Suggestion</button>
        </span>
        <p class="text-xs text-slate-500">${section.helper || 'Add clear, practical details for this section.'}</p>
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

  function isGuideStepCompleted(guideId, stepId) {
    return Boolean(appState.startupGuideProgress?.[`${guideId}:${stepId}`]);
  }

  function toggleGuideStep(guideId, stepId, completed) {
    if (!guideId || !stepId) return;
    appState.startupGuideProgress[`${guideId}:${stepId}`] = Boolean(completed);
    saveStartupGuideProgress();
    renderStartupLearningGuides();
  }

  function runGuideAction(actionPayload = {}) {
    const actionType = actionPayload.actionType;
    if (!actionType) return;

    if (actionType === 'add_task') {
      addTask(actionPayload.step || 'Guide action step', 'roadmap');
      setStatusText('taskRoadmapStatus', 'Learning step added to your Task Manager.', 'success');
      return;
    }
    if (actionType === 'open_strategy') {
      showMainApp({ tab: 'strategy', rememberStart: true });
      const chatInput = $('chatInput');
      if (chatInput && actionPayload.prompt) {
        chatInput.value = actionPayload.prompt;
        chatInput.focus();
      }
      return;
    }
    if (actionType === 'open_idea_generator') {
      showMainApp({ tab: 'strategy', rememberStart: true });
      const ideaInput = $('ideaGeneratorInput');
      if (ideaInput) ideaInput.focus();
      return;
    }
    if (actionType === 'open_memory') {
      showMainApp({ tab: 'memory', rememberStart: true });
      $('memoryInput')?.focus();
      return;
    }
    if (actionType === 'open_template') {
      showMainApp({ tab: 'planning', rememberStart: true });
      setPlanningSection('templates');
      if (actionPayload.templateId) selectBusinessTemplate(actionPayload.templateId);
      document.getElementById('businessPlanning')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (actionType === 'open_tab') {
      showMainApp({ tab: actionPayload.tab || 'dashboard', rememberStart: true });
    }
  }


  function renderStartupLearningGuides() {
    const container = $('whenNotToStartGuide');
    if (!container) return;
    const guideMarkup = STARTUP_GUIDES.map((guide, guideIndex) => `
      <article class="learning-card" id="guide-${guide.id}">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Core Guide ${guideIndex + 1}</p>
        <h2 class="text-2xl font-semibold mt-1">${highlightBusinessTerms(guide.title)}</h2>

        <div class="mt-4">
          <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Introduction</p>
          <p class="text-sm text-slate-600 mt-2 leading-relaxed">${highlightBusinessTerms(guide.introduction)}</p>
        </div>

        <div class="mt-5">
          <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Key Concepts</p>
          <ul class="mt-2 text-sm text-slate-600 leading-relaxed space-y-2">
            ${guide.keyConcepts.map((concept) => `<li>• ${highlightBusinessTerms(concept)}</li>`).join('')}
          </ul>
        </div>

        <div class="warning-box mt-5">
          <p class="text-xs uppercase tracking-[0.16em] text-amber-700 font-semibold">Warning Signs</p>
          <ul class="mt-2 text-sm text-amber-900 leading-relaxed space-y-2">
            ${guide.warningSigns.map((warning) => `<li>• ${highlightBusinessTerms(warning)}</li>`).join('')}
          </ul>
        </div>

        <div class="action-box mt-5">
          <p class="text-xs uppercase tracking-[0.16em] text-sky-700 font-semibold">Action Steps</p>
          <ol class="mt-2 text-sm text-sky-900 leading-relaxed space-y-2 list-decimal pl-5">
            ${guide.actionSteps.map((step) => `<li>${highlightBusinessTerms(step)}</li>`).join('')}
          </ol>
        </div>

        <div class="mt-5">
          <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Founder Insights</p>
          <ul class="mt-2 text-sm text-slate-600 leading-relaxed space-y-2">
            ${guide.founderInsights.map((insight) => `<li>• ${highlightBusinessTerms(insight)}</li>`).join('')}
          </ul>
        </div>

        <div class="mt-6 border-t border-slate-200 pt-5">
          <div class="flex items-center justify-between gap-2">
            <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Action Sprint</p>
            <p class="text-xs text-slate-500">${guide.executionPlan.filter((step) => isGuideStepCompleted(guide.id, step.id)).length}/${guide.executionPlan.length} steps completed</p>
          </div>
          <p class="text-sm text-slate-600 mt-2">Do these steps inside the app to convert learning into progress.</p>
          <div class="mt-3 space-y-3">
            ${guide.executionPlan.map((step, index) => `
              <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div class="flex items-start gap-2">
                  <input type="checkbox" data-guide-step-toggle="true" data-guide-id="${guide.id}" data-step-id="${step.id}" ${isGuideStepCompleted(guide.id, step.id) ? 'checked' : ''} class="mt-1 h-4 w-4" />
                  <div class="flex-1">
                    <p class="text-xs uppercase tracking-[0.15em] text-slate-500">Sprint Step ${index + 1}</p>
                    <p class="text-sm text-slate-700 mt-1">${highlightBusinessTerms(step.step)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  class="founder-btn mt-3"
                  data-guide-action="true"
                  data-guide-action-payload="${escapeHTML(JSON.stringify({ ...step, guideId: guide.id }))}"
                >
                  ${escapeHTML(step.toolLabel)}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </article>
    `).join('');

    container.innerHTML = guideMarkup;
  }

  function applySettings() {
    const languageSelect = $('languageSelect');
    const settingsLanguageSelect = $('settingsLanguageSelect');
    const currencySelect = $('currencySelect');
    const goalInput = $('goalInput');
    const founderNameInput = $('founderNameInput');
    const businessTypeInput = $('businessTypeInput');
    const founderStageInput = $('founderStageInput');
    const audienceInput = $('audienceInput');
    const preferenceInput = $('preferenceInput');
    const goalTimelineInput = $('goalTimelineInput');
    const priorityFocusInput = $('priorityFocusInput');
    const responseStyleSelect = $('responseStyleSelect');
    const focusModeSelect = $('focusModeSelect');
    const buildingInput = $('buildingInput');
    const revenueStageInput = $('revenueStageInput');
    const biggestChallengeInput = $('biggestChallengeInput');
    const learningLevelSelect = $('learningLevelSelect');
    const showSuggestionsToggle = $('showSuggestionsToggle');

    if (languageSelect) languageSelect.value = appState.settings.language;
    if (settingsLanguageSelect) settingsLanguageSelect.value = appState.settings.language;
    if (currencySelect) currencySelect.value = appState.settings.currency;
    if (goalInput) goalInput.value = appState.settings.goal || '';
    if (founderNameInput) founderNameInput.value = appState.profile.name || '';
    if (businessTypeInput) businessTypeInput.value = appState.profile.businessType || '';
    if (founderStageInput) founderStageInput.value = appState.profile.stage || '';
    if (audienceInput) audienceInput.value = appState.profile.audience || '';
    if (preferenceInput) preferenceInput.value = appState.profile.preference || '';
    if (goalTimelineInput) goalTimelineInput.value = appState.goalDirection.timeline || '';
    if (priorityFocusInput) priorityFocusInput.value = appState.goalDirection.priorityFocus || '';
    if (responseStyleSelect) responseStyleSelect.value = appState.aiBehavior.responseStyle || 'structured';
    if (focusModeSelect) focusModeSelect.value = appState.aiBehavior.focusMode || 'startup';
    if (buildingInput) buildingInput.value = appState.businessContext.building || '';
    if (revenueStageInput) revenueStageInput.value = appState.businessContext.revenueStage || '';
    if (biggestChallengeInput) biggestChallengeInput.value = appState.businessContext.biggestChallenge || '';
    if (learningLevelSelect) learningLevelSelect.value = appState.learningPreferences.level || 'beginner';
    if (showSuggestionsToggle) showSuggestionsToggle.checked = Boolean(appState.learningPreferences.showSuggestions);
    setLanguage(appState.settings.language);

    renderDashboard();
    renderAIChat();
    renderResources();
  }


  function setActiveTab(tabName) {
    if (!tabName) return;
    const tabButtons = document.querySelectorAll('[data-tab]');
    document.querySelectorAll('.panel').forEach((panel) => panel.classList.add('hidden'));
    tabButtons.forEach((btn) => btn.classList.remove('active'));

    let target = document.getElementById(`panel-${tabName}`);
    if (!target) {
      tabName = 'dashboard';
      target = document.getElementById('panel-dashboard');
    }
    if (target) {
      target.classList.remove('hidden');
      target.classList.remove('fade-in');
      requestAnimationFrame(() => target.classList.add('fade-in'));
    }
    document.querySelectorAll(`[data-tab="${tabName}"]`).forEach((button) => {
      button.classList.add('active');
    });

    if (tabName === 'planning') {
      renderBusinessPlanTemplates();
      renderBusinessPlanEditor();
      renderStartupLearningGuides();
    }
    if (tabName === 'memory') {
      renderMemoryEntries();
      renderActivityLog();
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

  function toggleWelcomeModal(isVisible) {
    const welcomeModal = $('welcomeModal');
    if (!welcomeModal) return;
    welcomeModal.classList.toggle('hidden', !isVisible);
  }

  function showPublicPage(pageName = 'home') {
    const pages = document.querySelectorAll('[data-public-page]');
    pages.forEach((page) => {
      const isActive = page.getAttribute('data-public-page') === pageName;
      if (isActive) {
        page.removeAttribute('hidden');
      } else {
        page.setAttribute('hidden', 'hidden');
      }
    });
  }

  function initPublicNavigation() {
    document.querySelectorAll('[data-public-nav]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const pageName = link.getAttribute('data-public-nav');
        if (!pageName) return;
        event.preventDefault();
        showPublicPage(pageName);
        if (window.location.hash !== `#${pageName}`) {
          history.replaceState(null, '', `#${pageName}`);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    const hashPage = window.location.hash.replace('#', '').trim();
    const validPages = new Set(['home', 'features', 'pricing', 'blog', 'feedback', 'contact', 'privacy', 'terms']);
    showPublicPage(validPages.has(hashPage) ? hashPage : 'home');
  }


  function initMagicPreview() {
    const form = $('magicPreviewForm');
    const input = $('magicPreviewInput');
    const result = $('magicPreviewResult');
    const status = $('magicPreviewStatus');
    const output = $('magicPreviewOutput');
    const cta = $('magicPreviewCta');
    if (!form || !input || !result || !status || !output || !cta) return;

    let scanningTimeoutId = null;
    let typewriterTimeoutId = null;

    const clearTimers = () => {
      if (scanningTimeoutId) {
        clearTimeout(scanningTimeoutId);
        scanningTimeoutId = null;
      }
      if (typewriterTimeoutId) {
        clearTimeout(typewriterTimeoutId);
        typewriterTimeoutId = null;
      }
    };

    const buildBlueprint = (idea) => {
      const cleaned = idea || 'your startup concept';
      return [
        'The Edge:',
        `Position ${cleaned} as the fastest way for a specific niche to get one measurable outcome in under 10 minutes.`,
        '',
        'The First $1,000:',
        '1) Offer a focused launch package to 10 warm leads and ask for paid pilot commitments.',
        '2) Publish one proof-driven landing page with a clear CTA and collect deposits or pre-orders.',
        '3) Run a 7-day outreach sprint (DM + email) and close your first 3 customers with urgency-based onboarding.',
        '',
        'The Tech Stack:',
        '• Notion (operating system + SOP hub)',
        '• Framer (high-converting landing page)',
        '• Stripe (payments + simple checkout)'
      ].join('\n');
    };

    const typeWriter = (text) => {
      output.textContent = '';
      output.classList.remove('hidden');
      output.classList.add('typing');
      cta.classList.remove('is-visible');
      let index = 0;
      const tick = () => {
        output.textContent = text.slice(0, index);
        index += 1;
        if (index <= text.length) {
          typewriterTimeoutId = setTimeout(tick, 14);
          return;
        }
        output.classList.remove('typing');
        cta.classList.add('is-visible');
      };
      tick();
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const idea = input.value.trim();
      if (!idea) {
        input.focus();
        return;
      }
      clearTimers();
      result.classList.remove('hidden');
      status.classList.remove('hidden');
      output.classList.add('hidden');
      cta.classList.remove('is-visible');
      const strategyCard = buildBlueprint(idea);
      scanningTimeoutId = setTimeout(() => {
        status.classList.add('hidden');
        typeWriter(strategyCard);
      }, 2000);
    });
  }

  function initPublicForms() {
    const contactForm = $('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const contactName = $('contactName')?.value?.trim();
        const contactEmail = $('contactEmail')?.value?.trim();
        const contactMessage = $('contactMessage')?.value?.trim();
        const contactStatus = $('contactStatus');
        if (!contactName || !contactEmail || !contactMessage) return;

        const savedMessages = ensureArray(loadFromStorage(STORAGE_KEYS.contactMessages, []));
        savedMessages.unshift({
          id: createId(),
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          createdAt: new Date().toISOString()
        });
        saveToStorage(STORAGE_KEYS.contactMessages, savedMessages.slice(0, 250));

        contactForm.reset();
        if (contactStatus) {
          contactStatus.textContent = 'Thank you! Your message has been saved. We will respond within 24-48 hours.';
        }
      });
    }

    const feedbackForm = $('feedbackForm');
    if (feedbackForm) {
      feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const feedbackName = $('feedbackName')?.value?.trim();
        const feedbackCategory = $('feedbackCategory')?.value || 'General Feedback';
        const feedbackRating = Number(document.querySelector('input[name="feedbackRating"]:checked')?.value);
        const feedbackMessage = $('feedbackMessage')?.value?.trim();
        const feedbackStatus = $('feedbackStatus');
        if (!feedbackMessage || !Number.isFinite(feedbackRating) || feedbackRating < 1 || feedbackRating > 5) {
          if (feedbackStatus) {
            feedbackStatus.textContent = 'Please add a rating (1-5) and feedback message before submitting.';
          }
          return;
        }
        const saved = ensureArray(loadFromStorage(STORAGE_KEYS.feedbackEntries, []));
        saved.unshift({
          id: createId(),
          name: feedbackName || 'Anonymous',
          category: feedbackCategory,
          rating: feedbackRating,
          message: feedbackMessage,
          createdAt: new Date().toISOString()
        });
        saveToStorage(STORAGE_KEYS.feedbackEntries, saved.slice(0, 100));
        feedbackForm.reset();
        if (feedbackStatus) {
          feedbackStatus.textContent = 'Thanks! Your feedback was saved locally on this device.';
        }
      });
    }
  }

  function initTabs() {
    const tabButtons = document.querySelectorAll('[data-tab]');
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
        panelSelector: '#monthlyOverviewCard'
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

    const profileForm = $('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        appState.profile = {
          name: $('founderNameInput')?.value?.trim() || '',
          businessType: $('businessTypeInput')?.value?.trim() || '',
          stage: $('founderStageInput')?.value?.trim() || '',
          audience: $('audienceInput')?.value?.trim() || '',
          preference: $('preferenceInput')?.value?.trim() || ''
        };
        if (appState.profile.businessType) saveToStorage(STORAGE_KEYS.businessCategory, appState.profile.businessType);
        saveToStorage(STORAGE_KEYS.profile, appState.profile);
      });
    }

    const saveSettingsBtn = $('saveSettingsBtn');
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', (event) => {
        event.preventDefault();
        appState.settings.currency = $('currencySelect')?.value || appState.settings.currency;
        appState.settings.language = $('settingsLanguageSelect')?.value || appState.settings.language;
        saveSettings();
        saveToStorage(STORAGE_KEYS.workspacePreferences, {
          currency: appState.settings.currency,
          language: appState.settings.language
        });
        applySettings();
      });
    }

    const saveGoalBtn = $('saveGoalBtn');
    if (saveGoalBtn) {
      saveGoalBtn.addEventListener('click', (event) => {
        event.preventDefault();
        appState.settings.goal = $('goalInput')?.value?.trim() || '';
        saveSettings();
      });
    }
    const resetWorkspaceBtn = $('resetWorkspaceBtn');
    if (resetWorkspaceBtn) {
      resetWorkspaceBtn.addEventListener('click', () => {
        const confirmed = window.confirm('Reset the workspace? This clears all locally saved Barya data.');
        if (!confirmed) return;
        StorageService.keys()
          .filter((key) => key.startsWith('barya_'))
          .forEach((key) => localStorage.removeItem(key));
        window.location.reload();
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

    const handleEnterWorkspace = (event) => {
      event.preventDefault();
      clearGuidedFocus();
      const hasStarted = StorageService.getItem(STORAGE_KEYS.userStarted, 'false') === 'true';
      if (hasStarted) {
        showMainApp({ tab: 'dashboard', rememberStart: true });
        return;
      }
      toggleWelcomeModal(true);
    };
    document.querySelectorAll('[data-enter-app]').forEach((button) => {
      button.addEventListener('click', handleEnterWorkspace);
    });
    const loadSampleStartupBtn = $('loadSampleStartupBtn');
    if (loadSampleStartupBtn) {
      loadSampleStartupBtn.addEventListener('click', () => {
        appState.sampleDashboardMode = true;
        toggleWelcomeModal(false);
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

    const learningGuidesContainer = $('whenNotToStartGuide');
    if (learningGuidesContainer) {
      learningGuidesContainer.addEventListener('change', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') return;
        if (target.getAttribute('data-guide-step-toggle') !== 'true') return;
        const guideId = target.getAttribute('data-guide-id') || '';
        const stepId = target.getAttribute('data-step-id') || '';
        toggleGuideStep(guideId, stepId, target.checked);
      });

      learningGuidesContainer.addEventListener('click', (event) => {
        const actionButton = event.target.closest('[data-guide-action="true"]');
        if (!actionButton) return;
        const payloadRaw = actionButton.getAttribute('data-guide-action-payload') || '{}';
        try {
          const payload = JSON.parse(payloadRaw);
          runGuideAction(payload);
        } catch {
          setStatusText('taskRoadmapStatus', 'Could not open learning action. Please try again.', 'error');
        }
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
    appState.aiResponseMeta = {
      lastDomain: 'general',
      lastVariantByDomain: {},
      ...ensureObject(loadFromStorage(STORAGE_KEYS.aiResponseMeta, {}))
    };
    appState.businessAdvisorHistory = ensureArray(loadFromStorage(STORAGE_KEYS.businessAdvisorHistory, []));
    appState.ideaGeneratorHistory = ensureArray(loadFromStorage(STORAGE_KEYS.ideaGeneratorHistory, []));
    const legacyProfile = ensureObject(loadFromStorage(STORAGE_KEYS.profile, {}));
    const founderProfile = ensureObject(loadFromStorage(STORAGE_KEYS.founderProfile, {}));
    appState.profile = {
      name: '',
      businessType: '',
      stage: '',
      audience: '',
      preference: '',
      ...legacyProfile,
      ...founderProfile
    };
    appState.goalDirection = {
      currentGoal: appState.settings.goal || '',
      timeline: '',
      priorityFocus: '',
      ...ensureObject(loadFromStorage(STORAGE_KEYS.goalDirection, {}))
    };
    appState.aiBehavior = {
      responseStyle: 'structured',
      focusMode: 'startup',
      ...ensureObject(loadFromStorage(STORAGE_KEYS.aiBehaviorSettings, {}))
    };
    appState.businessContext = {
      building: '',
      revenueStage: '',
      biggestChallenge: '',
      ...ensureObject(loadFromStorage(STORAGE_KEYS.businessContext, {}))
    };
    appState.learningPreferences = {
      level: 'beginner',
      showSuggestions: true,
      ...ensureObject(loadFromStorage(STORAGE_KEYS.learningPreferences, {}))
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
    appState.startupGuideProgress = loadStartupGuideProgress();
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
    initPublicNavigation();
    initPublicForms();
    initMagicPreview();
    initControls();
    applySettings();
    renderDashboard();
    renderAIChat();
    renderBusinessAdvisor();
    renderIdeaGenerator();
    renderMemoryEntries();
    renderBusinessPlanTemplates();
    renderBusinessPlanEditor();
    renderStartupLearningGuides();
    setPlanningSection('guides');
    applyTheme(StorageService.getItem(STORAGE_KEYS.theme, 'light') || 'light');
    window.exportToPDF = exportToPDF;
    window.globalSearch = globalSearch;
    window.setLanguage = setLanguage;
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
