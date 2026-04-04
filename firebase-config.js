// Firebase app initialization (modular SDK for browser/CDN usage).
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Project configuration provided by the user.
const firebaseConfig = {
  apiKey: "AIzaSyD4zr_F0TGBLFbEYhujI9W7dgxDFKbs_94",
  authDomain: "barya-business-ai.firebaseapp.com",
  projectId: "barya-business-ai",
  storageBucket: "barya-business-ai.firebasestorage.app",
  messagingSenderId: "829537680083",
  appId: "1:829537680083:web:c1fe4e70d474cd63a7f226",
  measurementId: "G-B5P24XTHF3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
