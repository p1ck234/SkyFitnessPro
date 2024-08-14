import React from "react";
import { useParams } from "react-router-dom";
import CoursesBlock from "./CoursesBlock";
import CourseDescription from "./CourseDescription";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Course: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, loading, error } = useSelector(
    (state: RootState) => state.course
  );

  console.log("URL ID:", id);
  console.log("Loaded courses:", courses);

  if (loading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  const course = courses.find((course) => course.id.toString() === id);

  if (!course) {
    return <p>Курс не найден</p>;
  }

  return (
    <div className="mx-auto mt-14">
      <CoursesBlock course={course} />
      <CourseDescription course={course} />
    </div>
  );
};

export default Course;
