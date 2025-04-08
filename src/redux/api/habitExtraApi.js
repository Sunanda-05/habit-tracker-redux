import { habitApi } from "./habitApi";

export const habitExtraApi = habitApi.injectEndpoints({
  endpoints: (builder) => ({
    getHabitStats: builder.query({
      query: () => "/habits/stats",
    }),
    getHabitByTitle: builder.query({
      query: (title) => `/habits?title=${title}`,
    }),
  }),
  overrideExisting: false, // avoids accidentally replacing existing endpoints
});

export const { useGetHabitStatsQuery, useGetHabitByTitleQuery } = habitExtraApi;
