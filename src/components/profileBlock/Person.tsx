import { useLocation, useNavigate } from "react-router-dom";

export const Person = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleWorkout = () => {
    navigate("/select_workouts", {
      state: { backgroundLocation: location },
      replace: true,
    });
  };
  return (
    <>
      <p className="cursor-pointer" onClick={toggleWorkout}>
        выбор тренировки
      </p>
      <h1 className="text-sm sm:text-lg md:text-xl lg:text-4xl font-bold mb-8">
        Профиль
      </h1>
      <div className="border rounded-3xl bg-white p-6 shadow-lg">
        <div className="flex w-1/2">
          <div className="flex-none mr-4">
            <img src={"img/Mask group.png"}></img>
          </div>
          <div className="flex-1 flex flex-col justify-center justify-between">
            <p className="font-bold mb-6 text-3xl">Сергей</p>
            <p className="text-xl">Логин: sergey.petrov96</p>
            <p className="text-xl">Пароль: ыоваЛЫО</p>
            <div className="flex gap-2 mt-6">
              <button className="bg-customGreen text-xl text-black py-2 px-4 rounded-full flex-1">
                Изменить пароль
              </button>
              <button className="bg-customWhite border border-black text-xl text-black py-2 px-4 rounded-full flex-1">
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
