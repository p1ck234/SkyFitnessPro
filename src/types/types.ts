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
