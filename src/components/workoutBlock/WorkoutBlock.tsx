import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExersicesProgress from "./ExersicesProgress";
import { useUserCourses } from "@/customHooks/useUserCourses";
import { useModal } from "@/context/modalContext";
import { Workout } from "@/types/types";
import { Button } from "../Button";
import { constRoutes } from "@/lib/paths";

export const WorkoutBlock = () => {
  const { courseId, workoutId } = useParams();
  const { userCourses } = useUserCourses(0);
  const { openModal } = useModal();
  const navigate = useNavigate();

  const course = userCourses.find(
    (course) => course.id === parseInt(courseId || "0")
  );

  const workout = course?.workouts?.find(
    (workout: Workout) => workout.id === parseInt(workoutId || "0")
  );

  if (!course || !workout) {
    return <div>Курс или тренировка не найдены</div>;
  }

  return (
    <>
      <h1 className="text-sm sm:text-lg md:text-xl lg:text-6xl font-medium mb-8 mt-10">
        {course.name}
      </h1>
      <h2 className="text-sm sm:text-lg md:text-xl lg:text-4xl font-medium mb-8 mt-10 flex underline">
        {workout.url_desc}
      </h2>

      <iframe
        className="mt-10 rounded-3xl flex w-full aspect-video"
        src={`https://www.youtube.com/embed/${getYouTubeID(workout.url)}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>

      <ExersicesProgress workout={workout} courseId={courseId || ""} />
      <div className="flex justify-center">
        <Button
          className="h-12 w-32"
          onClick={() => {
            navigate(constRoutes.PROFILE);
          }}
        >
          Назад
        </Button>
      </div>
    </>
  );
};

const getYouTubeID = (url: string) => {
  const regExp =
    /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};
