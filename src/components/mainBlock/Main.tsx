import { Heading } from "./Heading/Heading";
import { Cards } from "./Cards/Cards";

export function Main() {
  return (
    <>
      <div className="mx-auto">
        <Heading />
        <Cards />
        <div className="flex  justify-center">
          <button className=" font-normal text-lg grid rounded-3xl bg-customGreen px-4 py-3">
            Наверх ↑
          </button>
        </div>
      </div>
    </>
  );
}
