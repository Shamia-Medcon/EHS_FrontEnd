import themeColor from "@/components/constant/color";
import { routeConfig } from "@/components/constant/route";
import Layout from "@/components/design/layout";
import { get } from "@/handler/api.handler";
import { AgendaDetailsType, AgendaType } from "@/types/props.types";
import { Divider, Grid, Table, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: themeColor.secondary.dark,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "capitalize",
    border: "5px solid white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));
const event_dates =[
  { value: 27, id: 1 },
  { value: 28, id: 2 },
];
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Agenda() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [agendas, setAgendas] = useState<AgendaType[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.agenda.index, null);
      if (res && res.status_code == 200) {
        console.log(res.data);
        setAgendas(res.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout banner>
      <Grid
        mt={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {loading ? (
          <ClipLoader color={themeColor.primary.dark} size={40} />
        ) : (
          <Grid py={3} container maxWidth={"lg"}>
            <TableContainer>
              {agendas.map((item, key) => {
                return (
                  <Grid item xs={12} key={key}>
                    <Grid
                      width={1}
                      py={2}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Typography
                        variant="h5"
                        textAlign={"center"}
                        fontWeight={"bold"}
                        color={themeColor.primary.dark}
                      >
                        Preliminary Scientific Programme
                      </Typography>
                    </Grid>
                    <Grid
                      width={1}
                      py={2}
                      spacing={2}
                      display={"flex"}
                      flexDirection="column"
                      alignItems={"center"}
                      sx={{ backgroundColor: themeColor.secondary.dark }}
                    >
                      <Typography variant="h5" color={themeColor.white.dark}>
                        Agenda: Day {key + 1}
                      </Typography>
                      <Typography variant="h6" style={{fontSize: 16}} color={themeColor.white.dark}>
                        {event_dates[key].value}<sup>th</sup> April 2024
                      </Typography>
                    </Grid>
                    <Grid>
                      <Table aria-label="customized table">
                        <TableHead>
                          <TableRow sx={{}}>
                            <StyledTableCell
                              sx={{ flexGrow: 0.3 }}
                              align="center"
                            >
                              Time
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ flexGrow: 1 }}
                              align="center"
                            >
                              Topic
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{ flexGrow: 0.3 }}
                              align="center"
                            >
                              Speaker
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(item.details).map(([key1, row]) =>
                            row.map((cell: AgendaDetailsType, key2: number) =>
                              cell.type == "header" ? (
                                <StyledTableRow
                                  key={key2}
                                  sx={{
                                    backgroundColor: themeColor.primary.dark,
                                  }}
                                >
                                  <StyledTableCell
                                    colSpan={3}
                                    sx={{ flexGrow: 0.3 }}
                                  >
                                    <Typography
                                      variant="subtitle1"
                                      color={themeColor.white.dark}
                                      lineHeight={1.15}
                                    >
                                      {cell.title}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      color={themeColor.white.dark}
                                      lineHeight={1.5}
                                      fontWeight={"medium"}
                                    >
                                      {cell.subtitle}
                                    </Typography>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ) : (
                                <StyledTableRow key={key2}>
                                  <StyledTableCell
                                    align="center"
                                    sx={{ flexGrow: 0.3 }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: { md: 16, xs: 12 },
                                        width: { md: "auto", xs: 75 },
                                      }}
                                    >
                                      {cell.agenda_time}
                                    </Typography>
                                  </StyledTableCell>
                                  <StyledTableCell sx={{ flexGrow: 1 }}>
                                    <Typography
                                      fontWeight={"bold"}
                                      sx={{ fontSize: { md: 16, xs: 12 } }}
                                    >
                                      {cell.title}
                                    </Typography>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="center"
                                    sx={{
                                      flexGrow: 0.3,
                                      width: { md: "auto", xs: 75 },
                                    }}
                                  >
                                    <Typography
                                      sx={{ fontSize: { md: 16, xs: 12 } }}
                                    >
                                      {cell.subtitle}
                                    </Typography>
                                  </StyledTableCell>
                                </StyledTableRow>
                              )
                            )
                          )}
                        </TableBody>
                      </Table>
                    </Grid>
                    <Divider
                      sx={{
                        my: 3,
                        mx: 4,
                        p: 0.1,
                        backgroundColor: themeColor.blue.dark,
                      }}
                      orientation="vertical"
                      flexItem
                    />
                  </Grid>
                );
              })}
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}
