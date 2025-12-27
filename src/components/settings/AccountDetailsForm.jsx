"use client";

import { Box, Typography, Grid, TextField } from "@mui/material";

const AccountDetailsForm = ({ formData, onInputChange }) => {
    return (
        <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                Account Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: "semibold" }}>
                        First Name
                    </Typography>
                    <TextField
                        fullWidth
                        name="first_name"
                        value={formData.first_name}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: "semibold" }}>
                        Last Name
                    </Typography>
                    <TextField
                        fullWidth
                        name="last_name"
                        value={formData.last_name}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: "semibold" }}>
                        Email
                    </Typography>
                    <TextField
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: "semibold" }}>
                        Phone Number
                    </Typography>
                    <TextField
                        fullWidth
                        name="phone_no"
                        value={formData.phone_no}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: "semibold" }}>
                        Monthly Budget
                    </Typography>
                    <TextField
                        fullWidth
                        name="monthly_budget"
                        type="number"
                        value={formData.monthly_budget}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: "semibold" }}>
                        Balance
                    </Typography>
                    <TextField
                        fullWidth
                        name="balance"
                        type="number"
                        value={formData.balance}
                        onChange={onInputChange}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AccountDetailsForm;
