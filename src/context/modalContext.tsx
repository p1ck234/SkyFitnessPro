import React, { createContext, ReactNode, useContext, useState } from "react";

type ModalState =
  | "exit"
  | "login"
  | "select_workouts"
  | "register"
  | "password_reset_confirmation"
  | "password_reset_form"
  | "progress_update"
  | "otherState"
  | "add_course"
  | "delete_course"
  | "progress_success"
  | null;

interface ModalContextType {
  modalState: ModalState;
  openModal: (modalType: ModalState, data?: any) => void;
  closeModal: () => void;
  currentPath: string;
  setCurrentPath: (path: string) => void;
  email: string | null;
  modalData: any; // Add modalData for storing additional data
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>(null);
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [email, setEmail] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  const openModal = (modalType: ModalState, data?: any) => {
    setModalState(modalType);
    setModalData(data || null);
  };

  const closeModal = () => {
    setModalState(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        openModal,
        closeModal,
        currentPath,
        setCurrentPath,
        email,
        modalData,
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
