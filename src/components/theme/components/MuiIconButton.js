const MuiIconButton = {
  styleOverrides: {
    root: ({ theme }) => ({
      transition: "all 0.2s ease",
      color: theme.palette.text.primary,
      borderRadius: "50%",
      border: "none",
      "&:hover": {
          backgroundColor: theme.palette.action.hover,
          borderColor: "transparent"
        },
    }),
  },
};

export default MuiIconButton;

