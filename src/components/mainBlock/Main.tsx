import { Heading } from "./Heading/Heading";
import { useCourses } from "@/context/courseContext";
import { Card } from "../mainBlock/Card/Card";
import { Course } from "@/types/types";
import { Button } from "../shared/Button";

type MainProps = {
  course: Course;
};
export function Main({ course }: MainProps) {
  const { courses, loading, error } = useCourses();
  const moveUp = () => {
    window.location.href = "#heading-section";
  };

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
      <a
              className="w-full flex justify-center mt-8"
              href="#heading-section"
            >
              <div className="w-full flex justify-center mt-8">
                <Button className="h-12 w-32">Наверх ↑</Button>
              </div>
            </a>
    </div>
  );
}
