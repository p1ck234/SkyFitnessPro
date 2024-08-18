import React, { useState } from "react";
import { Logo } from "../../shared/logo/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { useModal } from "@/context/modalContext";
import { Button } from "@/components/shared/Button";
import { useAppDispatch } from "@/services/useDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchLogin, fetchResetPassword, setEmail, setPassword } from "@/store/slices/authSlice";
import { constRoutes } from "@/lib/paths";

interface LogInPageProps {
  switchToRegister: () => void;
}

export const LogInPage: React.FC<LogInPageProps> = ({ switchToRegister }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { closeModal, openModal } = useModal();
  const dispatch = useAppDispatch();
  const { isLoading, error, email, password } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSwitchToRegister = () => {
    switchToRegister();
    navigate(constRoutes.REGISTRATION, {
      state: { backgroundLocation: location.state?.backgroundLocation },
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchLogin({ email, password })).then((result) => {
      if (fetchLogin.fulfilled.match(result)) {
        closeModal();
        navigate(location.state?.backgroundLocation || "/", { replace: true });
      }
    });
  };

  const handlePasswordReset = async () => {
    if (!email) {
      return;
    }
    dispatch(fetchResetPassword(email)).then((result) => {
      if (fetchResetPassword.fulfilled.match(result)) {
        openModal("password_reset_confirmation", email);
      }
    });
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
            onChange={(e) => dispatch(setEmail(e.target.value))}
            disabled={isLoading} //
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
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
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
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </Button>
          <Button
            color="bg-white"
            width="w-full"
            className="text-black py-2 px-6 rounded-full border border-black mt-2.5 text-xl"
            onClick={handleSwitchToRegister}
            variant="custom-achrom"
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};
