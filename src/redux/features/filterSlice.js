import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  frequency: "all", // all, daily, weekly, monthly
  status: "all", // all, completed, active
  sortBy: "newest", // newest, oldest, streak
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFrequencyFilter: (state, action) => {
      state.frequency = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.frequency = "all";
      state.status = "all";
      state.sortBy = "newest";
    },
  },
});

export const { setFrequencyFilter, setStatusFilter, setSortBy, resetFilters } =
  filterSlice.actions;

export const selectFilters = (state) => state.filter;

export default filterSlice.reducer;
