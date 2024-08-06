import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Course from "../coursesBlock/Course";
import { Main } from "../mainBlock/Main";

export default function HomePage() {
  return (
    <div className="container-xl mx-auto p-6 font-sans cursor-custom">
      <Main />
      <Outlet />
    </div>
  );
}
