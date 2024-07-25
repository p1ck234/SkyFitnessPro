import {
    configureStore
} from "@reduxjs/toolkit";
import courseSlice from "./slices/courseSlice";


export const store = configureStore({
    reducer: {
        course: courseSlice,
    },
});