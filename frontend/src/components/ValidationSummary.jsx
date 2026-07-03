import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Box
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EmailIcon from "@mui/icons-material/Email";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import EventBusyIcon from "@mui/icons-material/EventBusy";

function StatBox({ title, value, color, icon }) {

    return (

        <Paper

            elevation={0}

            sx={{

                p:3,

                border:"1px solid #ECECEC",

                borderRadius:3,

                transition:"0.3s",

                height:"100%",

                "&:hover":{

                    transform:"translateY(-4px)",

                    boxShadow:5

                }

            }}

        >

            <Box

                display="flex"

                justifyContent="space-between"

                alignItems="center"

            >

                <Box>

                    <Typography

                        variant="body2"

                        color="text.secondary"

                    >

                        {title}

                    </Typography>

                    <Typography

                        variant="h3"

                        fontWeight="bold"

                        sx={{

                            color

                        }}

                    >

                        {value}

                    </Typography>

                </Box>

                {icon}

            </Box>

        </Paper>

    );

}

export default function ValidationSummary({ report }) {

    if(!report){

        return(

            <Card sx={{height:"100%"}}>

                <CardContent>

                    <Typography

                        variant="h5"

                        fontWeight="bold"

                    >

                        Validation Summary

                    </Typography>

                    <Typography

                        mt={1}

                        color="text.secondary"

                    >

                        Upload a dataset to view validation statistics.

                    </Typography>

                </CardContent>

            </Card>

        );

    }

    const validation=report.data_validation;

    return(

        <Card sx={{height:"100%"}}>

            <CardContent>

                <Typography

                    variant="h5"

                    fontWeight="bold"

                >

                    Validation Summary

                </Typography>

                <Typography

                    color="text.secondary"

                    mb={3}

                >

                    Data quality issues detected

                </Typography>

                <Grid container spacing={2}>

                    <Grid item xs={6}>

                        <StatBox

                            title="Duplicates"

                            value={validation.duplicates.length}

                            color="#1976D2"

                            icon={

                                <ContentCopyIcon

                                    sx={{

                                        color:"#1976D2",

                                        fontSize:40

                                    }}

                                />

                            }

                        />

                    </Grid>

                    <Grid item xs={6}>

                        <StatBox

                            title="Missing Values"

                            value={validation.missing_values.length}

                            color="#FB8C00"

                            icon={

                                <WarningAmberIcon

                                    sx={{

                                        color:"#FB8C00",

                                        fontSize:40

                                    }}

                                />

                            }

                        />

                    </Grid>

                    <Grid item xs={6}>

                        <StatBox

                            title="Invalid Emails"

                            value={validation.invalid_emails.length}

                            color="#E53935"

                            icon={

                                <EmailIcon

                                    sx={{

                                        color:"#E53935",

                                        fontSize:40

                                    }}

                                />

                            }

                        />

                    </Grid>

                    <Grid item xs={6}>

                        <StatBox

                            title="Negative Values"

                            value={validation.negative_values.length}

                            color="#8E24AA"

                            icon={

                                <TrendingDownIcon

                                    sx={{

                                        color:"#8E24AA",

                                        fontSize:40

                                    }}

                                />

                            }

                        />

                    </Grid>

                    <Grid item xs={12}>

                        <StatBox

                            title="Future Dates"

                            value={validation.future_dates.length}

                            color="#43A047"

                            icon={

                                <EventBusyIcon

                                    sx={{

                                        color:"#43A047",

                                        fontSize:40

                                    }}

                                />

                            }

                        />

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}