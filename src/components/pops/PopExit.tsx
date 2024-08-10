import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useUser } from "@/context/userContext";
import { logout } from "@/services/authService";

interface PopExitProps {
  closeModal: () => void;
}
export const PopExit = ({ closeModal }: PopExitProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (modalRef.current && location.state?.buttonPosition) {
        const { buttonPosition } = location.state;
        const { offsetWidth: modalWidth } = modalRef.current;

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

  const toggleMyProfile = () => {
    navigate("/profile");
    closeModal();
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeModal();
      navigate("/"); // Перенаправление на главную страницу после выхода
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
        className="fixed bg-white rounded-3xl shadow-xl p-4 w-auto flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        style={{ position: "absolute", top: position.top, left: position.left }}
      >
        <div className="flex flex-col items-center">
          <p className="font-bold">{user?.displayName || user?.email}</p>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            className="bg-customGreen text-lg w-full text-black py-2 px-4 rounded-full"
            onClick={toggleMyProfile}
          >
            Мой профиль
          </Button>
          <Button
            className="bg-white text-lg w-full border border-black text-black py-2 px-4 rounded-full"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
};
