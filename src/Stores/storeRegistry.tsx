import { configureStore } from "@reduxjs/toolkit";
import nodeStoreReducer from "./nodeStore";

export const store = configureStore({
  reducer: {
    nodeStore: nodeStoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
