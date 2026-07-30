import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">

        {label && (
          <label className="mb-2 block font-semibold text-light-subtext dark:text-subtext">
            {label}
          </label>
        )}

        <input
          ref={ref}
          {...props}
          className={`
            h-14
            w-full
            rounded-2xl
            border-2
            border-light-overlay
            dark:border-overlay
            bg-light-overlay
            dark:bg-overlay
            px-5
            text-light-text
            dark:text-text
            outline-none
            transition-all
            duration-200
            autofill:border-yellow-500
            autofill:bg-light-overlay
            autofill:dark:bg-overlay
            focus:border-light-border
            dark:focus:border-border
            disabled:bg-slate-100
            disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:ring-red-100" : ""}
            ${className}
          `}
        />

        {error && (
          <p className="mt-2 text-sm font-semibold text-red-500">
            {error}
          </p>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;