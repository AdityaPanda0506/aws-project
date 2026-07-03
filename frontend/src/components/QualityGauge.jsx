import { Card, CardContent, Typography, Box } from "@mui/material";

import {

CircularProgressbar,

buildStyles

}

from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function QualityGauge({ score }) {

    const color =
        score >= 90
            ? "#16A34A"
            : score >= 70
            ? "#EA580C"
            : "#DC2626";

    return (

        <Card sx={{ height: "100%" }}>

            <CardContent>

                <Typography

                    variant="h6"

                >

                    Quality Score

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                    sx={{ mt: 0.5, mb: 3 }}

                >

                    Overall dataset health

                </Typography>

                <Box

                    sx={{

                        width: 200,

                        mx: "auto"

                    }}

                >

                    <CircularProgressbar

                        value={score}

                        text={`${score}%`}

                        styles={buildStyles({

                            textSize: "16px",

                            pathColor: color,

                            textColor: "#111827",

                            trailColor: "#F1F5F9"

                        })}

                    />

                </Box>

            </CardContent>

        </Card>

    );

}