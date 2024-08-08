import { Main } from "@/components/mainBlock/Main";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container-xl mx-auto p-6 font-sans cursor-custom">
      <Main />
      <Outlet />
    </div>
  );
}
