import React from "react";
import { useParams } from "react-router-dom";
import CoursesBlock from "./CoursesBlock";
import CourseDescription from "./CourseDescription";
import { useCourses } from "@/context/courseContext";
import { Button } from "../shared/Button";

const Course: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, loading } = useCourses();

  if (loading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  const course = courses.find((course) => course.id.toString() === id);

  if (!course) {
    return <p>Курс не найден</p>;
  }

  return (
    <div className="mx-auto mt-14">
      <CoursesBlock course={course} />
      <CourseDescription course={course} />
      <a className="w-full flex justify-center mt-8" href="#heading-section">
        <div className="w-full flex justify-center mt-8">
          <Button className="h-12 w-32">Наверх ↑</Button>
        </div>
      </a>
    </div>
  );
};

export default Course;
