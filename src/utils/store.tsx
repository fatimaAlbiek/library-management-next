import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
        book: bookSlice,
        auth: authSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;