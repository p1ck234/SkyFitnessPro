import { workouts } from "@/utils/workouts";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const PopSelectWorkouts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkedWorkouts, setCheckedWorkouts] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const toggleCheckbox = (id: number) => {
    setCheckedWorkouts((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((workoutid) => workoutid !== id)
        : [...prevChecked, id]
    );
  };

  const openWorkout = () => {
    // переход на выбранный урок (еше не реализованно)
    if (checkedWorkouts.length > 0) {
      alert("Страницы еще не реализованы");
      //   const selectedWorkoutId = checkedWorkouts[0];
      //   navigate("/worcouts/${selectedWorkoutId}");
    } else {
      alert("Выберите тренировку");
    }
  };

  if (!isModalVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
        <div className="relative bg-white rounded-3xl shadow-xl p-4 w-100 p-8">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={closeModal}
          >
            ×
          </button>
          <form className="flex flex-col items-center w-full rounded-xl">
            <h1 className="text-center text-3xl mb-6">Выберите тренировку</h1>
            <ul className="w-full flex flex-col overflow-y-auto max-h-[60vh] scrollbar-thin">
              {workouts.map((work) => (
                <li
                  key={work.id}
                  className={"flex items-center mb-2 border-b border-gray-400"}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkedWorkouts.includes(work.id)}
                      onChange={() => toggleCheckbox(work.id)}
                      className="hidden"
                    />
                    <span
                      className={`inline-block h-4 w-4 border border-black rounded-full mr-2 flex-shrink-0 flex justify-center items-center ${
                        checkedWorkouts.includes(work.id)
                          ? "bg-customGreen border-none"
                          : "bg-white"
                      }`}
                    >
                      {checkedWorkouts.includes(work.id) && (
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
                      <span className="text-xl">{work.title}</span>
                      <p className="text-sm mb-2">{work.description}</p>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
            <button
              className="bg-customGreen text-lg w-full text-black py-2 px-4 rounded-full mt-6"
              onClick={openWorkout}
            >
              Начать
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
