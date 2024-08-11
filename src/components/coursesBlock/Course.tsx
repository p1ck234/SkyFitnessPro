import React from "react";
import { useParams } from "react-router-dom";
import CoursesBlock from "./CoursesBlock";
import CourseDescription from "./CourseDescription";
import { useCourses } from "@/context/courseContext";

const Course: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, loading } = useCourses();

  console.log("URL ID:", id);
  console.log("Loaded courses:", courses);

  if (loading) {
    return <p>Loading...</p>;
  }

  const course = courses.find((course) => course.id.toString() === id);

  if (!course) {
    return <p>Курс не найден</p>;
  }

  return (
    <div className="mx-auto mt-14">
      <CoursesBlock course={course} />
      <CourseDescription />
    </div>
  );
};

export default Course;
