// import { autocompleteClasses } from "@mui/material";

// Sidebar Container theme styles
export const sidebarContainerStyles = ({ theme }) => ({
  position: "fixed",
  left: 10,
  top: 0,
  // height: "100vh",
  width: 80,
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  py: 2.5,
  gap: 8,
  zIndex: 1000,
  boxSizing: "border-box",
});

// Sidebar Logo Button styles
export const sidebarLogoButtonStyles = ({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  border: "none",
  padding: 0,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
});

// Sidebar Navigation Panel styles
export const sidebarNavPanelStyles = ({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  borderRadius: 9,
  py: 2,
  gap: 1.5,
  // minHeight: 0,
  justifyContent: "flex-start",
  width: 65,
  // height: "fit-content",
  overflowY: "auto",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: 0,
  },
});

// Sidebar Navigation Item Button styles
export const sidebarNavItemStyles = ({ theme, isActive = false }) => ({
  width: 40,
  height: 40,
  color: "#ffffff",
  borderRadius: 5,
  padding: 0,
  minWidth: 40,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  ...(isActive && {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  }),
});

// Protected Layout Container styles
export const protectedLayoutContainerStyles = ({ theme }) => ({
  display: "flex",
  // minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
});

// Main Content Area styles
export const mainContentStyles = ({ theme }) => ({
  flexGrow: 1,
  ml: "80px",
  minHeight: "100vh",
  width: "calc(100% - 80px)",
});

