import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type AlertType = "success" | "error" | "warning" | "info";

interface AlertOptions {
  title?: string;
  text: string;
  icon: AlertType;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  customClass?: {
    confirmButton?: string;
    cancelButton?: string;
  };
}

export const showAlert = ({
  title = "Внимание!",
  text,
  icon,
  confirmButtonText = "OK",
  cancelButtonText,
  showCancelButton = false,
  customClass,
}: AlertOptions) => {
  return MySwal.fire({
    title,
    html: `<p>${text}</p>`,
    icon,
    confirmButtonText,
    cancelButtonText,
    showCancelButton,
    customClass, // Добавляем customClass для кнопок
  });
};
