import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {Task} from "../types/Task.ts";

const BASE_URL = 'http://localhost:5084';

const tasksApi = createApi({
    reducerPath: 'tasks',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        fetchTasks: builder.query({
            providesTags: ['Task'],
            query: () => ({
                url: '/task',
                method: 'GET'
            }),
        }),
        addTask: builder.mutation({
            invalidatesTags: ['Task'],
            query: (newTask: Task) => ({
                url: '/task',
                method: 'POST',
                body: {
                    id: newTask.id ? newTask.id : 0,
                    title: newTask.title,
                    description: newTask.description,
                    isCompleted: newTask.isCompleted,
                    createdAt: newTask.createdAt
                }
            })
        }),
        updateTask: builder.mutation({
            invalidatesTags: ['Task'],
            query: (updatedTask: Task) => ({
                url: `/task/${updatedTask.id}`,
                method: 'PATCH',
                body: {
                    id: updatedTask.id,
                    title: updatedTask.title,
                    description: updatedTask.description,
                    isCompleted: updatedTask.isCompleted,
                    createdAt: updatedTask.createdAt
                }
            })
        }),
        deleteTask: builder.mutation({
            invalidatesTags: ['Task'],
            query: (taskId: number) => ({
                url: `/task/${taskId}`,
                method: 'DELETE'
            })
        })
    })
});

export const { useFetchTasksQuery, useDeleteTaskMutation, useAddTaskMutation, useUpdateTaskMutation } = tasksApi;
export default tasksApi;