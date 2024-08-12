import { Heading } from "./Heading/Heading";
import { Cards } from "./Cards/Cards";
import { Button } from "../Button";
import { useCourses } from "@/context/courseContext"; 
import { Card } from "../mainBlock/Card/Card"; 

export function Main() {
  const { courses, loading, error } = useCourses();

  if (loading) {
    return <div>Loading...</div>;
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
