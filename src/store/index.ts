import { configureStore } from '@reduxjs/toolkit';
import tasksApi from "./tasksApi.ts";

const store = configureStore({
    reducer: {
        tasks: tasksApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(tasksApi.middleware);
    }
});

export { useFetchTasksQuery, useUpdateTaskMutation, useAddTaskMutation, useDeleteTaskMutation } from "./tasksApi.ts";
export default store;