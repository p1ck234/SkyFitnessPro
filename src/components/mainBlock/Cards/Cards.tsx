import { Card } from "../Card/Card";

export function Cards() {
  return (
    <div
      className="flex justify-between lg:justify-start gap-x-8 md:gap-10 lg:gap-x-24 gap-y-5 mt-12 flex-row flex-wrap content-start"
    >
      <Card></Card>
    </div>
  );
}
