import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Paper,
  Chip,
  Button,
  TextField,
  Stack,
  Avatar,
  Box,
  InputAdornment
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function statusColor(status) {

    switch (status) {

      case "Healthy":
        return "success";

      case "Warning":
        return "warning";

      default:
        return "error";

    }

}

function scoreColors(score) {

    if (score >= 80) {
        return { bg: "#DCFCE7", color: "#16A34A" };
    }

    if (score >= 60) {
        return { bg: "#FFEDD5", color: "#EA580C" };
    }

    return { bg: "#FEE2E2", color: "#DC2626" };

}

export default function HistoryTable({ history = [] }) {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = history.filter(item =>
    item.filename.toLowerCase().includes(search.toLowerCase())
  );

  const rows = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (

    <Card>

      <CardContent>

        <Stack

          direction="row"

          justifyContent="space-between"

          alignItems="center"

          sx={{ mb: 3 }}

        >

          <Box>

            <Typography
              variant="h6"
            >
              Recent Reports
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Your recently analyzed datasets
            </Typography>

          </Box>

          <TextField

            size="small"

            placeholder="Search dataset..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            sx={{width:300}}

            slotProps={{

              input: {

                startAdornment:(

                  <InputAdornment position="start">

                    <SearchIcon fontSize="small" sx={{ color: "#9CA3AF" }} />

                  </InputAdornment>

                )

              }

            }}

          />

        </Stack>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border:"1px solid #E5E7EB",
            borderRadius:3
          }}
        >

          <Table stickyHeader>

            <TableHead>

              <TableRow

                sx={{

                  "& th": {

                    background: "#F9FAFB",

                    color: "#6B7280",

                    fontWeight: 700,

                    fontSize: 13,

                    borderBottom: "1px solid #E5E7EB"

                  }

                }}

              >

                <TableCell>Dataset</TableCell>

                <TableCell>Score</TableCell>

                <TableCell>Status</TableCell>

                <TableCell>Date</TableCell>

                <TableCell align="center">

                  Actions

                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {

                rows.map(item=>{

                  const sc = scoreColors(item.quality_score);

                  return (

                  <TableRow

                    hover

                    key={item.report_id}

                  >

                    <TableCell>

                      <Stack

                        direction="row"

                        spacing={2}

                        alignItems="center"

                      >

                        <Avatar
                          variant="rounded"
                          sx={{
                            bgcolor:"#EFF6FF",
                            width: 36,
                            height: 36,
                            borderRadius: "10px"
                          }}
                        >

                          <DescriptionIcon fontSize="small" color="primary"/>

                        </Avatar>

                        <Typography sx={{ fontWeight: 600, fontSize: 14 }}>

                          {item.filename}

                        </Typography>

                      </Stack>

                    </TableCell>

                    <TableCell>

                      <Chip

                        label={`${item.quality_score}%`}

                        sx={{

                          bgcolor: sc.bg,

                          color: sc.color,

                          fontWeight: 700

                        }}

                      />

                    </TableCell>

                    <TableCell>

                      <Chip

                        label={item.status}

                        color={statusColor(item.status)}

                        variant="outlined"

                      />

                    </TableCell>

                    <TableCell>

                      <Stack

                        direction="row"

                        spacing={1}

                        alignItems="center"

                      >

                        <CalendarMonthIcon
                          fontSize="small"
                          sx={{ color: "#9CA3AF" }}
                        />

                        <Typography variant="body2" color="text.secondary">

                          {

                            item.generated_at

                            ?

                            new Date(

                              item.generated_at

                            ).toLocaleDateString()

                            :

                            "-"

                          }

                        </Typography>

                      </Stack>

                    </TableCell>

                    <TableCell align="center">

                      <Stack

                        direction="row"

                        spacing={1}

                        justifyContent="center"

                      >

                        <Button

                          size="small"

                          variant="outlined"

                          startIcon={<VisibilityIcon fontSize="small" />}

                          onClick={()=>

                            navigate(

                              `/report/${item.report_id}`

                            )

                          }

                        >

                          View Report

                        </Button>

                        {

                          item.pdf_s3_url &&

                          <Button

                            size="small"

                            color="error"

                            variant="outlined"

                            startIcon={<PictureAsPdfIcon fontSize="small" />}

                            onClick={()=>

                              window.open(

                                item.pdf_s3_url,

                                "_blank"

                              )

                            }

                          >

                            PDF

                          </Button>

                        }

                      </Stack>

                    </TableCell>

                  </TableRow>

                  );

                })

              }

            </TableBody>

          </Table>

        </TableContainer>

        <TablePagination

          component="div"

          page={page}

          count={filtered.length}

          rowsPerPage={rowsPerPage}

          onPageChange={(e,newPage)=>setPage(newPage)}

          rowsPerPageOptions={[5,10,20]}

          onRowsPerPageChange={(e)=>{

            setRowsPerPage(parseInt(e.target.value));

            setPage(0);

          }}

        />

      </CardContent>

    </Card>

  );

}