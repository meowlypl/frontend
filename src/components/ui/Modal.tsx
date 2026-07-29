import { type ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  width?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  open,
  title,
  children,
  onClose,
  width = "md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  const widths = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${widths[width]} animate-[fadeIn_.25s_ease] rounded-[36px] bg-white shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-orange-100 px-8 py-6">
          <h2 className="text-3xl font-black text-slate-900">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="btn flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-2xl font-bold text-orange-500 hover:bg-orange-100"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}