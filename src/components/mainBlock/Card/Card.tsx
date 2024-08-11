// src/components/Card.tsx

import React from "react";
import { useCourses } from "@/context/courseContext";
import { ImageComponent } from "@/components/imageComponent/ImageComponent";

export function Card() {
  const { courses, loading, error } = useCourses(); // Используем контекст курсов

  if (loading) {
    return <p>Loading...</p>; // Или можно отобразить спиннер
  }

  if (error) {
    return <p>{error}</p>; // Отображаем ошибку, если она есть
  }

  return (
    <>
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-3xl shadow-lg mb-6 w-90 flex items-center flex-col"
        >
          <div className="relative">
            <ImageComponent filePath={course.imgMobile} />
            <button className="absolute top-2 right-5 flex items-center group">
              <img
                src="/img/icon/plus.svg"
                alt="Добавить курс"
                className="w-6 h-6"
              />
              <span className="opacity-0 group-hover:opacity-100 bg-white text-black text-sm px-2 py-1 rounded-md ml-2 absolute top-1/2 left-full transform -translate-y-1/2 translate-x-2 transition-opacity duration-300 shadow-lg hidden sm:block">
                Добавить курс
              </span>
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
          </div>
        </div>
      ))}
    </>
  );
}
