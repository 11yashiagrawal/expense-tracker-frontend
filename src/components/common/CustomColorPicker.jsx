"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Popover,
    TextField,
    InputAdornment,
    Typography,
    Slider,
    useTheme,
    Paper,
} from "@mui/material";

const CustomColorPicker = ({ value, onChange, label, disabled }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [color, setColor] = useState(value || "#14a248");

    useEffect(() => {
        if (value) setColor(value);
    }, [value]);

    const handleClick = (event) => {
        if (!disabled) setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    // Hex to RGB
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : { r: 0, g: 0, b: 0 };
    };

    // RGB to Hex
    const rgbToHex = (r, g, b) => {
        return (
            "#" +
            [r, g, b]
                .map((x) => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? "0" + hex : hex;
                })
                .join("")
        );
    };

    const rgb = hexToRgb(color);

    const handleRgbChange = (channel, newValue) => {
        const newRgb = { ...rgb, [channel]: newValue };
        const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        setColor(newHex);
        onChange(newHex);
    };

    return (
        <>
            <TextField
                fullWidth
                value={color.toUpperCase()}
                onClick={handleClick}
                readOnly
                disabled={disabled}
                placeholder="#000000"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Box
                                sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    bgcolor: color,
                                    border: `1px solid ${theme.palette.divider}`,
                                    mr: 1,
                                }}
                            />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    cursor: disabled ? "default" : "pointer",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 7,
                        bgcolor: "transparent",
                        cursor: disabled ? "default" : "pointer",
                        "& input": {
                            cursor: disabled ? "default" : "pointer",
                        },
                    },
                }}
            />

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        p: 3,
                        width: 280,
                        bgcolor: "rgba(10, 20, 15, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 4,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    },
                }}
            >
                <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 600, color: theme.palette.text.primary }}>
                    Custom Color
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* Preview Box */}
                    <Box
                        sx={{
                            width: "100%",
                            height: 60,
                            borderRadius: 2,
                            bgcolor: color,
                            border: `2px solid rgba(255,255,255,0.1)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                color: (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 186 ? "#000" : "#fff",
                                fontWeight: 700,
                                fontSize: "1.1rem",
                                letterSpacing: 2,
                            }}
                        >
                            {color.toUpperCase()}
                        </Typography>
                    </Box>

                    {/* RGB Sliders */}
                    {["r", "g", "b"].map((channel) => (
                        <Box key={channel}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, textTransform: "uppercase" }}>
                                    {channel === "r" ? "Red" : channel === "g" ? "Green" : "Blue"}
                                </Typography>
                                <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                                    {rgb[channel]}
                                </Typography>
                            </Box>
                            <Slider
                                size="small"
                                value={rgb[channel]}
                                min={0}
                                max={255}
                                onChange={(e, val) => handleRgbChange(channel, val)}
                                sx={{
                                    color: channel === "r" ? "#ff4d4d" : channel === "g" ? "#4dff4d" : "#4d4dff",
                                    "& .MuiSlider-thumb": {
                                        width: 14,
                                        height: 14,
                                        border: "2px solid currentColor",
                                        bgcolor: "#fff",
                                    },
                                    "& .MuiSlider-rail": {
                                        opacity: 0.2,
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Popover>
        </>
    );
};

export default CustomColorPicker;
