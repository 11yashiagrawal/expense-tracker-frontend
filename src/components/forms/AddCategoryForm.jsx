"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { addCategory } from "@/services/user";

const AddCategoryForm = ({ onSuccess, onCancel }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    budget: "",
    colour: "#000000",
    icon: null,
  });
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = "Budget must be greater than 0";
    }

    if (!formData.colour) {
      newErrors.colour = "Colour is required";
    }

    if (!formData.icon) {
      newErrors.icon = "Icon is required";
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
      const data = new FormData();
      data.append("title", formData.title);
      data.append("budget", formData.budget);
      data.append("colour", formData.colour);
      data.append("icon", formData.icon);

      const response = await addCategory(data);
      onSuccess?.(response.message || "Category added successfully", "success");
    } catch (error) {
      console.error("Failed to add category:", error);
      onSuccess?.(error.response?.data?.message || "Failed to add category", "error");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, icon: file }));
      setFileName(file.name);
      if (errors.icon) {
        setErrors((prev) => ({ ...prev, icon: "" }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
        <TextField
          label="Title"
          fullWidth
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          disabled={loading}
          placeholder="e.g., Food & Dining"
        />

        <TextField
          label="Budget"
          fullWidth
          type="number"
          value={formData.budget}
          onChange={(e) => handleChange("budget", e.target.value)}
          error={!!errors.budget}
          helperText={errors.budget}
          disabled={loading}
          placeholder="0"
          inputProps={{
            min: 0,
          }}
        />

        <Box>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mb: 1, display: 'block' }}>
            Colour
          </Typography>
          <TextField
            fullWidth
            type="color"
            value={formData.colour}
            onChange={(e) => handleChange("colour", e.target.value)}
            error={!!errors.colour}
            helperText={errors.colour}
            disabled={loading}
            sx={{
              "& input": {
                height: 50,
                padding: 0,
                cursor: "pointer",
              },
            }}
          />
        </Box>

        <Box>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            fullWidth
            disabled={loading}
            sx={{ 
              height: 56,
              borderColor: errors.icon ? theme.palette.error.main : 'inherit',
              color: errors.icon ? theme.palette.error.main : 'inherit'
            }}
          >
            {fileName || "Upload Icon"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {errors.icon && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
              {errors.icon}
            </Typography>
          )}
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
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </Box>
    </form>
  );
};

export default AddCategoryForm;
