import CoursesBlock from "../coursesBlock/CoursesBlock";
import Header from "../header/Header";
import { Card } from "../mainBlock/Card/Card";
import { Person } from "./Person";
import { useNavigate, useLocation } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { useModal } from "@/context/modalContext";

export const Profile = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenSelectWorkoutModal = () => {
    openModal("select_workouts");
    navigate(constRoutes.SELECT_WORKOUTS, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div className="bg-gray-200 mt-14">
      <div>
        <Person />
        <h1 className="text-sm sm:text-lg md:text-xl lg:text-4xl font-bold my-8">
          Мои курсы
        </h1>
        <div className="flex flex-wrap justify-between">
          {/* здесь будет массив курсов, выбранных пользователем */}
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <button
          className="bg-customGreen text-black py-2 px-6 rounded-full mt-4"
          onClick={handleOpenSelectWorkoutModal}
        >
          Выбрать тренировки
        </button>
      </div>
    </div>
  );
};
