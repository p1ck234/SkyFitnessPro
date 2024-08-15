import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImageComponent } from "@/components/imageComponent/ImageComponent";
import { constRoutes } from "@/lib/paths";
import { useUser } from "@/context/userContext";
import { Button } from "@/components/Button";
import { Course } from "@/types/types";
import { useModal } from "@/context/modalContext";
import { fetchAddCourse, fetchRemoveCourse } from "@/store/slices/courseSlice";
import { useAppDispatch } from "@/services/useDispatch";

interface CardProps {
  course: Course;
}

export function Card({ course }: CardProps) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  const [isProfile, setIsProfile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsProfile(location.pathname === "/profile");
  }, [location]);

  const handleAddCourse = async (courseId: string) => {
    if (!user) {
      alert("Please log in to add a course.");
      return;
    }
    if (!courseId || typeof courseId !== 'string') {
      console.error("Invalid courseId:", courseId);
      alert("Invalid course ID. Please try again.");
      return;
    }
    const parsedCourseId = parseInt(courseId, 10);
    if (isNaN(parsedCourseId)) {
      console.error("Invalid courseId:", courseId);
      alert("Invalid course ID. Please try again.");
      return;
    }
    setLoading(true);
    try {
      // Передайте оба параметра: courseId и userId
      await dispatch(fetchAddCourse({ courseId, userId: user.uid })).unwrap();
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCourse = async (courseId: string) => {
    if (!user) {
      alert("Please log in to remove a course.");
      return;
    }
    if (!courseId || typeof courseId !== 'string') {
      console.error("Invalid courseId:", courseId);
      alert("Invalid course ID. Please try again.");
      return;
    }
  
    const parsedCourseId = parseInt(courseId, 10);
    if (isNaN(parsedCourseId)) {
      console.error("Invalid courseId:", courseId);
      alert("Invalid course ID. Please try again.");
      return;
    }
    setLoading(true);
    try {
      await dispatch(fetchRemoveCourse(courseId)).unwrap();
    } catch (error) {
      console.error("Error removing course:", error);
      alert("Failed to remove course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`${constRoutes.COURSE}/${id}`);
  };

  const handleCourseAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProfile) {
      handleRemoveCourse(course.id);
    } else {
      handleAddCourse(course.id);
    }
  };

  const handleOpenSelectWorkoutModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Open Select Workout Modal clicked");
    openModal("select_workouts");
    navigate(constRoutes.SELECT_WORKOUTS, {
      state: { backgroundLocation: location },
    });
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
          disabled={loading}
          onClick={handleCourseAction}
        >
          {/* {loading ? (
            <div className="loader"></div> // Замените это на ваш компонент или стили лоадера
          ) : ( */}
          <img
            src={isProfile ? "/img/icon/minus.svg" : "/img/icon/plus.svg"}
            alt={isProfile ? "Удалить курс" : "Добавить курс"}
            className="w-6 h-6"
          />
          {/* )} */}
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
        {!isProfile && (
          <div className="my-4">
            <p>Прогресс {course.progress || 0}%</p>
            <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
              <div
                className="h-1 bg-custumBlue"
                style={{ width: `${course.progress || 0}%` }}
              ></div>
            </div>
            <div>
              <Button width="w-full" onClick={handleOpenSelectWorkoutModal}>
                {!course.progress ? "Начать тренировки" : "Продолжить"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
