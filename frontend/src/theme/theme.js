import { createTheme, alpha } from "@mui/material/styles";

// Builds the app theme for a given mode. Called by ColorModeContext whenever
// the user toggles light/dark — nothing else needs to import this directly.
export default function getTheme(mode = "light") {

  const isLight = mode === "light";

  return createTheme({

    palette: {

      mode,

      primary: {
        main: "#2563EB"
      },

      secondary: {
        main: "#7C3AED"
      },

      success: {
        main: "#16A34A"
      },

      warning: {
        main: "#EA580C"
      },

      error: {
        main: "#DC2626"
      },

      background: {
        default: isLight ? "#F8FAFC" : "#0B1220",
        paper: isLight ? "#FFFFFF" : "#111827"
      },

      divider: isLight ? "#E5E7EB" : "#1F2937",

      text: {
        primary: isLight ? "#111827" : "#F1F5F9",
        secondary: isLight ? "#6B7280" : "#94A3B8"
      }

    },

    shape: {
      borderRadius: 16
    },

    typography: {

      fontFamily: "Inter, Roboto, sans-serif",

      h3: {
        fontWeight: 700
      },

      h4: {
        fontWeight: 700,
        fontSize: "1.75rem"
      },

      h5: {
        fontWeight: 700,
        fontSize: "1.125rem"
      },

      h6: {
        fontWeight: 700,
        fontSize: "1rem"
      },

      subtitle2: {
        fontWeight: 600,
        fontSize: "0.8125rem"
      },

      body2: {
        fontSize: "0.875rem"
      },

      button: {
        textTransform: "none",
        fontWeight: 600
      }

    },

    components: {

      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body: {
            backgroundColor: theme.palette.background.default
          }
        })
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: "none",
            backgroundImage: "none"
          })
        }
      },

      MuiPaper: {
        defaultProps: {
          elevation: 0
        },
        styleOverrides: {
          root: {
            backgroundImage: "none"
          },
          outlined: ({ theme }) => ({
            borderColor: theme.palette.divider
          })
        }
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: "8px 18px"
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none"
            }
          },
          outlined: ({ theme }) => ({
            borderColor: theme.palette.divider,
            "&:hover": {
              borderColor: theme.palette.text.secondary,
              backgroundColor: theme.palette.action.hover
            }
          })
        }
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 10
          }
        }
      },

      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 8
          }
        }
      },

      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: "1px solid transparent"
          },
          standardError: {
            borderColor: alpha("#DC2626", 0.24)
          },
          standardSuccess: {
            borderColor: alpha("#16A34A", 0.24)
          },
          standardWarning: {
            borderColor: alpha("#EA580C", 0.24)
          },
          standardInfo: {
            borderColor: alpha("#2563EB", 0.24)
          }
        }
      },

      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: theme.palette.divider
          }),
          head: ({ theme }) => ({
            fontWeight: 700,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default
          })
        }
      },

      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:last-child td": {
              borderBottom: 0
            }
          }
        }
      },

      MuiLinearProgress: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            height: 8,
            backgroundColor: theme.palette.divider
          })
        }
      }

    }

  });

}