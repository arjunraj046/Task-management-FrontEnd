import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8000/";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [],

  endpoints: (builder) => ({
    getTaskList: builder.query<any, void>({
      query: () => "/",
    }),

    addTask: builder.mutation({
      query: (data) => ({
        url: "/addtask",
        method: "POST",
        body: data,
      }),
    }),
    getTask: builder.query<any, number>({
      query: (id) => `/task/${id}`,
    }),
    editTask: builder.mutation<any, any>({
      query: (data) => ({
        url: "/edit-task",
        method: "PUT",
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id: string |number) => ({
        url: `/delete-task/${id}`,
        method: "DELETE",
      }),
    }),

  }),
});

export const { useGetTaskListQuery, useAddTaskMutation, useGetTaskQuery, useEditTaskMutation, useDeleteTaskMutation } = apiSlice;
