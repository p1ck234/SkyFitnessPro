import { Heading } from "./Heading/Heading";
import { Cards } from "./Cards/Cards";

export function Main() {
  return (
    <div>
      <p className="text-gray-450">Онлайн-тренировки для занятий дома</p>
      <div className="bg-gray-200 mt-14">
        <Heading />
        <Cards />
        <div className="flex  justify-center">
          <button className=" font-normal text-lg grid rounded-3xl bg-customGreen px-4 py-3">
            Наверх ↑
          </button>
        </div>
      </div>
    </div>
  );
}
