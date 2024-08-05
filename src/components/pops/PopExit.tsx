import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const PopExit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current && location.state?.buttonPosition) {
      const { buttonPosition } = location.state;
      setPosition({
        top: buttonPosition.top + buttonPosition.height + 10, // Позиционируем ниже кнопки
        left:
          buttonPosition.left +
          buttonPosition.width / 2 -
          modalRef.current.offsetWidth / 2, // Центрируем относительно кнопки
      });
    }
  }, [location.state]);

  const toggleWorkout = () => {
    navigate("/select_workouts", {
      state: { backgroundLocation: location },
      replace: true,
    });
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigate(location.state?.backgroundLocation || "/profile");
  };

  if (!isModalVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-100 bg-opacity-75 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="fixed bg-white rounded-3xl shadow-xl p-4 w-auto p-8 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        style={{ position: "absolute", top: position.top, left: position.left }} // Добавлено: установка стилей позиции
      >
        <div className="flex flex-col items-center">
          {/* здесь будут рендерятся данные из стейтов или пропсы */}
          <p className="font-bold">Сергей</p>
          <p>sergey.petrov96@mail.ru</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button className="bg-customGreen text-lg w-full text-black py-2 px-4 rounded-full"
          onClick={toggleWorkout}>
            Мой профиль
          </button>
          <button className="bg-white text-lg w-full border border-black text-black py-2 px-4 rounded-full">
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};
