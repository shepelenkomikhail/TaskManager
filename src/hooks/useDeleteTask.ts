import { useDeleteTaskMutation } from "../store";
import {useCallback} from "react";

export function useDeleteTask(taskId: number) {
    const [deleteTask, { isLoading, isError, isSuccess }] = useDeleteTaskMutation();

    const handleDelete = useCallback (async () => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (!confirmed) return;

        try {
            await deleteTask(taskId).unwrap();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    }, [deleteTask, taskId]);

    return {
        deleteTask: handleDelete,
        isLoading,
        isError,
        isSuccess,
    };
}
