import { Link } from "react-router-dom";
import { constRoutes } from "../../../lib/paths";
import { Logo } from "../../shared/logo/Logo";

export const LogInPage = () =>  {
  return (
    <>
      <form className="shadow-base rounded flex flex-col items-center p-[30px] w-[360px] m-auto mt-[15%] text-black bg-gray-200 rounded-3xl mb-8">
        <Logo />
        <div className="mt-10  w-full">
          <input 
            className="rounded-lg border text-base w-full py-4 px-[18px] mb-4" 
            name="email" 
            type="text" 
            placeholder="Логин"
          />
          <input 
            className="rounded-lg border text-base w-full py-4 px-[18px] mb-10" 
            name="password" 
            type="password" 
            placeholder="Пароль"
          />
           <Link to={constRoutes.HOME}>
          <button 
            className="rounded-lg bg-lime-500 text-base w-full py-4 px-[18px] mb-4  text-black rounded-3xl" 
            type="submit"
          >
            Войти
          </button>
          </Link>
          <Link to={constRoutes.REGISTRATION}>
          <button 
            className="rounded-lg border text-base w-full py-4 px-[18px] text-black border-black rounded-3xl" 
            type="button"
          >
            Зарегистрироваться
          </button>
          </Link>
        </div>
      </form>
    </>
  );
}

