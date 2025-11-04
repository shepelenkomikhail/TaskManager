import { Button } from "@mui/material";
import {useFetchTasksQuery} from "../store";
import type { Task } from "../types/Task.ts";
import TaskItem from "./TaskItem";

function TaskList() {
    const { data, error, isLoading } = useFetchTasksQuery(undefined);
    console.log(data);

    if (isLoading) {
        return <Button loading className={"w-1/2 h-12"} variant="outlined"></Button>;
    }
    if (error) {
        return <div className={"border-1 border-red-700 rounded-lg p-4"}>Error loading tasks! </div>;
    }

    return (
        <div className={`w-5/6`}>
            {data?.map((task: Task) => (
                <TaskItem task={task} key={task.id} />
            )) ?? null}
        </div>
    );
}

export default TaskList;