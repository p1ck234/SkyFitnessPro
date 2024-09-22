export function Heading() {
  return (
    <div className="flex justify-beween mt-14 w-full">
      <h2 className="flex justify-center font-medium text-2xl md:text-3xl lg:text-6xl text-center md:text-start">
        Начните заниматься спортом и улучшите качество жизни
      </h2>
      <div className="hidden md:flex lg:hidden xl:flex maw-w-60 justity">
        <img
          src={"img/Slogan.png"}
          alt="Слоган"
        />
      </div>
    </div>
  );
}
