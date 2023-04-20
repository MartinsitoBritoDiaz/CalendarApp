import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./";
import { calendarSlice } from "./calendar/calendarSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },
});