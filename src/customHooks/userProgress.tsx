import { useUser } from "@/context/userContext";
import { setProgress } from "@/store/slices/courseSlice";
import { RootState } from "@/store/store";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const UserProgress = () => {
    const { user } = useUser();
    const isProfile = useSelector((state:RootState) => state.course.isProfile)
    const course = useSelector((state:RootState) => state.course.course)

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (user && isProfile) {
        try {
          const db = getFirestore();
          const userRef = doc(db, "dataUsers", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            const courseProgress = userData.courses_progress?.find(
              (cp: any) => cp.id_course === course?.id
            );

            if (courseProgress) {
              setProgress(courseProgress.progress || 0);
            }
          }
        } catch (error) {
        }
      }
    };

    fetchUserProgress();
  }, [user, course?.id, isProfile]);
};
