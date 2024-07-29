import React from "react";
import CourseDescription from "./components/coursesBlock/CourseDescription";
import CoursesBlock from "./components/coursesBlock/CoursesBlock";
import "./index.css";
import Course from "./components/coursesBlock/Course";
import Header from "./components/header/Header";
const App = () => {
  return (
    <div className="container-xl mx-auto p-6 font-sans">
      <Header />
      <Course />
    </div>
  );
};

export default App;
