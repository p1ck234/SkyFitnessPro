import { useParams } from "react-router-dom";
import ExersicesProgress from "./ExersicesProgress";
import { useUserCourses } from "@/customHooks/useUserCourses";

export const WorkoutBlock = () => {
  const { courseId, workoutId } = useParams();
  const { userCourses } = useUserCourses(0);

  console.log(`Загрузка данных для courseId: ${courseId}`);

  const course = userCourses.find(
    (course) => course.id === parseInt(courseId || "0")
  );

  console.log("Найденный курс:", course);

  if (!course || !course.workouts) {
    return <div>Курс или тренировка не найдены</div>;
  }

  const workout = course.workouts.find(
    (workout) => workout.id === parseInt(workoutId || "0")
  );

  console.log("Найдена тренировка:", workout);

  if (!workout) {
    return <div>Курс или тренировка не найдены</div>;
  }

  return (
    <>
      <h1 className="text-sm sm:text-lg md:text-xl lg:text-6xl font-medium mb-8 mt-10">
        {workout.url_desc}
      </h1>

      <iframe
        className="mt-10 rounded-3xl"
        width="1150"
        height="639"
        src={`https://www.youtube.com/embed/${getYouTubeID(workout.url)}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      <ExersicesProgress workout={workout} courseId={courseId as string} />
    </>
  );
};

// Функция для извлечения ID видео из URL YouTube
const getYouTubeID = (url: string) => {
  const regExp =
    /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};
