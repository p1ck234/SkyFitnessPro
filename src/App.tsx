import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import { AppRoutes } from "./Routes";
import { ModalProvider } from "./context";

const App = () => {
  return (
    <ModalProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ModalProvider>
  );
};

export default App;
