import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useUser } from "@/context/userContext";
import { useModal } from "@/context/modalContext";
import { Button } from "@/components/shared/Button"; // Assuming you have a Button component

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
  const [progressUpdated, setProgressUpdated] = useState(false);
  const [hasCompletedExercises, setHasCompletedExercises] = useState(false);

  useEffect(() => {
    if (!user || !courseId || !workout || !workout.exercise) {
      setLoading(false);
      return;
    }

    const fetchProgressData = async () => {
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
            // Check if there are any completed exercises
            const hasCompleted = workoutProgress.exercises_progress.some(
              (ep: any) => ep.completed
            );
            setHasCompletedExercises(hasCompleted);
          }
        }
      }
      setLoading(false);
    };

    fetchProgressData();
  }, [courseId, workout, user, progressUpdated]);

  const handleOpenProgressModal = () => {
    openModal("progress_update", {
      workout,
      onSave: () => setProgressUpdated((prev) => !prev),
    });
  };

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (!workout.exercise || workout.exercise.length === 0) {
    return <div>Данные о тренировке не найдены.</div>;
  }

  return (
    <div className="border rounded-3xl bg-white p-14 shadow-lg mt-12 mb-12">
      <h1 className="font-medium mb-3 text-3xl mb-8">
        Упражнения тренировки {workout.id}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-lg md:text-xl">
        {workout.exercise.map((exercise: any, index: number) => (
          <div key={exercise.id} className="mb-4 flex flex-col justify-between">
            <p className="mb-2 text-center flex-grow">
              {exercise.name} - Прогресс:{" "}
              {progress[index]?.count_completed || 0}/{exercise.count}
            </p>
            <div className="relative w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-2">
              <div
                className="absolute top-0 left-0 h-full bg-custumBlue rounded-full"
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

      <div className="flex">
        <Button
          className="flex-1 max-w-80 min-w-60 mt-8"
          onClick={handleOpenProgressModal}
        >
          {hasCompletedExercises
            ? "Обновить свой прогресс"
            : "Записать свой прогресс"}
        </Button>
      </div>
    </div>
  );
};

export default ExersicesProgress;
