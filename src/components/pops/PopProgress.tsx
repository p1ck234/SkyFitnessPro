import { useState } from "react";
import { useModal } from "@/context/modalContext";

const PopProgress = ({ workout }: { workout: any }) => {
  const { closeModal } = useModal();
  const [progress, setProgress] = useState(
    workout.exercises.map((exercise: any) => exercise.count_completed)
  );

  const handleSave = () => {
    // Logic to save the progress to the database
    closeModal();
  };

  return (
    <div className="modal">
      <h2>Мой прогресс</h2>
      {workout.exercises.map((exercise: any, index: number) => (
        <div key={exercise.id}>
          <label>{exercise.name}</label>
          <input
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
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default PopProgress;
