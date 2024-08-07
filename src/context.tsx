import React, { createContext, ReactNode, useContext, useState } from "react";

type ModalState =
  | "exit"
  | "login"
  | "select_workouts"
  | "register"
  | "otherState"
  | null;

interface ModalContextType {
  modalState: ModalState;
  openModal: (modalType: ModalState) => void;
  closeModal: () => void;
  currentPath: string;
  setCurrentPath: (path: string) => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>(null);
  const [currentPath, setCurrentPath] = useState<string>("/");

  const openModal = (modalType: ModalState) => {
    setModalState(modalType);
  };

  const closeModal = () => {
    setModalState(null);
  };

  return (
    <ModalContext.Provider
      value={{ modalState, openModal, closeModal, currentPath, setCurrentPath }}
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
