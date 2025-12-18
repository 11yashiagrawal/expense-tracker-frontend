"use client";

import {
    Menu,
    Typography,
    Box,
    FormControl,
    Select,
    MenuItem,
    TextField,
    Slider,
    Button,
    useTheme,
} from "@mui/material";
import { formatCurrency } from "@/utils/formatUtils";

const FREQUENCY_OPTIONS = [
    "Daily",
    "Weekly",
    "Bi-Weekly",
    "Monthly",
    "Quarterly",
    "Yearly",
];

const FilterMenu = ({
    anchorEl,
    onClose,
    filters,
    handleFilterChange,
    resetFilters,
}) => {
    const theme = useTheme();
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            PaperProps={{
                sx: {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    border: "none",
                    borderRadius: 6,
                    p: 2,
                    minWidth: 250,
                },
            }}
        >
            <Typography variant="subtitle2" sx={{ mb: 1.5, color: "#9CA3AF" }}>
                Filter By
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
                    Frequency
                </Typography>
                <FormControl fullWidth size="small">
                    <Select
                        value={filters.frequency}
                        onChange={(e) => handleFilterChange("frequency", e.target.value)}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {FREQUENCY_OPTIONS.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
                    Next Payment Date
                </Typography>
                <TextField
                    type="date"
                    fullWidth
                    size="small"
                    value={filters.nextPaymentDate}
                    onChange={(e) =>
                        handleFilterChange("nextPaymentDate", e.target.value)
                    }
                    sx={{
                        "& input": { color: "#fff" },
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
                        "& input[type='date']::-webkit-calendar-picker-indicator": {
                            filter: "invert(1)",
                        },
                    }}
                />
            </Box>

            <Box>
                <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
                    Amount Range ({formatCurrency(filters.minAmount)} -{" "}
                    {formatCurrency(filters.maxAmount)})
                </Typography>
                <Slider
                    value={[filters.minAmount, filters.maxAmount]}
                    onChange={(e, val) => {
                        handleFilterChange("minAmount", val[0]);
                        handleFilterChange("maxAmount", val[1]);
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10000}
                    sx={{
                        color: "#22C55E",
                        height: "2px",
                        width: "100%",
                        "& .MuiSlider-thumb": {
                            width: 12,
                            height: 12,
                        },
                    }}
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button size="small" onClick={resetFilters}>
                    Reset
                </Button>
            </Box>
        </Menu>
    );
};

export default FilterMenu;
