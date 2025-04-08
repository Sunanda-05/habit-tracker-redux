import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { toastAdded, toastRemoved } from "../features/toastSlice";

export const toastApi = createApi({
  reducerPath: "toastApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Toast"],
  endpoints: (builder) => ({
    getToasts: builder.query({
      queryFn: (_arg, { getState }) => {
        const toastState = getState().toast;
        if (toastState) {
          return { data: toastState };
        } else {
          return { error: { message: "No toasts available" } };
        }
      },

      providesTags: ["Toast"],
    }),
    addToast: builder.mutation({
      queryFn: (toast, { dispatch }) => {
        dispatch(toastAdded(toast));
        return { data: toast };
      },
      invalidatesTags: ["Toast"],
    }),
    removeToast: builder.mutation({
      queryFn: (id, { dispatch }) => {
        dispatch(toastRemoved(id));
        return { data: id };
      },
      invalidatesTags: ["Toast"],
    }),
  }),
});

export const {
  useGetToastsQuery,
  useAddToastMutation,
  useRemoveToastMutation,
} = toastApi;
