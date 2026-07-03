import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack
} from "@mui/material";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";

export default function StatusPieChart({ dashboard }) {

    if (!dashboard) return null;

    const data = [
        {
            name: "Healthy",
            value: dashboard.healthy
        },
        {
            name: "Warning",
            value: dashboard.warning
        },
        {
            name: "Critical",
            value: dashboard.critical
        }
    ];

    const COLORS = [
        "#16A34A",
        "#EA580C",
        "#DC2626"
    ];

    const total = dashboard.healthy + dashboard.warning + dashboard.critical;

    return (

        <Card sx={{ height: "100%" }}>

            <CardContent>

                <Typography variant="h6">

                    Data Quality Status

                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, mb: 2 }}
                >

                    Distribution of datasets by quality status

                </Typography>

                <Box sx={{ position: "relative" }}>

                    <ResponsiveContainer
                        width="100%"
                        height={220}
                    >

                        <PieChart>

                            <Pie

                                data={data}

                                dataKey="value"

                                nameKey="name"

                                innerRadius={65}

                                outerRadius={95}

                                paddingAngle={2}

                            >

                                {
                                    data.map((entry, index) =>
                                        <Cell
                                            key={index}
                                            fill={COLORS[index]}
                                        />
                                    )
                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                            pointerEvents: "none"
                        }}
                    >

                        <Typography variant="h5" sx={{ fontWeight: 700 }}>

                            {total}

                        </Typography>

                        <Typography variant="caption" color="text.secondary">

                            Total

                        </Typography>

                    </Box>

                </Box>

                <Stack spacing={1.5} sx={{ mt: 2 }}>

                    {
                        data.map((entry, index) => (

                            <Stack
                                key={entry.name}
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >

                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            bgcolor: COLORS[index]
                                        }}
                                    />

                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>

                                        {entry.name}

                                    </Typography>

                                </Stack>

                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 700, color: COLORS[index] }}
                                >

                                    {total ? Math.round((entry.value / total) * 100) : 0}%

                                </Typography>

                            </Stack>

                        ))
                    }

                </Stack>

            </CardContent>

        </Card>

    );

}