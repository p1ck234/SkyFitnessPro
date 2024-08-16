import {
    configureStore
} from "@reduxjs/toolkit";
import courseSlice from "./slices/courseSlice";
import authSlice from "./slices/authSlice";


export const store = configureStore({
    reducer: {
        course: courseSlice,
        auth: authSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
