export type Workout = {
  id: number;
  name: string;
  exercises: any[];
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
  progress: number | null;
}
