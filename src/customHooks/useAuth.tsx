import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { useModal } from "@/context/modalContext";
import { login, resetPassword } from "@/services/authService";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { closeModal, openModal } = useModal();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
      closeModal();
      navigate(location.state?.backgroundLocation || "/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      setError("Пароль введен неверно, попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Введите email и оставьте поле пароль пустым");
      return;
    }
    try {
      await resetPassword(email);
      openModal("password_reset_confirmation", email);
    } catch (error) {
      setError(
        "Не удалось отправить письмо для восстановления пароля. Пожалуйста, попробуйте еще раз."
      );
      console.error("Password reset failed:", error);
    }
  };

  const handleSwitchToRegister = () => {
    navigate(constRoutes.REGISTRATION, {
      state: { backgroundLocation: location.state?.backgroundLocation },
    });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
    handlePasswordReset,
    handleSwitchToRegister,
  };
};