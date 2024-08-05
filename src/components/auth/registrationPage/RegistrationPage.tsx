import React from "react";
import { Logo } from "../../shared/logo/Logo";

interface RegistrationPageProps {
  switchToLogin: () => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ switchToLogin }) => {
  return (
    <>
      <form className="flex flex-col items-center w-full text-blac rounded-3xl">
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
            onClick={switchToLogin}
            className="rounded-lg border text-base w-full py-4 px-4 text-black border-black"
            type="submit"
          >
            Войти
          </button>
        </div>
      </form>
    </>
  );
};
