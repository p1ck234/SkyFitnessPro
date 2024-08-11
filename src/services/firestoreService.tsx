// src/services/firestoreService.ts

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Create or Update User
export const saveUser = async (uid: string, data: any) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true });
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

// Get User
export const getUser = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// Get Courses
export const getCourses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courses: any[] = [];
    querySnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() });
    });
    return courses;
  } catch (error) {
    console.error("Error getting courses:", error);
    throw error;
  }
};

// Query Courses
export const queryCourses = async (field: string, operator: any, value: any) => {
  try {
    const q = query(collection(db, "courses"), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    const courses: any[] = [];
    querySnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() });
    });
    return courses;
  } catch (error) {
    console.error("Error querying courses:", error);
    throw error;
  }
};
