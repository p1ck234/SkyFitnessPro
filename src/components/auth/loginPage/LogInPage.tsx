import React from "react";
import { Logo } from "../../shared/logo/Logo";

interface LogInPageProps {
  switchToRegister: () => void;
}

export const LogInPage: React.FC<LogInPageProps> = ({ switchToRegister }) => {
  return (
    <>
      <form className="flex flex-col items-center w-full text-black rounded-3xl ">
        <Logo />
        <div className="mt-10 w-full">
          <input
            className="rounded-lg border text-base w-full py-4 px-4 mb-4"
            name="email"
            type="text"
            placeholder="Логин"
          />
          <input
            className="rounded-lg border text-base w-full py-4 px-4 mb-10"
            name="password"
            type="password"
            placeholder="Пароль"
          />
          <button
            className="rounded-lg bg-customGreen text-base w-full py-4 px-4 mb-4 text-black"
            type="submit"
          >
            Войти
          </button>
          <button
            onClick={switchToRegister}
            className="rounded-lg border text-base w-full py-4 px-4 text-black border-black"
            type="button"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </>
  );
};
