const MuiButton = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: "1.5rem",
      padding: "0.5rem 1rem 0.5rem 1rem",
      fontWeight: "600",
      textTransform: "none",
      transition: "all 0.2s ease",
    }),
  },
  variants: [
    {
      props: { variant: "contained", color: "primary" },
      style: ({ theme }) => ({
        boxShadow: "none",
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
      }),
    },
    {
      props: { variant: "contained", color: "error" },
      style: ({ theme }) => ({
        boxShadow: "none",
        "&:hover": {
          backgroundColor: theme.palette.error.light,
        },
      }),
    },
    {
      props: { variant: "contained", color: "warning" },
      style: ({ theme }) => ({
        boxShadow: "none",
        "&:hover": {
          backgroundColor: theme.palette.warning.light,
        },
      }),
    },
    {
      props: { variant: "contained", color: "info" },
      style: ({ theme }) => ({
        boxShadow: "none",
        "&:hover": {
          backgroundColor: theme.palette.info.light,
        },
      }),
    },
    {
      props: { variant: "contained", color: "success" },
      style: ({ theme }) => ({
        boxShadow: "none",
        "&:hover": {
          backgroundColor: theme.palette.success.light,
        },
      }),
    },
    {
      props: { variant: "outlined", color: "primary" },
      style: ({ theme }) => ({
        borderColor: theme.palette.primary.brightText,
        color: theme.palette.primary.contrastText,
        borderWidth: "0.3px",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }),
    },
    {
      props: { variant: "text", color: "primary" },
      style: ({ theme }) => ({
        color: theme.palette.primary.brightText,
        "&:hover": {
          backgroundColor: "transparent",
        },
      }),
    },
  ],
};

export default MuiButton;
