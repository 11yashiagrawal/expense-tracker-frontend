"use client";

import { useState, useEffect } from "react";
import CustomDatePicker from "@/components/theme/CustomDatePicker";
import {
    TextField,
    Button,
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";
import { addIncome, updateIncome } from "@/services/income";

const AddIncomeForm = ({ onSuccess, onCancel, initialData }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                amount: initialData.amount || "",
                date: initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
            });
        }
    }, [initialData]);

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
            const incomeData = {
                title: formData.title,
                amount: parseFloat(formData.amount),
                date: formData.date,
            };

            if (initialData) {
                await updateIncome(initialData._id, incomeData);
                onSuccess?.("Income updated successfully", "success");
            } else {
                await addIncome(incomeData);
                onSuccess?.("Income added successfully", "success");
            }
        } catch (error) {
            console.error("Failed to save income:", error);
            onSuccess?.(error.response?.data?.message || "Failed to save income", "error");
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
                        fullWidth
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        error={!!errors.title}
                        helperText={errors.title}
                        disabled={loading}
                        placeholder="e.g., Freelance Work"
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Amount</Typography>
                    <TextField
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
                        onChange={(newValue) => setFormData(prev => ({ ...prev, date: newValue ? newValue.toISOString().split("T")[0] : "" }))}
                        required
                        error={!!errors.date}
                        helperText={errors.date}
                    /></Box>
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

export default AddIncomeForm;
