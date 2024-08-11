import { Main } from "@/components/mainBlock/Main";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="mx-auto font-sans cursor-custom">
      <Main />
      <Outlet />
    </div>
  );
}
