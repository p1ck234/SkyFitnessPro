import { Course } from "@/types/types";
import React from "react";
import { useUser } from "@/context/userContext"; // Добавьте это
import { useModal } from "@/context/modalContext"; // Добавьте это
import { addCourseToUser } from "@/services/firestoreService"; // Импорт функции добавления курса

interface CourseDescriptionProps {
  course: Course;
}

const CourseDescription: React.FC<CourseDescriptionProps> = ({ course }) => {
  const { user } = useUser(); // Используйте `useUser` для проверки авторизации
  const { openModal } = useModal(); // Используйте `useModal` для открытия модального окна

  const handleButtonClick = async () => {
    if (!user) {
      openModal("login"); // Открываем модальное окно логина, если пользователь не авторизован
    } else {
      try {
        await addCourseToUser(user.uid, parseInt(course.id)); // Добавляем курс в профиль пользователя
        alert("Курс успешно добавлен в ваш профиль");
      } catch (error) {
        console.error("Ошибка при добавлении курса:", error);
        alert("Не удалось добавить курс");
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 md:gap-16">
      {/* Benefits Section */}
      <section className="mb-6 mt-8 md:mt-14">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Подойдет для вас, если:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 md:mt-10">
          {course.good_for_you.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white p-4 md:p-6 rounded-lg flex items-center"
            >
              <div className="text-4xl md:text-7xl font-bold text-lime-500 mr-2 md:mr-4">
                {index + 1}
              </div>
              <p className="text-xl md:text-2xl">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Directions Section */}
      <section className="mb-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Направления</h2>
        <div className="mt-6 md:mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 bg-customGreenCurse p-4 md:p-6 rounded-lg">
          {course.directions.map((direction, index) => (
            <div key={index} className="flex items-center space-x-2">
              <img
                src="/img/icon/Sparcle.svg"
                alt=""
                className="w-6 h-6 md:w-8 md:h-8"
              />
              <p className="text-black text-xl md:text-2xl">{direction}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Course Description Section */}
      <section className="flex flex-col md:flex-row bg-white rounded-lg shadow-custom p-4 md:p-6 mb-6 rounded-3xl shadow-boxShadow">
        <div className="flex flex-col justify-between h-full gap-4 md:gap-8 mb-4 md:mb-0 md:pr-6 w-full md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-medium mb-4 font-bold">
            Начните путь
            <br /> к новому телу
          </h2>
          <ul className="list-disc pl-5 opacity-60 mb-4 text-lg md:text-xl text-gray-700">
            {course.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          <div className="flex">
            <button
              className="bg-customGreenCurse text-black py-2 px-4 rounded-lg w-full md:w-auto"
              onClick={handleButtonClick} // Обрабатываем нажатие на кнопку
            >
              {!user ? "Войдите, чтобы добавить курс" : "Добавить курс"}
            </button>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src="/img/runner.svg"
            alt="Course Description"
            className="w-3/4 md:w-9/12 object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default CourseDescription;
