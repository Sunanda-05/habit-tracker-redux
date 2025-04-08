import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  journalAdded,
  journalSetAll,
  journalRemoved,
  journalUpdated,
} from "../features/journalAdapter";

export const journalApi = createApi({
  reducerPath: "journalApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Journal"],
  endpoints: (builder) => ({
    getJournals: builder.query({
      query: () => "/journals",
      transformResponse: (response) =>
        response.map((entry) => ({
          ...entry,
          createdAt: new Date(entry.createdAt).toISOString(),
        })),
      providesTags: (result = []) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Journal", id })),
              { type: "Journal", id: "LIST" },
            ]
          : [{ type: "Journal", id: "LIST" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(journalSetAll(data)); // Puts into adapter slice
        } catch (err) {
          console.log(err);
        }
      },
    }),

    addJournal: builder.mutation({
      query: (entry) => ({
        url: "/journals",
        method: "POST",
        body: entry,
      }),
      invalidatesTags: [{ type: "Journal", id: "LIST" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(journalAdded(data)); // Add to adapter slice
        } catch (err) {
          console.log(err);
        }
      },
    }),

    deleteJournalEntry: builder.mutation({
      query: (id) => ({
        url: `/journal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Journal", id }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(journalRemoved(data)); // Add to adapter slice
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updateJournalEntry: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/journal/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Journal", id }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(journalUpdated(data)); // Add to adapter slice
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useGetJournalsQuery,
  useAddJournalMutation,
  useDeleteJournalEntryMutation,
  useUpdateJournalEntryMutation,
} = journalApi;
