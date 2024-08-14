import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useUser } from "@/context/userContext";
import { logout } from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { login } from "@/store/slices/authSlice";
import { constRoutes } from "@/lib/paths";

interface PopExitProps {
  closeModal: () => void;
}

export const PopExit = ({ closeModal }: PopExitProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userData } = useUser(); // Достаем user и userData из контекста
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

        setIsPositioned(true); // Позиция вычислена, можно показывать модальное окно
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, [location.state]);

  const toggleMyProfile = () => {
    if (user && user.email) {
      closeModal();
      // dispatch(login({ uid: user.uid, email: user.email! })); // Передается объект User
      navigate(constRoutes.PROFILE, { replace: true });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeModal();
      navigate("/");
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
          {/* Отображаем username, если он есть, иначе displayName или email */}
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
