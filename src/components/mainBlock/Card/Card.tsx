export function Card() {
  return (
    <div className="bg-white rounded-3xl shadow-lg mb-6 w-90 flex items-center flex-col">
      <div className=" relative">
        <img className="rounded-3xl" src="../public/yoga.png" alt="yoga" />
        <button className=" font-extrabold text-2xl absolute top-2 right-5">
          +
        </button>
      </div>
      <div className=" w-80 p-3 flex flex-col">
        <h3 className="font-bold text-3xl py-5">Йога</h3>
        <div className="flex flex-row flex-wrap gap-4">
          <div className="bg-gray-200 rounded-lg px-2  py-1 flex items-center gap-1">
            <img src="../public/icons/calendar.svg"></img>
            <p className="text-base">25 дней</p>
          </div>
          <div className="bg-gray-200 rounded-lg px-2 py-1 flex items-center gap-1">
            <img src="../public/icons/time.svg"></img>
            <p className="text-base">20-50 мин/день</p>
          </div>
          <div className="bg-gray-200 rounded-lg px-2 py-1  flex items-center gap-1">
            <img src="../public/icons/difficult.svg"></img>
            <p className="text-base">Сложность</p>
          </div>
        </div>
      </div>
    </div>
  );
}
