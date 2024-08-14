import React, { useState } from "react";
import { Logo } from "../../shared/logo/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { register } from "@/services/authService";
import { saveUser } from "@/services/firestoreService";
import { useModal } from "@/context/modalContext";
import { Button } from "@/components/Button";

interface RegistrationPageProps {
  switchToLogin: () => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({
  switchToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { closeModal } = useModal();

  const handleSwitchToLogin = () => {
    switchToLogin();
    navigate(constRoutes.LOGIN, {
      state: { backgroundLocation: location.state?.backgroundLocation },
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен содержать не менее 6 символов");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Неверно указана почта");
      return;
    }

    setIsLoading(true);

    try {
      const user = await register(email, password, username);
      closeModal();
      navigate(location.state?.backgroundLocation || "/", { replace: true });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Данная почта уже используется. Попробуйте войти.");
      } else {
        setError("Регистрация не удалась. Попробуйте еще раз.");
      }
    } finally {
      setIsLoading(false);
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
        onSubmit={handleRegister}
      >
        <Logo showTagline={false} />
        <div className="mt-10 w-full">
          <input
            className={`rounded-lg border text-base w-full py-4 px-4 mb-4 ${
              error ? "border-red-500 text-red-500" : ""
            }`}
            name="username"
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <input
            className={`rounded-lg border text-base w-full py-4 px-4 mb-4 ${
              error ? "border-red-500 text-red-500" : ""
            }`}
            name="email"
            type="text"
            placeholder="Эл.почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <input
            className={`rounded-lg border text-base w-full py-4 px-4 mb-10 ${
              error ? "border-red-500 text-red-500" : ""
            }`}
            name="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <Button
            color="bg-customGreen"
            width="w-full"
            className="text-black py-2 px-6 rounded-full text-xl"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
          </Button>
          <Button
            color="bg-white"
            width="w-full"
            className="text-black py-2 px-6 rounded-full border border-black mt-2.5 text-xl"
            onClick={handleSwitchToLogin}
          >
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};
