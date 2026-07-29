import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  variant?: "primary" | "secondary" | "danger" | "success";

  fullWidth?: boolean;

  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-orange-500 text-white shadow-lg shadow-orange-200 dark:shadow-orange-900 hover:brightness-105",

    secondary:
      "bg-orange-50 text-orange-600 hover:bg-orange-100",

    danger:
      "bg-red-500 text-white hover:bg-red-600",

    success:
      "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        btn
        h-14
        rounded-2xl
        px-6
        font-black
        transition-all
        duration-200
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? "Ładowanie..." : children}
    </button>
  );
}