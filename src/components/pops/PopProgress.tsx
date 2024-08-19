import React, { useState, useEffect } from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { useUser } from "@/context/userContext";
import { useModal } from "@/context/modalContext";
import { useNavigate } from "react-router-dom";
import { useCourses } from "@/context/courseContext";
import { Button } from "../shared/Button";

interface Exercise {
  id: number;
  count: number;
  name: string;
  count_completed?: number;
  completed?: boolean;
}

const PopProgress = () => {
  const { closeModal, modalData } = useModal();
  const { workout, onSave } = modalData || {};
  const { user } = useUser();
  const { courses } = useCourses();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние для отслеживания загрузки данных
  const [progress, setProgress] = useState<number[]>([]); // Состояние для прогресса

  useEffect(() => {
    if (user && workout) {
      const fetchProgressData = async () => {
        const db = getFirestore();
        const userRef = doc(db, "dataUsers", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const courseId = parseInt(location.pathname.split("/")[2]);

          const courseProgress = userData.courses_progress.find(
            (course: any) => course.id_course === courseId
          );

          if (courseProgress) {
            const workoutProgress = courseProgress.workouts_progress.find(
              (wp: any) => wp.id_workout === workout.id
            );

            if (workoutProgress) {
              setProgress(
                workout.exercise.map((exercise: Exercise) => {
                  const exerciseProgress =
                    workoutProgress.exercises_progress.find(
                      (ep: any) => ep.id_exercise === exercise.id
                    );
                  return exerciseProgress?.count_completed || 0;
                })
              );
            } else {
              setProgress(workout.exercise.map(() => 0));
            }
          }
        }
        setIsLoading(false); // Устанавливаем isLoading в false после завершения загрузки данных
      };

      fetchProgressData();
    }
  }, [user, workout]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
        <div className="loader"></div> {/* Ваш лоадер */}
      </div>
    );
  }

  if (!workout || !workout.exercise) {
    return <div>Данные о тренировке не найдены.</div>;
  }

  const calculateTotalExercisesInCourse = (course: any): number => {
    return course.workouts.reduce((totalExercises: number, workout: any) => {
      return totalExercises + workout.exercise.length;
    }, 0);
  };

  const calculateCompletedExercises = (courseProgress: any): number => {
    return courseProgress.workouts_progress.reduce(
      (completedExercises: number, workoutProgress: any) => {
        return (
          completedExercises +
          workoutProgress.exercises_progress.filter(
            (exerciseProgress: any) => exerciseProgress.completed
          ).length
        );
      },
      0
    );
  };

  const calculateProgressPercentage = (
    course: any,
    courseProgress: any
  ): number => {
    const totalExercises = calculateTotalExercisesInCourse(course);
    const completedExercises = calculateCompletedExercises(courseProgress);

    return (completedExercises / totalExercises) * 100;
  };

  const handleSave = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    setLoading(true);

    const db = getFirestore();
    const userRef = doc(db, "dataUsers", user.uid);

    try {
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      let updatedCoursesProgress = userData?.courses_progress || [];

      const courseId = parseInt(location.pathname.split("/")[2]);

      const courseIndex = updatedCoursesProgress.findIndex(
        (cp: any) => cp.id_course === courseId
      );

      const updatedProgress = workout.exercise.map(
        (exercise: Exercise, index: number) => ({
          id_exercise: exercise.id,
          count_completed: Math.min(progress[index], exercise.count),
          max_count: exercise.count,
          completed: progress[index] >= exercise.count,
        })
      );

      const workoutCompleted = updatedProgress.every(
        (exercise: any) => exercise.completed
      );

      const workoutProgress = {
        id_workout: workout.id,
        exercises_progress: updatedProgress,
        completed: workoutCompleted,
      };

      if (courseIndex !== -1) {
        const workoutIndex = updatedCoursesProgress[
          courseIndex
        ].workouts_progress.findIndex(
          (wp: any) => wp.id_workout === workout.id
        );

        if (workoutIndex !== -1) {
          updatedCoursesProgress[courseIndex].workouts_progress[workoutIndex] =
            workoutProgress;
        } else {
          updatedCoursesProgress[courseIndex].workouts_progress.push(
            workoutProgress
          );
        }
      } else {
        updatedCoursesProgress.push({
          id_course: courseId,
          workouts_progress: [workoutProgress],
        });
      }

      const course = courses.find((c: any) => c.id === courseId);

      if (!course) {
        console.error("Курс не найден");
        return;
      }

      const courseProgress = updatedCoursesProgress.find(
        (cp: any) => cp.id_course === courseId
      );

      const newProgressPercentage = calculateProgressPercentage(
        course,
        courseProgress
      );

      await updateDoc(userRef, {
        courses_progress: updatedCoursesProgress.map((cp: any) =>
          cp.id_course === courseId
            ? { ...cp, progress: newProgressPercentage }
            : cp
        ),
      });

      console.log("Progress saved successfully");
      onSave();
    } catch (error) {
      console.error("Error saving progress:", error);
    } finally {
      setLoading(false);
    }

    closeModal();
    navigate(location.pathname, { replace: true });
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="relative bg-white rounded-3xl shadow-xl p-8 w-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Мой прогресс</h2>
        {workout.exercise.map((exercise: Exercise, index: number) => (
          <div key={exercise.id} className="mb-4">
            <label className="block text-lg font-medium">{exercise.name}</label>
            <input
              type="number"
              className="mt-2 p-2 border rounded w-full"
              value={progress[index]}
              onChange={(e) => {
                const newProgress = [...progress];
                newProgress[index] = Math.min(
                  parseInt(e.target.value),
                  exercise.count
                );
                setProgress(newProgress);
              }}
              max={exercise.count}
            />
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Загрузка..." : "Сохранить"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopProgress;
