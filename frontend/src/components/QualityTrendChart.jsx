import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from "@mui/material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function QualityTrendChart({ dashboard }) {

    if (
        !dashboard ||
        !dashboard.quality_trend ||
        dashboard.quality_trend.length === 0
    ) {

        return (

            <Card sx={{ height: "100%" }}>

                <CardContent>

                    <Typography variant="h6">

                        Quality Score Trend

                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 3 }}
                    >

                        No datasets uploaded yet.

                    </Typography>

                </CardContent>

            </Card>

        );

    }

    const avg = (
        dashboard.quality_trend.reduce(
            (sum, item) => sum + item.score,
            0
        ) /
        dashboard.quality_trend.length
    ).toFixed(1);

    return (

        <Card
            sx={{
                height: "100%"
            }}
        >

            <CardContent>

                <Box
                    sx={{

                        display: "flex",

                        justifyContent: "space-between",

                        alignItems: "flex-start",

                        mb: 4

                    }}
                >

                    <Box>

                        <Typography

                            variant="h6"

                        >

                            Quality Score Trend

                        </Typography>

                        <Typography

                            variant="body2"

                            color="text.secondary"

                            sx={{ mt: 0.5 }}

                        >

                            Average quality score over time

                        </Typography>

                    </Box>

                    <Chip

                        label={`Avg ${avg}%`}

                        sx={{

                            bgcolor:"#EFF6FF",

                            color:"#2563EB",

                            fontWeight:700

                        }}

                    />

                </Box>

                <ResponsiveContainer
                    width="100%"
                    height={420}
                >

                    <AreaChart
                        data={dashboard.quality_trend}
                        margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
                    >

                        <defs>

                            <linearGradient
                                id="score"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="0%"
                                    stopColor="#2563EB"
                                    stopOpacity={0.45}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#2563EB"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#F1F5F9"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="filename"
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            angle={-25}
                            textAnchor="end"
                            height={60}
                            interval={0}
                        />

                        <YAxis
                            domain={[0,100]}
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            width={40}
                        />

                        <Tooltip />

                        <Area

                            type="monotone"

                            dataKey="score"

                            stroke="#2563EB"

                            strokeWidth={3}

                            fill="url(#score)"

                        />

                    </AreaChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}