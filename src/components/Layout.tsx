import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { PopExit } from "./pops/PopExit";
import { LogInPage } from "./auth/loginPage/LogInPage";
import { RegistrationPage } from "./auth/registrationPage/RegistrationPage";
import { useModal } from "@/context/modalContext";
import { PasswordResetConfirmation } from "./auth/PasswordResetConfirmation";

export const Layout = () => {
  const { modalState, openModal, closeModal, email } = useModal(); // Получаем email из контекста

  return (
    <div className="container mx-auto py-10 px-4 lg:py-12 lg:px-36 font-sans cursor-custom max-w-phone lg:max-w-laptop">
      <Header />
      <main>
        <Outlet />
      </main>
      {modalState === "exit" && <PopExit closeModal={closeModal} />}
      {modalState === "login" && (
        <LogInPage switchToRegister={() => openModal("register")} />
      )}
      {modalState === "register" && (
        <RegistrationPage switchToLogin={() => openModal("login")} />
      )}
      {modalState === "password_reset_confirmation" && (
        <PasswordResetConfirmation email={email || ""} onClose={closeModal} />
      )}
    </div>
  );
};
