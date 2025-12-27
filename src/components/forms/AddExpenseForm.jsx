"use client";

import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Autocomplete,
  Box,
  CircularProgress,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import { addExpense, updateExpense } from "@/services/expenses";
import { getAllCategories } from "@/services/user";
import { getIcon } from "@/utils/getCategoryIcon";
import CustomDatePicker from "@/components/theme/CustomDatePicker";

const AddExpenseForm = ({ onSuccess, onCancel, initialData }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        amount: initialData.amount || "",
        date: initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        category: initialData.category || null,
      });
    }
  }, [initialData]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await getAllCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      // We might want to pass this error up, but for now logging is okay
      // or we could use a snackbar if we had access to one here
    } finally {
      setLoadingCategories(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const expenseData = {
        title: formData.title,
        amount: parseFloat(formData.amount),
        date: formData.date,
        category: formData.category?._id || formData.category, // Handle populated vs ID
      };

      if (initialData) {
        await updateExpense(initialData._id, expenseData);
        onSuccess?.("Expense updated successfully", "success");
      } else {
        const response = await addExpense(expenseData);
        onSuccess?.(response.message || "Expense added successfully", "success");
      }
    } catch (error) {
      console.error("Failed to save expense:", error);
      onSuccess?.(error.response?.data?.message || "Failed to save expense", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Title</Typography>
          <TextField
            // label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            disabled={loading}
            placeholder="e.g., Grocery Shopping"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Amount</Typography>
          <TextField
            // label="Amount"
            fullWidth
            type="number"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            error={!!errors.amount}
            helperText={errors.amount}
            disabled={loading}
            placeholder="0"
            inputProps={{
              min: 0,
              step: "0.01",
            }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Date</Typography>
          <CustomDatePicker
            label="Date"
            value={formData.date}
            onChange={(newValue) => handleChange("date", newValue ? newValue.toISOString().split("T")[0] : "")}
            required
            error={!!errors.date}
            helperText={errors.date}
          />
          {/* <TextField
            required
            fullWidth
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            error={!!errors.date}
            helperText={errors.date}
            disabled={loading}
          /> */}
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Category</Typography>
          <Autocomplete
            options={categories}
            getOptionLabel={(option) => option.title || ""}
            value={formData.category}
            onChange={(e, newValue) => handleChange("category", newValue)}
            loading={loadingCategories}
            disabled={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                // label="Category"
                error={!!errors.category}
                helperText={errors.category}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    "& .MuiAutocomplete-popupIndicator": {
                      color: "white",
                    },
                    "& .MuiAutocomplete-clearIndicator": {
                      color: "white",
                    },
                  },
                  endAdornment: (
                    <>
                      {loadingCategories ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props;
              return (
                <Box
                  component="li"
                  key={key}
                  {...otherProps}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 1,
                  }}
                >
                  {/* <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: option.colour || theme.palette.primary.main,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    {option.icon}
                  </Box> */}
                  <Avatar
                    sx={{
                      bgcolor: option.colour || theme.palette.primary.main,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                    }}
                  >
                    {option.icon && (option.icon.startsWith("http") || option.icon.startsWith("/")) ? (
                      <img src={option.icon} alt={option.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      getIcon(option.icon)
                    )}
                  </Avatar>
                  <Typography>{option.title}</Typography>
                </Box>
              );
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button
          onClick={onCancel}
          disabled={loading}
          variant="outlined"
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ minWidth: 100 }}
        >
          {loading ? <CircularProgress size={24} /> : (initialData ? "Update" : "Submit")}
        </Button>
      </Box>
    </form>
  );
};

export default AddExpenseForm;
