import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ toast }) => {
  // Icon mapping based on toast type
  const IconComponent =
    {
      success: CheckCircle,
      error: XCircle,
      delete: AlertTriangle,
      info: Info,
    }[toast.type] || Info;

  // Background color mapping based on toast type
  const bgColor =
    {
      success: "bg-green-600",
      error: "bg-red-600",
      delete: "bg-orange-600",
      info: "bg-blue-600",
    }[toast.type] || "bg-blue-600";

  // Border color mapping based on toast type
  const borderColor =
    {
      success: "border-green-400",
      error: "border-red-400",
      delete: "border-orange-400",
      info: "border-blue-400",
    }[toast.type] || "border-blue-400";

  return (
    <AnimatePresence>
      <motion.div
        key={toast.id}
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.95,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }}
        className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg text-white max-w-md ${bgColor} border-l-4 ${borderColor}`}
      >
        <div className="flex items-center w-full">
          {/* Icon based on toast type */}
          <div className="mr-3 flex-shrink-0">
            <IconComponent className="h-5 w-5" />
          </div>

          {/* Message */}
          <div className="flex-grow font-medium">{toast.message}</div>

          {/* Close button */}
          <button
            className="ml-auto flex-shrink-0 -mr-1 text-white opacity-60 hover:opacity-100 focus:outline-none transition-opacity duration-200"
            onClick={() => toast.onClose && toast.onClose(toast.id)}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
