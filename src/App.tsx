import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/modalContext";
import { UserProvider } from "./context/userContext";
import { CourseProvider } from "./context/courseContext";
import { AppRoutes } from "./Routes";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <CourseProvider>
          <ModalProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ModalProvider>
        </CourseProvider>
      </UserProvider>
    </Provider>
  );
};

export default App;
