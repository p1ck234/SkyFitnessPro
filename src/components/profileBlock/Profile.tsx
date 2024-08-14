import CoursesBlock from "../coursesBlock/CoursesBlock";
import Header from "../header/Header";
import { Card } from "../mainBlock/Card/Card";
import { Person } from "./Person";
import { useNavigate, useLocation } from "react-router-dom";
import { constRoutes } from "@/lib/paths";
import { useModal } from "@/context/modalContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import {
  fetchRemoveCourse,
  fetchUserCourses,
} from "@/store/slices/courseSlice";
import { setProfileState } from "@/store/slices/authSlice";

export const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isProfile } = useSelector((state: RootState) => state.auth);

  const { userCourses, loading, error } = useSelector(
    (state: RootState) => state.course
  );
  useEffect(() => {
    if (location.pathname === "/profile") {
      dispatch(setProfileState(true));
    } else {
      dispatch(setProfileState(false));
    }
  }, [location.pathname, dispatch]);

  // useEffect(() => {
  //   // Диспатч асинхронного действия для получения курсов пользователя
  //   dispatch(fetchUserCourses());
  // }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="bg-gray-200 mt-14">
      <div>
        <Person />
        <h1 className="text-sm sm:text-lg md:text-xl lg:text-4xl font-bold my-8">
          Мои курсы
        </h1>
        <div className="flex gap-x-8 gap-y-5 mt-12 flex-row flex-wrap content-start">
          {userCourses.length > 0 ? (
            userCourses.map((course) => (
              <Card
                key={course.id} // Используем только course.id в качестве ключа
                course={course}
                // onCourseRemoved={handleCourseRemoved}
              />
            ))
          ) : (
            <div className="w-full flex justify-center">У вас нет курсов</div> // Добавлено сообщение, если нет курсов
          )}
        </div>
      </div>
    </div>
  );
};
