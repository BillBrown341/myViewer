import { configureStore } from "@reduxjs/toolkit";
import nodeStoreReducer from "./nodeStore";
import currentVizStoreReducer from "./currentVizStore"
import vizStore from "./vizStore";

export const store = configureStore({
  reducer: {
    nodeStore: nodeStoreReducer,
    currentVizStore: currentVizStoreReducer,
    vizStore: vizStore
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
