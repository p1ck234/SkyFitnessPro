import { Card } from "../Card/Card";

export function Cards() {
  return (
    <div className="flex flex-wrap gap-4 justify-between ">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
