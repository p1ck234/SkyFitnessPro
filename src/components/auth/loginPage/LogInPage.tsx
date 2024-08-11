import React, { useState } from "react";
import { Logo } from "../../shared/logo/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { login } from "@/services/authService";
import { useModal } from "@/context/modalContext";
import { Button } from "@/components/Button";

interface LogInPageProps {
  switchToRegister: () => void;
}

export const LogInPage: React.FC<LogInPageProps> = ({ switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { closeModal } = useModal();

  const handleSwitchToRegister = () => {
    switchToRegister();
    navigate(constRoutes.REGISTRATION, {
      state: { backgroundLocation: location.state?.backgroundLocation },
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      closeModal();
      navigate(location.state?.backgroundLocation || "/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
      navigate(location.state?.backgroundLocation || "/", { replace: true });
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 z-50"
      onClick={handleBackgroundClick}
    >
      <form
        className="flex flex-col items-center w-full max-w-md text-black rounded-3xl bg-white p-8"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleLogin}
      >
        <Logo />
        <div className="mt-10 w-full">
          <input
            className="rounded-lg border text-base w-full py-4 px-4 mb-4"
            name="email"
            type="text"
            placeholder="Логин"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="rounded-lg border text-base w-full py-4 px-4 mb-10"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <button
            className="rounded-lg bg-customGreen text-base w-full py-4 px-4 mb-4 text-black"
            type="submit"
          >
            Войти
          </button> */}
          <Button className="w-full  py-4 px-4 mb-4" type="submit">
            Войти
          </Button>
          {/* <Button
            onClick={handleSwitchToRegister}
            className="w-full py-4 px-4"
            type="button"
            variant="custom-achrom"
          >
            Зарегистрироваться
          </Button> */}
          <Button
            className="bg-white w-full py-4 px-4 border border-black"
            variant="custom-achrom"
            onClick={handleSwitchToRegister}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};
