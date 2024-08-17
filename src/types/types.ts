export type Workout = {
  id: number;
  name: string;
  exercises: any[];
  url: string;
  url_desc: string;
};

export type Course = {
  id: string;
  name: string;
  img: string;
  imgMobile: string;
  days: number;
  range: string;
  good_for_you: string[];
  directions: string[];
  description: string[];
  progress?: number;
  workouts?: Workout[];
};

export type CourseState = {
  courses: Course[];
  userCourses: Course[];
  loading: boolean;
  error: string | null;
  progress: { [courseId: string]: number }; // Прогресс для каждого курса
  isProfile: boolean;
  selectedWorkout: Workout[];
  workouts: Workout[];
  course: Course;
  refreshKey: number;
};
