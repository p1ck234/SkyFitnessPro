import { Route, Routes, useLocation } from "react-router-dom";
import { ProfilePage } from "./pages/profile";
import Course from "./components/coursesBlock/Course";
import { PopSelectWorkouts } from "./components/pops/PopSelectWorkout";

export const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Course />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/select_workouts" element={<PopSelectWorkouts />} />
        </Routes>
      )}
    </>
  );
};
