import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  Box
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import QualityGauge from "../QualityGauge";

export default function SummarySection({ report }) {

  if (!report) return null;

  function getColor(status) {
    if (status === "Healthy") return "success";
    if (status === "Warning") return "warning";
    return "error";
  }

  function getIcon(status) {
    if (status === "Healthy") return <CheckCircleIcon />;
    if (status === "Warning") return <WarningAmberIcon />;
    return <ErrorIcon />;
  }

  return (

    <Card
      elevation={4}
      sx={{
        borderRadius: 3
      }}
    >

      <CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >

          <Box>

            <Typography
              variant="h4"
              fontWeight="bold"
            >

              CloudGuard Report

            </Typography>

            <Typography
              color="text.secondary"
            >

              Intelligent Data Quality Assessment

            </Typography>

          </Box>

          <DescriptionIcon
            sx={{
              fontSize: 60,
              color: "#1565C0"
            }}
          />

        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>

            <Typography
              color="text.secondary"
            >

              Filename

            </Typography>

            <Typography variant="h6">

              {report.filename}

            </Typography>

          </Grid>

          <Grid item xs={12} md={6}>

            <Typography
              color="text.secondary"
            >

              Status

            </Typography>

            <Chip

              color={getColor(report.status)}

              icon={getIcon(report.status)}

              label={report.status}

            />

          </Grid>

          <Grid item xs={12} md={3}>

            <Typography color="text.secondary">

              Rows

            </Typography>

            <Typography variant="h5">

              {report.dataset_summary.rows}

            </Typography>

          </Grid>

          <Grid item xs={12} md={3}>

            <Typography color="text.secondary">

              Columns

            </Typography>

            <Typography variant="h5">

              {report.dataset_summary.columns}

            </Typography>

          </Grid>

          <Grid item xs={12} md={3}>

            <Typography color="text.secondary">

              Memory

            </Typography>

            <Typography variant="h5">

              {report.dataset_summary.memory_mb} MB

            </Typography>

          </Grid>

          <Grid item xs={12} md={3}>

            <Typography color="text.secondary">

              Quality Score

            </Typography>

            <Typography

              variant="h3"

              fontWeight="bold"

              color="primary"

            >

              {report.quality_score}

            </Typography>

          </Grid>

          <Grid item xs={12} md={4}>

              <QualityGauge

                  score={report.quality_score}

              />

          </Grid>

          <Grid item xs={12}>

            <Divider sx={{ my: 2 }} />

          </Grid>

          <Grid item xs={12} md={6}>

            <Typography color="text.secondary">

              Generated On

            </Typography>

            <Typography>

              {report.generated_at}

            </Typography>

          </Grid>

          <Grid item xs={12} md={6}>

            <Typography color="text.secondary">

              Report ID

            </Typography>

            <Typography>

              {report.report_id}

            </Typography>

          </Grid>

        </Grid>

      </CardContent>

    </Card>

  );

}