// src/services/firestoreService.ts

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Create or Update User
// export const saveUser = async (uid: string, data: any) => {
//   try {
//     await setDoc(doc(db, "users", uid), data, { merge: true });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     throw error;
//   }
// };

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
export const queryCourses = async (
  field: string,
  operator: any,
  value: any
) => {
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

export const saveUser = async (uid: string, data: any) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true });
    await initializeUserProgress(uid);
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

export const initializeUserProgress = async (uid: string) => {
  try {
    const userProgressRef = doc(db, "dataUsers", uid);
    const userProgressData = {
      courses_progress: [],
    };
    await setDoc(userProgressRef, userProgressData, { merge: true });
  } catch (error) {
    console.error("Error initializing user progress:", error);
    throw error;
  }
};

export const addCourseToUser = async (uid: string, courseId: number) => {
  try {
    const db = getFirestore();
    const coursesRef = collection(db, "courses");

    const q = query(coursesRef, where("id", "==", courseId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`Course with ID ${courseId} does not exist.`);
      throw new Error(`Course with ID ${courseId} does not exist.`);
    }

    const courseDoc = querySnapshot.docs[0];
    const courseRef = courseDoc.ref;

    const courseData = courseDoc.data();
    if (!courseData.users.includes(uid)) {
      await updateDoc(courseRef, {
        users: arrayUnion(uid),
      });
    }
  } catch (error) {
    console.error("Error adding course to user:", error);
    throw error;
  }
};
