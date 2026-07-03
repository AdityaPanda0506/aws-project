import { useState } from "react";
import { Grid, Typography, Box, Card } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

import UploadPanel from "../components/UploadPanel";
import DatasetCard from "../components/DatasetCard";
import ValidationSummary from "../components/ValidationSummary";
import RecommendationPanel from "../components/RecommendationPanel";

export default function Upload() {

  const [report, setReport] = useState(null);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 4 }}>

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
          <CloudUploadRoundedIcon fontSize="small" />
        </Box>

        <Box>
          <Typography variant="h4">Upload Dataset</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Upload a CSV dataset and receive an instant quality assessment.
          </Typography>
        </Box>

      </Box>

      <Grid container spacing={3}>

        {/* Upload */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ p: 3, height: "100%" }}>
            <UploadPanel onUpload={(data) => setReport(data)} />
          </Card>
        </Grid>

        {/* Dataset */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ p: 3, height: "100%" }}>
            <DatasetCard report={report} />
          </Card>
        </Grid>

        {/* Validation */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, height: "100%" }}>
            <ValidationSummary report={report} />
          </Card>
        </Grid>

        {/* Recommendation */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, height: "100%" }}>
            <RecommendationPanel report={report} />
          </Card>
        </Grid>

      </Grid>
    </>
  );

}