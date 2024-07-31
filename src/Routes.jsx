import { Route, Routes } from "react-router-dom";
import { constRoutes } from "./lib/paths";
import HomePage from "./components/homePage/HomePage";
import { LogInPage } from "./components/auth/loginPage/LogInPage";
import { RegistrationPage } from "./components/auth/registrationPage/RegistrationPage"; 

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={constRoutes.HOME} element={<HomePage />} />
        {/* <Route path={constRoutes.EXIT} element={<ExitPage />}/> */}

        {/* <Route path={constRoutes.NOT_FOUND} element={<NotFoundPage />} /> */}
        <Route path={constRoutes.LOGIN} element={<LogInPage />} />
        <Route path={constRoutes.REGISTRATION} element={<RegistrationPage />} />
      </Routes>
    </>
  );
};
