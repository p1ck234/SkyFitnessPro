import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useModal } from "@/context";
import { PopExit } from "./pops/PopExit";

export const Layout = () => {
  const { modalState, closeModal } = useModal();

  return (
    <div className="container mx-auto py-10 px-4 lg:py-12 lg:px-36 font-sans cursor-custom max-w-phone lg:max-w-laptop">
      <Header />
      <main>
        <Outlet />
      </main>
      {modalState === "exit" && <PopExit closeModal={closeModal} />}
    </div>
  );
};
