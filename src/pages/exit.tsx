import { PopExit } from "@/components/pops/PopExit";

interface ModalContextType {
  closeModal: () => void;
}
export const Exit = ({ closeModal }: ModalContextType) => {
  return <PopExit closeModal={closeModal} />;
};
