import { useEffect, useState } from "react";

import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper
} from "@mui/material";

import { getDashboard, getHistory } from "../services/api";

import DashboardCards from "../components/DashboardCards";
import QualityTrendChart from "../components/QualityTrendChart";
import StatusPieChart from "../components/StatusPieChart";
import QualityGauge from "../components/QualityGauge";
import HistoryTable from "../components/HistoryTable";

// Shared panel styling — white card, hairline border, soft radius,
// matches the flat card look used throughout the dashboard.
const panelSx = {
  p: 3,
  borderRadius: "16px",
  border: "1px solid #E5E7EB",
  boxShadow: "none",
  height: "100%"
};

export default function Dashboard() {

    const [dashboard,setDashboard]=useState(null);

    const [history,setHistory]=useState([]);

    const [loading,setLoading]=useState(true);

    const [error,setError]=useState("");

    async function loadDashboard() {

    setLoading(true);

    setError("");

    while (true) {

        try {

            const dashboardRes = await getDashboard();

            const historyRes = await getHistory();

            setDashboard(dashboardRes.data);

            setHistory(historyRes.data);

            break;

        }

        catch (err) {

            console.log("Waiting for backend...", err);

            await new Promise(resolve => setTimeout(resolve, 5000));

        }

    }

    setLoading(false);

}

    useEffect(()=>{

        loadDashboard();

    },[]);

    if(loading){

        return(

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

                <CircularProgress size={40} thickness={4} sx={{ color: "#2563EB" }}/>

                <Typography sx={{ color: "#9CA3AF", fontWeight: 500 }}>

                    Starting CloudGuard...

                </Typography>

            </Box>

        );

    }

    return(

        <>

            {

                error &&

                <Alert

                    severity="error"

                    sx={{mb:3, borderRadius: "12px"}}

                >

                    {error}

                </Alert>

            }

            <Box sx={{ mb: 4 }}>

                <Typography

                    variant="h4"

                    sx={{ color: "#111827", fontWeight: 700, fontSize: 28 }}

                >

                    Dashboard

                </Typography>

                <Typography

                    sx={{ color: "#6B7280", mt: 0.5, fontSize: 14 }}

                >

                    Welcome back, Aditya! Here's your data quality overview.

                </Typography>

            </Box>

            <DashboardCards

                dashboard={dashboard}

            />

            <Grid

                container

                spacing={3}

                sx={{ mt: 0.5, width: "100%" }}

            >

                {/* Trend chart gets the full row — it needs the room */}

                <Grid

                    size={{ xs: 12 }}

                >

                    <Paper elevation={0} sx={panelSx}>

                        <QualityTrendChart

                            dashboard={dashboard}

                        />

                    </Paper>

                </Grid>

                {/* Pie chart and gauge form an even pair below, no leftover columns */}

                <Grid

                    size={{ xs: 12, md: 6 }}

                >

                    <Paper elevation={0} sx={panelSx}>

                        <StatusPieChart

                            dashboard={dashboard}

                        />

                    </Paper>

                </Grid>

                <Grid

                    size={{ xs: 12, md: 6 }}

                >

                    <Paper elevation={0} sx={panelSx}>

                        <QualityGauge

                            score={dashboard?.average_quality_score ?? 0}

                        />

                    </Paper>

                </Grid>

                <Grid

                    size={{ xs: 12 }}

                >

                    <Paper elevation={0} sx={panelSx}>

                        <HistoryTable

                            history={history.slice(0,5)}

                        />

                    </Paper>

                </Grid>

            </Grid>

        </>

    );

}