import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material"

export function DeleteDialog({ open, handleClose, deleteTask }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <p>Are you sure you want to delete this task?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={deleteTask} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    )
}
