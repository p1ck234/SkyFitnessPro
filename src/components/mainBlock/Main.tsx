import { Heading } from "./Heading/Heading";
import { useCourses } from "@/context/courseContext";
import { Card } from "../mainBlock/Card/Card";
import { Course } from "@/types/types";
import { Button } from "../Button";
import { Link, useNavigate } from "react-router-dom";

type MainProps = {
  course: Course;
};
export function Main({ course }: MainProps) {
  const { courses, loading, error } = useCourses();
  const navigate=useNavigate()
  const moveUp=()=>{
    navigate('#heading-section')
  }

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error loading courses: {error}</div>;
  }

  return (
    <div className="mx-auto">
      <Heading />
      <div className="flex gap-x-4 tablet:gap-x-8 gap-y-5 mt-12 flex-row flex-wrap content-start">
        {courses.map((course) => (
          <Card key={course.id} course={course} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button className="h-12 w-32">
        <a href="#heading-section">Наверх ↑</a>
        </Button>
      </div>
    </div>
  );
}
