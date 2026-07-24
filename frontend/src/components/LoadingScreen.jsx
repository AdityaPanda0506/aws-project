import { Box, CircularProgress, Typography } from "@mui/material";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

const messages = [
  "Starting CloudGuard...",
  "Connecting to backend...",
  "Preparing dashboard...",
  "Loading your data..."
];

export default function LoadingScreen({ message }) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f7fb",
      }}
    >
      <CloudQueueIcon
        sx={{
          fontSize: 70,
          color: "#1976d2",
          mb: 2,
        }}
      />

      <Typography variant="h4" fontWeight="bold">
        CloudGuard
      </Typography>

      <Typography sx={{ mt: 1, color: "gray" }}>
        {message}
      </Typography>

      <CircularProgress sx={{ mt: 4 }} />

      <Typography sx={{ mt: 3, width: 350, textAlign: "center" }}>
        If this is your first visit, the backend may take up to a minute to wake
        up because it is hosted on the free tier.
      </Typography>
    </Box>
  );
}