const MuiToggleButtonTheme = {
    MuiToggleButtonGroup: {
        styleOverrides: {
            root: ({ theme }) => ({
                height: "2.75rem",
                borderRadius: "1.5rem",
                backgroundColor: theme.palette.action.hover,
                border: "none",
                padding: "4px",
                gap: "4px",

                "& .MuiToggleButtonGroup-grouped": {
                    margin: 0,
                    border: 0,
                    "&:not(:first-of-type)": {
                        borderRadius: "1.5rem",
                    },
                    "&:first-of-type": {
                        borderRadius: "1.5rem",
                    },
                },
            }),
        },
    },
    MuiToggleButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: "0.5rem",
                textTransform: "none",
                color: theme.palette.text.secondary,
                padding: "0 10px",
                border: "none",
                fontSize: "0.875rem",
                fontWeight: 800,
                height: "100%",

                "&:hover": {
                    backgroundColor: "transparent",
                },

                "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.dark,
                    color: theme.palette.text.primary,
                    "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                    },
                },
            }),
        },
    },
};

export default MuiToggleButtonTheme;
