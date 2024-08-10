import React, { useState } from "react";
import { Logo } from "../../shared/logo/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { login } from "@/services/authService";
import { useModal } from "@/context";

interface LogInPageProps {
  switchToRegister: () => void;
}

export const LogInPage: React.FC<LogInPageProps> = ({ switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки
  const navigate = useNavigate();
  const location = useLocation();
  const { closeModal } = useModal();

  const handleSwitchToRegister = () => {
    switchToRegister();
    navigate(constRoutes.REGISTRATION, { state: { backgroundLocation: location.state?.backgroundLocation } });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Начинаем загрузку
    setError(null); // Сбрасываем ошибку

    try {
      await login(email, password);
      closeModal();
      navigate(location.state?.backgroundLocation || "/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      setError("Пароль введен неверно, попробуйте еще раз."); // Устанавливаем сообщение об ошибке
    } finally {
      setIsLoading(false); // Завершаем загрузку
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
        <Logo />
        <div className="mt-10 w-full">
          <input
            className={`rounded-lg border text-base w-full py-4 px-4 mb-4 ${error ? 'border-red-500 text-red-500' : ''}`}
            name="email"
            type="text"
            placeholder="Логин"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading} // Отключаем поле во время загрузки
          />
          <input
            className={`rounded-lg border text-base w-full py-4 px-4 mb-4 ${error ? 'border-red-500 text-red-500' : ''}`}
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading} // Отключаем поле во время загрузки
          />
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {error} <a href="#" className="text-red-500 underline">Восстановить пароль?</a>
            </div>
          )}
          <button
            className={`rounded-lg bg-customGreen text-base w-full py-4 px-4 mb-4 text-black ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={isLoading} // Отключаем кнопку во время загрузки
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </button>
          <button
            onClick={handleSwitchToRegister}
            className="rounded-lg border text-base w-full py-4 px-4 text-black border-black"
            type="button"
            disabled={isLoading} // Отключаем кнопку во время загрузки
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};
