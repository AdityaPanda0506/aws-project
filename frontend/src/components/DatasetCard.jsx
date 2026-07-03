import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  Box,
  Paper
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function MetricCard({ icon, title, value }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        background: "#FAFBFC",
        height: "100%"
      }}
    >
      <Box display="flex" alignItems="center" gap={1.5}>
        {icon}
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default function DatasetCard({ report }) {

  if (!report) {

    return (
      <Card sx={{ height: "100%" }}>

        <CardContent>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Dataset Summary
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            Upload a dataset to view its statistics.
          </Typography>

          <Box
            mt={8}
            textAlign="center"
          >

            <DescriptionIcon
              sx={{
                fontSize: 90,
                color: "#D1D5DB"
              }}
            />

            <Typography
              mt={2}
              color="text.secondary"
            >
              No dataset uploaded yet.
            </Typography>

          </Box>

        </CardContent>

      </Card>
    );

  }

  const summary = report.dataset_summary || {};

  return (

    <Card sx={{ height: "100%" }}>

      <CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >

          <Box>

            <Typography
              variant="h5"
              fontWeight="bold"
            >
              Dataset Summary
            </Typography>

            <Typography
              color="text.secondary"
            >
              Latest uploaded file
            </Typography>

          </Box>

          <DescriptionIcon
            color="primary"
            sx={{ fontSize: 45 }}
          />

        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          fontWeight="bold"
        >
          {report.filename}
        </Typography>

        <Chip
          sx={{ mt: 1 }}
          color={
            report.status === "Healthy"
              ? "success"
              : report.status === "Warning"
              ? "warning"
              : "error"
          }
          label={report.status}
        />

        <Grid
          container
          spacing={2}
          mt={2}
        >

          <Grid item xs={6}>
            <MetricCard
              icon={<TableRowsIcon color="primary" />}
              title="Rows"
              value={summary.rows ?? "-"}
            />
          </Grid>

          <Grid item xs={6}>
            <MetricCard
              icon={<ViewColumnIcon color="primary" />}
              title="Columns"
              value={summary.columns ?? "-"}
            />
          </Grid>

          <Grid item xs={6}>
            <MetricCard
              icon={<WorkspacePremiumIcon color="warning" />}
              title="Quality Score"
              value={`${report.quality_score}%`}
            />
          </Grid>

          <Grid item xs={6}>
            <MetricCard
              icon={<CalendarMonthIcon color="success" />}
              title="Generated"
              value={
                report.generated_at
                  ? new Date(report.generated_at).toLocaleDateString()
                  : "-"
              }
            />
          </Grid>

        </Grid>

      </CardContent>

    </Card>

  );

}