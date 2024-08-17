import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { useUser } from "@/context/userContext";
import { Button } from "@/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  fetchAddCourse,
  fetchRemoveCourse,
  fetchResetProgress,
  fetchUserProgress,
  setIsProfile,
  setRemoveCourse,
} from "@/store/slices/courseSlice";
import { UserProgress } from "@/customHooks/userProgress";
import { ImageComponent } from "@/components/imageComponent/ImageComponent";
import { Course } from "@/types/types";
import { useAppDispatch } from "@/services/useDispatch";

interface CardProps {
  course: Course;
  isProfile?: boolean;
  onCourseRemoved?: () => void;
  onSelectWorkouts?: () => void;
}
export function Card({ course, onSelectWorkouts, onCourseRemoved }: CardProps) {
  console.log("Card component rendered");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useUser();

  const progress = useSelector(
    (state: RootState) => state.course.progress[course.id.toString()] ?? 0
  );
  const loading = useSelector((state: RootState) => state.course.loading);
  const isProfile = useSelector((state: RootState) => state.course.isProfile);
  const handleCourseRemoved = useSelector(
    (state: RootState) => state.course.refreshKey
  );
  const progressObj = useSelector(
    (state: RootState) => state.course.progress
  ) ?? { value: 0 };
  const progressValue = progressObj.value; // Извлечение числового значения
  const formattedProgress = typeof progress === 'number' ? progress.toFixed(1) : '0.0';
  const [isLoading, setIsLoading] = useState(false);



  UserProgress();

  useEffect(() => {
    if (user) {
      dispatch(
        fetchUserProgress({ uid: user.uid, courseId: course.id.toString() })
      );
    }
  }, [dispatch, user, course.id]);

  useEffect(() => {
    dispatch(setIsProfile(location.pathname === constRoutes.PROFILE));
  }, [location.pathname, dispatch]);

  const handleAddCourse = () => {
    setIsLoading(true);
    if (user && course) {
      const uid = user.uid;
      const courseId = course.id.toString();
      dispatch(fetchAddCourse({ uid, courseId }))
        .unwrap()
        .then(() => {
          navigate(constRoutes.PROFILE);
        })
        .catch((error) => {
          console.error("Ошибка при добавлении курса:", error);
          setIsLoading(false);
        });
    }
  };

  const handleRemoveCourse = () => {
    setIsLoading(true);
    if (user && course) {
      const uid = user.uid;
      const courseId = course.id.toString();
      dispatch(fetchRemoveCourse({ uid, courseId }))
        .unwrap()
        .then(() => {
          dispatch(setRemoveCourse(course)); // Обновление состояния после удаления
        })
        .then(() => {
          if (onCourseRemoved) {
            onCourseRemoved();
          }
        })
        .catch((error) => {
          console.error("Ошибка при удалении курса:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // const handleResetProgress = async (courseId: string) => {
  //   if (user) {
  //     try {
  //       dispatch(setLoading(true));
  //       await removeCourseFromUser(user.uid, parseInt(courseId));
  //       await addCourseToUser(user.uid, parseInt(courseId));
  //       dispatch(setProgress(0)); // Обновляем прогресс в состоянии
  //       alert("Прогресс курса был сброшен");
  //     } catch (error) {
  //       console.error("Ошибка при сбросе прогресса:", error);
  //       alert("Не удалось сбросить прогресс курса");
  //     } finally {
  //       dispatch(setLoading(false));
  //     }
  //   }
  // };

  const handleCardClick = (id: string) => {
    navigate(`${constRoutes.COURSE}/${id}`);
  };

  const handleCourseAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isProfile) {
      handleRemoveCourse();
    } else {
      handleAddCourse();
    }
  };

  const handleButtonClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (progress === 100) {
      try {
        await dispatch(
          fetchResetProgress({ uid: user?.uid || '', courseId: course.id.toString() })
        ).unwrap();
        alert("Прогресс сброшен");
      } catch (error) {
        alert("Не удалось сбросить прогресс");
      }
    } else if (onSelectWorkouts) {
      onSelectWorkouts();
    } else if (course?.workouts && course.workouts.length > 0) {
      const firstWorkoutId = course.workouts[0].id;
      navigate(`/workouts/${course.id}/${firstWorkoutId}`);
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
          {isLoading ? (
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
            <p>
              Прогресс{" "}
              {typeof progress === "number" ? progress.toFixed(1) : "N/A"}%
            </p>
            <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
              <div
                className="h-1 bg-custumBlue"
                style={{ width: `${formattedProgress}%` }}
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
