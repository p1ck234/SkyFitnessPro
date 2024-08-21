import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  width?: string;
  className?: string;
  borderColor?: string;
  variant?: "custom-color" | "custom-achrom";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    const variantClass =
      variant === "custom-achrom" ? "btn-custom-achrom" : "btn-custom-color";

    return (
      <button
        ref={ref}
        className={`py-2 px-4 rounded-full ${color} ${width} ${
          borderColor ? `border ${borderColor}` : ""
        } ${variantClass} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
