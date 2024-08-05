import Header from "../header/Header";
import { Card } from "../mainBlock/Card/Card";
import { Person } from "./Person";

export const Profile = () => {
    
  return (
    <div className="bg-gray-200">
      <Header />
      <div className="px-48 pt-10">
        <Person />
        <h1 className="text-sm sm:text-lg md:text-xl lg:text-4xl font-bold my-8"
        >
          Мои курсы
        </h1>
        <div>
          {/* здесь будет массив курсов, выбранных пользователем */}
          <Card />
        </div>
      </div>
    </div>
  );
};
