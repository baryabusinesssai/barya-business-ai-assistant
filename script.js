// Finance Data Logic
const STORAGE_KEYS = {
    finance: 'barya_finance',
    goal: 'barya_goal'
};

let financeData = loadFinanceData();
let userGoal = localStorage.getItem(STORAGE_KEYS.goal) || '';

const elements = {};
const phrases = [
    'How do I save ₹5000?',
    'Start a business today.',
    'Get AI business advice.',
    'Track your expenses.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimer = null;
let hasAskedAI = false;

window.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    bindEvents();
    updateDashboard();
    updateGoalUI();
    typeAnimation();
});

function cacheElements() {
    elements.modal = document.getElementById('beginner-modal');
    elements.goalBadge = document.getElementById('user-goal-badge');
    elements.typingText = document.getElementById('typing-text');
    elements.mainApp = document.getElementById('main-app');
    elements.amountInput = document.getElementById('input-amount');
    elements.typeSelect = document.getElementById('input-type');
    elements.income = document.getElementById('display-income');
    elements.expense = document.getElementById('display-expense');
    elements.savings = document.getElementById('display-savings');
    elements.insights = document.getElementById('insights-container');
    elements.flowGuide = document.getElementById('flow-guide');
    elements.chatInput = document.getElementById('chat-input');
    elements.chatBox = document.getElementById('chat-box');
    elements.ideaDisplay = document.getElementById('idea-display');
    elements.planOutput = document.getElementById('plan-output');
}

function bindEvents() {
    elements.chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            askAI();
        }
    });

    elements.amountInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTransaction();
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && typingTimer) {
            clearTimeout(typingTimer);
            typingTimer = null;
        } else if (!document.hidden && !typingTimer) {
            typeAnimation();
        }
    });
}

function loadFinanceData() {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS.finance));
        if (!parsed || typeof parsed !== 'object') {
            return { income: 0, expense: 0 };
        }

        return {
            income: Number.isFinite(Number(parsed.income)) ? Math.max(0, Number(parsed.income)) : 0,
            expense: Number.isFinite(Number(parsed.expense)) ? Math.max(0, Number(parsed.expense)) : 0
        };
    } catch (error) {
        return { income: 0, expense: 0 };
    }
}

function saveFinanceData() {
    localStorage.setItem(STORAGE_KEYS.finance, JSON.stringify(financeData));
}

function updateGoalUI() {
    if (!userGoal) {
        elements.modal.style.display = 'flex';
        elements.goalBadge.innerText = 'Goal: Not Set';
        return;
    }

    elements.modal.style.display = 'none';
    elements.goalBadge.innerText = `Goal: ${userGoal}`;
}

// Set User Goal
function setGoal(goal) {
    userGoal = goal;
    localStorage.setItem(STORAGE_KEYS.goal, goal);
    updateGoalUI();
    renderFlowGuidance();
    updateDashboard();
}

// Typing Animation for Hero
function typeAnimation() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        charIndex -= 1;
    } else {
        charIndex += 1;
    }

    elements.typingText.textContent = currentPhrase.slice(0, Math.max(0, charIndex));

    if (!isDeleting && charIndex >= currentPhrase.length) {
        isDeleting = true;
        typingTimer = setTimeout(typeAnimation, 1600);
        return;
    }

    if (isDeleting && charIndex <= 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    typingTimer = setTimeout(typeAnimation, isDeleting ? 55 : 100);
}

// Tab System
function showTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach((tab) => tab.classList.remove('active'));
    document.querySelectorAll('.side-link').forEach((link) => link.classList.remove('active'));
    const targetTab = document.getElementById(tabId);
    if (!targetTab) {
        return;
    }

    targetTab.classList.add('active');
    const targetButton = btn || document.querySelector(`.side-link[data-tab="${tabId}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }
}

function scrollToApp() {
    elements.mainApp.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0
    }).format(value);
}

// Budget Tracker
function addTransaction() {
    const amount = Number.parseFloat(elements.amountInput.value);
    const type = elements.typeSelect.value;

    if (!Number.isFinite(amount) || amount <= 0) {
        alert('Please enter a valid amount greater than 0.');
        elements.amountInput.focus();
        return;
    }

    if (type === 'income') {
        financeData.income += amount;
    } else {
        financeData.expense += amount;
    }

    saveFinanceData();
    updateDashboard();
    elements.amountInput.value = '';
    elements.amountInput.focus();
}

function updateDashboard() {
    elements.income.innerText = `₹${formatCurrency(financeData.income)}`;
    elements.expense.innerText = `₹${formatCurrency(financeData.expense)}`;

    const savings = financeData.income - financeData.expense;
    elements.savings.innerText = `₹${formatCurrency(savings)}`;

    if (financeData.income === 0 && financeData.expense === 0) {
        elements.insights.textContent = 'Add your first income or expense entry to receive tailored insights.';
        renderFlowGuidance();
        return;
    }

    if (financeData.expense > financeData.income * 0.8) {
        elements.insights.textContent = '⚠️ Expenses are high compared to income. Review non-essential spending this week.';
        renderFlowGuidance();
        return;
    }

    if (savings > 0) {
        const suggestedInvestment = Math.round(savings * 0.3);
        elements.insights.textContent = `✅ Good progress. You could consider investing ₹${formatCurrency(suggestedInvestment)} this month.`;
        renderFlowGuidance();
        return;
    }

    elements.insights.textContent = 'You are currently spending more than you earn. Start with small cuts and add one extra income source.';
    renderFlowGuidance();
}

function appendMessage(content, type = 'ai') {
    const message = document.createElement('div');

    if (type === 'user') {
        message.className = 'user-msg';
        message.textContent = content;
    } else {
        message.className = 'ai-msg';
        message.textContent = content;
    }

    elements.chatBox.appendChild(message);
    elements.chatBox.scrollTop = elements.chatBox.scrollHeight;
}

// AI Chat Simple Logic
function askAI() {
    const question = elements.chatInput.value.trim();
    if (!question) {
        return;
    }

    appendMessage(question, 'user');
    hasAskedAI = true;

    const normalizedQuestion = question.toLowerCase();
    const activeGoal = userGoal || 'financial growth';

    let response = `That's a great question. Based on your ${activeGoal} goal, focus on one measurable improvement this week.`;
    if (normalizedQuestion.includes('save')) {
        response = `Try the 50/30/20 rule and automate a small transfer right after you receive income (current income tracked: ₹${formatCurrency(financeData.income)}).`;
    } else if (normalizedQuestion.includes('expense') || normalizedQuestion.includes('spend')) {
        response = 'Track your top 3 weekly expense categories and reduce the highest one by 10% first.';
    }

    window.setTimeout(() => {
        appendMessage(`Barya: ${response}`);
        renderFlowGuidance();
    }, 450);

    elements.chatInput.value = '';
}

function renderFlowGuidance() {
    if (!elements.flowGuide) {
        return;
    }

    const steps = [
        { label: 'Goal selected', done: Boolean(userGoal) },
        { label: 'Income added', done: financeData.income > 0 },
        { label: 'Expense added', done: financeData.expense > 0 },
        { label: 'Insights reviewed', done: financeData.income > 0 || financeData.expense > 0 },
        { label: 'AI question asked', done: hasAskedAI }
    ];

    const currentStep = steps.find((step) => !step.done);
    const summary = steps
        .map((step, index) => `${index + 1}. ${step.done ? '✅' : '⬜'} ${step.label}`)
        .join('  •  ');
    const nextHint = currentStep
        ? `Next best step: ${currentStep.label}.`
        : 'Great job — you completed the full beginner flow.';

    elements.flowGuide.innerHTML = `<p><strong>Progress checklist:</strong> ${summary}</p><p class="helper-text">${nextHint}</p>`;
}

// Idea Gen
function generateIdea() {
    const ideas = [
        'Social Media Agency',
        'E-commerce for local crafts',
        'AI Content Writing Service',
        'Online Personal Finance Tutor'
    ];

    const idea = ideas[Math.floor(Math.random() * ideas.length)];
    elements.ideaDisplay.textContent = `💡 ${idea}`;
}

function getPlan(planType) {
    const goalText = userGoal || 'grow financially';
    elements.planOutput.textContent = `Barya Advisor: Loading ${planType} for your goal to ${goalText}. Step 1 is market research.`;
}
