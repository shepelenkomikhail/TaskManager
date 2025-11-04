import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import type {Task} from "../../types/Task.ts";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import TaskForm from "../TaskForm.tsx";
import FormErrorBoundary from "../../errorBoundaries/fromErrorBoundary.tsx";

function EditButton({task} : {task: Task}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <FormErrorBoundary>
            <IconButton color="primary" aria-label="edit task" onClick={handleOpen}>
                <EditIcon />
            </IconButton>

            <Dialog
                open={open} onClose={handleClose}
                maxWidth="sm" fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, p: 1 },
                }}
            >
                <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
                    Add New Task
                </DialogTitle>

                <DialogContent dividers>
                    <TaskForm isNewTask={false} task={task} />
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleClose} variant="outlined" color="inherit">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </FormErrorBoundary>
    );
}

export default EditButton;