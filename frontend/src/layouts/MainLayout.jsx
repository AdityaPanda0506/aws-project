import { Outlet, NavLink, useLocation } from "react-router-dom";

import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  AppBar,
  Stack,
  IconButton,
  useTheme
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HistoryIcon from "@mui/icons-material/History";
import ShieldIcon from "@mui/icons-material/Shield";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useColorMode } from "../theme/ColorModeContext";

const drawerWidth = 260;

export default function MainLayout() {

  const location = useLocation();

  const theme = useTheme();

  const { mode, toggleColorMode } = useColorMode();

  const accent = theme.palette.primary.main;
  const accentSoft = alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.08 : 0.16);
  const border = theme.palette.divider;
  const surface = theme.palette.background.paper;
  const textPrimary = theme.palette.text.primary;
  const textSecondary = theme.palette.text.secondary;
  const online = theme.palette.success.main;
  const onlineSoft = alpha(theme.palette.success.main, theme.palette.mode === "light" ? 0.1 : 0.18);
  const hoverSurface = theme.palette.action.hover;

  const menu = [
    {
      text: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
      path: "/"
    },
    {
      text: "Upload Dataset",
      icon: <CloudUploadIcon fontSize="small" />,
      path: "/upload"
    },
    {
      text: "History",
      icon: <HistoryIcon fontSize="small" />,
      path: "/history"
    }
  ];

  return (

    <Box sx={{ display: "flex", background: theme.palette.background.default, minHeight: "100vh" }}>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderRight: `1px solid ${border}`,
            background: surface
          }
        }}
      >

        <Toolbar sx={{ py: 3, px: 3 }}>

          <Stack direction="row" spacing={1.5} alignItems="center">

            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: accent
              }}
            >

              <ShieldIcon sx={{ fontSize: 22, color: "#fff" }} />

            </Box>

            <Box>

              <Typography
                variant="h6"
                sx={{ color: textPrimary, lineHeight: 1.2, fontWeight: 700, fontSize: 18 }}
              >
                CloudGuard
              </Typography>

              <Typography variant="caption" sx={{ color: textSecondary }}>
                Data Quality Platform
              </Typography>

            </Box>

          </Stack>

        </Toolbar>

        <Divider sx={{ borderColor: border }} />

        <List sx={{ mt: 2, px: 2 }}>

          {menu.map((item) => {

            const active = location.pathname === item.path;

            return (

              <ListItemButton
                key={item.text}
                component={NavLink}
                to={item.path}
                selected={active}
                sx={{
                  mb: 0.5,
                  borderRadius: "10px",
                  py: 1,
                  color: active ? accent : textSecondary,
                  "&.Mui-selected": {
                    background: accentSoft,
                    color: accent,
                    "&:hover": {
                      background: accentSoft
                    }
                  },
                  "&:hover": {
                    background: hoverSurface
                  }
                }}
              >

                <ListItemIcon sx={{ minWidth: 34, color: active ? accent : textSecondary }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      fontSize: 14,
                      fontWeight: active ? 600 : 500
                    }
                  }}
                />

              </ListItemButton>

            );

          })}

        </List>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ p: 2 }}>

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              background: onlineSoft,
              border: `1px solid ${alpha(online, 0.3)}`,
              borderRadius: "12px",
              p: 1.5
            }}
          >

            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: surface
              }}
            >

              <CloudDoneIcon sx={{ fontSize: 18, color: online }} />

            </Box>

            <Box>

              <Typography sx={{ fontSize: 13, fontWeight: 700, color: online }}>
                Backend Online
              </Typography>

              <Typography sx={{ fontSize: 11, color: textSecondary }}>
                All systems operational
              </Typography>

            </Box>

          </Stack>

        </Box>

        <Divider sx={{ borderColor: border }} />

        <Box sx={{ p: 2 }}>

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              borderRadius: "10px",
              p: 1,
              cursor: "pointer",
              "&:hover": { background: hoverSurface }
            }}
          >

            <Avatar sx={{ width: 36, height: 36, background: accent, fontSize: 14, fontWeight: 700 }}>
              A
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>

              <Typography sx={{ fontWeight: 600, fontSize: 14, color: textPrimary }}>
                Aditya
              </Typography>

              <Typography variant="caption" sx={{ color: textSecondary }}>
                Administrator
              </Typography>

            </Box>

            <KeyboardArrowDownIcon sx={{ color: textSecondary, fontSize: 20 }} />

          </Stack>

        </Box>

      </Drawer>

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>

        <AppBar
          elevation={0}
          position="sticky"
          sx={{
            background: surface,
            color: textPrimary,
            borderBottom: `1px solid ${border}`
          }}
        >

          <Toolbar sx={{ py: 1.5 }}>

            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: 24 }}>
              {menu.find((m) => m.path === location.pathname)?.text || "Dashboard"}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" spacing={2} alignItems="center">

              <IconButton
                size="small"
                onClick={toggleColorMode}
                aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
                sx={{
                  border: `1px solid ${border}`,
                  borderRadius: "10px",
                  width: 38,
                  height: 38
                }}
              >

                {mode === "light" ? (
                  <LightModeOutlinedIcon sx={{ fontSize: 19, color: textSecondary }} />
                ) : (
                  <DarkModeRoundedIcon sx={{ fontSize: 19, color: textSecondary }} />
                )}

              </IconButton>

              <Avatar sx={{ width: 34, height: 34, background: accent, fontSize: 13, fontWeight: 700 }}>
                A
              </Avatar>

              <Box>

                <Typography sx={{ fontSize: 12, color: textSecondary, lineHeight: 1.2 }}>
                  Welcome back,
                </Typography>

                <Stack direction="row" spacing={0.5} alignItems="center">

                  <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                    Aditya 👋
                  </Typography>

                  <KeyboardArrowDownIcon sx={{ fontSize: 18, color: textSecondary }} />

                </Stack>

              </Box>

            </Stack>

          </Toolbar>

        </AppBar>

        <Box sx={{ p: 3, width: "100%" }}>
          <Outlet />
        </Box>

      </Box>

    </Box>

  );

}