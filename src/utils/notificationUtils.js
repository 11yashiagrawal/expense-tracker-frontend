import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

let showNotificationCallback = null;

export const useNotification = () => {
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success", // 'success' | 'error' | 'warning' | 'info'
    });

    const showNotification = (message, severity = "success") => {
        setNotification({
            open: true,
            message,
            severity,
        });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    const NotificationComponent = () => (
        <Snackbar
            open={notification.open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert
                onClose={handleClose}
                severity={notification.severity}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );

    return { showNotification, NotificationComponent };
};
