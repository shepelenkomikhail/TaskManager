import {useAddTaskMutation, useUpdateTaskMutation} from "../store";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {TextField, Checkbox, FormControlLabel, Button, Paper, Stack, Typography,} from "@mui/material";
import type {Task} from "../types/Task.ts";

function TaskForm({isNewTask, task}: {isNewTask: boolean, task?: Task}) {
    const [formData, setFormData] = useState<Task>( {
            id: 0,
            title: "",
            description: "",
            isCompleted: false,
            createdAt: new Date().toISOString(),
        }
    );

    useEffect(() => {
        console.log("useEffect triggered, task:", task);
        if (!isNewTask && task) setFormData(task);
    }, [task, isNewTask]);


    console.log("formData:", formData);
    console.log("task:", task);

    const [addTask, { isLoading: isAdding, isError: addError, isSuccess: addSuccess }] = useAddTaskMutation();
    const [updateTask, { isLoading: isUpdating, isError: updateError, isSuccess: updateSuccess }] = useUpdateTaskMutation();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, isCompleted: e.target.checked }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isNewTask) {
                await addTask(formData).unwrap();
                alert("Task created successfully!");
            } else {
                await updateTask(formData).unwrap();
                alert("Task updated successfully!");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to save task.");
        }
    };

    const isLoading = isAdding || isUpdating;
    const isError = addError || updateError;
    const isSuccess = addSuccess || updateSuccess;

    if (!isNewTask && !task) {
        return <Typography textAlign="center">Loading task data...</Typography>;
    }

    return (
        <Paper
            elevation={3}
            sx={{p: 4, width: "100%", maxWidth: 600, mx: "auto", mt: 4, borderRadius: 3,}}
        >
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Typography variant="h6" textAlign="center">
                        Create / Edit Task
                    </Typography>

                    <TextField name="title" label="Title" variant="outlined" fullWidth required
                        value={formData.title} onChange={handleChange}/>

                    <TextField name="description" label="Description" multiline rows={4} fullWidth
                               value={formData.description} onChange={handleChange}/>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.isCompleted}
                                onChange={handleCheckboxChange}/>
                        }
                        label="Completed"
                    />

                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Save Task
                    </Button>

                    {isLoading && (
                        <Button loading variant="contained" color={"primary"}/>
                    )}
                    {isError && (
                        <Typography color="error" textAlign="center">
                            Failed to save the task. Try again.
                        </Typography>
                    )}
                    {isSuccess && (
                        <Typography color="success.main" textAlign="center">
                            Task saved successfully!
                        </Typography>
                    )}
                </Stack>
            </form>
        </Paper>
    );
}

export default TaskForm;