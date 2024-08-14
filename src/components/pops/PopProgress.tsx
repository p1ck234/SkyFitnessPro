import React, { useState } from "react";
import { useModal } from "@/context/modalContext";
import { useNavigate, useLocation } from "react-router-dom";

const PopProgress = () => {
  const { closeModal, modalData } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const workout = modalData;

  if (!workout || !workout.exercise) {
    return <div>Данные о тренировке не найдены.</div>;
  }

  const [progress, setProgress] = useState(
    workout.exercise.map((exercise: any) => exercise.count_completed || 0)
  );

  const handleSave = () => {
    // Logic to save the progress to the database
    closeModal();
    navigate(location.pathname, { replace: true }); // Revert URL
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
      navigate(location.pathname, { replace: true }); // Revert URL
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="flex flex-col items-center w-full max-w-md text-black rounded-3xl bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Мой прогресс</h2>
        {workout.exercise.map((exercise: any, index: number) => (
          <div key={exercise.id} className="w-full mb-4">
            <label className="block text-lg font-medium">{exercise.name}</label>
            <input
              className="rounded-lg border text-base w-full py-2 px-4 mt-1"
              type="number"
              value={progress[index]}
              onChange={(e) => {
                const newProgress = [...progress];
                newProgress[index] = parseInt(e.target.value);
                setProgress(newProgress);
              }}
            />
          </div>
        ))}
        <button
          className="mt-4 px-4 py-2 bg-customGreen text-black rounded-full w-full text-lg"
          onClick={handleSave}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default PopProgress;
