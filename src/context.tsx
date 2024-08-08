import React, { createContext, ReactNode, useContext, useState } from "react";

type ModalState = 'exit' | 'otherState' | null; 

interface ModalContextType {
  modalState: string | null;
  openModal: (modalType: ModalState) => void;
  closeModal: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<string | null>(null);

  const openModal = (modalType: ModalState) => {
    setModalState(modalType);
  };

  const closeModal = () => {
    setModalState(null);
  };

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
      throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
  };
