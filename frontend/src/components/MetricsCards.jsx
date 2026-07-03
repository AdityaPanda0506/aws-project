import {

    Card,
    CardContent,
    Grid,
    Typography

} from "@mui/material";

export default function MetricsCards({ report }) {

    if (!report) return null;

    return (

        <Grid container spacing={3}>

            <Grid item xs={12} md={4}>

                <Card>

                    <CardContent>

                        <Typography>

                            Quality Score

                        </Typography>

                        <Typography variant="h3">

                            {report.quality_score}

                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

            <Grid item xs={12} md={4}>

                <Card>

                    <CardContent>

                        <Typography>

                            Recommendations

                        </Typography>

                        <Typography variant="h3">

                            {report.recommendations.length}

                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

            <Grid item xs={12} md={4}>

                <Card>

                    <CardContent>

                        <Typography>

                            Detected Columns

                        </Typography>

                        <Typography variant="h3">

                            {

                                Object.keys(

                                    report.detected_columns

                                ).length

                            }

                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

        </Grid>

    );

}