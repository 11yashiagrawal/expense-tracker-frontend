const MuiSelectTheme = {
    MuiSelect: {
        styleOverrides: {
            select: {
                paddingTop: 0,
                paddingBottom: 0,
                height: "100%",
                display: "flex",
                alignItems: "center",
            },
            icon: ({ theme }) => ({
                color: theme.palette.text.secondary,
            }),
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: ({ theme }) => ({
                height: "2.75rem",
                color: theme.palette.text.primary,
                transition: "all 0.2s ease",
                boxSizing: "border-box",
                border: `0.5px solid ${theme.palette.primary.brightText}`,
                borderRadius: "1.5rem",
                backgroundColor: "transparent",

                "& fieldset": {
                    border: "none",
                },

                "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    borderColor: theme.palette.primary.brightText,
                },

                "&.Mui-focused": {
                    borderColor: theme.palette.primary.brightText,
                },

                "&.Mui-error": {
                    borderColor: theme.palette.error.main,
                    "&:hover": {
                        backgroundColor: theme.palette.error.light + "55",
                    },
                },

                "&.Mui-disabled": {
                    opacity: 0.6,
                    backgroundColor: theme.palette.action.disabledBackground,
                    color: theme.palette.text.disabled,
                    borderColor: "rgba(255, 255, 255, 0.1)"
                },
            }),
            input: {
                padding: "0 16px",
                height: "100%",
                boxSizing: "border-box",
            },
        },
    },
};

export default MuiSelectTheme;
