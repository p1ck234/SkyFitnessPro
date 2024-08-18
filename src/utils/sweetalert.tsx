import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type AlertType = "success" | "error" | "warning";

interface AlertOptions {
  title?: string;
  text: string;
  icon: AlertType;
  confirmButtonText?: string;
}

export const showAlert = ({
  title = "Внимание!",
  text,
  icon,
  confirmButtonText = "OK",
}: AlertOptions) => {
  MySwal.fire({
    title,
    html: `<p>${text}</p>`,
    icon,
    confirmButtonText,
  });
};
