import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;

  title?: string;

  subtitle?: string;

  className?: string;

  onClick?: () => void;

  hover?: boolean;

  padding?: "sm" | "md" | "lg";
}

export default function Card({
  children,
  title,
  subtitle,
  className = "",
  onClick,
  hover = true,
  padding = "md",
}: CardProps) {
  const paddings = {
    sm: "p-5",
    md: "p-7",
    lg: "p-9",
  };

  return (
    <div
      onClick={onClick}
      className={`
        rounded-[32px]
        shadow-xl
        border-2
        border-light-overlay
        dark:border-border
        ${paddings[padding]}
        ${hover ? "card-hover" : ""}
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-5">

          {title && (
            <h2 className="text-2xl font-black text-light-text dark:text-text">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-2 text-light-subtext dark:text-subtext">
              {subtitle}
            </p>
          )}

        </div>
      )}

      {children}
    </div>
  );
}