import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImageComponent } from "@/components/imageComponent/ImageComponent";
import { constRoutes } from "@/lib/paths";
import { useUser } from "@/context/userContext";
import { Button } from "@/components/Button";
import {
  addCourseToUser,
  removeCourseFromUser,
} from "@/services/firestoreService";
import { Course } from "@/types/types";
import { getFirestore, doc, getDoc } from "firebase/firestore";

interface CardProps {
  course: Course;
  isProfile?: boolean;
  onCourseRemoved?: () => void;
  onSelectWorkouts?: () => void;
}

export function Card({
  course,
  isProfile = false,
  onCourseRemoved,
  onSelectWorkouts,
}: CardProps) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

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
              (cp: any) => cp.id_course === course.id
            );

            if (courseProgress) {
              setProgress(courseProgress.progress || 0);
            }
          }
        } catch (error) {
          console.error("Ошибка при загрузке прогресса пользователя:", error);
        }
      }
    };

    fetchUserProgress();
  }, [user, course.id, isProfile]);

  const handleAddCourse = async (courseId: number) => {
    if (user) {
      try {
        setLoading(true);
        await addCourseToUser(user.uid, courseId);
        alert("Курс успешно добавлен в ваш профиль");
      } catch (error) {
        console.error("Ошибка при добавлении курса:", error);
        alert("Не удалось добавить курс");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Для добавления курса нужно войти в систему");
    }
  };

  const handleRemoveCourse = async (courseId: number) => {
    if (user) {
      try {
        setLoading(true);
        await removeCourseFromUser(user.uid, courseId);
        alert("Курс успешно удален из вашего профиля");

        if (onCourseRemoved) {
          onCourseRemoved();
        }
      } catch (error) {
        console.error("Ошибка при удалении курса:", error);
        alert("Не удалось удалить курс");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResetProgress = async (courseId: number) => {
    if (user) {
      try {
        setLoading(true);
        await removeCourseFromUser(user.uid, courseId);
        await addCourseToUser(user.uid, courseId);
        setProgress(0); // Обновляем прогресс в состоянии
        alert("Прогресс курса был сброшен");
      } catch (error) {
        console.error("Ошибка при сбросе прогресса:", error);
        alert("Не удалось сбросить прогресс курса");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`${constRoutes.COURSE}/${id}`);
  };

  const handleCourseAction = (e: React.MouseEvent, courseId: number) => {
    e.stopPropagation();
    if (isProfile) {
      handleRemoveCourse(courseId);
    } else {
      handleAddCourse(courseId);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (progress === 100) {
      handleResetProgress(parseInt(course.id));
    } else if (onSelectWorkouts) {
      onSelectWorkouts();
    } else if (course.workouts && course.workouts.length > 0) {
      const firstWorkoutId = course.workouts[0].id;
      navigate(`/workouts/${course.id}/${firstWorkoutId}`); // Переход на страницу тренировки с курсом и тренировкой
    } else {
      handleCardClick(course.id);
    }
  };

  return (
    <div
      key={course.id}
      className="bg-white rounded-3xl shadow-lg mb-6 w-90 flex items-center flex-col cursor-pointer"
      onClick={() => handleCardClick(course.id)}
    >
      <div className="relative">
        <ImageComponent filePath={course.imgMobile} />
        <button
          className="absolute top-2 right-5 flex items-center group"
          onClick={(e) => handleCourseAction(e, parseInt(course.id))}
          disabled={loading}
        >
          {loading ? (
            <div className="loader"></div>
          ) : (
            <div>
              <img
                src={isProfile ? "/img/icon/minus.svg" : "/img/icon/plus.svg"}
                alt={isProfile ? "Удалить курс" : "Добавить курс"}
                className="w-6 h-6"
              />
              <span className="z-10 opacity-0 group-hover:opacity-100 bg-white text-black text-sm px-2 py-1 rounded-md ml-2 absolute top-1/2 left-full transform -translate-y-1/2 translate-x-2 transition-opacity duration-300 shadow-lg hidden sm:block">
                {isProfile ? "Удалить курс" : "Добавить курс"}
              </span>
            </div>
          )}
        </button>
      </div>
      <div className="w-80 p-3 flex flex-col">
        <h3 className="font-bold text-2xl py-5 phone:text-3xl">
          {course.name}
        </h3>
        <div className="flex flex-row flex-wrap gap-4">
          <div className="bg-gray-200 rounded-lg px-2 py-1 flex items-center gap-1">
            <img src="icons/calendar.svg" alt="calendar" />
            <p className="text-base">{course.days} дней</p>
          </div>
          <div className="bg-gray-200 rounded-lg px-2 py-1 flex items-center gap-1">
            <img src="icons/time.svg" alt="time" />
            <p className="text-base">{course.range} мин/день</p>
          </div>
          <div className="bg-gray-200 rounded-lg px-2 py-1 flex items-center gap-1">
            <img src="icons/difficult.svg" alt="difficulty" />
            <p className="text-base">Сложность</p>
          </div>
        </div>
        {isProfile && (
          <div className="my-4">
            <p>Прогресс {progress.toFixed(1)}%</p> {/* Округление до десятых */}
            <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
              <div
                className="h-1 bg-custumBlue"
                style={{ width: `${progress.toFixed(1)}%` }}
              ></div>
            </div>
            <div>
              <Button width="w-full" onClick={handleButtonClick}>
                {progress === 100
                  ? "Начать заново"
                  : progress > 0
                  ? "Продолжить"
                  : "Начать тренировки"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
