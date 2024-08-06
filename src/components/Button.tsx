interface ButtonType {
  children: React.ReactNode;
  color?: string;
  width?: string;
  className?: string;
  borderColor?: string;
}
export const Button = ({
  children,
  color = "bg-customGreen",
  width = "w-auto",
  className = "",
  borderColor = "",
}: ButtonType) => {
  return (
    <button
      className={`text-xl text-black py-2 px-4 rounded-full ${color} ${width} ${className} ${
        borderColor && `border border-${borderColor}`
      }`}
    >
      {children}
    </button>
  );
};
