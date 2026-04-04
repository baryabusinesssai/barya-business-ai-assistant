// Finance Data Logic
let financeData = JSON.parse(localStorage.getItem('barya_finance')) || { income: 0, expense: 0 };
let userGoal = localStorage.getItem('barya_goal') || "";

window.onload = () => {
    updateDashboard();
    typeAnimation();
    if (!userGoal) {
        document.getElementById('beginner-modal').style.display = 'flex';
    } else {
        document.getElementById('beginner-modal').style.display = 'none';
        document.getElementById('user-goal-badge').innerText = "Goal: " + userGoal;
    }
};

// Set User Goal
function setGoal(goal) {
    userGoal = goal;
    localStorage.setItem('barya_goal', goal);
    document.getElementById('beginner-modal').style.display = 'none';
    document.getElementById('user-goal-badge').innerText = "Goal: " + goal;
}

// Typing Animation for Hero
const phrases = ["How do I save ₹5000?", "Start a business today.", "Get AI business advice.", "Track your expenses."];
let i = 0, j = 0, currentPhrase = "", isDeleting = false;

function typeAnimation() {
    currentPhrase = phrases[i];
    if (isDeleting) {
        document.getElementById('typing-text').innerText = currentPhrase.substring(0, j - 1);
        j--;
    } else {
        document.getElementById('typing-text').innerText = currentPhrase.substring(0, j + 1);
        j++;
    }

    if (!isDeleting && j === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
    }
    setTimeout(typeAnimation, isDeleting ? 50 : 100);
}

// Tab System
function showTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.side-link').forEach(l => l.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

function scrollToApp() {
    document.getElementById('main-app').scrollIntoView({ behavior: 'smooth' });
}

// Budget Tracker
function addTransaction() {
    const amt = parseFloat(document.getElementById('input-amount').value);
    const type = document.getElementById('input-type').value;
    if (isNaN(amt) || amt <= 0) return alert("Valid amount dalein!");

    if (type === 'income') financeData.income += amt;
    else financeData.expense += amt;

    localStorage.setItem('barya_finance', JSON.stringify(financeData));
    updateDashboard();
    document.getElementById('input-amount').value = "";
}

function updateDashboard() {
    document.getElementById('display-income').innerText = "₹" + financeData.income;
    document.getElementById('display-expense').innerText = "₹" + financeData.expense;
    const savings = financeData.income - financeData.expense;
    document.getElementById('display-savings').innerText = "₹" + savings;
    
    const insight = document.getElementById('insights-container');
    if (financeData.expense > financeData.income * 0.8) insight.innerHTML = "⚠️ Expenses are very high! Cut spending.";
    else if (savings > 0) insight.innerHTML = "✅ You can invest ₹" + (savings * 0.3).toFixed(0) + " this month.";
}

// AI Chat Simple Logic
function askAI() {
    const q = document.getElementById('chat-input').value;
    const box = document.getElementById('chat-box');
    if(!q) return;

    box.innerHTML += `<div style="text-align:right; margin-bottom:10px;">${q}</div>`;
    let res = "That's interesting! Based on your " + userGoal + " goal, I suggest focusing on small daily wins.";
    if(q.toLowerCase().includes("save")) res = "Try the 50/30/20 rule to manage your " + financeData.income + " income.";
    
    setTimeout(() => {
        box.innerHTML += `<div class="ai-msg">Barya: ${res}</div>`;
        box.scrollTop = box.scrollHeight;
    }, 600);
    document.getElementById('chat-input').value = "";
}

// Idea Gen
function generateIdea() {
    const ideas = ["Social Media Agency", "E-commerce for local crafts", "AI Content Writing Service", "Online Personal Finance Tutor"];
    document.getElementById('idea-display').innerText = "💡 " + ideas[Math.floor(Math.random() * ideas.length)];
}

function getPlan(p) {
    document.getElementById('plan-output').innerHTML = "<strong>Barya Advisor:</strong> Loading " + p + " for your goal to " + userGoal + "... Step 1 is Market Research.";
}
