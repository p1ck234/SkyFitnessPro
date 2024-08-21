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
  arrayRemove,
} from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get User
export const getUser = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
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
    throw error;
  }
};

export const saveUser = async (uid: string, data: any) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true });
    await initializeUserProgress(uid);
  } catch (error) {
    throw error;
  }
};

export const checkCourseExists = async (
  uid: string,
  courseId: number
): Promise<boolean> => {
  try {
    const userProgressRef = doc(db, "dataUsers", uid);
    const userProgressDoc = await getDoc(userProgressRef);

    if (!userProgressDoc.exists()) {
      return false;
    }

    const userProgressData = userProgressDoc.data() || { courses_progress: [] };
    const existingCourses = userProgressData.courses_progress;

    return existingCourses.some((course: any) => course.id_course === courseId);
  } catch (error) {
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
    throw error;
  }
};

export const addCourseToUser = async (uid: string, courseId: number) => {
  try {
    const db = getFirestore();
    const userProgressRef = doc(db, "dataUsers", uid);
    const userProgressDoc = await getDoc(userProgressRef);

    if (!userProgressDoc.exists()) {
      await setDoc(userProgressRef, {
        courses_progress: [],
      });
    }

    const userProgressData = userProgressDoc.data() || { courses_progress: [] };
    const existingCourses = userProgressData.courses_progress;

    const courseAlreadyAdded = existingCourses.some(
      (course: any) => course.id_course === courseId
    );

    if (courseAlreadyAdded) {
      return; 
    }

    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, where("id", "==", courseId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error(`Course with ID ${courseId} does not exist.`);
    }

    const courseDoc = querySnapshot.docs[0];
    const courseRef = courseDoc.ref;
    const courseData = courseDoc.data();

    if (!courseData.workouts) {
      throw new Error("No workouts found for this course.");
    }

    const workoutsProgress = courseData.workouts.map((workout: any) => {
      if (!workout.exercise || workout.exercise.length === 0) {
        return {
          id_workout: workout.id,
          exercises_progress: [],
          count_progress: 0,
        };
      }

      return {
        id_workout: workout.id,
        exercises_progress: workout.exercise.map((exercise: any) => ({
          id_exercise: exercise.id,
          count_completed: 0,
          completed: false,
          max_count: exercise.count,
        })),
        completed: false,
      };
    });

    await updateDoc(userProgressRef, {
      courses_progress: arrayUnion({
        id_course: courseId,
        progress: 0,
        workouts_progress: workoutsProgress,
      }),
    });

    await updateDoc(courseRef, {
      users: arrayUnion(uid),
    });
  } catch (error) {
    throw error;
  }
};

export const removeCourseFromUser = async (uid: string, courseId: number) => {
  try {
    const db = getFirestore();
    const coursesRef = collection(db, "courses");

    const q = query(coursesRef, where("id", "==", courseId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error(`Course with ID ${courseId} does not exist.`);
    }

    const courseDoc = querySnapshot.docs[0];
    const courseRef = courseDoc.ref;

    await updateDoc(courseRef, {
      users: arrayRemove(uid),
    });

    const userProgressRef = doc(db, "dataUsers", uid);
    const userProgressSnap = await getDoc(userProgressRef);

    if (userProgressSnap.exists()) {
      const userProgressData = userProgressSnap.data();
      const updatedCoursesProgress = (
        userProgressData.courses_progress || []
      ).filter((progress: any) => progress.id_course !== courseId);

      await updateDoc(userProgressRef, {
        courses_progress: updatedCoursesProgress,
      });
    }
  } catch (error) {
    throw error;
  }
};
