import { createSlice } from "@reduxjs/toolkit";
const activeSlice = createSlice({
  name: "activepage",
  initialState: "Property search",
  reducers: {
    setActiveItem: (state, action) => action.payload,
  },
});

export const { setActiveItem } = activeSlice.actions;

export default activeSlice.reducer;
