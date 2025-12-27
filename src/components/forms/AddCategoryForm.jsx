"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import * as Icons from "@mui/icons-material";
import { addCategory, updateCategory, updateCategoryIcon } from "@/services/user";
import CustomColorPicker from "@/components/common/CustomColorPicker";

const THEME_COLORS = [
  "#14a248", // Primary Green
  "#3b82f6", // Blue
  "#F59E0B", // Orange
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#FACC15", // Yellow
];

const PRESET_ICONS = [
  "Restaurant",
  "ShoppingBag",
  "DirectionsCar",
  "LocalHospital",
  "Home",
  "Work",
  "School",
  "Flight",
  "ElectricBolt",
  "WaterDrop",
  "Paid",
  "Category",
];

const AddCategoryForm = ({ onSuccess, onCancel, category }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: category?.title || "",
    budget: category?.budget || "",
    colour: category?.colour || THEME_COLORS[0],
    icon: category?.icon || "Category",
  });
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");
  const [isCustomIcon, setIsCustomIcon] = useState(
    category?.icon && (category.icon.startsWith("http") || category.icon.startsWith("/"))
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.toString().trim()) {
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
      let response;

      if (category) {
        // Edit Mode
        const updateData = {
          title: formData.title,
          budget: formData.budget,
          colour: formData.colour,
        };

        // Update basic details
        response = await updateCategory(category._id, updateData);

        // Update icon if it's a file (newly uploaded)
        if (formData.icon instanceof File) {
          const iconFormData = new FormData();
          iconFormData.append("icon", formData.icon);
          response = await updateCategoryIcon(category._id, iconFormData);
        } else if (typeof formData.icon === 'string' && formData.icon !== category.icon) {
          // If it's a preset icon that changed, use the regular updateCategory for it
          response = await updateCategory(category._id, { ...updateData, icon: formData.icon });
        }

        onSuccess?.(response.message || "Category updated successfully", "success", response.category || response.data);
      } else {
        // Add Mode
        const data = new FormData();
        data.append("title", formData.title);
        data.append("budget", formData.budget);
        data.append("colour", formData.colour);
        data.append("icon", formData.icon);

        response = await addCategory(data);
        onSuccess?.(response.message || "Category added successfully", "success");
      }
    } catch (error) {
      console.error("Failed to process category:", error);
      onSuccess?.(error.response?.data?.message || `Failed to ${category ? "update" : "add"} category`, "error");
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
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Title</Typography>
          <TextField
            fullWidth
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            disabled={loading}
            placeholder="e.g., Food & Dining"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 7,
              }
            }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Budget</Typography>
          <TextField
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 7,
              }
            }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
            Select Color
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            {THEME_COLORS.map((color) => (
              <Box
                key={color}
                onClick={() => handleChange("colour", color)}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  bgcolor: color,
                  cursor: "pointer",
                  border: formData.colour === color ? `3px solid ${theme.palette.text.primary}` : "none",
                  boxShadow: formData.colour === color ? `0 0 0 2px ${color}` : "none",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            ))}
          </Box>
          <CustomColorPicker
            value={formData.colour}
            onChange={(newColor) => handleChange("colour", newColor)}
            disabled={loading}
          />
          {errors.colour && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
              {errors.colour}
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
            Select Icon
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            {PRESET_ICONS.map((iconName) => {
              const IconComp = Icons[iconName] || Icons.Category;
              const isSelected = !isCustomIcon && formData.icon === iconName;
              return (
                <IconButton
                  key={iconName}
                  onClick={() => {
                    handleChange("icon", iconName);
                    setIsCustomIcon(false);
                    setFileName("");
                  }}
                  sx={{
                    bgcolor: isSelected ? theme.palette.primary.main : "transparent",
                    color: theme.palette.text.primary,
                    border: isSelected ? "none" : `1px solid ${theme.palette.primary.brightText}`,
                    "&:hover": {
                      border: isSelected ? "none" : `1px solid ${theme.palette.primary.brightText}`,
                      bgcolor: isSelected ? theme.palette.primary.light : theme.palette.action.hover,
                    },
                  }}
                >
                  <IconComp sx={{ fontSize: 20 }} />
                </IconButton>
              );
            })}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              component="label"
              variant="outlined"
              size="small"
              startIcon={<CloudUploadIcon />}
              disabled={loading}
              sx={{
                borderColor: isCustomIcon ? theme.palette.primary.main : theme.palette.divider,
                bgcolor: isCustomIcon ? theme.palette.primary.main : "transparent",
                "&:hover": {
                  bgcolor: isCustomIcon ? theme.palette.primary.light : theme.palette.action.hover,
                },
              }}
            >
              {fileName ? "Change Custom" : "Upload Custom"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  handleFileChange(e);
                  setIsCustomIcon(true);
                }}
              />
            </Button>
            {fileName && (
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {fileName}
              </Typography>
            )}
          </Box>

          {errors.icon && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
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
          {loading ? <CircularProgress size={24} /> : category ? "Save Changes" : "Submit"}
        </Button>
      </Box>
    </form>
  );
};

export default AddCategoryForm;
