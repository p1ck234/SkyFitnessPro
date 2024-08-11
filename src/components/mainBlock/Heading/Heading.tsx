export function Heading() {
  return (
    <div className="flex justify-center gap-5 mt-14">
      <h2 className="flex justify-center font-medium text-2xl md:text-3xl lg:text-6xl text-center md:text-start ">
        Начните заниматься спортом и улучшите качество жизни
      </h2>
      <div className="bg-customGreen text-center items-center hidden phone:flex p-2 box-border">
        <p className="md:text-xl lg:text-3xl">Измени своё тело за полгода!</p>
      </div>
    </div>
  );
}
