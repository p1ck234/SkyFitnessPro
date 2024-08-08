import CoursesBlock from "../coursesBlock/CoursesBlock";
import Header from "../header/Header";
import { Card } from "../mainBlock/Card/Card";
import { Person } from "./Person";

export const Profile = () => {
  return (
    <div className="bg-gray-200 mt-14">
      <div>
        <Person />
        <h1 className="text-sm sm:text-lg md:text-xl lg:text-4xl font-bold my-10">
          Мои курсы
        </h1>
        <div className="flex flex-wrap justify-between ">
          {/* здесь будет массив курсов, выбранных пользователем */}
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};
