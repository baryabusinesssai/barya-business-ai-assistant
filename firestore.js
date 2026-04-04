// Firestore data layer for user-scoped financial data.
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db } from "./firebase-config.js";

function userRoot(uid) {
  return doc(db, "users", uid);
}

// Save all app data for a user into required Firestore paths.
export async function saveUserData(uid, state, settings) {
  // users/{uid}/income/current
  await setDoc(doc(collection(userRoot(uid), "income"), "current"), {
    value: Number(state.income) || 0,
    updatedAt: Date.now()
  });

  // users/{uid}/settings/current
  await setDoc(doc(collection(userRoot(uid), "settings"), "current"), {
    currency: settings.currency,
    goal: settings.goal || "",
    updatedAt: Date.now()
  });

  // users/{uid}/expenses (replace all docs)
  const expensesCol = collection(userRoot(uid), "expenses");
  const existingExpenses = await getDocs(expensesCol);
  await Promise.all(existingExpenses.docs.map((d) => deleteDoc(d.ref)));
  await Promise.all(
    (state.expenses || []).map((expense) =>
      addDoc(expensesCol, {
        amount: Number(expense.amount) || 0,
        category: expense.category || "Other",
        date: expense.date || ""
      })
    )
  );

  // users/{uid}/recurring (replace all docs)
  const recurringCol = collection(userRoot(uid), "recurring");
  const existingRecurring = await getDocs(recurringCol);
  await Promise.all(existingRecurring.docs.map((d) => deleteDoc(d.ref)));
  await Promise.all(
    (state.recurringExpenses || []).map((expense) =>
      addDoc(recurringCol, {
        name: expense.name || "Recurring",
        amount: Number(expense.amount) || 0,
        frequency: expense.frequency || "monthly",
        startDate: expense.startDate || ""
      })
    )
  );
}

// Load all user data and return safe defaults when empty.
export async function loadUserData(uid) {
  const incomeSnap = await getDoc(doc(collection(userRoot(uid), "income"), "current"));
  const settingsSnap = await getDoc(doc(collection(userRoot(uid), "settings"), "current"));

  const expensesSnap = await getDocs(collection(userRoot(uid), "expenses"));
  const recurringSnap = await getDocs(collection(userRoot(uid), "recurring"));

  return {
    income: incomeSnap.exists() ? Number(incomeSnap.data().value) || 0 : 0,
    expenses: expensesSnap.docs.map((d) => d.data()),
    recurringExpenses: recurringSnap.docs.map((d) => d.data()),
    settings: {
      currency: settingsSnap.exists() ? settingsSnap.data().currency || "INR" : "INR",
      goal: settingsSnap.exists() ? settingsSnap.data().goal || "" : ""
    }
  };
}
