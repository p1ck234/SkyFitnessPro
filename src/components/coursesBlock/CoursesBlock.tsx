import React, { useState, useEffect } from "react";
import { ImageComponent } from "../imageComponent/ImageComponent";
import { Course } from "@/types/types";

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
      <section
        className="relative p-0 sm:p-8 mb-6 items-center"
        style={{ height: "300px" }}
      >
        <h1 className="absolute text-3xl md:text-6xl font-bold text-white z-10 hidden phone:block p-6">
          {course.name}
        </h1>

        {isImageLoading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="loader" /> {/* Лоадер */}
          </div>
        )}

        <ImageComponent
          filePath={isMobile ? course.imgMobile : course.img} // Выбираем изображение на основе ширины экрана
          className="w-full h-auto rounded-lg object-cover"
          onLoad={() => setIsImageLoading(false)} 
          onError={() => setIsImageLoading(false)} 
        />
      </section>
    </div>
  );
};

export default CoursesBlock;
