import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ProfilePage } from "./pages/profile";
import Course from "./components/coursesBlock/Course";
import { PopSelectWorkoutPage } from "./pages/popSelectWorkout";
import { Exit } from "./pages/exit";
import { PageLayout } from "./pages/pageLayout";
import { SignUp } from "./components/auth/LogIn";
import SignIn from "./components/auth/SignIn";
import { Workouts } from "./pages/workouts";
import { useModal } from "./context";

export const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  // const navigate = useNavigate();
  const { closeModal } = useModal(); // Получаем closeModal из контекста

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<PageLayout />}>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<Course />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/select_workouts" element={<PopSelectWorkoutPage />} />
          <Route path="/exit" element={<Exit closeModal={closeModal} />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/select_workouts" element={<PopSelectWorkoutPage />} />
          <Route path="/exit" element={<Exit closeModal={closeModal} />} />
        </Routes>
      )}
    </>
  );
};
