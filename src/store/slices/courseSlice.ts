import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CourseState, Workout } from "@/types/types";
import { useUserCourses } from "@/customHooks/useUserCourses";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

export const fetchUserCourses = createAsyncThunk<Course[], string, { rejectValue: string }>(
  "course/fetchUserCourses",
  async (uid, thunkAPI) => {
    try {
      const db = getFirestore();
      const coursesRef = collection(db, "courses");

      // Запрос на все курсы, где user.uid есть в массиве users
      const q = query(coursesRef, where("users", "array-contains", uid));
      const querySnapshot = await getDocs(q);

      const courses = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Course[];

      return courses;
    } catch (error) {
      return thunkAPI.rejectWithValue("Не удалось загрузить курсы пользователя");
    }
  }
);

const initialState: CourseState = {
  courses: [],
  userCourses: [],
  loading: true,
  error: null,
  progress: 25,
  isProfile: false,
  selectedWorkout: [],
  workouts: [],
  course: {
    id: "",
    name: "",
    img: "",
    imgMobile: "",
    days: 0,
    range: "",
    good_for_you: [],
    directions: [],
    description: [],
  } as Course, // Указываем частичное значение,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    setSelectedWorkout(state, action: PayloadAction<Workout[]>) {
      state.selectedWorkout = action.payload;
    },
    setUserCourses(state, action: PayloadAction<Course[]>) {
      state.userCourses = action.payload;
    },
    setIsProfile(state, action: PayloadAction<boolean>) {
      state.isProfile = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCourse(state, action: PayloadAction<Course>) {
      state.course = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.loading = false;
        state.userCourses = action.payload;
      })
      .addCase(fetchUserCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setProgress,
  setSelectedWorkout,
  setUserCourses,
  setIsProfile,
  setLoading,
  setCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
