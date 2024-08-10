import React from "react";

const CoursesBlock = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-customYellow rounded-lg p-8 mb-6 items-center overflow-hidden"
        style={{ height: "300px" }}
      >
        <h1 className="absolute text-3xl md:text-6xl font-bold text-white z-10 hidden phone:block">
          Йога
        </h1>
        <img
          src="yoga.png"
          alt="Hero"
          className="absolute inset-y-100 right-1 bottom-12"
        />
      </section>
    </div>
  );
};

export default CoursesBlock;

// import React from "react";

// const CoursesBlock = () => {
//   return (
//     <div>
//       <section
//         className="relative bg-customYellow rounded-lg p-4 md:p-8 items-center overflow-hidden flex flex-col md:flex-row justify-between"
//         style={{ height: "300px" }} // Возвращаем высоту на десктопах
//       >
//         <h1 className="absolute text-3xl md:text-6xl font-bold text-white z-10 hidden phone:block">
//           Йога
//         </h1>
//         <img
//           src="/img/themeBig_Yoga.svg"
//           alt="Hero"
//           className="left-2" // Сдвигаем изображение влево на мобильных устройствах
//         />
//       </section>
//     </div>
//   );
// };

// export default CoursesBlock;
