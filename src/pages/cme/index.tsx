import themeColor from "@/components/constant/color";
import Layout from "@/components/design/layout";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import ComingSoon from '@/components/widgets/ComingSoon';
import { isTesting } from "@/components/constant/isTesting";
function CME() {
  return (
    <Layout banner>
      {isTesting?<ComingSoon/>:(<Grid
        mt={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid py={3} container maxWidth={"lg"}>
          <Grid mb={4} item xs={12} display={"flex"} justifyContent={"center"}>
            <Typography fontWeight={"bold"} variant="h6">
              CME Accredited
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} display={"flex"} gap={4}>
            <Grid px={2}>
              <Typography fontWeight={"bold"} variant="h6">
                Session Attendance Scanning
              </Typography>
              <List sx={{ listStyleType: "disc", px: 2 }}>
                <ListItem sx={{ display: "list-item", maxWidth: 500 }}>
                  <ListItemText
                    primary="Attendance to the sessions will be monitored through scanning of
                the barcode on your conference badge at the entrance of the
                session hall."
                  ></ListItemText>
                </ListItem>
                <ListItem sx={{ display: "list-item", maxWidth: 500 }}>
                  <ListItemText primary="CME credits awarded will be dependent on session attendance."></ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              component={"img"}
              src={"/static/images/cme.webp"}
              height={200}
            />
          </Grid>
          <Grid item xs={12} md={12} display={"flex"} justifyContent={"center"}>
            <Divider
              sx={{
                my: 3,
                mx: 4,
                p: 0.1,
                width: 1,
                maxWidth: 800,
                backgroundColor: themeColor.borderColor,
              }}
              orientation="horizontal"
              flexItem
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid px={2}>
              <Typography fontWeight={"bold"} variant="h6">
                Instructions for Claiming CME Certificates
              </Typography>
            </Grid>
            <List sx={{ listStyleType: "disc" }}>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="A survey in the form of an online questionnaire will be emailed post the conference to be completed by delegates.                  "></ListItemText>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="The CME Certificate will be e-mailed to the registered email address upon completion of the online questionnaire."></ListItemText>
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Please ensure that the email provided at the time of registration is accurate, otherwise certificate of attendance and the CME certificate may not be received."></ListItemText>
              </ListItem>

              <ListItem sx={{ display: "list-item" }}>
                <ListItemText primary="Delegates will be able to check that their email is accurate at the onsite registration desks during operational hours."></ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>)}
    </Layout>
  );
}

export default CME;
