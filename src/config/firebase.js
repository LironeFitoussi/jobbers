
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClK9MHHWCc3v4poR4HkJ7RkiK3MQtwRZQ",
  authDomain: "jobbers-6aff4.firebaseapp.com",
  projectId: "jobbers-6aff4",
  storageBucket: "jobbers-6aff4.appspot.com",
  messagingSenderId: "381445292343",
  appId: "1:381445292343:web:e1f703a87e99eecd0c1ab2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };