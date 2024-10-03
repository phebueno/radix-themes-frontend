import { toast, ToastOptions, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastMessageOptions {
  message: string;
  type: TypeOptions;
  position?: ToastOptions['position'];
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: ToastOptions['theme'];
}

const showToast = ({
  message,
  type,
  position = "top-right",
  autoClose = 3000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  theme = "colored",
}: ToastMessageOptions) => {
  const toastOptions: ToastOptions = {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    theme,
  };

  switch (type) {
    case "info":
      toast.info(message, toastOptions);
      break;
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    default:
      toast.error("Algo deu errado. Tente novamente mais tarde.", toastOptions);
  }
};

export default showToast;
