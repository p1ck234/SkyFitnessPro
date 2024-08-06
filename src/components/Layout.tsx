import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useModal } from "@/context";
import { PopExit } from "./pops/PopExit";

export const Layout = () => {
  const { modalState, closeModal } = useModal();

  return (
    <div>
        <Header />
        <main>
        <Outlet />
      </main>
      {modalState === "exit" && (<PopExit closeModal={closeModal}/>)}
    </div>
  );
};
