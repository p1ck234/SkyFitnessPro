import { useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@/context/userContext";



export const useUserCourses = (refreshKey: number) => {
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

          const q = query(coursesRef, where("users", "array-contains", user.uid));
          const querySnapshot = await getDocs(q);

          const courses = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));


          setUserCourses(courses);
        } catch (error) {
          setError("Ошибка при загрузке курсов");
        } finally {
          setLoading(false);
        }
      };

      fetchUserCourses();
    } else {
      setLoading(false);
    }
  }, [user, refreshKey]); // Добавляем refreshKey как зависимость

  return { userCourses, loading, error };
};
