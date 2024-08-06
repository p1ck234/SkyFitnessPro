import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useModal } from "@/context";
import { PopExit } from "./pops/PopExit";

export const Layout = () => {
  const { modalState, closeModal } = useModal();

  return (
    <div className="container-xl mx-auto p-6 font-sans cursor-custom">
      <Header />
      <main>
        <Outlet />
      </main>
      {modalState === "exit" && <PopExit closeModal={closeModal} />}
    </div>
  );
};
