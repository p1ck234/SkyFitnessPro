import React from "react";

export function Card() {
  return (
    <div className="bg-white rounded-3xl shadow-lg mb-6 w-90 flex items-center flex-col">
      <div className="relative">
        <img className="rounded-3xl" src="yoga.png" alt="yoga" />
        <button className="absolute top-2 right-5 flex items-center group">
          <img
            src="/img/icon/plus.svg"
            alt="Добавить курс"
            className="w-6 h-6"
          />
          <span className="opacity-0 group-hover:opacity-100 bg-white text-black text-sm px-2 py-1 rounded-md ml-2 absolute top-1/2 left-full transform -translate-y-1/2 translate-x-2 transition-opacity duration-300 shadow-lg">
            Добавить курс
          </span>
        </button>
      </div>
      <div className="w-80 p-3 flex flex-col">
        <h3 className="font-bold text-3xl py-5">Йога</h3>
        <div className="flex flex-row flex-wrap gap-4">
          <div className="bg-gray-200 rounded-lg px-2 py-1 flex items-center gap-1">
            <img src="icons/calendar.svg" alt="calendar" />
            <p className="text-base">25 дней</p>
          </div>
          <div className="bg-gray-200 rounded-lg px-2 py-1 flex items-center gap-1">
            <img src="icons/time.svg" alt="time" />
            <p className="text-base">20-50 мин/день</p>
          </div>
          <div className="bg-gray-200 rounded-lg px-2 py-1 flex items-center gap-1">
            <img src="icons/difficult.svg" alt="difficulty" />
            <p className="text-base">Сложность</p>
          </div>
        </div>
      </div>
    </div>
  );
}
