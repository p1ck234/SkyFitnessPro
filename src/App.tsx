import React from "react";
import "./index.css";
import Course from "./components/coursesBlock/Course";
import Header from "./components/header/Header";
import { Main } from "./components/mainBlock/Main";
const App = () => {
  return (
    <div className="container-xl mx-auto p-6 font-sans">
      <Header />
      <Course />
      <Main/>
    </div>
  );
};

export default App;
