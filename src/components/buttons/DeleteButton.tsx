import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Button } from '@mui/material';
import {useDeleteTask} from "../../hooks/useDeleteTask.ts";

function DeleteButton({ taskId }: { taskId: number }) {
    const {deleteTask, isLoading, isError, isSuccess} = useDeleteTask(taskId);

    if (isError) window.alert("Failed to delete!");
    if (isSuccess) window.alert("Successfully deleted!");

    return (
        <>
            {isLoading ? (
                <Button loading variant="outlined" color="error"/>
            ) : (
                <IconButton color="error" aria-label="delete task" onClick={deleteTask}>
                    <DeleteIcon />
                </IconButton>
            )}
        </>
    );
}

export default DeleteButton;
