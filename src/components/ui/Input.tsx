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
          <label className="mb-2 block font-black text-slate-800">
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
            border-orange-200
            bg-white
            px-5
            text-slate-900
            outline-none
            transition-all
            duration-200
            placeholder:text-slate-400
            focus:border-orange-500
            focus:ring-4
            focus:ring-orange-100
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