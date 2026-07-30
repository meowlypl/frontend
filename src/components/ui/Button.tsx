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
      "bg-light-border dark:bg-border text-white hover:brightness-105",

    secondary:
      "bg-light-overlay dark:bg-overlay text-light-text dark:text-text hover:brightness-105",

    danger:
      "bg-[#ff030c36] text-red-500 hover:bg-red-600",

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
        font-semibold
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