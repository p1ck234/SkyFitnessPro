// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9Dmb_NQ2UnUrP5xJrdT5fAhIojhVdmm0",
  authDomain: "skyprofitness-38202.firebaseapp.com",
  projectId: "skyprofitness-38202",
  storageBucket: "skyprofitness-38202.appspot.com",
  messagingSenderId: "930726733549",
  appId: "1:930726733549:web:71db3b5775bc55fa224ee4",
  measurementId: "G-6C3P5XX8WQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { firebaseConfig }; // Добавляем экспорт
