"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Button, useTheme, Menu, MenuItem, Grid } from "@mui/material";
import { Add as AddIcon, CalendarMonth as CalendarIcon, KeyboardArrowDown } from "@mui/icons-material";
import { getCurrentUser } from "@/services/user";
import AddExpenseDialog from "./AddExpenseDialog";
import { useNotification } from "@/utils/notificationUtils";

const ExpensesHeader = ({ selectedDate, onDateChange }) => {
  const theme = useTheme();
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const open = Boolean(anchorEl);
  const { showNotification, NotificationComponent } = useNotification();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        const firstName = response.data?.first_name || "User";
        setUserName(firstName);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserName("User");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMonthYearSelect = (month, year) => {
    const newDate = new Date(year, month, 1);
    onDateChange(newDate);
    handleClose();
  };

  const handleDialogSuccess = (message, severity) => {
    showNotification(message, severity);
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  if (isLoading) return null;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          p: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Financial Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
            Welcome back, {userName}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            variant="outlined"
            startIcon={<CalendarIcon />}
            endIcon={<KeyboardArrowDown />}
            onClick={handleClick}
          >
            {formatMonthYear(selectedDate)}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 300,
                maxHeight: 400,
              }
            }}
          >
            {years.map((year) => (
              <Box key={year}>
                <MenuItem disabled sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  {year}
                </MenuItem>
                <Grid container spacing={0.5} sx={{ px: 1, pb: 1 }}>
                  {months.map((month, index) => (
                    <Grid item xs={4} key={month}>
                      <MenuItem
                        onClick={() => handleMonthYearSelect(index, year)}
                        sx={{
                          justifyContent: "center",
                          fontSize: "0.875rem",
                          borderRadius: 1,
                          bgcolor: selectedDate.getMonth() === index && selectedDate.getFullYear() === year
                            ? theme.palette.primary.main
                            : "transparent",
                          color: selectedDate.getMonth() === index && selectedDate.getFullYear() === year
                            ? theme.palette.primary.contrastText
                            : theme.palette.text.primary,
                          "&:hover": {
                            bgcolor: selectedDate.getMonth() === index && selectedDate.getFullYear() === year
                              ? theme.palette.primary.dark
                              : theme.palette.action.hover,
                          }
                        }}
                      >
                        {month.substring(0, 3)}
                      </MenuItem>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Menu>

          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Add Expense
          </Button>
        </Box>
      </Box>

      <AddExpenseDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={handleDialogSuccess}
      />

      <NotificationComponent />
    </>
  );
};

export default ExpensesHeader;
