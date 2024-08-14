import { addCourseToUser, getCourses } from "@/services/firestoreService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Course } from "@/types/types";
import { useUser } from "@/context/userContext";

export const fetchCourses = createAsyncThunk<Course[]>(
  "course/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const courses = await getCourses();
      return courses;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load courses");
    }
  }
);

export const fetchUserCourses = createAsyncThunk<
  Course[],
  void,
  { rejectValue: string }
>("course/fetchUserCourses", async (_, { rejectWithValue }) => {
  const { user } = useUser();
  if (!user || !user.uid) {
    return rejectWithValue("User not authenticated or UID is missing");
  }

  try {
    const db = getFirestore();
    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, where("users", "array-contains", user.uid));
    const querySnapshot = await getDocs(q);

    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Course, "id">),
    }));

    return courses;
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return rejectWithValue("Failed to load user courses");
  }
});

export const fetchRemoveCourse = createAsyncThunk<
  string, // Тип возвращаемого значения (ID курса)
  string, // Тип аргумента (ID курса)
  { rejectValue: string }
>("course/removeCourse", async (courseId, { rejectWithValue }) => {
  const { user } = useUser();
  if (!user || !user.uid) {
    return rejectWithValue("User not authenticated or UID is missing");
  }

  try {
    const db = getFirestore();
    const userCoursesRef = collection(db, "users", user.uid, "courses");
    const courseRef = doc(userCoursesRef, courseId);

    // Удаление курса из профиля пользователя
    await deleteDoc(courseRef);

    return courseId; // Возвращаем ID удаленного курса
  } catch (error) {
    console.error("Error removing course:", error);
    return rejectWithValue("Failed to remove course");
  }
});

export const fetchAddCourse = createAsyncThunk<
  Course,
  { courseId: string; userId: string }, // Аргумент содержит courseId и userId
  { rejectValue: string }
>("course/addCourse", async ({ courseId, userId }, { rejectWithValue }) => {
  try {
    const db = getFirestore();
    const coursesRef = collection(db, "courses");
    await addCourseToUser(userId, parseInt(courseId));
    const course = await getDoc(doc(getFirestore(), "courses", courseId));
    if (course.exists()) {
      return { id: course.id, ...(course.data() as Omit<Course, "id">) };
    } else {
      return rejectWithValue("Course not found");
    }
  } catch (error) {
    console.error("Error adding course:", error);
    return rejectWithValue("Failed to add course");
  }
});

interface CourseState {
  courses: Course[];
  userCourses: Course[]; // Добавляем поле для курсов пользователя
  loading: boolean;
  error: string | null;
  progress: number | null;
  isProfile: boolean;
  isAuthenticated: boolean; // Поле для отслеживания авторизации
}

const initialState: CourseState = {
  courses: [],
  userCourses: [],
  loading: true,
  error: null,
  progress: 25, // Example initial progress
  isProfile: false,
  isAuthenticated: false, // Изначально не авторизован
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCourses.fulfilled, (state, action) => {
        state.userCourses = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRemoveCourse.fulfilled, (state, action) => {
        state.userCourses = state.userCourses.filter(
          (course) => course.id !== action.payload // Удаление по ID
        );
      })
      .addCase(fetchAddCourse.fulfilled, (state, action) => {
        state.userCourses.push(action.payload); // Добавляем полный объект курса
      });
  },
});

export const { setProgress, setAuthenticated } = courseSlice.actions;
export default courseSlice.reducer;
