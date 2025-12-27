"use client";

import { Box, CircularProgress } from "@mui/material";

/**
 * A reusable Loading component to provide visual consistency across the platform.
 * 
 * @param {Object} props
 * @param {boolean} props.fullScreen - If true, occupies the full viewport.
 * @param {string|number} props.height - Custom height for the loading container.
 * @param {number} props.size - Size of the CircularProgress indicator.
 * @param {Object} props.sx - Additional styling for the container Box.
 */
const Loading = ({ fullScreen = false, height, size = 40, sx = {} }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: fullScreen ? "100vh" : (height || "200px"),
                ...sx,
            }}
        >
            <CircularProgress size={size} />
        </Box>
    );
};

export default Loading;
