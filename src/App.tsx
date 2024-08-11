import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import { AppRoutes } from "./Routes";
import { ModalProvider } from "./context";
import { UserProvider } from "./context/userContext";
import { CourseProvider } from "./context/courseContext";

const App = () => {
  return (
    <UserProvider>
      <CourseProvider>
        <ModalProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ModalProvider>
      </CourseProvider>
    </UserProvider>
  );
};

export default App;
