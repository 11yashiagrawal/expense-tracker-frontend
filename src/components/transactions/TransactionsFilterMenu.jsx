"use client";

import {
    Menu,
    Typography,
    Box,
    TextField,
    Slider,
    Button,
    useTheme,
} from "@mui/material";
import { formatCurrency } from "@/utils/formatUtils";
import CustomDatePicker from "@/components/theme/CustomDatePicker";



const TransactionsFilterMenu = ({
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
            <Typography variant="subtitle2" sx={{ mb: 1.5, color: theme.palette.text.secondary }}>
                Filter By
            </Typography>



            <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
                    Date
                </Typography>
                <CustomDatePicker
                    value={filters.date}
                    onChange={(newValue) => handleFilterChange("date", newValue ? newValue.toISOString().split("T")[0] : "")}
                    label="Date"
                    fullWidth
                    InputProps={{
                        sx: {
                            color: theme.palette.text.primary,
                        }
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
                    max={100000} // Increased UI slider max
                    sx={{
                        color: theme.palette.primary.main,
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

export default TransactionsFilterMenu;
