import { useNavigate } from "react-router-dom";
import { Button } from "../shared/Button";
import { useUser } from "@/context/userContext";
import { useState } from "react";
import { useModal } from "@/context/modalContext";
import { showAlert } from "@/utils/sweetalert";
import { constRoutes } from "@/lib/paths";
import { fetchResetPassword, logout } from "@/store/slices/authSlice";

export const Person = () => {
  const navigate = useNavigate();
  const { user, userData } = useUser(); // Достаем user и userData из контекста
  const { openModal } = useModal();
  const [error, setError] = useState<string | null>(null); // Состояние ошибки
  const [isButtonLoading, setIsButtonLoading] = useState(false); // Состояние загрузки кнопки

  const handleLogout = async () => {
    try {
      // Пример вызова showAlert с использованием кастомных классов от компонента Button
      const result = await showAlert({
        title: "Вы уверены?",
        text: "Вы действительно хотите выйти из системы?",
        icon: "warning",
        confirmButtonText: "Выйти",
        cancelButtonText: "Отмена",
        showCancelButton: true,
        customClass: {
          confirmButton: "py-2 px-4 rounded-full bg-customGreen text-black", // Классы из вашего Button компонента
          cancelButton:
            "py-2 px-4 rounded-full bg-white text-black border border-black", // Добавлен класс для рамки
        },
      });

      if (result.isConfirmed) {
        await logout();
        navigate(constRoutes.HOME);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlePasswordReset = async () => {
    const email = user?.email;

    if (!email) {
      setError("Email пользователя не найден.");
      return;
    }

    try {
      setIsButtonLoading(true); // Включаем загрузку
      await fetchResetPassword(email); // Вызов функции для восстановления пароля
      openModal("password_reset_confirmation", { email }); // Открываем модальное окно подтверждения и передаем email
    } catch (error) {
      setError(
        "Не удалось отправить письмо для восстановления пароля. Пожалуйста, попробуйте еще раз."
      );
      console.error("Password reset failed:", error);
    } finally {
      setIsButtonLoading(false); // Выключаем загрузку после завершения
    }
  };

  return (
    <>
      <h1 className="text-lg md:text-xl lg:text-4xl font-bold mb-8">Профиль</h1>
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
            {user ? (
              <>
                <p className="font-bold text-3xl">
                  {user.displayName || userData?.username || user.email}
                </p>
                <div>
                  <span className="text-xl font-medium">
                    Логин: {user.email}
                  </span>
                  <p className="text-xl font-medium">Пароль: *******</p>
                </div>
              </>
            ) : (
              <p>Пользователь не авторизован</p>
            )}

            <div className="flex flex-col md:flex-row items-center gap-2 max-w-full">
              <Button
                className="flex-1 text-xl max-w-60 min-w-60"
                onClick={handlePasswordReset}
                disabled={isButtonLoading} // Отключаем кнопку во время загрузки
              >
                {isButtonLoading ? "Загрузка..." : "Изменить пароль"}
              </Button>
              <Button
                className="flex-1 text-xl max-w-60 min-w-60 border"
                color="white"
                borderColor="black"
                variant="custom-achrom"
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};
