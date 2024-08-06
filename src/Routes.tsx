import { Route, Routes, useLocation } from "react-router-dom";
import { ProfilePage } from "./pages/profile";
import Course from "./components/coursesBlock/Course";
import { PopSelectWorkoutPage } from "./pages/popSelectWorkout";
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
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/select_workouts" element={<PopSelectWorkoutPage />} />
        <Route path={constRoutes.COURSE} element={<Course />} />
        
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/select_workouts" element={<PopSelectWorkoutPage />} />
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
