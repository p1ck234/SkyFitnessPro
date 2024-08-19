import React, { useState } from "react";
import { Logo } from "../../shared/logo/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { useModal } from "@/context/modalContext";
import { login, resetPassword } from "@/services/authService";
import { Button } from "@/components/shared/Button";

interface LogInPageProps {
  switchToRegister: () => void;
}

export const LogInPage: React.FC<LogInPageProps> = ({ switchToRegister }) => {
  const [email, setEmail] = useState(""); // Email пользователя
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки
  const navigate = useNavigate();
  const location = useLocation();
  const { closeModal, openModal } = useModal();

  const handleSwitchToRegister = () => {
    switchToRegister();
    // navigate(constRoutes.REGISTRATION, {
    //   state: { backgroundLocation: location.state?.backgroundLocation },
    // });
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

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Введите email и оставьте поле пароль пустым"); // Устанавливаем сообщение об ошибке, если email пустой
      return;
    }
    try {
      await resetPassword(email); // Вызов функции для восстановления пароля
      openModal("password_reset_confirmation", { email }); // Открываем модальное окно подтверждения и передаем email
    } catch (error) {
      setError(
        "Не удалось отправить письмо для восстановления пароля. Пожалуйста, попробуйте еще раз."
      );
      console.error("Password reset failed:", error);
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
        <Logo showTagline={false} />
        <div className="mt-10 w-full">
          <input
            className={`rounded-lg border text-base w-full py-4 px-4 mb-4 ${
              error ? "border-red-500 text-red-500" : ""
            }`}
            name="email"
            type="text"
            placeholder="Логин"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Обновляем состояние email
            disabled={isLoading} // Отключаем поле во время загрузки
          />
          <input
            className={`rounded-lg border text-base w-full py-4 px-4 mb-4 ${
              error ? "border-red-500 text-red-500" : ""
            }`}
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading} // Отключаем поле во время загрузки
          />
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {error}
              <br />
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-red-500 underline"
              >
                Восстановить пароль?
              </button>
            </div>
          )}
          <Button
            color="bg-customGreen"
            width="w-full"
            className="text-black py-2 px-6 rounded-full text-xl"
            type="submit"
            disabled={isLoading} // Отключаем кнопку во время загрузки
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </Button>
          <Button
            color="bg-white"
            width="w-full"
            className="text-black py-2 px-6 rounded-full border border-black mt-2.5 text-xl"
            onClick={handleSwitchToRegister}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};
