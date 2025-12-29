import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OshNode } from "../dataTypes";


interface NodeStoreState {
  allNodes: OshNode[];
}

const initialState: NodeStoreState = {
  allNodes: [],
};

const nodeStoreSlice = createSlice({
  name: "nodeStore",
  initialState,
  reducers: {
    // Add a new node to the store
    addNode(state, action: PayloadAction<OshNode>) {
      state.allNodes.push(action.payload);
    },

    // Remove a node by name
    removeNode(state, action: PayloadAction<string>) {
      state.allNodes = state.allNodes.filter(
        (node) => node.nodename !== action.payload
      );
    },
  },
});

export const { addNode, removeNode } = nodeStoreSlice.actions;
export default nodeStoreSlice.reducer;

