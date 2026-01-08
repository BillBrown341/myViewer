import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OshDataStream, OshVisualization } from "../dataTypes";


interface CurrentVizStoreState {
  selectedDataStreams: OshDataStream[];
  currentVisualization: any; // This gets filled out by your visualization formOptions
}

const initialState: CurrentVizStoreState = {
  selectedDataStreams: [],
  currentVisualization: {}
};

const currentVizStoreSlice = createSlice({
  name: "currentVizStore",
  initialState,
  reducers: {
    // Add a new node to the store
    addDataStream(state, action: PayloadAction<OshDataStream>) {
      state.selectedDataStreams.push(action.payload);
    },

    // Remove a node by name
    removeDataStream(state, action: PayloadAction<OshDataStream>) {
      state.selectedDataStreams = state.selectedDataStreams.filter(
        (ds) => ds.id !== action.payload.id
      );
    },

    // Clear Current Selection and Visualization
    clear(state){
        state.selectedDataStreams = [];
        state.currentVisualization = {
          type: null,
          dataSources:[],
        }
    },

    /// VISUALIZATION METHODS
    updateViz(state, action: PayloadAction<Record<string, any>>){
      state.currentVisualization = {
        ...state.currentVisualization,
        ...action.payload
      };
      console.log(state.currentVisualization)
    }
    
  },
});

export const { addDataStream, removeDataStream, clear, updateViz } = currentVizStoreSlice.actions;
export default currentVizStoreSlice.reducer;

