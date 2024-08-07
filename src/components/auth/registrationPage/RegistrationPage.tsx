import React from "react";
import { Logo } from "../../shared/logo/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { useModal } from "@/context";

interface RegistrationPageProps {
  switchToLogin: () => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ switchToLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { closeModal } = useModal();

  const handleSwitchToLogin = () => {
    switchToLogin();
    navigate(constRoutes.LOGIN, { state: { backgroundLocation: location.state?.backgroundLocation } });
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
      navigate(location.state?.backgroundLocation || "/", { replace: true });
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <form
        className="flex flex-col items-center w-full max-w-md text-black rounded-3xl bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Logo />
        <div className="mt-10 w-full">
          <input
            className="rounded-lg border text-base w-full py-4 px-4 mb-4"
            name="email"
            type="text"
            placeholder="Эл.почта"
          />
          <input
            className="rounded-lg border text-base w-full py-4 px-4 mb-4"
            name="password"
            type="password"
            placeholder="Пароль"
          />
          <input
            className="rounded-lg border text-base w-full py-4 px-4 mb-10"
            name="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
          />
          <button
            className="rounded-lg bg-customGreen text-base w-full py-4 px-4 text-black mb-4"
            type="button"
          >
            Зарегистрироваться
          </button>
          <button
            onClick={handleSwitchToLogin}
            className="rounded-lg border text-base w-full py-4 px-4 text-black border-black"
            type="submit"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};
