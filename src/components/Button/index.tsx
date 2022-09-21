import { ButtonHTMLAttributes, HTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button = ({ ...rest }: Props) => {
  return (
    <button
      {...rest}
      className="p-2 bg-gray-800 text-white rounded-md disabled:bg-gray-300"
    ></button>
  );
};
