
import { Heading } from "./Heading/Heading";
import { Cards } from "./Cards/Cards";

export function Main() {

  return (
    <div className="bg-sky-50 aspect-square">
      <Heading></Heading>
      <Cards></Cards>
      <button className="button__up">Наверх</button>
    </div>
  )
}

