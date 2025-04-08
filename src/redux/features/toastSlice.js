import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    toastAdded: (state, action) => {
      state.push(action.payload);
    },
    toastRemoved: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { toastAdded, toastRemoved } = toastSlice.actions;

export default toastSlice.reducer;
export const selectToasts = (state) => state.toast;
