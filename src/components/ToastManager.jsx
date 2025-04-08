import {
  useGetToastsQuery,
  useRemoveToastMutation,
} from "@/redux/api/toastApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Toast from "./Toast";

export default function ToastManager() {
  const { data: toasts = [] } = useGetToastsQuery();
  const [removeToast] = useRemoveToastMutation();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        removeToast(toast.id);
      }, 3000)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg px-4 py-2 shadow text-white ${
            toast.type === "success"
              ? "bg-green-600"
              : toast.type === "error"
              ? "bg-red-600"
              : toast.type === "delete"
              ? "bg-orange-600"
              : "bg-blue-600"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {toast.message}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
