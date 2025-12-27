"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    CircularProgress,
    useTheme,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const DeleteCategoryDialog = ({ open, onClose, onConfirm, categoryName, isDeleting }) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={() => !isDeleting && onClose()}
            PaperProps={{
                sx: {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: 3,
                    p: 2,
                },
            }}
        >
            <DialogTitle variant="h6">Delete Category</DialogTitle>
            <DialogContent>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Are you sure you want to delete the category "<strong>{categoryName}</strong>"?
                    <br />
                    This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={onClose}
                    disabled={isDeleting}
                    sx={{ color: theme.palette.text.disabled }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color="error"
                    disabled={isDeleting}
                    startIcon={isDeleting ? <CircularProgress size={20} /> : <DeleteIcon />}
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteCategoryDialog;
