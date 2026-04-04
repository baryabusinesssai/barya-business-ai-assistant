// Firestore data helpers: store app data in per-user subcollections.
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db } from "./firebase-config.js";

function userDoc(uid) {
  return doc(db, "users", uid);
}

function userCollection(uid, name) {
  return collection(userDoc(uid), name);
}

export async function loadUserData(uid) {
  const [incomeSnap, settingsSnap, expensesSnap, recurringSnap] = await Promise.all([
    getDoc(doc(userCollection(uid, "income"), "current")),
    getDoc(doc(userCollection(uid, "settings"), "current")),
    getDocs(userCollection(uid, "expenses")),
    getDocs(userCollection(uid, "recurring"))
  ]);

  return {
    income: Number(incomeSnap.data()?.amount) || 0,
    settings: settingsSnap.data() || {},
    expenses: expensesSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
    recurringExpenses: recurringSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
  };
}

export async function saveIncome(uid, amount) {
  await setDoc(doc(userCollection(uid, "income"), "current"), { amount: Number(amount) || 0 });
}

export async function saveSettings(uid, settings) {
  await setDoc(doc(userCollection(uid, "settings"), "current"), settings);
}

export async function saveExpenses(uid, expenses) {
  const colRef = userCollection(uid, "expenses");
  const existing = await getDocs(colRef);
  await Promise.all(existing.docs.map((d) => deleteDoc(doc(colRef, d.id))));
  await Promise.all(
    expenses.map((expense, idx) =>
      setDoc(doc(colRef, expense.id || `expense_${idx}_${Date.now()}`), {
        amount: Number(expense.amount) || 0,
        category: expense.category || "Other",
        date: expense.date || new Date().toISOString().slice(0, 10)
      })
    )
  );
}

export async function saveRecurring(uid, recurringExpenses) {
  const colRef = userCollection(uid, "recurring");
  const existing = await getDocs(colRef);
  await Promise.all(existing.docs.map((d) => deleteDoc(doc(colRef, d.id))));
  await Promise.all(
    recurringExpenses.map((expense, idx) =>
      setDoc(doc(colRef, expense.id || `recurring_${idx}_${Date.now()}`), {
        name: expense.name || "Recurring",
        amount: Number(expense.amount) || 0,
        frequency: expense.frequency || "monthly",
        startDate: expense.startDate || new Date().toISOString().slice(0, 10)
      })
    )
  );
}

export async function clearUserData(uid) {
  await Promise.all([
    saveIncome(uid, 0),
    saveSettings(uid, { currency: "INR", goal: "" }),
    saveExpenses(uid, []),
    saveRecurring(uid, [])
  ]);
}
