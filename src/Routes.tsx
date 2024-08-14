import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ProfilePage } from "./pages/profile";
import Course from "./components/coursesBlock/Course";
import { PopSelectWorkoutPage } from "./pages/popSelectWorkout";
import { Exit } from "./pages/exit";
import { PageLayout } from "./pages/pageLayout";
import { Workouts } from "./pages/workouts";
import { useModal } from "./context/modalContext";
import { constRoutes } from "./lib/paths";
import { LogInPage } from "./components/auth/loginPage/LogInPage";
import { RegistrationPage } from "./components/auth/registrationPage/RegistrationPage";
import HomePage from "./pages/homePage";
import { useEffect } from "react";
import { PopExit } from "./components/pops/PopExit";
import { ProtectedRoute } from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import ScrollToTop from "./customHooks/ScrollToTop";
import PopProgress from "./components/pops/PopProgress"; // Import PopProgress

export const AppRoutes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { backgroundLocation?: Location };
  const { modalState, openModal, closeModal, setCurrentPath, currentPath } =
    useModal();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setCurrentPath(location.pathname);
      if (location.pathname === constRoutes.LOGIN) {
        openModal("login");
      } else if (location.pathname === constRoutes.REGISTRATION) {
        openModal("register");
      } else if (location.pathname === constRoutes.SELECT_WORKOUTS) {
        openModal("select_workouts");
      } else if (location.pathname === constRoutes.EXIT) {
        openModal("exit");
      } else {
        closeModal();
      }
    }
  }, [location, currentPath, openModal, closeModal, setCurrentPath]);

  return (
    <>
      <ScrollToTop />
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<PageLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path={constRoutes.COURSE + "/:id"} element={<Course />} />
          <Route
            path={`${constRoutes.WORKOUTS}/:courseId/:workoutId`}
            element={<Workouts />}
          />

          <Route
            path="/*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Routes>
                  <Route path={constRoutes.PROFILE} element={<ProfilePage />} />
                  <Route
                    path={constRoutes.SELECT_WORKOUTS}
                    element={<PopSelectWorkoutPage />}
                  />
                  <Route path={constRoutes.EXIT} element={<Exit />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      {modalState === "login" && (
        <LogInPage
          switchToRegister={() =>
            navigate(constRoutes.REGISTRATION, {
              state: { backgroundLocation: location },
            })
          }
        />
      )}
      {modalState === "register" && (
        <RegistrationPage
          switchToLogin={() =>
            navigate(constRoutes.LOGIN, {
              state: { backgroundLocation: location },
            })
          }
        />
      )}
      {modalState === "select_workouts" && <PopSelectWorkoutPage />}
      {modalState === "exit" && <PopExit closeModal={closeModal} />}
      {modalState === "progress_update" && <PopProgress />}{" "}
    </>
  );
};
