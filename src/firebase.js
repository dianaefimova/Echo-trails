import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDRx9DMlK0yqRonDGhG-Qj9XBVjJYjswqE",
  authDomain: "echo-trails.firebaseapp.com",
  projectId: "echo-trails",
  storageBucket: "echo-trails.appspot.com",
  messagingSenderId: "407042930928",
  appId: "1:407042930928:web:b31a19f68d9fb3210fea35",
  measurementId: "G-09YM4XZX9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, db, analytics};
