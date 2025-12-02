"use client";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  CircularProgress,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit as EditIcon, CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { getCurrentUser, updateAccountDetails, updateAvatar } from "@/services/user";
import EditCategoryDialog from "@/components/settings/EditCategoryDialog";

export default function Settings() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [categories, setCategories] = useState([]);

  
  // Form state
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone_no: user?.phone_no || "",
    monthly_budget: user?.monthly_budget || "",
    balance: user?.balance || "",
  });

  // Dialog state
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
      setCategories(userData.categories || []);
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        phone_no: userData.phone_no || "",
        monthly_budget: userData.monthly_budget || "",
        balance: userData.balance || "",
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      showSnackbar("Failed to load user data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      
      const updatedUser = await updateAvatar(formData);
      setUser(updatedUser);
      showSnackbar("Avatar updated successfully", "success");
    } catch (error) {
      console.error("Failed to update avatar:", error);
      showSnackbar("Failed to update avatar", "error");
    }
  };

  const handleSaveDetails = async () => {
    try {
      setSaving(true);
      const updatedUser = await updateAccountDetails(formData);
      setUser(updatedUser);
      showSnackbar("Account details updated successfully", "success");
    } catch (error) {
      console.error("Failed to update account details:", error);
      showSnackbar("Failed to update account details", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setEditCategoryOpen(true);
  };

  const handleCategoryUpdate = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((cat) => (cat._id === updatedCategory._id ? updatedCategory : cat))
    );
    showSnackbar("Category updated successfully", "success");
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <ProtectedLayout>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <CircularProgress />
        </Box>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <Typography variant="h5" sx={{ ml: 3, mt: 3, mb: 1, fontWeight: 600, color: theme.palette.text.primary }}>
        Settings
      </Typography>
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 4, mb: 4, borderRadius: 2, flexDirection: "column", alignItems: "center" }}>
          <Grid container spacing={4}>
            {/* Avatar Section (Left) */}
            <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={user?.avatar}
                  alt={user?.first_name}
                  sx={{ width: 150, height: 150, mb: 2, border: `4px solid ${theme.palette.background.paper}`, boxShadow: theme.shadows[3] }}
                />
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 0,
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": { backgroundColor: theme.palette.primary.dark },
                  }}
                >
                  <CameraAltIcon fontSize="small" />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {user?.first_name} {user?.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Grid>

            {/* Account Details Section (Right) */}
            <Grid item xs={12} md={9}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                Account Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Monthly Budget"
                    name="monthly_budget"
                    type="number"
                    value={formData.monthly_budget}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Balance"
                    name="balance"
                    type="number"
                    value={formData.balance}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Categories Section */}
        <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
            Categories
          </Typography>
          <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
            <List>
              {categories.map((category, index) => (
                <div key={category._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        src={category.icon}
                        sx={{
                          bgcolor: category.colour,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {category.title[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={category.title}
                      secondary={`Budget: $${category.budget}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleEditCategory(category)}>
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < categories.length - 1 && <Divider variant="inset" component="li" />}
                </div>
              ))}
            </List>
          </Box>
        </Paper>

        {/* Save Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleSaveDetails}
            disabled={saving}
            sx={{ minWidth: 150, py: 1.5 }}
          >
            {saving ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
          </Button>
        </Box>
      </Box>

      <EditCategoryDialog
        open={editCategoryOpen}
        onClose={() => setEditCategoryOpen(false)}
        category={selectedCategory}
        onUpdate={handleCategoryUpdate}
      />

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
    </ProtectedLayout>
  );
}
