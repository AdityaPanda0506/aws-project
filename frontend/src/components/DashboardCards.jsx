import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function StatCard({
    title,
    value,
    icon,
    background
}) {

    return (

        <Card sx={{ height: "100%" }}>

            <CardContent>

                <Box

                    sx={{

                        display: "flex",

                        justifyContent: "space-between",

                        alignItems: "flex-start"

                    }}

                >

                    <Box>

                        <Typography

                            variant="body2"

                            color="text.secondary"

                            sx={{ fontWeight: 600 }}

                        >

                            {title}

                        </Typography>

                        <Typography

                            variant="h4"

                            sx={{ fontWeight: 700, mt: 0.5 }}

                        >

                            {value}

                        </Typography>

                    </Box>

                    <Avatar

                        variant="rounded"

                        sx={{

                            bgcolor:background,

                            width:48,

                            height:48,

                            borderRadius:"12px"

                        }}

                    >

                        {icon}

                    </Avatar>

                </Box>

            </CardContent>

        </Card>

    );

}

export default function DashboardCards({ dashboard }) {

    if(!dashboard) return null;

    return(

        <Grid container spacing={3} sx={{ width: "100%" }}>

            <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>

                <StatCard

                    title="Total Uploads"

                    value={dashboard.total_uploads}

                    background="#DBEAFE"

                    icon={<UploadFileIcon sx={{color:"#2563EB"}}/>}

                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>

                <StatCard

                    title="Healthy"

                    value={dashboard.healthy}

                    background="#DCFCE7"

                    icon={<CheckCircleIcon sx={{color:"#16A34A"}}/>}

                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>

                <StatCard

                    title="Warning"

                    value={dashboard.warning}

                    background="#FFEDD5"

                    icon={<WarningAmberIcon sx={{color:"#EA580C"}}/>}

                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>

                <StatCard

                    title="Critical"

                    value={dashboard.critical}

                    background="#FEE2E2"

                    icon={<ErrorIcon sx={{color:"#DC2626"}}/>}

                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>

                <StatCard

                    title="Average Score"

                    value={`${dashboard.average_quality_score}%`}

                    background="#EDE9FE"

                    icon={<TrendingUpIcon sx={{color:"#7C3AED"}}/>}

                />

            </Grid>

        </Grid>

    );

}