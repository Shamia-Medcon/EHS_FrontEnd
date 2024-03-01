import themeColor from "@/components/constant/color";
import { routeConfig } from "@/components/constant/route";
import Layout from "@/components/design/layout";
import { get, put } from "@/handler/api.handler";
import { AgendaDetailsType, AgendaType } from "@/types/props.types";
import {
  Divider,
  Grid,
  Table,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { List, ListItem, ListItemText } from "@mui/material";
import { post } from "@/handler/api.handler";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

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
// const event_dates = [
//   { value: 27, id: 1 },
//   { value: 28, id: 2 },
// ];
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const w1Objectives = [
  "Explain the key concepts of designing an effective diabetes technology service",
  "Recognize essential data required for prompt and efficient interpretation of glucose downloads",
  "Discuss and debate the advantages and disadvantages of different types of insulin pumps available",
];
const w1Target_audience = ["Endocrinologists", "Internal Medicine"];
const w1Num_participants = [
  "20 -25 HCPs",
  "Pre-conference registration is required",
];
const w2Objectives = [
  "Review latest guidelines for insulin initiation and titration",
  "Understanding the landscape of available insulin therapies",
  "Practical guidance for clinical application in real world",
];
const w2Target_audience = [
  "Family medicine",
  "General physicians",
  "Primary care physicians",
];
const w2Num_participants = [
  "20 -25 HCPs",
  "Pre-conference registration is required",
];
const w3Objectives = [
  "Explore current evidence-based strategies for the diagnosis and prevention of cardio-metabolic disorders",
  "Enhance participants' ability to critically analyse and interpret cardio-metabolic screening data, including diagnostic tests and biomarkers",
  "Identify multifaceted effects of SGLT2 inhibitors which contribute to their overall cardiometabolic advantages",
];
const w3Target_audience = [
  "Internal Medicine",
  "Family medicine",
  "General physicians",
];
const w3Num_participants = [
  "20 -25 HCPs",
  "Pre-conference registration is required",
];
const w4Objectives = [
  "Recognize most appropriate lipid-lowering therapies recommended by guidelines for patients with diabetes",
  "Implement practical approaches to monitor lipid levels and evaluate treatment efficacy in clinical settings to enhance glycaemic outcomes",
];
const w4Target_audience = [
  "Family medicine",
  "General physicians",
  "Primary care physicians",
];
const w4Num_participants = [
  "20 -25 HCPs",
  "Pre-conference registration is required",
];
export default function Agenda() {
  const router = useRouter();
  const auth = useAuth();

  const [loading, setLoading] = useState(false);
  const [loadBooking, setLoadBooking] = useState(false);
  const [agendas, setAgendas] = useState<AgendaType[]>([]);
  const [selectedWorkshop1, setSelectedWorkshop1] = useState(null);
  const [selectedWorkshop2, setSelectedWorkshop2] = useState(null);
  const [bookings, setBookings] = useState<any>(null);

  const handleWorkshop1Selection = (event: any) => {
    setSelectedWorkshop1(event.target.value);
  };

  const handleWorkshop2Selection = (event: any) => {
    setSelectedWorkshop2(event.target.value);
  };

  async function fetchUserBookings() {
    try {
      const res = await get(
        `${routeConfig.pre_confrence.workshops}`,
        auth.user?.token
      );
      if (res && res.status_code == 200) {
        setBookings(res.data); // Update the bookings state
        if (res.data) {
          setSelectedWorkshop1(res.data.option_1);
          setSelectedWorkshop2(res.data.option_2);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user bookings:", error);
    }
  }

  const handleBooking = async () => {
    try {
      // Ensure the user is authenticated
      if (!auth?.user) {
        Swal.fire({
          title: "Error",
          text: "You must be registered and logged in to book workshops",
          icon: "error",
        });
        return;
      }

      // Check if at least one workshop is selected
      if (!selectedWorkshop1 && !selectedWorkshop2) {
        Swal.fire({
          title: "Error",
          text: "You must select at least one workshop to book.",
          icon: "error",
        });
        return; // Stop the booking process
      }

      // Prepare data for the API call
      const data = {
        option_1: selectedWorkshop1,
        option_2: selectedWorkshop2,
      };

      // Send workshop selection to the backend
      const response = await post(
        routeConfig.pre_confrence.workshops,
        data,
        auth?.user?.token
      );

      // Check if the response status code indicates success (200 OK)
      if (response && response.status_code === 200) {
        Swal.fire({
          title: "Congratulations!",
          text: "You have successfully booked your pre-conference workshops. Thank you!",
          icon: "success",
        }).then((result) => {
          router.replace("/");
        });
        // Reset selections after successful booking
        setSelectedWorkshop1(null);
        setSelectedWorkshop2(null);
      } else {
      }
    } catch (error: any) {
      if (error.response) {
        console.log("Error response:", error.response);
        // Assuming the server response includes a 'message' property with the error message
        const serverMessage =
          error.response.data.message ||
          "An error occurred while booking workshops. Please try again later.";
        Swal.fire({
          title: "Booking Error",
          text: serverMessage,
          icon: "error",
        }).then(() => {
          // Clear the selections after the popup is closed
          setSelectedWorkshop1(null);
          setSelectedWorkshop2(null);
        });
      } else {
        // If the error object does not have a response property, show a generic error message
        Swal.fire({
          title: "Booking Error",
          text: "An error occurred while booking workshops. Please try again later.",
          icon: "error",
        }).then(() => {
          // Clear the selections after the popup is closed
          setSelectedWorkshop1(null);
          setSelectedWorkshop2(null);
        });
      }
    }
  };

  const updateBooking = async () => {
    try {
      if (!auth?.user) {
        Swal.fire({
          title: "Error",
          text: "You must be registered and logged in to update bookings.",
          icon: "error",
        });
        return;
      }

      if (!selectedWorkshop1 && !selectedWorkshop2) {
        Swal.fire({
          title: "Error",
          text: "You must select at least one workshop to update.",
          icon: "error",
        });
        return;
      }

      const data = {
        option_1: selectedWorkshop1,
        option_2: selectedWorkshop2,
      };


      console.log(data);

      const response = await put(
        routeConfig.pre_confrence.workshops,
        data,
        auth?.user?.token
      );
      console.log(response);

      if (response && response.status_code === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your workshop booking has been updated.",
          icon: "success",
        }).then(() => {
          // Optionally, redirect or refresh the page
          router.replace("/");
        });
      } else {
        console.log("Error updating booking:", response);
      }
    } catch (error: any) {
      if (error.response) {
        console.log("Error response:", error.response);
        const serverMessage =
          error.response.data.message ||
          "An error occurred while updating bookings. Please try again later.";
        Swal.fire({
          title: "Update Error",
          text: serverMessage,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Update Error",
          text: "An error occurred while updating bookings. Please try again later.",
          icon: "error",
        });
      }
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.pre_confrence.preconfindex, null);
      if (res && res.status_code == 200) {
        // console.log(res.data);
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

  useEffect(() => {
    fetchUserBookings();
  }, [auth.user]);

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
            <Grid item xs={12}>
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
                  Pre-Conference Workshop Schedule
                </Typography>
                <Typography
                  variant="h6"
                  style={{ fontSize: 16 }}
                  color={themeColor.white.dark}
                >
                  26<sup>th</sup> April 2024
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow sx={{}}>
                      <StyledTableCell sx={{ flexGrow: 0.3 }} align="center">
                        Time
                      </StyledTableCell>
                      <StyledTableCell sx={{ flexGrow: 1 }} align="center">
                        SALL Meeting Room
                      </StyledTableCell>
                      <StyledTableCell sx={{ flexGrow: 0.3 }} align="center">
                        YANAS Meeting Room
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {agendas.map((item, key) => (
                      <StyledTableRow key={key}>
                        <StyledTableCell align="center" sx={{ flexGrow: 0.3 }}>
                          <Typography
                            sx={{
                              fontSize: { md: 16, xs: 12 },
                              width: { md: "auto", xs: 75 },
                            }}
                          >
                            {item.agenda_time}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell sx={{ flexGrow: 1 }}>
                          <Typography
                            // fontWeight={"bold"}
                            sx={{ fontSize: { md: 16, xs: 12 } }}
                            dangerouslySetInnerHTML={{
                              __html: item.title ? item.title : "",
                            }}
                          ></Typography>
                        </StyledTableCell>
                        <StyledTableCell
                        // align="center"
                        // sx={{
                        //   flexGrow: 0.3,
                        //   width: { md: "auto", xs: 75 },
                        // }}
                        >
                          <Typography
                            sx={{ fontSize: { md: 16, xs: 12 } }}
                            dangerouslySetInnerHTML={{
                              __html: item.subtitle ? item.subtitle : "",
                            }}
                          ></Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Typography
                variant="h6"
                color={themeColor.blue.dark}
                fontWeight={"bold"}
                align="center"
              >
                Pre-conference workshop overview
              </Typography>
            </Grid>
            <Grid item xs={12} padding={2}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography color={themeColor.blue.dark} fontWeight={"bold"}>
                    Workshop 1: Diabetes Management with Cutting-Edge Technology
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    color={themeColor.primary.dark}
                    fontSize={17}
                    fontWeight={"bold"}
                  >
                    Aim:
                  </Typography>
                  <Typography color={themeColor.blue.dark} fontSize={14}>
                    To equip healthcare professionals with advanced expertise in
                    diabetes technology
                  </Typography>

                  <Grid item sx={{ paddingTop: 2, paddingBottom: 2 }}>
                    <Typography
                      color={themeColor.primary.dark}
                      fontSize={17}
                      fontWeight={"bold"}
                    >
                      Workshop objectives:
                    </Typography>
                    <List sx={{ listStyleType: "disc", px: 2 }}>
                      {w1Objectives.map((item) => (
                        <ListItem key={item} sx={{ display: "list-item" }}>
                          <ListItemText
                            primary={item}
                            disableTypography
                            sx={{
                              color: themeColor.blue.dark,
                              fontSize: { xs: 12, sm: 14 },
                              lineHeight: {xs: 1.5, sm: 0},
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid xs={6} padding={2}>
                      <Typography
                        color={themeColor.primary.dark}
                        fontSize={17}
                        fontWeight={"bold"}
                      >
                        Target audience:
                      </Typography>
                      <List sx={{ listStyleType: "disc", px: 2 }}>
                        {w1Target_audience.map((item) => (
                          <ListItem key={item} sx={{ display: "list-item" }}>
                            <ListItemText
                              primary={item}
                              disableTypography
                              sx={{
                                color: themeColor.blue.dark,
                                fontSize: { xs: 12, sm: 14 },
                                lineHeight: {xs: 1.5, sm: 0},
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>

                    <Grid xs={6} padding={2}>
                      <Typography
                        color={themeColor.primary.dark}
                        fontSize={17}
                        fontWeight={"bold"}
                      >
                        No of Participants:
                      </Typography>
                      <List sx={{ listStyleType: "disc", px: 2 }}>
                        {w1Num_participants.map((item) => (
                          <ListItem key={item} sx={{ display: "list-item" }}>
                            <ListItemText
                              primary={item}
                              disableTypography
                              sx={{
                                color: themeColor.blue.dark,
                                fontSize: { xs: 12, sm: 14 },
                                lineHeight: {xs: 1.5, sm: 0},
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography color={themeColor.blue.dark} fontWeight={"bold"}>
                    Workshop 2: Insulin Therapy - Tactics and Guide to Target
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    color={themeColor.primary.dark}
                    fontSize={17}
                    fontWeight={"bold"}
                  >
                    Aim:
                  </Typography>
                  <Typography color={themeColor.blue.dark} fontSize={14}>
                    To empower HCPs with practical guide for insulin initiation
                    and titration strategies in patients with type 2 diabetes to
                    achieve their treatment targets
                  </Typography>

                  <Grid item xs={12} sm={6} md={4} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                    <Typography
                      color={themeColor.primary.dark}
                      fontSize={{ xs: 15, sm: 17 }}
                      fontWeight={"bold"}
                    >
                      Workshop objectives:
                    </Typography>
                    <List sx={{ listStyleType: "disc", px: 2 }}>
                      {w2Objectives.map((item) => (
                        <ListItem key={item} sx={{ display: "list-item" }}>
                          <ListItemText
                            primary={item}
                            disableTypography
                            sx={{
                              color: themeColor.blue.dark,
                              fontSize: { xs: 12, sm: 14 },
                              lineHeight: {xs: 1.5, sm: 0},
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid xs={6} padding={2}>
                      <Typography
                        color={themeColor.primary.dark}
                        fontSize={17}
                        fontWeight={"bold"}
                      >
                        Target audience:
                      </Typography>
                      <List sx={{ listStyleType: "disc", px: 2 }}>
                        {w2Target_audience.map((item) => (
                          <ListItem key={item} sx={{ display: "list-item" }}>
                            <ListItemText
                              primary={item}
                              disableTypography
                              sx={{
                                color: themeColor.blue.dark,
                                fontSize: { xs: 12, sm: 14 },
                                lineHeight: {xs: 1.5, sm: 0},
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>

                    <Grid xs={6} padding={2}>
                      <Typography
                        color={themeColor.primary.dark}
                        fontSize={17}
                        fontWeight={"bold"}
                      >
                        No of Participants:
                      </Typography>
                      <List sx={{ listStyleType: "disc", px: 2 }}>
                        {w2Num_participants.map((item) => (
                          <ListItem key={item} sx={{ display: "list-item" }}>
                            <ListItemText
                              primary={item}
                              disableTypography
                              sx={{
                                color: themeColor.blue.dark,
                                fontSize: { xs: 12, sm: 14 },
                                lineHeight: {xs: 1.5, sm: 0},
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography color={themeColor.blue.dark} fontWeight={"bold"}>
                    Workshop 3: Interdisciplinary Perspectives on
                    Cardio-Metabolic Health
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    color={themeColor.primary.dark}
                    fontSize={17}
                    fontWeight={"bold"}
                  >
                    Aim:
                  </Typography>
                  <Typography color={themeColor.blue.dark} fontSize={14}>
                    To promote interdisciplinary collaboration aimed at
                    effectively managing cardio-metabolic disorders through the
                    utilization of novel therapies
                  </Typography>

                  <Grid item sx={{ paddingTop: 2, paddingBottom: 2 }}>
                    <Typography
                      color={themeColor.primary.dark}
                      fontSize={17}
                      fontWeight={"bold"}
                    >
                      Workshop objectives:
                    </Typography>
                    <List sx={{ listStyleType: "disc", px: 2 }}>
                      {w3Objectives.map((item) => (
                        <ListItem key={item} sx={{ display: "list-item" }}>
                          <ListItemText
                            primary={item}
                            disableTypography
                            sx={{
                              color: themeColor.blue.dark,
                              fontSize: { xs: 12, sm: 14 },
                              lineHeight: {xs: 1.5, sm: 0},
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid xs={6} padding={2}>
                      <Typography
                        color={themeColor.primary.dark}
                        fontSize={17}
                        fontWeight={"bold"}
                      >
                        Target audience:
                      </Typography>
                      <List sx={{ listStyleType: "disc", px: 2 }}>
                        {w3Target_audience.map((item) => (
                          <ListItem key={item} sx={{ display: "list-item" }}>
                            <ListItemText
                              primary={item}
                              disableTypography
                              sx={{
                                color: themeColor.blue.dark,
                                fontSize: { xs: 12, sm: 14 },
                                lineHeight: {xs: 1.5, sm: 0},
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>

                    <Grid xs={6} padding={2}>
                      <Typography
                        color={themeColor.primary.dark}
                        fontSize={17}
                        fontWeight={"bold"}
                      >
                        No of Participants:
                      </Typography>
                      <List sx={{ listStyleType: "disc", px: 2 }}>
                        {w3Num_participants.map((item) => (
                          <ListItem key={item} sx={{ display: "list-item" }}>
                            <ListItemText
                              primary={item}
                              disableTypography
                              sx={{
                                color: themeColor.blue.dark,
                                fontSize: { xs: 12, sm: 14 },
                                lineHeight: {xs: 1.5, sm: 0},
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography color={themeColor.blue.dark} fontWeight={"bold"}>
                    Workshop 4: Mastering Hyperlipidaemia in T2D
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    color={themeColor.primary.dark}
                    fontSize={17}
                    fontWeight={"bold"}
                  >
                    Aim:
                  </Typography>
                  <Typography color={themeColor.blue.dark} fontSize={14}>
                    To gain valuable insights into effectively managing
                    hyperlipidaemia in patients with T2D to mitigate
                    cardiovascular risk
                  </Typography>

                  <Grid item sx={{ paddingTop: 2, paddingBottom: 2 }}>
                    <Typography
                      color={themeColor.primary.dark}
                      fontSize={17}
                      fontWeight={"bold"}
                    >
                      Workshop objectives:
                    </Typography>
                    <List sx={{ listStyleType: "disc", px: 2 }}>
                      {w4Objectives.map((item) => (
                        <ListItem key={item} sx={{ display: "list-item" }}>
                          <ListItemText
                            primary={item}
                            disableTypography
                            sx={{
                              color: themeColor.blue.dark,
                              fontSize: { xs: 12, sm: 14 },
                              lineHeight: {xs: 1.5, sm: 0},
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid xs={6} padding={2}>
                      <Typography
                        color={themeColor.primary.dark}
                        fontSize={17}
                        fontWeight={"bold"}
                      >
                        Target audience:
                      </Typography>
                      <List sx={{ listStyleType: "disc", px: 2 }}>
                        {w4Target_audience.map((item) => (
                          <ListItem key={item} sx={{ display: "list-item" }}>
                            <ListItemText
                              primary={item}
                              disableTypography
                              sx={{
                                color: themeColor.blue.dark,
                                fontSize: { xs: 12, sm: 14 },
                                lineHeight: {xs: 1.5, sm: 0},
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>

                    <Grid xs={6} padding={2}>
                      <Typography
                        color={themeColor.primary.dark}
                        fontSize={17}
                        fontWeight={"bold"}
                      >
                        No of Participants:
                      </Typography>
                      <List sx={{ listStyleType: "disc", px: 2 }}>
                        {w4Num_participants.map((item) => (
                          <ListItem key={item} sx={{ display: "list-item" }}>
                            <ListItemText
                              primary={item}
                              disableTypography
                              sx={{
                                color: themeColor.blue.dark,
                                fontSize: { xs: 12, sm: 14 },
                                lineHeight: {xs: 1.5, sm: 0},
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12} paddingTop={4} paddingBottom={4}>
              <Typography
                variant="h6"
                color={themeColor.blue.dark}
                fontWeight={"bold"}
                align="center"
              >
                Book your chosen workshops
              </Typography>
            </Grid>
            {loadBooking ? (
              <ClipLoader color={themeColor.primary.dark} size={40} />
            ) : (
              <>
                <Grid
                  item
                  xs={12}
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                    border: `1px solid ${themeColor.blue.dark}`,
                    overflow: "hidden",
                    alignItems: "center",
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                >
                  <Grid container spacing={4} justifyContent="center">
                    <Grid
                      item
                      xs={4}
                      sx={{ display: "flex", }}
                    >
                      <Typography
                        sx={{
                          color: themeColor.blue.dark,
                          varient: "h5",
                          fontWeight: "bold",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        15:00 – 16:30
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <RadioGroup
                        value={selectedWorkshop1}
                        onChange={handleWorkshop1Selection}
                        sx={{ flexDirection: "row",justifyContent: "space-between"	,flex: 1 }}
                      >
                        <FormControlLabel
                          value="Workshop 1"
                          name="option_1"
                          control={<Radio  />}
                          label="Workshop 1"
                          sx={{ color: themeColor.blue.dark }}
                        />
                    
                        <FormControlLabel
                          value="Workshop 2"
                          name="option_1"
                          control={<Radio />}
                          label="Workshop 2"
                          sx={{ color: themeColor.blue.dark }}
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                    border: `1px solid ${themeColor.blue.dark}`,
                    overflow: "hidden",
                    alignItems: "center",
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                >
                  <Grid container spacing={4} justifyContent="center">
                    <Grid
                      item
                      xs={4}
                      sx={{ display: "flex",  }}
                    >
                      <Typography
                        sx={{
                          color: themeColor.blue.dark,
                          varient: "h5",
                          fontWeight: "bold",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        17:00 – 18:30
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <RadioGroup
                        value={selectedWorkshop2}
                        onChange={handleWorkshop2Selection}
                        sx={{ flexDirection: "row",justifyContent: "space-between"	,flex: 1 }}
                      >
                        <FormControlLabel
                          value="Workshop 3"
                          name="option_2"
                          control={<Radio />}
                          label="Workshop 3"
                          sx={{ color: themeColor.blue.dark }}
                        />
                        <FormControlLabel
                          value="Workshop 4"
                          name="option_2"
                          control={<Radio />}
                          label="Workshop 4"
                          sx={{ color: themeColor.blue.dark }}
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  item
                  xs={12}
                  paddingTop={4}
                  paddingBottom={4}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={bookings ? updateBooking : handleBooking}
                    sx={{
                      backgroundColor: themeColor.secondary.dark,
                      px: { xs: 2, sm: 5, fontWeight: "bold" },
                    }}
                  >
                    {bookings ? "Update" : "Book Now"}
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}
