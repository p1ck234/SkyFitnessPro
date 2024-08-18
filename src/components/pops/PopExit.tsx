import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useUser } from "@/context/userContext";
import { logout } from "@/services/authService";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { setIsProfile } from "@/store/slices/courseSlice";
import { showAlert } from "@/utils/sweetalert";

interface PopExitProps {
  closeModal: () => void;
}

export const PopExit = ({ closeModal }: PopExitProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userData } = useUser();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const updatePosition = () => {
      if (modalRef.current && location.state?.buttonPosition) {
        const { buttonPosition } = location.state;
        const { offsetWidth: modalWidth } = modalRef.current;

        setPosition({
          top: buttonPosition.top + buttonPosition.height + 10,
          left:
            buttonPosition.left + buttonPosition.width / 2 - modalWidth / 1.5,
        });

        setIsPositioned(true);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, [location.state]);

  const toggleMyProfile = () => {
    dispatch(setIsProfile(false));
    closeModal();
    dispatch(login(user?.email || ""));
    dispatch(setIsProfile(true));
    setTimeout(() => navigate("/profile"), 0);
  };

  const handleLogout = async () => {
    try {
      // Пример вызова showAlert с использованием кастомных классов от компонента Button
      const result = await showAlert({
        title: "Вы уверены?",
        text: "Вы действительно хотите выйти из системы?",
        icon: "warning",
        confirmButtonText: "Выйти",
        cancelButtonText: "Отмена",
        showCancelButton: true,
        customClass: {
          confirmButton: "py-2 px-4 rounded-full bg-customGreen text-black", // Классы из вашего Button компонента
          cancelButton:
            "py-2 px-4 rounded-full bg-white text-black border border-black", // Добавлен класс для рамки
        },
      });

      if (result.isConfirmed) {
        await logout();
        closeModal();
        navigate("/");
      }
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
        className={`fixed bg-white rounded-3xl shadow-xl p-4 w-auto flex flex-col gap-6 ${
          isPositioned ? "" : "invisible"
        }`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        style={{ position: "absolute", top: position.top, left: position.left }}
      >
        <div className="flex flex-col items-center">
          <p className="font-bold">{userData?.username || user?.email}</p>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            className="bg-customGreen text-sm sm:text-lg w-full text-black py-2 px-4 rounded-full"
            onClick={toggleMyProfile}
          >
            Мой профиль
          </Button>
          <Button
            className="text-lg w-full py-2 px-4"
            color="white"
            borderColor="black"
            variant="custom-achrom"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
};
