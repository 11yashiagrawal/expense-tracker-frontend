"use client";

import { Box, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
  protectedLayoutContainerStyles,
  mainContentStyles,
} from "@/components/theme/components/SidebarContainer";

export default function ProtectedLayout({ children }) {
  const theme = useTheme();

  return (
    <ProtectedRoute>
      <Box sx={protectedLayoutContainerStyles({ theme })}>
        <Sidebar />
        <Box component="main" sx={mainContentStyles({ theme })}>
          <Header />
          {children}
        </Box>
      </Box>
    </ProtectedRoute>
  );
}

