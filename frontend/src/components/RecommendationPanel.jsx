import {
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Box,
  Chip,
  Paper
} from "@mui/material";

import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function getPriority(text) {

    const t=text.toLowerCase();

    if(
        t.includes("duplicate")||
        t.includes("invalid")||
        t.includes("negative")
    ){

        return{

            color:"error",

            label:"High",

            icon:<ErrorIcon color="error"/>

        };

    }

    if(
        t.includes("missing")||
        t.includes("future")||
        t.includes("outlier")
    ){

        return{

            color:"warning",

            label:"Medium",

            icon:<WarningAmberIcon color="warning"/>

        };

    }

    return{

        color:"success",

        label:"Low",

        icon:<CheckCircleIcon color="success"/>

    };

}

export default function RecommendationPanel({ report }) {

    if(!report){

        return(

            <Card sx={{height:"100%"}}>

                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                    >

                        AI Recommendations

                    </Typography>

                    <Typography
                        color="text.secondary"
                        mt={1}
                    >

                        Upload a dataset to receive intelligent recommendations.

                    </Typography>

                    <Box

                        textAlign="center"

                        mt={8}

                    >

                        <TipsAndUpdatesIcon

                            sx={{

                                fontSize:90,

                                color:"#D1D5DB"

                            }}

                        />

                    </Box>

                </CardContent>

            </Card>

        );

    }

    const recommendations=report.recommendations||[];

    return(

        <Card sx={{height:"100%"}}>

            <CardContent>

                <Stack

                    direction="row"

                    spacing={2}

                    alignItems="center"

                >

                    <TipsAndUpdatesIcon

                        color="warning"

                        sx={{fontSize:45}}

                    />

                    <Box>

                        <Typography

                            variant="h5"

                            fontWeight="bold"

                        >

                            AI Recommendations

                        </Typography>

                        <Typography

                            color="text.secondary"

                        >

                            Suggested improvements for your dataset

                        </Typography>

                    </Box>

                </Stack>

                <Divider sx={{my:3}}/>

                {

                    recommendations.length===0 ?

                    <Paper

                        sx={{

                            p:4,

                            bgcolor:"#F0FDF4",

                            borderRadius:3

                        }}

                    >

                        <Typography>

                            🎉 Great! Your dataset looks healthy.

                        </Typography>

                    </Paper>

                    :

                    recommendations.map((item,index)=>{

                        const p=getPriority(item);

                        return(

                            <Paper

                                key={index}

                                sx={{

                                    p:2,

                                    mb:2,

                                    borderRadius:3,

                                    border:"1px solid #ECECEC",

                                    transition:"0.25s",

                                    "&:hover":{

                                        boxShadow:4,

                                        transform:"translateY(-2px)"

                                    }

                                }}

                            >

                                <Stack

                                    direction="row"

                                    justifyContent="space-between"

                                    alignItems="center"

                                >

                                    <Stack

                                        direction="row"

                                        spacing={2}

                                        alignItems="center"

                                    >

                                        {p.icon}

                                        <Typography>

                                            {item}

                                        </Typography>

                                    </Stack>

                                    <Chip

                                        label={p.label}

                                        color={p.color}

                                    />

                                </Stack>

                            </Paper>

                        );

                    })

                }

                <Paper

                    sx={{

                        mt:3,

                        p:2,

                        bgcolor:"#EEF6FF",

                        borderRadius:3

                    }}

                >

                    <Typography
                        fontWeight="bold"
                        mb={1}
                    >

                        💡 AI Insight

                    </Typography>

                    <Typography
                        color="text.secondary"
                    >

                        Fixing high-priority issues first usually increases
                        the overall quality score much faster than addressing
                        formatting inconsistencies.

                    </Typography>

                </Paper>

            </CardContent>

        </Card>

    );

}