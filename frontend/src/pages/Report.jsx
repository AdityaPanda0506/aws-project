import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Grid,
  CircularProgress,
  Alert,
  Button,
  Stack,
  Box,
  Typography,
  Card,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";

import SummarySection from "../components/report/SummarySection";
import ValidationSection from "../components/report/ValidationSection";
import RecommendationSection from "../components/report/RecommendationSection";
import ColumnProfileSection from "../components/report/ColumnProfileSection";

export default function Report() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    loadReport();

  }, []);

  async function loadReport() {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/report/${id}`
      );

      setReport(response.data);

    }

    catch (err) {

      console.log(err);

      setError("Unable to load report.");

    }

    finally {

      setLoading(false);

    }

  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: 16
        }}
      >
        <CircularProgress size={40} thickness={4} color="primary" />
        <Typography color="text.secondary" fontWeight={500}>
          Loading report…
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          variant="outlined"
          color="inherit"
          onClick={() => navigate("/")}
          sx={{ mb: 3 }}
        >
          Back to dashboard
        </Button>
        <Alert severity="error">{error}</Alert>
      </>
    );
  }

  return (

    <>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={4}
      >

        <Stack direction="row" spacing={2} alignItems="center">

          <Box
            sx={(theme) => ({
              width: 44,
              height: 44,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              flexShrink: 0
            })}
          >
            <AssessmentRoundedIcon fontSize="small" />
          </Box>

          <Box>
            <Typography variant="h5">Quality Report</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.25}>
              Report ID: {id}
            </Typography>
          </Box>

        </Stack>

        <Stack direction="row" spacing={1.5}>

          <Button
            startIcon={<ArrowBackRoundedIcon />}
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/")}
          >
            Dashboard
          </Button>

          {report.pdf_s3_url && (
            <Button
              startIcon={<PictureAsPdfRoundedIcon />}
              variant="contained"
              color="error"
              onClick={() => window.open(report.pdf_s3_url, "_blank")}
            >
              PDF
            </Button>
          )}

          <Button
            startIcon={<DataObjectRoundedIcon />}
            variant="contained"
            color="primary"
            onClick={() => console.log(report)}
          >
            JSON
          </Button>

        </Stack>

      </Stack>

      <Grid container spacing={3}>

        <Grid size={{ xs: 12 }}>
          <Card sx={{ p: 3 }}>
            <SummarySection report={report} />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, height: "100%" }}>
            <ValidationSection report={report} />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, height: "100%" }}>
            <RecommendationSection report={report} />
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card sx={{ p: 3 }}>
            <ColumnProfileSection report={report} />
          </Card>
        </Grid>

      </Grid>

    </>

  );

}