import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CourseState, Workout } from "@/types/types";
import {
  addCourseToUser,
  checkCourseExists,
  removeCourseFromUser,
} from "@/services/firestoreService";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export const fetchUserCourses = createAsyncThunk<
  Course[],
  string,
  { rejectValue: string }
>("course/fetchUserCourses", async (uid, thunkAPI) => {
  try {
    const db = getFirestore();
    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, where("users", "array-contains", uid));
    const querySnapshot = await getDocs(q);

    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[];

    return courses;
  } catch (error) {
    return thunkAPI.rejectWithValue("Не удалось загрузить курсы пользователя");
  }
});

export const fetchAddCourse = createAsyncThunk<
  void,
  { uid: string; courseId: string },
  { rejectValue: string }
>("course/fetchAddCourse", async ({ uid, courseId }, thunkAPI) => {
  try {
    const courseIdNum = parseInt(courseId);
    // Проверка, существует ли курс в профиле пользователя
    const exists = await checkCourseExists(uid, courseIdNum);
    if (exists) {
      alert("Этот курс уже есть в вашем профиле");
      return thunkAPI.rejectWithValue("Курс уже добавлен в профиль");
    }
    await addCourseToUser(uid, parseInt(courseId));
    alert("Курс успешно добавлен в ваш профиль");
  } catch (error) {
    alert("Курс не удалось добавить в профиль");
    return thunkAPI.rejectWithValue("Не удалось добавить курс");
  }
});

export const fetchUserProgress = createAsyncThunk<
  { courseId: string; progress: number }, // Тип возвращаемого значения
  { uid: string; courseId: string },
  { rejectValue: string }
>("course/fetchUserProgress", async ({ uid, courseId }, thunkAPI) => {
  try {
    const db = getFirestore();
    const userRef = doc(db, "dataUsers", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const courseProgress = userData.courses_progress?.find(
        (cp: any) => cp.id_course === parseInt(courseId)
      );
      return { courseId, progress: courseProgress?.progress || 0 };
    }
    return { courseId, progress: 0 };
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка при загрузке прогресса пользователя");
  }
});

export const fetchRemoveCourse = createAsyncThunk<
  void,
  { uid: string; courseId: string },
  { rejectValue: string }
>("course/fetchRemoveCourse", async ({ uid, courseId }, thunkAPI) => {
  try {
    const courseIdNum = parseInt(courseId);
    await removeCourseFromUser(uid, courseIdNum);
    alert("Курс успешно удален из вашего профиля");
    
  } catch (error) {
    alert("Курс не удалось удалить из профиля");
    return thunkAPI.rejectWithValue("Не удалось удалить курс");
  }
});

export const fetchResetProgress = createAsyncThunk<
  void,
  { uid: string; courseId: string },
  { rejectValue: string }
>("course/fetchResetProgress", async ({ uid, courseId }, thunkAPI) => {
  try {
    const courseIdNum = parseInt(courseId);
    await removeCourseFromUser(uid, courseIdNum);
    await addCourseToUser(uid, courseIdNum);
    thunkAPI.dispatch(setProgress(0)); // Обновляем прогресс в состоянии
  } catch (error) {
    return thunkAPI.rejectWithValue("Не удалось сбросить прогресс курса");
  }
});

const initialState: CourseState = {
  courses: [],
  userCourses: [],
  loading: false,
  error: null,
  progress: {},
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
  } as Course,
  refreshKey: 0,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<{ courseId: string; progress: number }>) {
      const { courseId, progress } = action.payload;
      state.progress[courseId] = progress;
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
    setRefreshKey(state) {
      state.refreshKey += 1;
    },
    // Удаление курса из состояния
    setRemoveCourse(state, action: PayloadAction<Course>) {
      state.userCourses = state.userCourses.filter(
        (course) => course.id !== action.payload.id
      );
      // Обновляем ключ для обновления
      state.refreshKey += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.loading = false;
          state.courses = action.payload;
        }
      )
      .addCase(fetchUserCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAddCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddCourse.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAddCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action: PayloadAction<{ courseId: string; progress: number }>) => {
        state.loading = false;
        const { courseId, progress } = action.payload;
        state.progress[courseId] = progress;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRemoveCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRemoveCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.userCourses = state.userCourses.filter(
          (course) => course.id !== action.meta.arg.courseId
        );
      })
      .addCase(fetchRemoveCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchResetProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResetProgress.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchResetProgress.rejected, (state, action) => {
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
  setRefreshKey,
  setRemoveCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
