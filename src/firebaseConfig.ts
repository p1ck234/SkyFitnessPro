import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9Dmb_NQ2UnUrP5xJrdT5fAhIojhVdmm0",
  authDomain: "skyprofitness-38202.firebaseapp.com",
  projectId: "skyprofitness-38202",
  storageBucket: "skyprofitness-38202.appspot.com",
  messagingSenderId: "930726733549",
  appId: "1:930726733549:web:71db3b5775bc55fa224ee4",
  measurementId: "G-6C3P5XX8WQ",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { firebaseConfig, storage }; 
