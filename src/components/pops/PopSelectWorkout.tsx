import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PopSelectWorkoutsProps {
  workouts: any[]; // Обновите тип для работы с тренировками курса
  onClose: () => void; // Добавьте функцию для закрытия попапа
}

export const PopSelectWorkouts = ({
  workouts,
  onClose,
}: PopSelectWorkoutsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkedWorkouts, setCheckedWorkouts] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const toggleCheckbox = (id: number) => {
    setCheckedWorkouts((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((workoutId) => workoutId !== id)
        : [...prevChecked, id]
    );
  };

  const openWorkout = () => {
    if (checkedWorkouts.length > 0) {
      alert("Страницы еще не реализованы");
    } else {
      alert("Выберите тренировку");
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    onClose(); // Закрываем попап
  };

  if (!isModalVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="relative bg-white rounded-3xl shadow-xl p-4 w-100 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="flex flex-col items-center w-full rounded-xl">
          <h1 className="text-center text-3xl mb-6">Выберите тренировку</h1>
          <ul className="w-full flex flex-col overflow-y-auto max-h-[60vh] scrollbar-thin">
            {workouts.map((workout) => (
              <li
                key={workout.id}
                className="flex items-center mb-2 border-b border-gray-400"
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedWorkouts.includes(workout.id)}
                    onChange={() => toggleCheckbox(workout.id)}
                    className="hidden"
                  />
                  <span
                    className={`inline-block h-4 w-4 border border-black rounded-full mr-2 flex-shrink-0 flex justify-center items-center ${
                      checkedWorkouts.includes(workout.id)
                        ? "bg-customGreen border-none"
                        : "bg-white"
                    }`}
                  >
                    {checkedWorkouts.includes(workout.id) && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </span>
                  <div>
                    <span className="text-xl">{workout.name}</span>
                    <p className="text-sm mb-2">{workout.url_desc}</p>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
};
