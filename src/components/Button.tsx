import { forwardRef, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  width?: string;
  className?: string;
  borderColor?: string;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color = "bg-customGreen",
      width = "w-auto",
      borderColor = "",
      className = "",
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    return (
      <button
        ref={ref}
        className={`text-xl text-black py-2 px-4 rounded-full ${color} ${width} ${
          borderColor ? `border ${borderColor}` : ""
        } ${className}  }`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
