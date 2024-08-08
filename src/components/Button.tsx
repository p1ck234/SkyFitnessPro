import { forwardRef, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  width?: string;
  className?: string;
  borderColor?: string;
  variant?: "custom-color" | "custom-achrom";
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
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const variantClass = variant === "custom-achrom" ? "btn-custom-achrom" : "btn-custom-color";

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    const baseStyles = `text-xl py-2 px-4 rounded-full ${color} ${width} ${borderColor ? `border ${borderColor}` : ""} ${className}`;
    const stateStyles = isActive ? "active" : isHovered ? "hover" : "";


    return (
        <button
        ref={ref}
        className={`text-xl py-2 px-4 rounded-full ${color} ${width} ${
          borderColor ? `border ${borderColor}` : ""
        } ${variantClass} ${className} ${
          isHovered ? "hover" : isActive ? "active" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
