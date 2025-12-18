"use client";

import { useState } from "react";
import { Box, Typography, Button, LinearProgress, Avatar, useTheme, Paper } from "@mui/material";
import { Add as AddIcon, ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import { formatCurrency } from "@/utils/formatUtils";
import AddCategoryDialog from "./AddCategoryDialog";
import { useNotification } from "@/utils/notificationUtils";
import { getIcon } from "@/utils/getCategoryIcon";

const BudgetsList = ({ categories, isLoading, onSelectCategory, selectedCategoryId, onRefresh }) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { showNotification, NotificationComponent } = useNotification();

  const handleDialogSuccess = (message, severity) => {
    showNotification(message, severity);
    if (severity === "success") {
      onRefresh?.();
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 900 }}>
        Budgets
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, overflowY: "auto", pr: 1, scrollbarWidth: "none" }}>
        {categories.map((category) => {
          const percentage = category.budget > 0 ? (category.expenditure / category.budget) * 100 : 0;
          const isOverBudget = percentage > 75;
          const statusText = isOverBudget ? "In review" : "On track";
          const isSelected = selectedCategoryId === (category._id || category.categoryName);
          
          return (
            <Paper
              key={category._id || category.categoryName}
              onClick={() => onSelectCategory(category)}
              elevation={isSelected ? 4 : 1}
              sx={{
                p: 2.5,
                bgcolor: "#000",
                color: "#fff",
                borderRadius: 7,
                cursor: "pointer",
                width: "100%",
                border: isSelected ? `1px solid ${theme.palette.primary.main}` : "1px solid transparent"
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: category.colour || theme.palette.primary.main,
                      width: 32,
                      height: 32,
                      borderRadius: 3,
                    }}
                  >
                    {category.icon && (category.icon.startsWith("http") || category.icon.startsWith("/")) ? (
                        <img src={category.icon} alt={category.categoryName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        getIcon(category.icon)
                    )}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                      {category.categoryName}
                    </Typography>
                  </Box>
                </Box>
                <ChevronRightIcon sx={{ color: "#6B7280" }} />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {formatCurrency(category.expenditure)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                  {formatCurrency(category.budget)}
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={Math.min(percentage, 100)}
                sx={{
                  height: 6,
                  borderRadius: 4,
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: category.colour || theme.palette.primary.main,
                    borderRadius: 4,
                  },
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="caption" sx={{ color: category.colour || theme.palette.primary.main, fontWeight: 600 }}>
                  {Math.round(percentage)}%
                </Typography>
                <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                  {statusText}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Box>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setDialogOpen(true)}
        sx={{
          mt: 3,
          py: 1.5,
          borderRadius: 7,
          borderStyle: "dashed",
          width: "100%",
          height: "6%",
          color: theme.palette.text.primary,
          borderColor: theme.palette.primary.main,
          "&:hover": {
            borderColor: "transparent",
            bgcolor: theme.palette.action.hover,
          },
        }}
      >
        Add Category
      </Button>

      <AddCategoryDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={handleDialogSuccess}
      />
      
      <NotificationComponent />
    </Box>
  );
};

export default BudgetsList;
