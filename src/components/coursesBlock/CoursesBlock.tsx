import React, { useState } from "react";
import { ImageComponent } from "../imageComponent/ImageComponent";
import { Course } from "@/types/types";

interface CoursesBlockProps {
  course: Course; 
}

const CoursesBlock: React.FC<CoursesBlockProps> = ({ course }) => {
  const [isImageLoading, setIsImageLoading] = useState(true); // Состояние загрузки изображения

  return (
    <div>
      <section
        className="relative p-8 mb-6 items-center"
        style={{ height: "300px" }}
      >
        <h1 className="absolute text-3xl md:text-6xl font-bold text-white z-10 hidden phone:block p-6">
          {course.name}
        </h1>

        {isImageLoading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="loader" /> {/* Лоадер, можно использовать любой компонент для отображения загрузки */}
          </div>
        )}

        <ImageComponent
          filePath={course.img}
          className="w-full h-auto rounded-lg object-cover"
          onLoad={() => setIsImageLoading(false)} // Убираем лоадер после загрузки изображения
          onError={() => setIsImageLoading(false)} // Убираем лоадер если произошла ошибка при загрузке
        />
      </section>
    </div>
  );
};

export default CoursesBlock;
