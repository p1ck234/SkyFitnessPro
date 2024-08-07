import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useModal } from "@/context";
import { PopExit } from "./pops/PopExit";
import { LogInPage } from "./auth/loginPage/LogInPage";
import { RegistrationPage } from "./auth/registrationPage/RegistrationPage";

export const Layout = () => {
  const { modalState, closeModal, openModal } = useModal();

  return (
    <div className="container-xl mx-auto p-6 font-sans cursor-custom">
      <Header />
      <main>
        <Outlet />
      </main>
      {modalState === "exit" && <PopExit closeModal={closeModal} />}
      {modalState === "login" && <LogInPage switchToRegister={() => openModal('register')} />}
      {modalState === "register" && <RegistrationPage switchToLogin={() => openModal('login')} />}
    </div>
  );
};
