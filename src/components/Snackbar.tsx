import { useEffect } from "react";

type SnackbarProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export default function Snackbar({
  message,
  type = "success",
  onClose,
}: SnackbarProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const base =
    "fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white z-50";
  const styles =
    type === "success" ? `${base} bg-green-500` : `${base} bg-red-500`;

  return <div className={styles}>{message}</div>;
}
