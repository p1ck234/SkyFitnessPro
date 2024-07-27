import React from "react";
const CourseDescription = () => {
  return (
    <>
     {/* Benefits Section */}
     <section className="mb-6 mt-14">
        <h2 className="text-5xl font-bold mb-4">Подойдет для вас, если:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div className="bg-gray-800 text-white p-6 rounded-lg flex items-center">
            <div className="text-7xl font-bold text-lime-500 mr-4">1</div>
            <p className="text-2xl">
              Давно хотели попробовать йогу, но не решались начать
            </p>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-lg flex items-center">
            <div className="text-7xl font-bold text-lime-500 mr-4">2</div>
            <p className="text-2xl">
              Хотите укрепить позвоночник, избавиться от болей в спине и
              суставах
            </p>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-lg flex items-center">
            <div className="text-7xl font-bold text-lime-500 mr-4">3</div>
            <p className="text-2xl">
              Ищете активность, полезную для тела и души
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="mb-6 mt-14">
        <h2 className="text-5xl font-bold mb-4">Направления</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 bg-customGreen p-6 rounded-lg">
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2">
              <img src="Sparcle.svg" alt="" className="w-8 h-8" />
              <p className="text-black text-2xl">Йога для новичков</p>
            </div>
            <div className="flex items-center space-x-2">
              <img src="Sparcle.svg" alt="" className="w-8 h-8" />
              <p className="text-black text-2xl">Классическая йога</p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2">
              <img src="Sparcle.svg" alt="" className="w-8 h-8" />
              <p className="text-black text-2xl">Кундалини-йога</p>
            </div>
            <div className="flex items-center space-x-2">
              <img src="Sparcle.svg" alt="" className="w-8 h-8" />
              <p className="text-black text-2xl">Йогатерапия</p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2">
              <img src="Sparcle.svg" alt="" className="w-8 h-8" />
              <p className="text-black text-2xl">Хатха-йога</p>
            </div>
            <div className="flex items-center space-x-2">
              <img src="Sparcle.svg" alt="" className="w-8 h-8" />
              <p className="text-black text-2xl">Аштанга-йога</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Description Section */}
      <section
        className="relative flex bg-white rounded-lg shadow-lg p-6 mb-6"
        style={{
          minHeight: "486px",
          borderRadius: "30px",
          boxShadow: "0px 4px 67px -12px rgba(0, 0, 0, 0.13)",
          marginTop: "104px",
          zIndex: "1",
        }}
      >
        <div className="flex flex-col justify-between h-full pr-6 gap-8">
          <h2 className="text-6xl font-medium mb-4 font-bold ">
            Начните путь
            <br /> к новому телу
          </h2>
          <ul
            className="list-disc pl-5 mb-4 text-xl text-gray-700"
            style={{
              opacity: "0.6",
              fontFamily: "Roboto",
              lineHeight: "110%",
            }}
          >
            <li>проработка всех групп мышц</li>
            <li>тренировка суставов</li>
            <li>улучшение циркуляции крови</li>
            <li>упражнения заряжают бодростью</li>
            <li>помогают противостоять стрессам</li>
          </ul>

          <div className="flex justify-center">
            <button className="bg-customGreen text-black py-2 px-4 rounded-lg">
              Войдите, чтобы добавить курс
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="man_image.png"
            alt="Course Description"
            className="absolute"
            style={{
              width: "519.47px",
              height: "539.54px",
              left: "750.99px",
              bottom: "45px",
              transform: "rotate(-2.99deg)",
              zIndex: "2",
            }}
          />
          <img
            src="long_line.svg"
            alt="Long Line"
            className="absolute"
            style={{
              width: "670.18px",
              height: "390.98px",
              left: "585.06px",
              bottom: "15px",
              transform: "rotate(-12.38deg)",
              zIndex: "-1",
              maskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)",
            }}
          />
          <img
            src="short_line.svg"
            alt="Short Line"
            className="absolute"
            style={{
              width: "50px",
              height: "42.5px",
              left: "872px",
              bottom: "445px",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default CourseDescription;
