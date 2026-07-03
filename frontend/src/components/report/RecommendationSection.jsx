import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function RecommendationSection({ report }) {

  if (!report) return null;

  const recommendations = report.recommendations || [];

  return (

    <Card elevation={4}>

      <CardContent>

        <Typography
          variant="h5"
          gutterBottom
        >
          Recommendations
        </Typography>

        {
          recommendations.length === 0 ?

          <Chip
            color="success"
            label="No recommendations. Dataset looks healthy."
          />

          :

          <List>

            {

              recommendations.map((item,index)=>(

                <ListItem key={index}>

                  <ListItemIcon>

                    <CheckCircleIcon color="primary"/>

                  </ListItemIcon>

                  <ListItemText

                    primary={item}

                  />

                </ListItem>

              ))

            }

          </List>

        }

      </CardContent>

    </Card>

  );

}