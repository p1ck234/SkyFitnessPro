import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { constRoutes } from "./lib/paths";
import HomePage from "./components/homePage/HomePage";
import { LogInPage } from "./components/auth/loginPage/LogInPage";
import { RegistrationPage } from "./components/auth/registrationPage/RegistrationPage";

interface AppRoutesProps {
  openModal: (isLoginMode: boolean) => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ openModal }) => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path={constRoutes.HOME} element={<HomePage />} />
        <Route
          path={constRoutes.LOGIN}
          element={<LogInPage switchToRegister={() => openModal(false)} />}
        />
        <Route
          path={constRoutes.REGISTRATION}
          element={<RegistrationPage switchToLogin={() => openModal(true)} />}
        />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={constRoutes.LOGIN}
            element={<LogInPage switchToRegister={() => openModal(false)} />}
          />
          <Route
            path={constRoutes.REGISTRATION}
            element={<RegistrationPage switchToLogin={() => openModal(true)} />}
          />
        </Routes>
      )}
    </>
  );
};
