import { Card } from "../Card/Card";

export function Cards() {
  return (
    <div
      className="flex gap-x-20 gap-y-5 mt-12 flex-row flex-wrap content-start"
    >
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </div>
  );
}
