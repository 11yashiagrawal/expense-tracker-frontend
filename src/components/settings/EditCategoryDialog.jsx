"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { updateCategory, updateCategoryIcon } from "@/services/user";

const EditCategoryDialog = ({ open, onClose, category, onUpdate }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    budget: "",
    colour: "#000000",
  });
  const [iconFile, setIconFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title || "",
        budget: category.budget || "",
        colour: category.colour || "#000000",
      });
      setIconFile(null);
      setErrors({});
    }
  }, [category]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.budget || formData.budget <= 0) newErrors.budget = "Budget must be greater than 0";
    if (!formData.colour) newErrors.colour = "Colour is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Update details
      const updateData = {
        title: formData.title,
        budget: formData.budget,
        colour: formData.colour,
      };
      
      let updatedCategory = await updateCategory(category._id, updateData);

      // Update icon if selected
      if (iconFile) {
        const iconFormData = new FormData();
        iconFormData.append("icon", iconFile);
        const iconResponse = await updateCategoryIcon(category._id, iconFormData);
        // Assuming iconResponse.category or similar contains the updated category with new icon
        // If the API returns the updated category directly, use that.
        // Based on API description: "returns updated category object"
        updatedCategory = iconResponse; 
      }

      onUpdate(updatedCategory);
      onClose();
    } catch (error) {
      console.error("Failed to update category:", error);
      // Handle error (maybe show a snackbar in the parent)
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
          <TextField
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            disabled={loading}
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
            inputProps={{ min: 0 }}
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
            >
              {iconFile ? iconFile.name : "Upload New Icon"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {iconFile && (
                <Typography variant="caption" sx={{ mt: 0.5, ml: 1.5, display: 'block' }}>
                    Selected: {iconFile.name}
                </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryDialog;
