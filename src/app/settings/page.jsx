"use client";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  useTheme,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
} from "@mui/material";
import Loading from "@/components/common/Loading";
import { getCurrentUser, updateAccountDetails, updateAvatar, getAllCategories, deleteCategory } from "@/services/user";
import AddCategoryForm from "@/components/forms/AddCategoryForm";

// Sub-components
import ProfileSection from "@/components/settings/ProfileSection";
import AccountDetailsForm from "@/components/settings/AccountDetailsForm";
import CategoryList from "@/components/settings/CategoryList";
import DeleteCategoryDialog from "@/components/settings/DeleteCategoryDialog";

export default function Settings() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState({});
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

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Dialog state
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleting, setDeleting] = useState(false);

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
      const res = await getCurrentUser();
      const catres = await getAllCategories();
      const userData = res.data;
      setUser(userData);
      setCategories(catres.data);
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        phone_no: userData.phone_no || "",
        monthly_budget: userData.monthly_budget || "",
        balance: userData.balance || "",
      });
      setAvatarFile(null);
      setAvatarPreview(null);
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveDetails = async () => {
    try {
      setSaving(true);

      // Update basic details
      let updatedUser = await updateAccountDetails(formData);

      // Update avatar if selected
      if (avatarFile) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatarFile);
        updatedUser = await updateAvatar(avatarFormData);
        setAvatarFile(null);
        setAvatarPreview(null);
      }

      setUser(updatedUser);
      showSnackbar("Settings updated successfully", "success");
    } catch (error) {
      console.error("Failed to update settings:", error);
      showSnackbar("Failed to update settings", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setCategoryDialogOpen(true);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setCategoryDialogOpen(true);
  };

  const handleCategorySuccess = (message, severity, updatedCategory) => {
    showSnackbar(message, severity);
    if (severity === "success") {
      if (selectedCategory) {
        // Edit Mode
        setCategories((prev) =>
          prev.map((cat) => (cat._id === updatedCategory._id ? updatedCategory : cat))
        );
      } else {
        // Add Mode
        getAllCategories().then(res => setCategories(res.data));
      }
      setCategoryDialogOpen(false);
    }
  };

  const handleConfirmDelete = (category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    try {
      setDeleting(true);
      await deleteCategory(selectedCategory._id);
      setCategories((prev) => prev.filter((cat) => cat._id !== selectedCategory._id));
      setDeleteDialogOpen(false);
      showSnackbar("Category deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete category:", error);
      showSnackbar("Failed to delete category", "error");
    } finally {
      setDeleting(false);
      setSelectedCategory(null);
    }
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
        <Loading fullScreen={false} height="400px" />
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <Typography variant="h5" sx={{ ml: 3, mt: 3, mb: 1, fontWeight: 600, color: theme.palette.text.primary }}>
        Settings
      </Typography>
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 4,
            }}
          >
            <ProfileSection
              avatarPreview={avatarPreview}
              avatarUrl={user?.avatar}
              firstName={user?.first_name}
              onAvatarChange={handleAvatarChange}
            />

            <AccountDetailsForm
              formData={formData}
              onInputChange={handleInputChange}
            />
          </Box>
        </Paper>

        <CategoryList
          categories={categories}
          onEdit={handleEditCategory}
          onDelete={handleConfirmDelete}
          onAdd={handleAddCategory}
        />

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

      {/* Dialogs */}
      <Dialog open={categoryDialogOpen} onClose={() => setCategoryDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {selectedCategory ? "Edit Category" : "Create Category"}
        </DialogTitle>
        <DialogContent>
          <AddCategoryForm
            category={selectedCategory}
            onSuccess={handleCategorySuccess}
            onCancel={() => setCategoryDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <DeleteCategoryDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteCategory}
        categoryName={selectedCategory?.title}
        isDeleting={deleting}
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
