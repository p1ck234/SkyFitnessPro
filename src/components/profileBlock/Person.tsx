import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { useModal } from "@/context";
import { constRoutes } from "@/lib/paths";
import { useUser } from "@/context/userContext";
import { logout, resetPassword } from "@/services/authService";
import { useState } from "react";

export const Person = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userData } = useUser(); // Достаем user и userData из контекста
  const { openModal } = useModal();
  const [error, setError] = useState<string | null>(null); // Состояние ошибки

  const openMyProfile = () => {
    navigate("/select_workouts", {
      state: { backgroundLocation: location },
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Перенаправление на главную страницу после выхода
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlePasswordReset = async () => {
    // Используем опциональную цепочку и nullish coalescing для более надежного получения email
    const email = user?.email;

    if (!email) {
      setError("Email пользователя не найден.");
      return;
    }

    try {
      await resetPassword(email); // Вызов функции для восстановления пароля
      openModal("password_reset_confirmation", email); // Открываем модальное окно подтверждения
    } catch (error) {
      setError(
        "Не удалось отправить письмо для восстановления пароля. Пожалуйста, попробуйте еще раз."
      );
      console.error("Password reset failed:", error);
    }
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
            <p className="font-bold text-3xl">
              {userData?.username || user?.email}
            </p>
            <p className="text-xl">
              Логин: {user?.email}
            </p>
            <p className="text-xl">Пароль: *******</p>
            <div className="flex flex-col md:flex-row items-center gap-2 mt-6 max-w-full">
              <Button
                className="flex-1 max-w-60 min-w-60"
                onClick={handlePasswordReset}
              >
                Изменить пароль
              </Button>
              <Button
                className="flex-1 max-w-60 min-w-60 border"
                color="white"
                borderColor="black"
                variant="custom-achrom"
                onClick={handleLogout}
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
