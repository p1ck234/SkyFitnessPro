import React, { useState } from "react";
import { Card } from "../mainBlock/Card/Card";
import { Person } from "./Person";
import { useNavigate, useLocation } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { useModal } from "@/context/modalContext";
import { useUserCourses } from "@/customHooks/useUserCourses";

export const Profile = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [refreshKey, setRefreshKey] = useState(0);  // Ключ для обновления данных
  const { userCourses, loading, error } = useUserCourses(refreshKey);

  const handleOpenSelectWorkoutModal = () => {
    openModal("select_workouts");
    navigate(constRoutes.SELECT_WORKOUTS, {
      state: { backgroundLocation: location },
    });
  };

  const handleCourseRemoved = () => {
    console.log("Обновление профиля после удаления курса");
    setRefreshKey((prevKey) => prevKey + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading courses: {error}</div>;
  }

  return (
    <div className="bg-gray-200 mt-14">
      <Person />
      <h1 className="text-lg md:text-xl lg:text-4xl font-bold my-8">Мои курсы</h1>
      <div className="flex gap-x-8 gap-y-5 mt-12 flex-row flex-wrap content-start">
        {userCourses.length > 0 ? (
          userCourses.map((course, index) => (
            <Card
              key={`${course.id}-${index}`}
              course={course}
              isProfile={true}
              onCourseRemoved={handleCourseRemoved} // Передаем callback для удаления
            />
          ))
        ) : (
          <p>Вы еще не добавили курсы.</p>
        )}
      </div>
      <button
        className="bg-customGreen text-black py-2 px-6 rounded-full mt-4"
        onClick={handleOpenSelectWorkoutModal}
      >
        Выбрать тренировки
      </button>
    </div>
  );
};
