import type { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className, ...props }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">{label}</p>}
      <input
        className={`w-full bg-transparent border-b border-gray-300 px-0 py-2 outline-none text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-150 focus:border-gray-900 ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 pl-1">{error}</p>}
    </div>
  );
};

export default Input;
