const typingText = document.getElementById('typing-text');
const phrases = [
    "How do I save ₹5000 this month?",
    "Start a business with zero investment.",
    "Show me my expense analysis.",
    "Give me a startup idea for students."
];

let i = 0;
let j = 0;
let isDeleting = false;

function type() {
    let currentPhrase = phrases[i];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, j - 1);
        j--;
    } else {
        typingText.textContent = currentPhrase.substring(0, j + 1);
        j++;
    }

    if (!isDeleting && j === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(type, speed);
}

document.addEventListener('DOMContentLoaded', type);
/* ... [Keep previous CSS from Template 2] ... */

.modal {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8); display: flex; align-items: center;
    justify-content: center; z-index: 2000;
}

.modal-content { text-align: center; max-width: 400px; }

.goal-options { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
.goal-options button {
    padding: 15px; border-radius: 10px; border: 1px solid var(--primary);
    background: transparent; color: white; cursor: pointer; transition: 0.3s;
}
.goal-options button:hover { background: var(--primary); }

.container { display: flex; gap: 20px; margin-top: 20px; }

.sidebar { width: 250px; display: flex; flex-direction: column; gap: 10px; }

.side-link {
    background: var(--card-bg); border: 1px solid rgba(255,255,255,0.1);
    color: var(--text-dim); padding: 15px; border-radius: 12px;
    text-align: left; cursor: pointer; transition: 0.3s;
}
.side-link.active { background: var(--primary); color: white; }

.tab-content { display: none; width: 100%; }
.tab-content.active { display: block; animation: fadeIn 0.5s; }

.budget-inputs { display: flex; gap: 10px; margin-top: 20px; }
.budget-inputs input, .budget-inputs select {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2);
    color: white; padding: 10px; border-radius: 8px;
}

.chat-display { height: 300px; overflow-y: auto; margin-bottom: 20px; padding: 10px; }
.idea-box { font-size: 1.2rem; color: var(--secondary); margin-top: 30px; font-weight: bold; }
.mt-20 { margin-top: 20px; }
// --- INITIALIZATION ---
let financeData = JSON.parse(localStorage.getItem('barya_data')) || { income: 0, expense: 0 };
let userGoal = localStorage.getItem('barya_goal') || null;

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    if (!userGoal) {
        document.getElementById('beginner-modal').style.display = 'flex';
    } else {
        document.getElementById('beginner-modal').style.display = 'none';
        document.getElementById('user-goal-badge').textContent = `Goal: ${userGoal}`;
    }
});

// --- NAVIGATION ---
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.side-link').forEach(link => link.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// --- FEATURE 7: BEGINNER MODE ---
function setGoal(goal) {
    userGoal = goal;
    localStorage.setItem('barya_goal', goal);
    document.getElementById('beginner-modal').style.display = 'none';
    document.getElementById('user-goal-badge').textContent = `Goal: ${goal}`;
    alert(`Barya AI has adapted to your goal: ${goal}`);
}

// --- FEATURE 1 & 8: BUDGET TRACKER & DASHBOARD ---
function addTransaction() {
    const amt = parseFloat(document.getElementById('input-amount').value);
    const type = document.getElementById('input-type').value;

    if (isNaN(amt)) return;

    if (type === 'income') financeData.income += amt;
    else financeData.expense += amt;

    localStorage.setItem('barya_data', JSON.stringify(financeData));
    updateUI();
    generateInsights();
}

function updateUI() {
    document.getElementById('display-income').textContent = `₹${financeData.income}`;
    document.getElementById('display-expense').textContent = `₹${financeData.expense}`;
    document.getElementById('display-savings').textContent = `₹${financeData.income - financeData.expense}`;
}

// --- FEATURE 4: SMART INSIGHTS ---
function generateInsights() {
    const insightsList = document.getElementById('insights-list');
    const savings = financeData.income - financeData.expense;
    let html = '';

    if (financeData.expense > financeData.income * 0.7) {
        html += `<div class="ai-msg">⚠️ High Spending: You've spent over 70% of your income. Consider cutting X expense.</div>`;
    }
    if (savings > 0) {
        html += `<div class="ai-msg">✅ Good Job: You can save ₹${Math.floor(savings * 0.2)} by putting it in a recurring deposit.</div>`;
    }
    insightsList.innerHTML = html || '<div class="ai-msg">Add more data for deeper analysis.</div>';
}

// --- FEATURE 2 & 5: AI ASSISTANT & ENGAGEMENT ---
function askAI() {
    const input = document.getElementById('chat-input').value;
    const chatBox = document.getElementById('chat-box');
    
    let response = "That's a great question! For beginners, I recommend tracking every ₹1 spent.";
    
    if(input.toLowerCase().includes("save")) response = "To save more, follow the 50/30/20 rule: 50% Needs, 30% Wants, 20% Savings.";
    if(input.toLowerCase().includes("business")) response = "Starting a business requires a clear value proposition. Have you defined your target customer?";

    chatBox.innerHTML += `<div class="user-msg text-dim">You: ${input}</div>`;
    chatBox.innerHTML += `<div class="ai-msg">Barya: ${response}</div>`;
    document.getElementById('chat-input').value = '';
}

// --- FEATURE 6: IDEA GENERATOR ---
const ideas = [
    "Drop-shipping store for eco-friendly products.",
    "Freelance Social Media Management for local cafes.",
    "Online tutoring in specialized skills like coding or music.",
    "Personal finance blog/vlog for students.",
    "Print-on-demand custom t-shirt business."
];

function generateIdea() {
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    document.getElementById('idea-display').textContent = randomIdea;
}

// --- FEATURE 3: BUSINESS PLANNING ---
function getPlan(type) {
    const result = document.getElementById('plan-result');
    if (type.includes("Guide")) {
        result.innerHTML = "<strong>Startup Guide:</strong> 1. Identify Problem. 2. Market Research. 3. Build MVP. 4. Get Feedback.";
    } else {
        result.innerHTML = `Loading your personalized ${type}... (This would be a downloadable PDF in the full version).`;
    }
}
