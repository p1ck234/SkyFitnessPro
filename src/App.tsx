import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/modalContext";
import { UserProvider } from "./context/userContext";
import { AppRoutes } from "./Routes";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./store/store";

const App: React.FC = () => {
 

  return (
    <Provider store={store}>
      <UserProvider>
        <ModalProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ModalProvider>
      </UserProvider>
    </Provider>
  );
};

export default App;
