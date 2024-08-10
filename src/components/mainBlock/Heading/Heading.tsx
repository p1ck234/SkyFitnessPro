export function Heading() {
  return (
    <div className="flex gap-5 mt-14">
      <h2 className="flex-initial w-3/4 font-medium text-2xl phone:text-6xl">
        Начните заниматься спортом и улучшите качество жизни
      </h2>
      <div className="bg-customGreen text-center items-center flex hidden phone:flex">
        <p className="text-3xl">Измени своё тело за полгода!</p>
      </div>
    </div>
  );
}
