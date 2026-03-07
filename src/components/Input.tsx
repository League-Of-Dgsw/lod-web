import type { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className, ...props }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <p className="text-sm text-black/80">{label}</p>
      <input className={`bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none ${className}`} {...props} />
      <p className="text-xs text-red-500 pl-1">{error}</p>
    </div>
  );
};

export default Input;
