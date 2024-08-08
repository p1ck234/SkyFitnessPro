import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../Button";

export const Person = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openMyProfile = () => {
    navigate("/select_workouts", {
      state: { backgroundLocation: location },
    });
  };

  return (
    <>
      <h1
        className="text-sm sm:text-lg md:text-xl lg:text-4xl font-bold mb-8 cursor-pointer"
        onClick={openMyProfile}
      >
        Профиль{" "}
      </h1>
      <div className="border rounded-3xl bg-white p-6 shadow-lg mt-10 mb-12">
        <div className="flex flex-wrap gap-6">
          <div className="flex justify-center items-center mx-auto">
            <img
              src={"img/Mask group.png"}
              className="max-w-full h-auto justify-center"
              alt="Profile"
            ></img>
          </div>
          <div className="flex-1 flex flex-col justify-center justify-between flex-wrap">
            <p className="font-bold mb-6 text-3xl">Сергей</p>
            <p className="text-xl">Логин: sergey.petrov96</p>
            <p className="text-xl">Пароль: ыоваЛЫО</p>
            <div className="flex flex-col md:flex-row md:items-start items-center gap-2 mt-6 flex-wrap max-w-full">
              <Button className="flex-1 max-w-60 min-w-60">
                Изменить пароль
              </Button>
              <Button
                className="flex-1 max-w-60 min-w-60 border border-black"
                color="white"
              >
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
