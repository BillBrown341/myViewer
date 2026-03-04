import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OshDataStream, OshVisualization } from "../dataTypes";


interface vizStoreState {
  dataSources: any[];
  layers: any[]; // This gets filled out by your visualization formOptions
}

const initialState: vizStoreState = {
  dataSources: [],
  layers: []
};

const VizStoreSlice = createSlice({
  name: "vizStore",
  initialState,
  reducers: {
    // Add a new node to the store
    addDataSource(state, action: PayloadAction<OshDataStream>) {
      state.dataSources.push(action.payload);
    },

    // Remove a node by name
    removeDataSource(state, action: PayloadAction<OshDataStream>) {
      state.dataSources = state.dataSources.filter(
        (ds) => ds.id !== action.payload.id
      );
    },

    addLayer(state, action: PayloadAction<OshDataStream>) {
      state.layers.push(action.payload);
    },

    // Remove a node by name
    removeLayer(state, action: PayloadAction<OshDataStream>) {
      state.layers = state.layers.filter(
        (ds) => ds.id !== action.payload.id
      );
    },

    // Clear Current Selection and Visualization
    // clear(state){
    //     state.dataSources = [];
    //     state.layers = []
    // },

    /// VISUALIZATION METHODS
    // updateViz(state, action: PayloadAction<Record<string, any>>){
    //   state.currentVisualization = {
    //     ...state.currentVisualization,
    //     ...action.payload
    //   };
    // }
    
  },
});

export const { addDataSource, removeDataSource, addLayer, removeLayer } = VizStoreSlice.actions;
export default VizStoreSlice.reducer;

