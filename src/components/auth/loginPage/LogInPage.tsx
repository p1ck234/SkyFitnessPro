import React, { useState } from "react";
import { Logo } from "../../shared/logo/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { login } from "@/services/authService";
import { useModal } from "@/context";
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
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <form
        className="flex flex-col items-center w-full max-w-md text-black rounded-3xl bg-white p-8"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleLogin}
      >
        <Logo showTagline={false} />
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
            className="rounded-lg border text-base w-full py-4 px-4 mb-8"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            color="bg-customGreen"
            width="w-full"
            className="text-black py-2 px-6 rounded-full"
            type="submit"
          >
            Войти
          </Button>
          <Button
            color="bg-white"
            width="w-full"
            className="text-black py-2 px-6 rounded-full border border-black mt-2.5"
            onClick={handleSwitchToRegister}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};
