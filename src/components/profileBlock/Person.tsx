import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useModal } from "@/context";
import { constRoutes } from "@/lib/paths";

export const Person = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useModal();

  const openMyProfile = () => {
    navigate("/select_workouts", {
      state: { backgroundLocation: location },
    });
  };

  const handleChangePassword = () => {
    openModal("exit");
    navigate(constRoutes.EXIT, { state: { backgroundLocation: location } });
  };

  return (
    <>
      <h1
        className="text-sm sm:text-lg md:text-xl lg:text-4xl font-bold mb-8 cursor-pointer"
        onClick={openMyProfile}
      >
        Профиль
      </h1>
      <div className="border rounded-3xl bg-white p-6 shadow-lg mt-10 mb-12">
        <div className="flex flex-wrap gap-6">
          <div className="flex justify-center items-center mx-auto">
            <img
              src={"img/Mask group.png"}
              className="max-w-full h-auto justify-center"
              alt="Profile"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-6">
            <p className="font-bold text-3xl">Сергей</p>
            <p className="text-xl">Логин: sergey.petrov96</p>
            <p className="text-xl">Пароль: ыоваЛЫО</p>
            <div className="flex flex-col md:flex-row items-center gap-2 mt-6 max-w-full">
              <Button
                className="flex-1 max-w-60 min-w-60"
                onClick={handleChangePassword}
              >
                Изменить пароль
              </Button>
              <Button
                className="flex-1 max-w-60 min-w-60 border"
                color="white"
                borderColor="black"
                variant="custom-achrom"
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
