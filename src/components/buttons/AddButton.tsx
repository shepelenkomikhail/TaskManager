import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import TaskForm from "../TaskForm.tsx";
import {useState} from "react";
import FormErrorBoundary from "../../errorBoundaries/fromErrorBoundary.tsx";

function AddButton() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <FormErrorBoundary>
            <IconButton color="success" onClick={handleOpen} sx={{width: 40, height: 40}}>
                <AddIcon />
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
                    <TaskForm isNewTask={true} />
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

export default AddButton;