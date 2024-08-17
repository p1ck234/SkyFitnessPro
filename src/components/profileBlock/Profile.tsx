import React, { useState } from "react";
import { Card } from "../mainBlock/Card/Card";
import { Person } from "./Person";
import { useNavigate, useLocation } from "react-router-dom";
import { useModal } from "@/context/modalContext";
import { useUserCourses } from "@/customHooks/useUserCourses";
import { PopSelectWorkouts } from "../pops/PopSelectWorkout";
import { Course } from "@/types/types";
import { Button } from "../Button";

export const Profile = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [refreshKey, setRefreshKey] = useState(0);
  const { userCourses, loading, error } = useUserCourses(refreshKey);
  const [showSelectWorkouts, setShowSelectWorkouts] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // Исправляем тип состояния

  const handleOpenSelectWorkoutModal = (course: Course | null = null) => {
    if (course) {
      setSelectedCourse(course); // Сохраняем выбранный курс, если есть
      setShowSelectWorkouts(true);
    } else {
      navigate("/"); // Если нет курсов, перенаправляем на главную страницу
    }
  };

  const handleCourseRemoved = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleCloseModal = () => {
    setShowSelectWorkouts(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error loading courses: {error}</div>;
  }

  return (
    <div className="bg-gray-200 mt-14">
      <Person />
      <h1 className="text-lg md:text-xl lg:text-4xl font-bold my-8">
        Мои курсы
      </h1>
      <div className="flex gap-x-8 gap-y-5 mt-12 flex-row flex-wrap content-start">
        {userCourses.length > 0 ? (
          userCourses.map((course, index) => (
            <Card
              key={`${course.id}-${index}`}
              course={course}
              onCourseRemoved={handleCourseRemoved}
              onSelectWorkouts={() => handleOpenSelectWorkoutModal(course)}
            />
          ))
        ) : (
          <div className="w-full flex justify-center">
            <button
              className="bg-customGreen text-black py-2 px-6 rounded-full mt-4"
              onClick={() => handleOpenSelectWorkoutModal(null)}
            >
              Выбрать тренировки
            </button>
          </div>
        )}
      </div>

      {showSelectWorkouts && selectedCourse && (
        <PopSelectWorkouts
          workouts={selectedCourse?.workouts || []} // Передаем тренировки выбранного курса
          courseId={selectedCourse.id} // Передаем идентификатор курса
          onClose={handleCloseModal} // Закрытие попапа
        />
      )}
      <div className="flex justify-center">
        <Button className="h-12 w-32">
          <a href="#heading-section">Наверх ↑</a>
        </Button>
      </div>
    </div>
  );
};
