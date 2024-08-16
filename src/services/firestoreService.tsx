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
import { Course } from "@/types/types";

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

export const getUserCourses = async (uid: string): Promise<Course[]> => {
  try {
    const userProgressRef = doc(db, "dataUsers", uid);
    const userProgressDoc = await getDoc(userProgressRef);

    if (!userProgressDoc.exists()) {
      console.log("Документ прогресса пользователя не существует.");
      return [];
    }

    const userProgressData = userProgressDoc.data();
    const coursesProgress = userProgressData.courses_progress || [];

    // Получаем все курсы
    const coursesRef = collection(db, "courses");
    const querySnapshot = await getDocs(coursesRef);
    const allCourses: Course[] = [];
    querySnapshot.forEach((doc) => {
      allCourses.push({ id: doc.id, ...doc.data() } as Course);
    });

    // Фильтруем курсы, которые есть у пользователя
    // @ts-ignore
    const userCourses = allCourses.filter(course =>
      coursesProgress.some(progress => progress.id_course === course.id)
    );

    return userCourses;
  } catch (error) {
    console.error("Ошибка при получении курсов пользователя:", error);
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

// Function to add a course to user's profile
export const addCourseToUser = async (uid: string, courseId: number) => {
  try {
    const db = getFirestore();
    const userProgressRef = doc(db, "dataUsers", uid);
    const userProgressDoc = await getDoc(userProgressRef);

    // Если документ не существует, создаем его
    if (!userProgressDoc.exists()) {
      await setDoc(userProgressRef, { courses_progress: [] });
    }

    // Проверяем, есть ли уже этот курс в прогрессе пользователя
    const userProgressData = userProgressDoc.data() || { courses_progress: [] };
    const existingCourses = userProgressData.courses_progress;

    // Проверка на существование курса в профиле
    const courseAlreadyAdded = existingCourses.some(
      (course: any) => course.id_course === courseId
    );

    if (courseAlreadyAdded) {
      console.log(`Course with ID ${courseId} is already added for user ${uid}.`);
      return; // Если курс уже добавлен, выходим из функции
    }

    // Получаем данные курса
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

    // Проверка наличия workout
    if (!courseData.workouts) {
      console.error("No workouts found for this course.");
      throw new Error("No workouts found for this course.");
    }

    const workoutsProgress = courseData.workouts.map((workout: any) => ({
      id_workout: workout.id,
      exercises_progress: workout.exercise ? workout.exercise.map((exercise: any) => ({
        id_exercise: exercise.id,
        count_completed: 0,
        completed: false,
        max_count: exercise.count,
      })) : [],
      completed: false,
    }));

    // Добавляем курс в прогресс пользователя
    await updateDoc(userProgressRef, {
      courses_progress: arrayUnion({
        id_course: courseId,
        progress: 0,
        workouts_progress: workoutsProgress,
      }),
    });

    // Добавляем UID пользователя в массив users этого курса
    await updateDoc(courseRef, {
      users: arrayUnion(uid),
    });

    console.log(`Course with ID ${courseId} successfully added to user ${uid}.`);
  } catch (error) {
    console.error("Error adding course to user:", error);
    throw error;
  }
};

// Function to remove a course from user's profile
export const removeCourseFromUser = async (uid: string, courseId: number) => {
  try {
    const db = getFirestore();
    const coursesRef = collection(db, "courses");

    // Запрос на курс по его уникальному ID
    const q = query(coursesRef, where("id", "==", courseId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`Course with ID ${courseId} does not exist.`);
      throw new Error(`Course with ID ${courseId} does not exist.`);
    }

    // Предполагаем, что ID уникален, и будет найден только один документ
    const courseDoc = querySnapshot.docs[0];
    const courseRef = courseDoc.ref;

    // Удаление UID пользователя из массива users этого курса
    await updateDoc(courseRef, {
      users: arrayRemove(uid),
    });

    // Удаление данных о прогрессе пользователя в этом курсе
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
    console.error("Error removing course from user:", error);
    throw error;
  }
};
