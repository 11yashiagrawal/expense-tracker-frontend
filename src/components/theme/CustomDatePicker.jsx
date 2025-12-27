"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTheme } from "@mui/material";

const CustomDatePicker = ({
    value,
    onChange,
    label = "Date",
    fullWidth = true,
    required = false,
    error = false,
    helperText = "",
    InputInputProps = {}, // Consumed or passed if needed
    ...props
}) => {
    const theme = useTheme();

    return (
        <DatePicker
            label={null} // Disable default label as we use external Typography
            value={value ? new Date(value) : null}
            onChange={onChange} // Returns Date object | null
            slotProps={{
                textField: {
                    fullWidth: fullWidth,
                    required: required,
                    error: error,
                    // helperText: helperText,
                    ...props, // Pass other props to TextField
                    sx: {
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "1.5rem", // Match Title field (pill shape)
                            backgroundColor: "transparent",
                            color: theme.palette.text.primary,
                            border: `0.5px solid ${theme.palette.primary.brightText}`, // Global border
                            transition: "all 0.2s ease",
                            "& fieldset": {
                                border: "none", // Remove default fieldset
                            },
                            "&:hover": {
                                backgroundColor: theme.palette.action.hover,
                                borderColor: theme.palette.primary.brightText,
                            },
                            "&.Mui-focused": {
                                borderColor: theme.palette.primary.brightText,
                            },
                        },
                        "& .MuiInputLabel-root": {
                            display: "none" // Hide label
                        },
                        "& .MuiSvgIcon-root": {
                            color: theme.palette.text.primary,
                        }
                    },
                },
                popup: {
                    sx: {
                        "& .MuiPaper-root": {
                            bgcolor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            borderRadius: 4,
                            border: `1px solid ${theme.palette.action.hover}`,
                            boxShadow: theme.shadows[4],
                        },
                        "& .MuiPickersDay-root": {
                            color: theme.palette.text.primary,
                            "&:hover": {
                                bgcolor: theme.palette.action.hover,
                            },
                            "&.Mui-selected": {
                                bgcolor: theme.palette.primary.main,
                                color: "#fff", // Contrast text for primary main
                                "&:hover": {
                                    bgcolor: theme.palette.primary.light,
                                }
                            }
                        },
                        "& .MuiPickersCalendarHeader-label": {
                            color: theme.palette.text.primary,
                            fontWeight: 600
                        },
                        "& .MuiPickersYear-yearButton": {
                            color: theme.palette.text.primary,
                        }
                    }
                }
            }}
            {...props}
        />
    );
};

export default CustomDatePicker;
