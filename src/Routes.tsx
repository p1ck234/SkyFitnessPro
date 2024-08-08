import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ProfilePage } from "./pages/profile";
import Course from "./components/coursesBlock/Course";
import { PopSelectWorkoutPage } from "./pages/popSelectWorkout";
import { Exit } from "./pages/exit";
import { PageLayout } from "./pages/pageLayout";
import { Workouts } from "./pages/workouts";
import { useModal } from "./context";
import { constRoutes } from "./lib/paths";
import { LogInPage } from "./components/auth/loginPage/LogInPage";
import { RegistrationPage } from "./components/auth/registrationPage/RegistrationPage";
import HomePage from "./pages/homePage";

interface AppRoutesProps {
  openModal: (isLoginMode: boolean) => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ openModal }) => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  // const navigate = useNavigate();
  const { closeModal } = useModal(); // Получаем closeModal из контекста

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<PageLayout />}>
          {/* <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/workouts" element={<Workouts />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path={constRoutes.COURSE} element={<Course />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/select_workouts" element={<PopSelectWorkoutPage />} />
          <Route path="/exit" element={<Exit closeModal={closeModal} />} />
        </Route>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/select_workouts" element={<PopSelectWorkoutPage />} /> */}
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/select_workouts" element={<PopSelectWorkoutPage />} />
          <Route path="/exit" element={<Exit closeModal={closeModal} />} />
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
