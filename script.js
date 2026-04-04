// Finance Data Logic
const STORAGE_KEYS = {
    finance: 'barya_finance',
    goal: 'barya_goal',
    recurring: 'barya_recurring_expenses'
    userData: 'barya_user_data',
    appState: 'barya_state'
};

let financeData = loadFinanceData();
let recurringExpenses = loadRecurringExpenses();
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

window.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    bindEvents();
    updateDashboard();
    updateRecurringList();
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
    elements.chatInput = document.getElementById('chat-input');
    elements.chatBox = document.getElementById('chat-box');
    elements.ideaDisplay = document.getElementById('idea-display');
    elements.planOutput = document.getElementById('plan-output');
    elements.recurringName = document.getElementById('recurring-name');
    elements.recurringAmount = document.getElementById('recurring-amount');
    elements.recurringFrequency = document.getElementById('recurring-frequency');
    elements.recurringList = document.getElementById('recurring-list');
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

    elements.recurringAmount.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addRecurringExpense();
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

function createDefaultFinanceData() {
    return {
        income: 0,
        expense: 0,
        manualExpenses: [],
        recurringExpenses: []
    };
}

function normalizeExpenseItem(item, fallbackName) {
    const amount = Number(item?.amount ?? item?.monthlyAmount ?? item?.value);
    if (!Number.isFinite(amount) || amount <= 0) {
        return null;
    }

    const name = String(item?.name ?? item?.title ?? item?.category ?? fallbackName ?? 'Expense').trim() || 'Expense';
    return {
        name,
        amount: Math.round(amount),
        frequency: item?.frequency === 'weekly' ? 'weekly' : 'monthly'
    };
}

function parseStoredDataByKey(storageKey) {
    try {
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        return null;
    }
}

function readStoredUserData() {
    const possibleSources = [
        parseStoredDataByKey(STORAGE_KEYS.userData),
        parseStoredDataByKey(STORAGE_KEYS.appState)
    ].filter(Boolean);

    const userExpenseData = { recurringExpenses: [], manualExpenses: [] };

    possibleSources.forEach((source) => {
        const recurringList = source?.recurringExpenses || source?.finance?.recurringExpenses || [];
        const manualList = source?.expenses || source?.finance?.expenses || [];

        recurringList.forEach((item) => {
            const normalized = normalizeExpenseItem(item, 'Recurring expense');
            if (normalized) {
                userExpenseData.recurringExpenses.push(normalized);
            }
        });

        manualList.forEach((item) => {
            const normalized = normalizeExpenseItem(item, 'Manual expense');
            if (normalized) {
                userExpenseData.manualExpenses.push(normalized);
            }
        });
    });

    return userExpenseData;
}

function loadFinanceData() {
    const defaults = createDefaultFinanceData();
    const parsed = parseStoredDataByKey(STORAGE_KEYS.finance);
    const storedUserData = readStoredUserData();

    if (!parsed || typeof parsed !== 'object') {
        const migrated = {
            ...defaults,
            manualExpenses: storedUserData.manualExpenses,
            recurringExpenses: storedUserData.recurringExpenses
        };
        migrated.expense = migrated.manualExpenses.reduce((sum, item) => sum + item.amount, 0)
            + migrated.recurringExpenses.reduce((sum, item) => sum + item.amount, 0);
        return migrated;
    }

    const manualExpenses = Array.isArray(parsed.manualExpenses)
        ? parsed.manualExpenses.map((item) => normalizeExpenseItem(item, 'Manual expense')).filter(Boolean)
        : [];

    const recurringExpenses = Array.isArray(parsed.recurringExpenses)
        ? parsed.recurringExpenses.map((item) => normalizeExpenseItem(item, 'Recurring expense')).filter(Boolean)
        : [];

    const allManualExpenses = [...manualExpenses, ...storedUserData.manualExpenses];
    const allRecurringExpenses = [...recurringExpenses, ...storedUserData.recurringExpenses];

    const normalizedIncome = Number.isFinite(Number(parsed.income)) ? Math.max(0, Number(parsed.income)) : 0;
    const computedExpense = allManualExpenses.reduce((sum, item) => sum + item.amount, 0)
        + allRecurringExpenses.reduce((sum, item) => sum + item.amount, 0);

    const fallbackExpense = Number.isFinite(Number(parsed.expense)) ? Math.max(0, Number(parsed.expense)) : 0;

    return {
        income: normalizedIncome,
        expense: computedExpense || fallbackExpense,
        manualExpenses: allManualExpenses,
        recurringExpenses: allRecurringExpenses
    };
}

function loadRecurringExpenses() {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS.recurring));

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed
            .filter((item) => item && typeof item === 'object')
            .map((item) => {
                const safeFrequency = ['daily', 'weekly', 'monthly'].includes(item.frequency)
                    ? item.frequency
                    : 'monthly';

                return {
                    id: String(item.id || crypto.randomUUID()),
                    name: String(item.name || 'Untitled').trim().slice(0, 60),
                    amount: Number.isFinite(Number(item.amount)) ? Math.max(0, Number(item.amount)) : 0,
                    frequency: safeFrequency
                };
            })
            .filter((item) => item.name && item.amount > 0);
    } catch (error) {
        return [];
    }
}

function saveFinanceData() {
    localStorage.setItem(STORAGE_KEYS.finance, JSON.stringify(financeData));
}

function saveRecurringExpenses() {
    localStorage.setItem(STORAGE_KEYS.recurring, JSON.stringify(recurringExpenses));
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
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

function scrollToApp() {
    elements.mainApp.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0
    }).format(value);
}

function getRecurringMultiplier(frequency) {
    const now = new Date();
    const currentDayOfMonth = now.getDate();

    if (frequency === 'daily') {
        return currentDayOfMonth;
    }

    if (frequency === 'weekly') {
        return Math.ceil(currentDayOfMonth / 7);
    }

    return 1;
}

function getRecurringTotalForCurrentMonth() {
    return recurringExpenses.reduce((total, item) => {
        return total + (item.amount * getRecurringMultiplier(item.frequency));
    }, 0);
}

function getRecurringExplanation(item) {
    if (item.frequency === 'daily') {
        return `Counts ${getRecurringMultiplier('daily')} time(s) this month`;
    }

    if (item.frequency === 'weekly') {
        return `Counts ${getRecurringMultiplier('weekly')} week(s) this month`;
    }

    return 'Counts once each month';
}

function updateRecurringList() {
    if (!elements.recurringList) {
        return;
    }

    if (!recurringExpenses.length) {
        elements.recurringList.innerHTML = '<li class="recurring-empty">No recurring expenses yet.</li>';
        return;
    }

    elements.recurringList.innerHTML = recurringExpenses.map((item) => {
        const frequencyLabel = item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1);

        return `
            <li class="recurring-item">
                <div>
                    <div class="recurring-title">${item.name} • ₹${formatCurrency(item.amount)}</div>
                    <div class="recurring-meta">${frequencyLabel} · ${getRecurringExplanation(item)}</div>
                </div>
                <button type="button" class="recurring-remove" onclick="removeRecurringExpense('${item.id}')">Remove</button>
            </li>
        `;
    }).join('');
}

function addRecurringExpense() {
    const name = elements.recurringName.value.trim();
    const amount = Number.parseFloat(elements.recurringAmount.value);
    const frequency = elements.recurringFrequency.value;

    if (!name) {
        alert('Please enter a recurring expense name.');
        elements.recurringName.focus();
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        alert('Please enter a valid recurring amount greater than 0.');
        elements.recurringAmount.focus();
        return;
    }

    recurringExpenses.push({
        id: crypto.randomUUID(),
        name,
        amount,
        frequency
    });

    saveRecurringExpenses();
    updateRecurringList();
    updateDashboard();

    elements.recurringName.value = '';
    elements.recurringAmount.value = '';
    elements.recurringFrequency.value = 'daily';
    elements.recurringName.focus();
}

function removeRecurringExpense(id) {
    recurringExpenses = recurringExpenses.filter((item) => item.id !== id);
    saveRecurringExpenses();
    updateRecurringList();
    updateDashboard();
function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function createSuggestionLines() {
    const combinedExpenses = [...financeData.recurringExpenses, ...financeData.manualExpenses];
    if (combinedExpenses.length === 0) {
        return [];
    }

    const totalsByCategory = combinedExpenses.reduce((accumulator, entry) => {
        const key = entry.name.trim().toLowerCase();
        if (!accumulator[key]) {
            accumulator[key] = { name: entry.name, monthlyAmount: 0 };
        }

        const monthlyAmount = entry.frequency === 'weekly' ? entry.amount * 4 : entry.amount;
        accumulator[key].monthlyAmount += monthlyAmount;
        return accumulator;
    }, {});

    const biggestExpense = Object.values(totalsByCategory)
        .sort((a, b) => b.monthlyAmount - a.monthlyAmount)[0];

    if (!biggestExpense) {
        return [];
    }

    const roundedMonthlyAmount = Math.round(biggestExpense.monthlyAmount);
    const twentyPercentSaving = Math.round(roundedMonthlyAmount * 0.2);

    return [
        `You spend ₹${formatCurrency(roundedMonthlyAmount)} monthly on ${escapeHtml(biggestExpense.name)}.`,
        `Reducing this by 20% could save ₹${formatCurrency(twentyPercentSaving)}.`
    ];
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
        financeData.manualExpenses.push({
            name: 'Manual expense',
            amount: Math.round(amount),
            frequency: 'monthly'
        });
    }

    const totalManualExpense = financeData.manualExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalRecurringExpense = financeData.recurringExpenses.reduce((sum, item) => sum + item.amount, 0);
    financeData.expense = totalManualExpense + totalRecurringExpense;

    saveFinanceData();
    updateDashboard();
    elements.amountInput.value = '';
    elements.amountInput.focus();
}

function updateDashboard() {
    const recurringExpenseTotal = getRecurringTotalForCurrentMonth();
    const expenseWithRecurring = financeData.expense + recurringExpenseTotal;

    elements.income.innerText = `₹${formatCurrency(financeData.income)}`;
    elements.expense.innerText = `₹${formatCurrency(expenseWithRecurring)}`;

    const savings = financeData.income - expenseWithRecurring;
    elements.savings.innerText = `₹${formatCurrency(savings)}`;

    if (financeData.income === 0 && financeData.expense === 0 && recurringExpenses.length === 0) {
        elements.insights.textContent = 'Add your first income, expense, or recurring expense entry to receive tailored insights.';
        return;
    }

    const suggestionLines = createSuggestionLines();

    if (suggestionLines.length > 0) {
        const healthMessage = financeData.expense > financeData.income * 0.8
            ? '⚠️ Expenses are high compared to income. Review this suggestion first:'
            : '✅ Smart suggestion based on your recurring + manual expenses:';

        elements.insights.innerHTML = `${healthMessage}<br>${suggestionLines.join('<br>')}`;
        return;
    }

    if (financeData.expense > financeData.income * 0.8) {
        elements.insights.textContent = '⚠️ Expenses are high compared to income. Review non-essential spending this week.';
        return;
    }

    if (savings > 0) {
        const suggestedInvestment = Math.round(savings * 0.3);
        elements.insights.textContent = `✅ Good progress. You could consider investing ₹${formatCurrency(suggestedInvestment)} this month.`;
        return;
    }

    elements.insights.textContent = 'You are currently spending more than you earn. Start with small cuts and add one extra income source.';
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
    }, 450);

    elements.chatInput.value = '';
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
