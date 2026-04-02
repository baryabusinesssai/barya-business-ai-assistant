function formatCurrency(value) {
  return `₹${value.toFixed(2)}`;
}

// 🔥 AI RESPONSE UPGRADE
function getAssistantResponse(question) {
  const q = question.toLowerCase();

  // Saving tips
  if (q.includes("save") || q.includes("saving")) {
    return "💡 Saving Tips:\n- Track your daily expenses\n- Set a monthly savings goal\n- Avoid unnecessary spending\n- Try investing small amounts regularly";
  }

  // Business ideas
  if (q.includes("business") || q.includes("startup")) {
    return "🚀 Business Ideas:\n- Start online reselling\n- Social media management for local shops\n- Home-based food business\n- Freelancing (design, content, etc.)";
  }

  // Income advice
  if (q.includes("income") || q.includes("earn")) {
    return "💰 Increase Income:\n- Learn a high-income skill\n- Start freelancing\n- Use online platforms like Fiverr or Upwork\n- Build a small side business";
  }

  // Expense advice
  if (q.includes("expense") || q.includes("spending")) {
    return "📉 Expense Control Tips:\n- Cut unnecessary subscriptions\n- Track every rupee\n- Plan weekly budget\n- Avoid impulse buying";
  }

  // Default
  return "🤖 I can help with savings, business ideas, income, and expenses. Try asking something like: 'How to save money?'";
}

// AI FORM HANDLER (improved UX)
assistantForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = assistantQuestionInput.value.trim();
  if (!question) return;

  assistantResponseElement.textContent = "Thinking... 🤖";

  setTimeout(() => {
    assistantResponseElement.textContent = getAssistantResponse(question);
  }, 500);
});
