import { InputHTMLAttributes } from "react";

export const TextInput = ({
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...rest}
      className={`border-2 border-gray-400 p-2 rounded-md disabled:bg-gray-200`}
    />
  );
};
