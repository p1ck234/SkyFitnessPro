import { Heading } from "./Heading/Heading";
import { Cards } from "./Cards/Cards";
import { Button } from "../Button";

export function Main() {
  return (
    <>
      <div className="mx-auto">
        <Heading />
        <Cards />
        <div className="flex  justify-center">
          <a
            href="#heading-section"
            className=" font-normal text-lg grid rounded-3xl bg-customGreen px-4 py-3"
          >
            Наверх ↑
          </a>
        </div>
      </div>
    </>
  );
}
