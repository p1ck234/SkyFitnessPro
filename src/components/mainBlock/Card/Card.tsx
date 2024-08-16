import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { useUser } from "@/context/userContext";
import { Button } from "@/components/Button";
import {
  addCourseToUser,
  removeCourseFromUser,
} from "@/services/firestoreService";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setIsProfile,
  setLoading,
  setProgress,
  setUserCourses,
} from "@/store/slices/courseSlice";
import { UserProgress } from "@/customHooks/userProgress";
import { ImageComponent } from "@/components/imageComponent/ImageComponent";
import { Course } from "@/types/types";
import { useAppDispatch } from "@/services/useDispatch";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

interface CardProps {
  onCourseRemoved?: () => void;
  onSelectWorkouts?: () => void;
  course: Course;
}

export function Card({ onCourseRemoved, onSelectWorkouts, course }: CardProps) {
  console.log("Card component rendered");

  const navigate = useNavigate();
  const progress =
    useSelector((state: RootState) => state.course.progress) ?? 0;
  const loading = useSelector((state: RootState) => state.course.loading);
  const isProfile = useSelector((state: RootState) => state.course.isProfile);
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const userCourses = useSelector(
    (state: RootState) => state.course.userCourses
  );

  UserProgress();

  useEffect(() => {
    dispatch(setIsProfile(location.pathname === constRoutes.PROFILE));
  }, [location.pathname, dispatch]);

  const handleAddCourse = async (courseId: string) => {
    if (user) {
      try {
        dispatch(setLoading(true));
        const courseExists = userCourses.some(
          (course) => course.id.toString() === courseId
        );
        if (courseExists) {
          alert("Этот курс уже есть в вашем профиле");
          return;
        }
        await addCourseToUser(user.uid, parseInt(courseId));
        alert("Курс успешно добавлен в ваш профиль");
        const db = getFirestore();
        const coursesRef = collection(db, "courses");
        const q = query(coursesRef, where("id", "==", courseId));
        const querySnapshot = await getDocs(q);

        // Убедимся, что мы получили полный объект курса
        const newCourse = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Course; // Приведение к типу Course
          return {
            ...data,
            id: doc.id,
          };
        })[0]; // Предполагаем, что курс найден

        if (!newCourse) {
          throw new Error("Курс не найден");
        }

        dispatch(setUserCourses([...userCourses, newCourse])); // Обновляем состояние Redux
      } finally {
        navigate(constRoutes.PROFILE);
        setLoading(false);
      }
    } else {
      alert("Для добавления курса нужно войти в систему");
    }
  };

  const handleRemoveCourse = async (courseId: string) => {
    if (user) {
      try {
        setLoading(false);
        await removeCourseFromUser(user.uid, parseInt(courseId));
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

  const handleResetProgress = async (courseId: string) => {
    if (user) {
      try {
        setLoading(true);
        await removeCourseFromUser(user.uid, parseInt(courseId));
        await addCourseToUser(user.uid, parseInt(courseId));
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

  const handleCourseAction: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    if (isProfile) {
      handleRemoveCourse(course.id.toString());
    } else {
      handleAddCourse(course.id.toString());
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (progress === 100) {
      handleResetProgress(course?.id?.toString());
    } else if (onSelectWorkouts) {
      onSelectWorkouts();
    } else if (course?.workouts && course.workouts.length > 0) {
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
          onClick={handleCourseAction}
        >
          {!loading ? (
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
