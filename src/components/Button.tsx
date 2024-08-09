import { forwardRef, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  width?: string;
  className?: string;
  borderColor?: string;
  variant?: "custom-color" | "custom-achrom";
  onClick?: () => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color = "bg-customGreen",
      width = "w-auto",
      borderColor = "",
      className = "",
      variant = "custom-color",
      onClick,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const variantClass =
      variant === "custom-achrom" ? "btn-custom-achrom" : "btn-custom-color";

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    return (
      <button
        ref={ref}
        className={`text-xl py-2 px-4 rounded-full ${color} ${width} ${
          borderColor ? `border ${borderColor}` : ""
        } ${variantClass} ${className} ${
          isHovered ? "hover" : isActive ? "active" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
