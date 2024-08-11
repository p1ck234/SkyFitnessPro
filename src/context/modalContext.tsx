import React, { createContext, ReactNode, useContext, useState } from "react";

type ModalState =
  | "exit"
  | "login"
  | "select_workouts"
  | "register"
  | "password_reset_confirmation"
  | "password_reset_form"
  | "otherState"
  | null;

interface ModalContextType {
  modalState: ModalState;
  openModal: (modalType: ModalState, email?: string) => void;
  closeModal: () => void;
  currentPath: string;
  setCurrentPath: (path: string) => void;
  email: string | null; // Добавляем email в контекст
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>(null);
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [email, setEmail] = useState<string | null>(null); // Состояние для email

  const openModal = (modalType: ModalState, email?: string) => {
    setModalState(modalType);
    if (email) {
      setEmail(email); // Обновляем email, если он передан
    }
  };

  const closeModal = () => {
    setModalState(null);
    setEmail(null); // Сбрасываем email при закрытии модального окна
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        openModal,
        closeModal,
        currentPath,
        setCurrentPath,
        email, // Передаем email в контекст
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
