import { useModal } from "@/context/modalContext";

export const PopProgressConfirm = () => {
  const { closeModal } = useModal();

  setTimeout(() => {
    closeModal();
  }, 3000);

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className=" rounded-3xl bg-white w-80 h-60 text-3xl text-center p-2 align-middle flex flex-col gap-5 justify-center">
        <p className="text-3xl">Ваш прогресс засчитан!</p>
        <div className="flex justify-center">
        <img width={68} height={68}  src="/img/successIcon.svg" alt="success" />
        </div>
      </div>
    </div>
  );
};
