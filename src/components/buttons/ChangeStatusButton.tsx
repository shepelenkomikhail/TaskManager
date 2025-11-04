import Button from "@mui/material/Button";
import type {Task} from "../../types/Task.ts";
import {useUpdateTaskMutation} from "../../store";

function ChangeStatusButton({task}: {task: Task}) {
    const [changeStatus, {isLoading, isError}] = useUpdateTaskMutation();
    const statusColor = !task.isCompleted ? 'success' : 'secondary';

    const handleClick = () => {
        console.log("task before update:", task);
        const updatedTask = {...task, isCompleted: !task.isCompleted};
        changeStatus(updatedTask);
        console.log("task after update:", updatedTask);
    }

    if (isError) window.alert("Failed to update!");

    return (
        <>
            {isLoading ? (
                <Button loading variant="contained" color={statusColor}/>
                ) : (
                <Button variant="contained" className={"absolute w-52"} onClick={handleClick} color={statusColor}>
                    {task.isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
                </Button>
            )}
        </>
    );
}

export default ChangeStatusButton;