"use client";

import { Box, Avatar, IconButton, useTheme } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

const ProfileSection = ({ avatarPreview, avatarUrl, firstName, onAvatarChange }) => {
    const theme = useTheme();

    return (
        <Box sx={{ minWidth: { xs: "100%", md: 250 }, textAlign: "center" }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                    src={avatarPreview || avatarUrl}
                    alt={firstName}
                    sx={{
                        width: 150,
                        height: 150,
                        mb: 2,
                        border: `4px solid ${theme.palette.primary.main}`,
                        boxShadow: theme.shadows[3],
                    }}
                />
                <IconButton
                    component="label"
                    sx={{
                        position: "absolute",
                        bottom: 16,
                        right: 0,
                        backgroundColor: theme.palette.primary.dark,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.main,
                        },
                    }}
                >
                    <EditIcon fontSize="small" />
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={onAvatarChange}
                    />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ProfileSection;
