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
              <Grid item xs={12}>
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
                    Comming Soon
                  </Typography>
                </Grid>
              </Grid>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}
