import React from "react";
import { useParams } from "react-router-dom";
import CoursesBlock from "./CoursesBlock";
import CourseDescription from "./CourseDescription";
import { useCourses } from "@/context/courseContext";
import { Button } from "../shared/Button";

const Course: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, loading } = useCourses();

  console.log("URL ID:", id);
  console.log("Loaded courses:", courses);

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
      <div className="flex justify-center">
        <Button className="h-12 w-32">
          <a href="#heading-section">Наверх ↑</a>
        </Button>
      </div>
    </div>
  );
};

export default Course;
