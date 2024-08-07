interface ButtonType {
  children: React.ReactNode;
  color?: string;
  width?: string;
  className?: string;
  borderColor?: string;
  onClick?: () => void; // Добавляем onClick как опциональный пропс
}
export const Button = ({
  children,
  color = "bg-customGreen",
  width = "w-auto",
  className = "",
  borderColor = "",
  onClick,
}: ButtonType) => {
  return (
    <button
      className={`text-xl text-black py-2 px-4 rounded-full ${color} ${width} ${className} ${
        borderColor && `border border-${borderColor}`
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
