import { PopExit } from "@/components/pops/PopExit";
import { useModal } from "@/context/modalContext";

export const Exit = () => {
  const { closeModal } = useModal();
  return <PopExit closeModal={closeModal} />;
};
