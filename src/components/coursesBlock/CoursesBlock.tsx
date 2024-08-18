import React, { useState, useEffect } from "react";
import { ImageComponent } from "../imageComponent/ImageComponent";
import { Course } from "@/types/types";
import { Button } from "../shared/Button";

interface CoursesBlockProps {
  course: Course;
}

const CoursesBlock: React.FC<CoursesBlockProps> = ({ course }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsMobile(window.innerWidth <= 375);
    };

    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <div>
      <section className="flex p-0 mt-12 items-center w-full">
        <h1 className="absolute text-3xl md:text-6xl font-bold text-white z-10 hidden phone:block p-6">
          {course.name}
        </h1>

        {isImageLoading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="loader" />
          </div>
        )}

        <ImageComponent
          filePath={isMobile ? course.imgMobile : course.img} // Выбираем изображение на основе ширины экрана
          className={`w-full h-auto rounded-lg object-cover ${
            isImageLoading ? "hidden" : "block"
          }`}
          onLoad={() => setIsImageLoading(false)} // Убираем лоадер после загрузки изображения
          onError={() => setIsImageLoading(false)} // Убираем лоадер если произошла ошибка при загрузке
        />
      </section>
    </div>
  );
};

export default CoursesBlock;
