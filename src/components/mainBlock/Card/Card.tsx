import React from "react";
import { useNavigate } from "react-router-dom";
import { ImageComponent } from "@/components/imageComponent/ImageComponent";
import { constRoutes } from "@/lib/paths";
import { useUser } from "@/context/userContext";
import { Button } from "@/components/Button";
import { addCourseToUser } from "@/services/firestoreService";
import { Course } from "@/types/types";


interface CardProps {
  course: Course;
  isProfile?: boolean;
}

export function Card({ course, isProfile = false }: CardProps) {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleAddCourse = async (courseId: string) => {
    if (user) {
      try {
        await addCourseToUser(user.uid, parseInt(courseId));
        alert("Курс успешно добавлен в ваш профиль");
      } catch (error) {
        console.error("Ошибка при добавлении курса:", error);
        alert("Не удалось добавить курс");
      }
    } else {
      alert("Для добавления курса нужно войти в систему");
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`${constRoutes.COURSE}/${id}`);
  };

  return (
    <div
      key={course.id}
      className="bg-white rounded-3xl shadow-lg mb-6 w-90 flex items-center flex-col cursor-pointer"
      onClick={() => handleCardClick(course.id)}
    >
      <div className="relative">
        <ImageComponent filePath={course.imgMobile} />
        {!isProfile && (
          <button
            className="absolute top-2 right-5 flex items-center group"
            onClick={(e) => {
              e.stopPropagation();
              handleAddCourse(course.id);
            }}
          >
            <img
              src="/img/icon/plus.svg"
              alt="Добавить курс"
              className="w-6 h-6"
            />
            <span className="z-10 opacity-0 group-hover:opacity-100 bg-white text-black text-sm px-2 py-1 rounded-md ml-2 absolute top-1/2 left-full transform -translate-y-1/2 translate-x-2 transition-opacity duration-300 shadow-lg hidden sm:block">
              Добавить курс
            </span>
          </button>
        )}
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
            <p>Прогресс {course.progress || 0}%</p>
            <div className="mb-6 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
              <div
                className="h-1 bg-custumBlue"
                style={{ width: `${course.progress || 0}%` }}
              ></div>
            </div>
            <div>
              <Button width="w-full">
                {!course.progress ? "Начать тренировки" : "Продолжить"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
