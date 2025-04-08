import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const habitApi = createApi({
  reducerPath: "habitApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Habit"],
  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => "/habits",
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({
              type: "Habit",
              id,
            }))
          : [{ type: "Habit" }],
      refetchOnFocus: true,
      refetchOnReconnect: true,
      pollingInterval: 60000,
    }),

    getHabitById: builder.query({
      query: (id) => `/habits/${id}`,
      providesTags: (result, error, id) => [{ type: "Habit", id }],
      transformResponse: (response) => ({
        name: response.name,
      }),
    }),

    getHabitByIdOrCache: builder.query({
      async queryFn(id, { getState }, _extraOptions, fetchWithBQ) {
        // 1. Try to get from the getHabits cache
        const state = getState();
        const habitsResult = habitApi.endpoints.getHabits.select()(state);
        const habitsData = habitsResult?.data;

        const cachedHabit = habitsData?.find((habit) => habit.id === id);
        if (cachedHabit) {
          return { data: cachedHabit };
        }

        // 2. If not found, fetch using getHabitById
        const result = await fetchWithBQ(`/habits/${id}`);
        if (result.error) {
          return { error: result.error };
        }
        return { data: result.data };
      },

      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({
              type: "Habit",
              id,
            }))
          : [{ type: "Habit" }],
    }),

    addHabit: builder.mutation({
      query: (habit) => ({
        url: "/habits",
        method: "POST",
        body: habit,
        meta: { initiatedBy: "addHabit" },
      }),
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.error || "Unknown Error Occurred.",
        };
      },
      extraOptions: { maxRetries: 1 },
      invalidatesTags: ["Habit"],
    }),

    updateHabit: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/habits/${id}`,
        method: "PUT",
        body: patch,
        meta: { initiatedBy: "updateHabit" },
      }),
      invalidatesTags: (result, error, { id }) => {
        console.log(error);
        return [{ type: "Habit", id }];
      },
    }),

    updateHabitStatus: builder.mutation({
      async queryFn(
        { id, completed },
        { getState },
        _extraOptions,
        fetchWithBQ
      ) {
        const state = getState();

        const habits =
          habitApi.endpoints.getHabits.select(undefined)(state).data;
        const habit = habits?.find((h) => h.id === id);

        if (!habit) {
          return {
            error: { status: "CUSTOM_ERROR", data: "Habit not found in cache" },
          };
        }

        const newStreak = completed
          ? habit.streak + 1
          : Math.max(0, habit.streak - 1);

        try {
          const response = await fetchWithBQ({
            url: `/habits/${id}`,
            method: "PATCH",
            body: {
              completed,
              streak: newStreak,
            },
          });

          return { data: response.data };
        } catch (error) {
          return { error };
        }
      },
      // query: ({ id, completed }) => ({
      //   url: `/habits/${id}`,
      //   method: "PATCH",
      //   body: { completed },
      // }),

      async onQueryStarted({ id, completed }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          habitApi.util.updateQueryData("getHabitById", id, (draft) => {
            draft.completed = completed;
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.log(error);
        }
      },

      invalidatesTags: (result, error, { id }) => {
        return [{ type: "Habit", id }];
      },
    }),

    deleteHabit: builder.mutation({
      query: (id) => ({
        url: `/habits/${id}`,
        method: "DELETE",
        meta: { initiatedBy: "deleteHabit" },
      }),
      invalidatesTags: ["Habit"],
    }),
  }),
});

export const {
  useGetHabitsQuery,
  useGetHabitByIdQuery,
  useAddHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
  useUpdateHabitStatusMutation,
  useGetHabitByIdOrCacheQuery,
} = habitApi;
