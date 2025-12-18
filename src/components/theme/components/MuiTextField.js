const MuiTextField = {
  styleOverrides: {
    root: ({ theme }) => ({
      "& .MuiInputBase-root": {
        height: "2.75rem",
        color: theme.palette.text.primary,
        transition: "all 0.2s ease",
        boxSizing: "border-box",

        "& input": {
          padding: "0 16px",
          height: "100%",
          boxSizing: "border-box",
        },

        // ✅ OUTLINED variant
        "&.MuiOutlinedInput-root": {
          border: `0.5px solid ${theme.palette.primary.brightText}`,
          borderRadius: "1.5rem",
          backgroundColor: "transparent",
          transition: "all 0.2s ease",

          "& fieldset": {
            border: "none", // remove default fieldset
          },

          "&:hover": {
            backgroundColor: theme.palette.action.hover,
            borderColor: theme.palette.primary.brightText,
          },

          "&.Mui-focused": {
            // backgroundColor: theme.palette.action.hover,
            borderColor: theme.palette.primary.brightText,
          },

          "&.Mui-error": {
            borderColor: theme.palette.error.main,
            // backgroundColor: theme.palette.error.light + "33", // subtle red tint
            "&:hover": {
              backgroundColor: theme.palette.error.light + "55",
            },
          },
        },

        // ✅ FILLED variant
        "&.MuiFilledInput-root": {
          border: "none",
          backgroundColor: "transparent",
          transition: "all 0.2s ease",

          "&:hover": {
            backgroundColor: theme.palette.action.hover,
            border: "none"
          },
          "&.Mui-focused, &.Mui-active": {
            backgroundColor: theme.palette.action.hover,
          },
          "&.Mui-error": {
            backgroundColor: theme.palette.error.light + "33",
          },
        },

        // ✅ STANDARD variant
        "&.MuiInput-root": {
          borderBottom: `0.5px solid ${theme.palette.primary.brightText}`,
          borderRadius: 0,
          transition: "all 0.2s ease",
          backgroundColor: "transparent",

          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: `0.5px solid ${theme.palette.primary.brightText}`,
          },
          "&.Mui-focused:after": {
            borderBottom: `0.5px solid ${theme.palette.primary.brightText}`,
          },
          "&.Mui-error": {
            borderBottomColor: theme.palette.error.main,
            backgroundColor: theme.palette.error.light + "33",
          },
        },

        // ✅ DISABLED state (common)
        "&.Mui-disabled": {
          opacity: 0.6,
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.text.disabled,
        },
      },

      // ✅ LABEL styling — HIDING IT (handled externally)
      "& .MuiInputLabel-root": {
        display: "none",
      },

      // ✅ Helper text styling
      "& .MuiFormHelperText-root": {
        fontSize: "0.8rem",
        marginLeft: "0.75rem",
        color: theme.palette.text.secondary,
      },
      "& .MuiFormHelperText-root.Mui-error": {
        color: theme.palette.error.main,
      },
    }),
  },
  defaultProps: {
    hiddenLabel: true,
  },
};

export default MuiTextField;