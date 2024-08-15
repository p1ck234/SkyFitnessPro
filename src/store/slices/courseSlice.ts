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
import { Course, CourseState, Workout } from "@/types/types";
import { useUser } from "@/context/userContext";

const initialState: CourseState = {
  courses: [],
  userCourses: [],
  loading: true,
  error: null,
  progress: 25,
  isProfile: false,
  selectedWorkout: [],
  workouts: [],
};

// Fetch all courses
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

// Fetch user courses
export const fetchUserCourses = createAsyncThunk<
  Course[],
  string, // Аргумент теперь - UID пользователя
  { rejectValue: string }
>("course/fetchUserCourses", async (userId, { rejectWithValue }) => {
  try {
    const db = getFirestore();
    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, where("users", "array-contains", userId));
    const querySnapshot = await getDocs(q);

    const courses: Course[] = querySnapshot.docs.map((doc) => ({
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
  string,
  string,
  { rejectValue: string }
>("course/removeCourse", async (courseId, { rejectWithValue, getState }) => {
  const state = getState() as { user: { uid: string } };
  const userId = state.user.uid;

  if (!userId) {
    return rejectWithValue("User not authenticated or UID is missing");
  }

  try {
    console.log("Removing course:", { courseId, userId });
    const db = getFirestore();
    const userCoursesRef = collection(db, "users", userId, "courses");
    const courseRef = doc(userCoursesRef, courseId);

    await deleteDoc(courseRef);
    console.log("Course removed:", courseId);

    return courseId;
  } catch (error) {
    console.error("Error removing course:", error);
    return rejectWithValue("Failed to remove course");
  }
});

export const fetchAddCourse = createAsyncThunk<
  Course,
  { courseId: string; userId: string },
  { rejectValue: string }
>("course/addCourse", async ({ courseId, userId }, { rejectWithValue }) => {
  console.log("fetchAddCourse called with:", { courseId, userId }); // Логируем
  try {
    const db = getFirestore();
    const parsedCourseId = parseInt(courseId, 10);
    if (isNaN(parsedCourseId)) {
      return rejectWithValue("Invalid course ID");
    }
    await addCourseToUser(userId, parsedCourseId); // Передаем как число
    const courseDoc = await getDoc(doc(db, "courses", courseId));

    if (courseDoc.exists()) {
      return { id: courseDoc.id, ...(courseDoc.data() as Omit<Course, "id">) };
    } else {
      return rejectWithValue("Course not found");
    }
  } catch (error) {
    console.error("Error adding course:", error);
    return rejectWithValue("Failed to add course");
  }
});

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
          (course) => course.id !== action.payload // Удаление курса по ID
        );
      })
      .addCase(fetchAddCourse.fulfilled, (state, action) => {
        state.userCourses.push(action.payload); // Добавление курса
      });
  },
});

export const { setProgress, setSelectedWorkout, setUserCourses } =
  courseSlice.actions;
export default courseSlice.reducer;
