import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

export default function ColumnProfileSection({ report }) {

  if (!report) return null;

  const profile = report.statistics?.column_profile || {};

  return (

    <Card elevation={4}>

      <CardContent>

        <Typography
          variant="h5"
          gutterBottom
        >
          Column Profile
        </Typography>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Column</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Null %</TableCell>
              <TableCell>Unique</TableCell>
              <TableCell>Outliers</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {

              Object.entries(profile).map(

                ([column,data])=>(

                  <TableRow key={column}>

                    <TableCell>

                      {column}

                    </TableCell>

                    <TableCell>

                      {data.dtype}

                    </TableCell>

                    <TableCell>

                      {data.null_percentage}%

                    </TableCell>

                    <TableCell>

                      {data.unique}

                    </TableCell>

                    <TableCell>

                      {data.outlier_count}

                    </TableCell>

                  </TableRow>

                )

              )

            }

          </TableBody>

        </Table>

      </CardContent>

    </Card>

  );

}