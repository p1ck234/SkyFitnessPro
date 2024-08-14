import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useUser } from "@/context/userContext";
import { useModal } from "@/context/modalContext";

const ExersicesProgress = ({
  workout,
  courseId,
}: {
  workout: any;
  courseId: string;
}) => {
  const { user } = useUser();
  const { openModal } = useModal();
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Тренировка для отображения:", workout);

    if (
      !user ||
      !courseId ||
      !workout ||
      !workout.exercise ||
      workout.exercise.length === 0
    ) {
      console.log("Необходимые данные отсутствуют");
      setLoading(false);
      return;
    }

    const fetchProgressData = async () => {
      console.log(
        `Загрузка прогресса для courseId: ${courseId} и workoutId: ${workout.id}`
      );

      const db = getFirestore();
      const userRef = doc(db, "dataUsers", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      if (userData && userData.courses_progress) {
        const courseProgress = userData.courses_progress.find(
          (cp: any) => cp.id_course === parseInt(courseId)
        );
        if (courseProgress) {
          const workoutProgress = courseProgress.workouts_progress.find(
            (wp: any) => wp.id_workout === workout.id
          );
          if (workoutProgress) {
            setProgress(workoutProgress.exercises_progress);
          } else {
            console.log("Прогресс тренировки не найден");
          }
        } else {
          console.log("Прогресс курса не найден");
        }
      } else {
        console.log("Данные пользователя не найдены");
      }

      setLoading(false);
    };

    fetchProgressData();
  }, [courseId, workout, user]);

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (!workout.exercise || workout.exercise.length === 0) {
    return <div>Данные о тренировке не найдены.</div>;
  }

  const handleOpenProgressModal = () => {
    console.log("Button clicked, opening modal...");
    openModal("progress_update", workout);
  };

  return (
    <div className="border rounded-3xl bg-white p-14 shadow-lg mt-12 mb-12">
      <h1 className="font-medium mb-3 text-3xl">
        Упражнения тренировки {workout.id}
      </h1>
      <div className="grid grid-cols-3 gap-5 text-lg">
        {workout.exercise.map((exercise: any, index: number) => (
          <div key={exercise.id}>
            <p>
              {exercise.name} - Прогресс:{" "}
              {progress[index]?.count_completed || 0}/{exercise.count}
            </p>
            <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
              <div
                className="h-1 bg-custumBlue"
                style={{
                  width: `${
                    ((progress[index]?.count_completed || 0) / exercise.count) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleOpenProgressModal}
      >
        Записать/обновить свой прогресс
      </button>
    </div>
  );
};

export default ExersicesProgress;
