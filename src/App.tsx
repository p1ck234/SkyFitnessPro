import React from "react";
import "./index.css";
import Course from "./components/coursesBlock/Course";
import Header from "./components/header/Header";
import { Main } from "./components/mainBlock/Main";
import { AppRoutes } from "./Routes";
import HomePage from "./components/homePage/HomePage";

const App = () => {

  return (
       <AppRoutes />
  );
};

export default App;
