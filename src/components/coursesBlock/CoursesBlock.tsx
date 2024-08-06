import React from "react";

const CoursesBlock = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-customYellow rounded-lg p-8 mb-6 items-center overflow-hidden"
        style={{ height: "300px" }}
      >
        <h1 className="text-6xl font-bold text-white z-10">Йога</h1>
        <img
          src="yoga.png"
          alt="Hero"
          className="absolute inset-y-100 right-12 bottom-12"
        />
      </section>
    </div>
  );
};

export default CoursesBlock;
