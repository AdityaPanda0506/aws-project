import {
  AppBar,
  Toolbar,
  Typography,
  Chip,
  Box
} from "@mui/material";

import CloudIcon from "@mui/icons-material/Cloud";

export default function Navbar() {

  return (

    <AppBar position="static">

      <Toolbar>

        <CloudIcon sx={{ mr: 2 }} />

        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold"
          }}
        >
          CloudGuard
        </Typography>

        <Box>

          <Chip
            label="Backend Online"
            color="success"
          />

        </Box>

      </Toolbar>

    </AppBar>

  );

}