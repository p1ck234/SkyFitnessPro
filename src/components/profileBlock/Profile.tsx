import Header from "../header/Header";
import { Card } from "../mainBlock/Card/Card";
import { Person } from "./Person";
import { useModal } from "@/context";
import { useNavigate } from "react-router-dom";
import { constRoutes } from "@/lib/paths";

export const Profile = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();

  const handleOpenSelectWorkoutModal = () => {
    openModal("select_workouts");
    navigate(constRoutes.SELECT_WORKOUTS, { state: { backgroundLocation: location } });
  };

  return (
    <div className="bg-gray-200">
      <div className="px-48 pt-10">
        <Person />
        <h1 className="text-sm sm:text-lg md:text-xl lg:text-4xl font-bold my-8">
          Мои курсы
        </h1>
        <div>
          {/* здесь будет массив курсов, выбранных пользователем */}
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
