import { Heading } from "./Heading/Heading";
import { Card } from "../mainBlock/Card/Card";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCourses } from "@/store/slices/courseSlice";
import { useAppDispatch } from "@/services/useDispatch";

export function Main() {
  const dispatch = useAppDispatch();
  const { courses, loading, error } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error loading courses: {error}</div>;
  }

  return (
    <div className="mx-auto">
      <Heading />
      <div className="flex gap-x-8 gap-y-5 mt-12 flex-row flex-wrap content-start">
        {courses.map((course) => (
          <Card key={course.id} course={course} />
        ))}
      </div>
      <div className="flex justify-center">
        <a
          href="#heading-section"
          className="font-normal text-lg grid rounded-3xl bg-customGreen px-4 py-3"
        >
          Наверх ↑
        </a>
      </div>
    </div>
  );
}
