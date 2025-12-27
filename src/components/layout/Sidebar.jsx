"use client";

import { usePathname, useRouter } from "next/navigation";
import { Box, Menu, MenuItem, IconButton, useTheme, Dialog, DialogTitle, DialogContent, Snackbar, Alert } from "@mui/material";
import AddExpenseForm from "@/components/forms/AddExpenseForm";
import AddIncomeForm from "@/components/forms/AddIncomeForm";
import SubscriptionForm from "@/components/forms/SubscriptionForm";
import AddCategoryForm from "@/components/forms/AddCategoryForm";
import {
  TrendingUp,
  Home,
  Receipt,
  PieChart,
  CreditCard,
  BarChart,
  Settings,
  Add as AddIcon
} from "@mui/icons-material";
import {
  sidebarContainerStyles,
  sidebarNavPanelStyles,
  sidebarLogoButtonStyles,
  sidebarNavItemStyles,
} from "@/components/theme/components/SidebarContainer";
import { useState } from "react";

const navItems = [
  { path: "/dashboard", icon: Home, label: "Dashboard" },
  { path: "/expenses", icon: Receipt, label: "Expenses" },
  { path: "/budgets", icon: PieChart, label: "Budgets" },
  { path: "/subscriptions", icon: CreditCard, label: "Subscriptions" },
  { path: "/transactions", icon: BarChart, label: "Transactions" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  // Add menu and dialog state
  const [addMenuAnchor, setAddMenuAnchor] = useState(null);
  const [openDialog, setOpenDialog] = useState(null); // 'expense', 'income', 'subscription', 'category'
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleNavigation = async (path) => {
    // Don't navigate if already on the same page
    if (pathname === path || pathname.startsWith(path + "/")) {
      return;
    }

    try {
      // Navigate to the new path
      await router.push(path);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleAddMenuOpen = (event) => {
    setAddMenuAnchor(event.currentTarget);
  };

  const handleAddMenuClose = () => {
    setAddMenuAnchor(null);
  };

  const handleOpenDialog = (type) => {
    setOpenDialog(type);
    handleAddMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleFormSuccess = (message, severity) => {
    setSnackbar({ open: true, message, severity });
    if (severity === "success") {
      handleCloseDialog();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={sidebarContainerStyles({ theme })}>
      <IconButton
        sx={sidebarLogoButtonStyles({ theme })}
        onClick={() => handleNavigation("/dashboard")}
      >
        <TrendingUp sx={{ fontSize: 28 }} />
      </IconButton>

      <Box sx={sidebarNavPanelStyles({ theme })}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.path || pathname.startsWith(item.path + "/");

          return (
            <IconButton
              key={item.path}
              sx={sidebarNavItemStyles({ theme, isActive })}
              onClick={() => handleNavigation(item.path)}
              title={item.label}
            >
              <Icon sx={{ fontSize: 24 }} />
            </IconButton>
          );
        })}
      </Box>

      <IconButton sx={sidebarLogoButtonStyles({ theme })} onClick={handleAddMenuOpen}>
        <AddIcon sx={{ fontSize: 32 }} />
      </IconButton>

      {/* Global Add Menu */}
      <Menu
        anchorEl={addMenuAnchor}
        open={Boolean(addMenuAnchor)}
        onClose={handleAddMenuClose}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: 2,
            minWidth: 160,
            mt: 1,
            p: 2,
            boxShadow: theme.shadows[10],
          }
        }}
      >
        <MenuItem onClick={() => handleOpenDialog('expense')} sx={{ borderRadius: 1, py: 1.2 }}>Add Expense</MenuItem>
        <MenuItem onClick={() => handleOpenDialog('income')} sx={{ borderRadius: 1, py: 1.2 }}>Add Income</MenuItem>
        <MenuItem onClick={() => handleOpenDialog('subscription')} sx={{ borderRadius: 1, py: 1.2 }}>Add Subscription</MenuItem>
        <MenuItem onClick={() => handleOpenDialog('category')} sx={{ borderRadius: 1, py: 1.2 }}>Create Category</MenuItem>
      </Menu>

      {/* Global Forms Dialog */}
      <Dialog
        open={Boolean(openDialog)}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
          {openDialog === 'expense' && 'Add New Expense'}
          {openDialog === 'income' && 'Add New Income'}
          {openDialog === 'subscription' && 'Add New Subscription'}
          {openDialog === 'category' && 'Create New Category'}
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {openDialog === 'expense' && <AddExpenseForm onSuccess={handleFormSuccess} onCancel={handleCloseDialog} />}
          {openDialog === 'income' && <AddIncomeForm onSuccess={handleFormSuccess} onCancel={handleCloseDialog} />}
          {openDialog === 'subscription' && <SubscriptionForm onSuccess={handleFormSuccess} onCancel={handleCloseDialog} />}
          {openDialog === 'category' && <AddCategoryForm onSuccess={handleFormSuccess} onCancel={handleCloseDialog} />}
        </DialogContent>
      </Dialog>

      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

