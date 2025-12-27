"use client";

import { useState, useEffect } from "react";
import { Box, Avatar, useTheme, IconButton, Tooltip } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { getCurrentUser } from "@/services/user";
import { logoutUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const theme = useTheme();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current user data to get avatar URL
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await getCurrentUser();
        // Avatar URL is in response.data.avatar
        if (response?.data?.avatar) {
          setAvatarUrl(response.data.avatar);
        }
      } catch (error) {
        console.error("Failed to fetch user avatar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchAvatar();
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
  };

  // Get user initials for fallback
  const userInitials = user?.first_name && user?.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() || "U";

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: 3,
        py: 2,
        zIndex: 1100,
        // Glass effect styles
        backgroundColor: "rgba(7, 19, 10, 0.7)", // Semi-transparent background matching theme
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", // Safari support
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={avatarUrl}
          alt={user?.first_name || "User"}
          sx={{
            width: 44,
            height: 44,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            border: `2px solid ${theme.palette.primary.light}`,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
              transform: "scale(1.05)",
              transition: "all 0.2s ease-in-out",
            },
          }}
        >
          {!avatarUrl && !isLoading && (userInitials || <PersonIcon />)}
        </Avatar>

        <Tooltip title="Logout">
          <IconButton
            onClick={handleLogout}
            sx={{
              color: theme.palette.text.primary,
              borderColor: "transparent",
              "&:hover": {
                color: theme.palette.error.main,
                bgcolor: theme.palette.error.dark
              }
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

