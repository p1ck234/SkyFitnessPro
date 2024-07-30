import React from "react";
import CoursesBlock from "./CoursesBlock";
import CourseDescription from "./CourseDescription";
const Course = () => {
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <CoursesBlock />
      <CourseDescription />
    </div>
  );
};

export default Course;
