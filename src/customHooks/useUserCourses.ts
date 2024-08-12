// src/customHooks/useUserCourses.ts

import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { useUser } from "@/context/userContext";

export const useUserCourses = () => {
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const fetchUserCourses = async () => {
        try {
          const db = getFirestore();
          const coursesRef = collection(db, "courses");

          const q = query(
            coursesRef,
            where("users", "array-contains", user.uid)
          );
          const querySnapshot = await getDocs(q);

          const courses = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const userProgressRef = doc(db, "dataUsers", user.uid);
          const userProgressDoc = await getDoc(userProgressRef);

          if (userProgressDoc.exists()) {
            const userProgressData = userProgressDoc.data();

            const coursesWithProgress = courses.map((course) => {
              const courseProgress = userProgressData.courses_progress.find(
                (progress: any) => progress.id_course === parseInt(course.id)
              );

              return {
                ...course,
                progress: courseProgress ? courseProgress.progress : 0,
              };
            });

            setUserCourses(coursesWithProgress);
          } else {
            setUserCourses(courses);
          }

          console.log("Fetched courses:", courses);
        } catch (error) {
          console.error("Error fetching user courses:", error);
          setError("Ошибка при загрузке курсов");
        } finally {
          setLoading(false);
        }
      };

      fetchUserCourses();
    } else {
      setLoading(false);
    }
  }, [user]);

  return { userCourses, loading, error };
};
