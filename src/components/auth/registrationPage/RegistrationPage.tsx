import React, { useState } from "react";
import { Logo } from "../../shared/logo/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { useModal } from "@/context/modalContext";
import { Button } from "@/components/shared/Button";
import { useAppDispatch } from "@/services/useDispatch";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import {
  fetchRegisterUser,
  setConfirmPassword,
  setEmail,
  setError,
  setPassword,
  setUsername,
} from "@/store/slices/authSlice";
import { constRoutes } from "@/lib/paths";

interface RegistrationPageProps {
  switchToLogin: () => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({
  switchToLogin,
}) => {
  const dispatch = useAppDispatch();
  const { email, password, confirmPassword, username, isLoading, error } =
    useSelector((state: RootState) => state.auth);
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

    if (password !== confirmPassword) {
      dispatch(setError("Пароли не совпадают"));
      return;
    }

    if (password.length < 6) {
      dispatch(setError("Пароль должен содержать не менее 6 символов"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      dispatch(setError("Неверно указана почта"));
      return;
    }

    try {
      await dispatch(fetchRegisterUser({ email, password, username })).unwrap();
      closeModal();
      navigate(location.state?.backgroundLocation || "/", { replace: true });
    } catch (error) {}
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
            onChange={(e) => dispatch(setUsername(e.target.value))}
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
            onChange={(e) => dispatch(setEmail(e.target.value))}
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
            onChange={(e) => dispatch(setPassword(e.target.value))}
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
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
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
