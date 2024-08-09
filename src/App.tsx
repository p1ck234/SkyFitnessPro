import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import { AppRoutes } from "./Routes";
import { ModalProvider } from "./context";
import { UserProvider } from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
      <ModalProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ModalProvider>
    </UserProvider>
  );
};

export default App;
