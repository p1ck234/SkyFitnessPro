import { Heading } from "./Heading/Heading";
import { Cards } from "./Cards/Cards";

export function Main() {
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <Heading></Heading>
      <Cards></Cards>
      <div className="flex  justify-center">
      <button className=" font-normal text-lg grid rounded-3xl bg-customGreen px-4 py-3">Наверх ↑</button>
      </div>
     
    </div>
  );
}
