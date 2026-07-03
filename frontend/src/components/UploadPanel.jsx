import { useRef, useState } from "react";
import api from "../services/api";

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
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadPanel({ onUpload }) {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  function pickFile(candidate) {
    if (!candidate) return;

    if (!candidate.name.toLowerCase().endsWith(".csv")) {
      setError("Only CSV files are supported.");
      return;
    }

    setFile(candidate);
    setError("");
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  }

  async function uploadFile() {

    if (!file) {
      setError("Please choose a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);
      setProgress(0);

      const res = await api.post(
            "/upload/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (evt) => {
                    if (evt.total) {
                        setProgress(
                            Math.round((evt.loaded / evt.total) * 100)
                        );
                    }
                }
            }
        );

      onUpload(res.data);
      setSuccess(true);
      setFile(null);

    } catch (err) {

      console.log(err);
      setError("Upload failed. Check that the backend is running and try again.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <>

      <Card>

        <CardContent>

          <Typography variant="h5">
            Upload Dataset
          </Typography>

          <Typography color="text.secondary" mb={4}>
            Drag & drop or select your CSV file
          </Typography>

          <Box
            component="label"
            htmlFor="csv-upload-input"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            sx={(theme) => ({
              border: "2px dashed",
              borderColor: dragging ? theme.palette.primary.main : theme.palette.divider,
              borderRadius: 3,
              height: 240,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              textAlign: "center",
              px: 3,
              bgcolor: dragging
                ? alpha(theme.palette.primary.main, 0.06)
                : alpha(theme.palette.primary.main, 0.02),
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.06)
              }
            })}
          >

            <CloudUploadRoundedIcon color="primary" sx={{ fontSize: 56 }} />

            <Typography mt={2} fontWeight={700}>
              {dragging ? "Drop it here" : "Click to upload or drag a CSV here"}
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={0.5}>
              CSV files only
            </Typography>

            <input
              id="csv-upload-input"
              ref={inputRef}
              hidden
              type="file"
              accept=".csv"
              onChange={(e) => pickFile(e.target.files?.[0])}
            />

          </Box>

          {file && (
            <Chip
              sx={{ mt: 3 }}
              icon={<InsertDriveFileRoundedIcon />}
              color="primary"
              variant="outlined"
              label={`${file.name} · ${formatSize(file.size)}`}
              onDelete={loading ? undefined : () => setFile(null)}
            />
          )}

          {loading && (
            <Box sx={{ mt: 3 }}>
              <LinearProgress
                variant={progress > 0 ? "determinate" : "indeterminate"}
                value={progress}
              />
              <Typography variant="body2" color="text.secondary" mt={1}>
                {progress > 0 ? `Uploading… ${progress}%` : "Uploading…"}
              </Typography>
            </Box>
          )}

          <Button
            fullWidth
            size="large"
            variant="contained"
            disabled={!file || loading}
            sx={{ mt: 4, height: 52 }}
            startIcon={<AutoAwesomeRoundedIcon />}
            onClick={uploadFile}
          >
            {loading ? "Analyzing…" : "Analyze Dataset"}
          </Button>

        </CardContent>

      </Card>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Dataset analyzed successfully.
        </Alert>
      </Snackbar>

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