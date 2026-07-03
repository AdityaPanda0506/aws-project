import { useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  LinearProgress,
  Snackbar,
  Alert
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";

export default function UploadCard({ onUpload }) {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function pickFile(candidate) {
    if (!candidate) return;

    if (!candidate.name.toLowerCase().endsWith(".csv")) {
      setError("Only CSV files are supported.");
      return;
    }

    setFile(candidate);
    setError("");
  }

  async function uploadFile() {

    if (!file) {
      setError("Please choose a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/upload/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      onUpload(response.data);
      setFile(null);

    } catch (err) {

      console.error(err);
      setError("Upload failed. Check that the backend is running and try again.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <>

      <Card sx={{ mb: 3 }}>

        <CardContent>

          <Typography variant="h6" mb={2}>
            Upload Dataset
          </Typography>

          <Box
            component="label"
            sx={(theme) => ({
              border: "2px dashed",
              borderColor: theme.palette.divider,
              borderRadius: 3,
              height: 140,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.06)
              }
            })}
          >

            <CloudUploadRoundedIcon color="primary" sx={{ fontSize: 36 }} />

            <Typography variant="body2" color="text.secondary" mt={1}>
              Click to choose a CSV file
            </Typography>

            <input
              hidden
              type="file"
              accept=".csv"
              onChange={(e) => pickFile(e.target.files?.[0])}
            />

          </Box>

          {file && (
            <Chip
              sx={{ mt: 2 }}
              icon={<InsertDriveFileRoundedIcon />}
              color="primary"
              variant="outlined"
              label={file.name}
              onDelete={loading ? undefined : () => setFile(null)}
            />
          )}

          {loading && <LinearProgress sx={{ mt: 2 }} />}

          <Button
            fullWidth
            variant="contained"
            disabled={!file || loading}
            sx={{ mt: 3 }}
            onClick={uploadFile}
          >
            {loading ? "Uploading…" : "Upload CSV"}
          </Button>

        </CardContent>

      </Card>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>

    </>

  );

}