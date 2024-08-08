import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PopExitProps {
  closeModal: () => void;
}
export const PopExit = ({ closeModal }: PopExitProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (modalRef.current && location.state?.buttonPosition) {
        const { buttonPosition } = location.state;
        const { offsetWidth: modalWidth, offsetHeight: modalHeight } =
          modalRef.current;

        setPosition({
          top: buttonPosition.top + buttonPosition.height + 10,
          left: buttonPosition.left + buttonPosition.width / 2 - modalWidth / 2,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, [location.state]);

  // const toggleMyProfile = () => {
  //   navigate("/select_workouts", {
  //     state: { backgroundLocation: location },
  //     replace: true,
  //   });
  // };

  const toggleMyProfile = () => {
    navigate("/profile");
    closeModal();
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-transparent flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="fixed bg-white rounded-3xl shadow-xl p-4 w-auto p-8 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        style={{ position: "absolute", top: position.top, left: position.left }}
      >
        <div className="flex flex-col items-center">
          {/* здесь будут рендерятся данные из стейтов или пропсы */}
          <p className="font-bold">Сергей</p>
          <p>sergey.petrov96@mail.ru</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            className="bg-customGreen text-lg w-full text-black py-2 px-4 rounded-full"
            onClick={toggleMyProfile}
          >
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
