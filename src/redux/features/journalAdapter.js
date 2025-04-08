import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const journalAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const journalSlice = createSlice({
  name: "journal",
  initialState: journalAdapter.getInitialState(),
  reducers: {
    journalAdded: journalAdapter.addOne,
    journalUpdated: journalAdapter.updateOne,
    journalRemoved: journalAdapter.removeOne,
    journalSetAll: journalAdapter.setAll,
  },
});

export const { journalAdded, journalUpdated, journalRemoved, journalSetAll } =
  journalSlice.actions;

export const { selectAll: selectAllJournals, selectById: selectJournalById } =
  journalAdapter.getSelectors((state) => state.journal);

export default journalSlice.reducer;
