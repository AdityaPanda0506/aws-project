import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function IssueAccordion({ title, issues }) {

  return (

    <Accordion>

      <AccordionSummary expandIcon={<ExpandMoreIcon />}>

        <Typography fontWeight="bold">

          {title}

          <Chip
            label={issues.length}
            color={issues.length ? "error" : "success"}
            size="small"
            sx={{ ml: 2 }}
          />

        </Typography>

      </AccordionSummary>

      <AccordionDetails>

        {

          issues.length === 0 ?

          <Typography color="green">

            No issues found 🎉

          </Typography>

          :

          <Table size="small">

            <TableHead>

              <TableRow>

                <TableCell>Row</TableCell>

                <TableCell>Column</TableCell>

                <TableCell>Value</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {

                issues.map((issue,index)=>(

                  <TableRow key={index}>

                    <TableCell>

                      {issue.row ?? "-"}

                    </TableCell>

                    <TableCell>

                      {issue.column ?? "-"}

                    </TableCell>

                    <TableCell>

                      {

                        issue.value !== undefined

                        ? String(issue.value)

                        : "-"

                      }

                    </TableCell>

                  </TableRow>

                ))

              }

            </TableBody>

          </Table>

        }

      </AccordionDetails>

    </Accordion>

  );

}

export default function ValidationSection({ report }) {

  if(!report) return null;

  const validation = report.data_validation;

  return(

    <Card elevation={4}>

      <CardContent>

        <Typography
          variant="h5"
          gutterBottom
        >

          Validation Results

        </Typography>

        <IssueAccordion

          title="Duplicate Rows"

          issues={validation.duplicates}

        />

        <IssueAccordion

          title="Missing Values"

          issues={validation.missing_values}

        />

        <IssueAccordion

          title="Invalid Emails"

          issues={validation.invalid_emails}

        />

        <IssueAccordion

          title="Negative Values"

          issues={validation.negative_values}

        />

        <IssueAccordion

          title="Future Dates"

          issues={validation.future_dates}

        />

      </CardContent>

    </Card>

  );

}