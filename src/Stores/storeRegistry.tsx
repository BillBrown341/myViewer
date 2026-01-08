import { configureStore } from "@reduxjs/toolkit";
import nodeStoreReducer from "./nodeStore";
import currentVizStoreReducer from "./currentVizStore"

export const store = configureStore({
  reducer: {
    nodeStore: nodeStoreReducer,
    currentVizStore: currentVizStoreReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
