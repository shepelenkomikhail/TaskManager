import type {Task} from "../types/Task.ts";
import ChangeStatusButton from "./buttons/ChangeStatusButton.tsx";
import EditButton from "./buttons/EditButton.tsx";
import DeleteButton from "./buttons/DeleteButton.tsx";
import type {ThemeContextType} from "../types/contextTypes.ts";
import {ThemeContext} from "../types/themeContext.tsx";
import {useContext} from "react";

function TaskItem({task}: {task: Task}) {
    const {theme, }:  ThemeContextType = useContext<ThemeContextType>(ThemeContext);

    return (
        <div className={`w-full p-4 border-1 rounded-lg shadow-md mb-4 flex justify-between ${theme === 'dark' ? 'bg-gray-400 text-white' : 'bg-white text-black'}`}>
            <div>
                <h2 className="text-xl font-bold mb-2">{task.title}</h2>
                <p className="text-gray-700 mb-2">{task.description}</p>
                <p className="text-sm text-gray-500">Created At: {new Date(task.createdAt).toLocaleDateString()}</p>
                <p className={`mt-2 font-semibold ${task.isCompleted ? 'text-green-600' : 'text-red-600'}`}>
                    Status: {task.isCompleted ? 'Completed' : 'Pending'}
                </p>
            </div>
            <div className={"flex flex-col justify-between"}>
                <div className={"flex relative self-end"}>
                    <EditButton task={task}/>
                    <DeleteButton taskId={task.id} />
                </div>
                <div>
                    <ChangeStatusButton task={task} />
                </div>
            </div>
        </div>
    );
}

export default TaskItem;