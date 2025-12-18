"use client";

import { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
    MenuItem,
    Select,
    FormControl,
} from "@mui/material";
import CustomDatePicker from "@/components/theme/CustomDatePicker";
import { addSubscription, updateSubscription } from "@/services/subscriptions";

const FREQUENCY_OPTIONS = [
    "Daily",
    "Weekly",
    "Bi-Weekly",
    "Monthly",
    "Quarterly",
    "Yearly",
];

const SubscriptionForm = ({ onSuccess, onCancel, initialData }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        frequency: "Monthly",
        amount: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        nextPaymentDate: new Date().toISOString().split("T")[0],
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                frequency: initialData.frequency || "Monthly",
                amount: initialData.amount || "",
                startDate: initialData.startDate ? initialData.startDate.split("T")[0] : "",
                endDate: initialData.endDate ? initialData.endDate.split("T")[0] : "",
                nextPaymentDate: initialData.nextPaymentDate
                    ? initialData.nextPaymentDate.split("T")[0]
                    : "",
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

        if (!formData.frequency) {
            newErrors.frequency = "Frequency is required";
        }

        if (!formData.startDate) {
            newErrors.startDate = "Start date is required";
        }

        if (!formData.endDate) {
            newErrors.endDate = "End date is required";
        }

        if (!formData.nextPaymentDate) {
            newErrors.nextPaymentDate = "Next payment date is required";
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
            const subscriptionData = {
                title: formData.title,
                frequency: formData.frequency,
                amount: parseFloat(formData.amount),
                startDate: formData.startDate,
                endDate: formData.endDate || null,
                nextPaymentDate: formData.nextPaymentDate,
            };

            let response;
            if (initialData?._id) {
                response = await updateSubscription(initialData._id, subscriptionData);
            } else {
                response = await addSubscription(subscriptionData);
            }

            onSuccess?.(response.message || "Subscription saved successfully", "success");
        } catch (error) {
            console.error("Failed to save subscription:", error);
            onSuccess?.(
                error.response?.data?.message || "Failed to save subscription",
                "error"
            );
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
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Title
                    </Typography>
                    <TextField
                        fullWidth
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        error={!!errors.title}
                        helperText={errors.title}
                        disabled={loading}
                        placeholder="e.g., Netflix"
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Frequency
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={formData.frequency}
                            onChange={(e) => handleChange("frequency", e.target.value)}
                            disabled={loading}
                            error={!!errors.frequency}
                            helpertext={errors.frequency}
                        >
                            {FREQUENCY_OPTIONS.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Amount
                    </Typography>
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
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Start Date
                    </Typography>
                    <CustomDatePicker
                        label="Start Date"
                        value={formData.startDate}
                        onChange={(newValue) => handleChange("startDate", newValue ? newValue.toISOString().split("T")[0] : "")}
                        required
                        error={!!errors.startDate}
                        helperText={errors.startDate}
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        End Date
                    </Typography>
                    <CustomDatePicker
                        label="End Date"
                        value={formData.endDate}
                        onChange={(newValue) => handleChange("endDate", newValue ? newValue.toISOString().split("T")[0] : "")}
                        error={!!errors.endDate}
                        helperText={errors.endDate}
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Next Payment Date
                    </Typography>
                    <CustomDatePicker
                        label="Next Payment Date"
                        value={formData.nextPaymentDate}
                        onChange={(newValue) => handleChange("nextPaymentDate", newValue ? newValue.toISOString().split("T")[0] : "")}
                        required
                        error={!!errors.nextPaymentDate}
                        helperText={errors.nextPaymentDate}
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
                    {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
            </Box>
        </form>
    );
};

export default SubscriptionForm;
