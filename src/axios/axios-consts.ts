import { ToastOptions } from "react-toastify";

/** Опции всплывающего сообщения */
export const TOAST_CONFIG: ToastOptions = {
  position: "top-right",
  type: "error",
  autoClose: 5000,
  progress: 0,
  icon: false,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  progressClassName: "toast-error-progress"
};
