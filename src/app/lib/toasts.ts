import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastError = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
};

export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
};

export const toastWarning = (message: string) => {
  toast.warn(message, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
};

export const toastInfo = (message: string) => {
  toast.info(message, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
};

export function toastPromise<T>(
  promise: Promise<any>,
  pendingMessage?: string,
  successMessage?: string,
  errorMessage?: string
): Promise<T> {
  const pending = pendingMessage || "Loading...";
  const success = successMessage || "Success!";
  const error = errorMessage || "Error!";

  return toast.promise(
    promise,
    {
      pending: pending,
      success: success,
      error: error,
    },
    { position: toast.POSITION.BOTTOM_LEFT }
  );
}
