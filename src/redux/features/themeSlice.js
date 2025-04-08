import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme: {
      reducer(state, action) {
        state.mode = action.payload.mode;
        state.source = action.payload.source;
        state.updatedAt = action.payload.updatedAt;
      },
      prepare(mode, source = "manual") {
        return {
          payload: {
            mode,
            source,
            updatedAt: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.mode;

export default themeSlice.reducer;
