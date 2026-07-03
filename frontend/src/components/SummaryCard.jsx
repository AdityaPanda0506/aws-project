import {
  Card,
  CardContent,
  Grid,
  Typography
} from "@mui/material";

export default function SummaryCards({ report }) {

  if (!report) return null;

  return (

    <Grid container spacing={2} sx={{ mt: 2 }}>

      <Grid item xs={12} md={3}>

        <Card>

          <CardContent>

            <Typography variant="h6">
              Quality Score
            </Typography>

            <Typography variant="h3">

              {report.quality_score}

            </Typography>

          </CardContent>

        </Card>

      </Grid>

      <Grid item xs={12} md={3}>

        <Card>

          <CardContent>

            <Typography>Status</Typography>

            <Typography variant="h5">

              {report.status}

            </Typography>

          </CardContent>

        </Card>

      </Grid>

      <Grid item xs={12} md={3}>

        <Card>

          <CardContent>

            <Typography>Rows</Typography>

            <Typography variant="h5">

              {report.dataset_summary.rows}

            </Typography>

          </CardContent>

        </Card>

      </Grid>

      <Grid item xs={12} md={3}>

        <Card>

          <CardContent>

            <Typography>Columns</Typography>

            <Typography variant="h5">

              {report.dataset_summary.columns}

            </Typography>

          </CardContent>

        </Card>

      </Grid>

    </Grid>

  );

}