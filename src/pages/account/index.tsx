import themeColor from "@/components/constant/color";
import Layout from "@/components/design/layout";
import { useAuth } from "@/hooks/useAuth";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import QRCodeGenerator from '@/components/widgets/QrCode';
function Account() {
  const auth = useAuth();

  return (
    <Layout banner>
      <Grid
        mt={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid px={2} container maxWidth={"lg"}>
          <Grid
            item
            xs={12}
            mb={5}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              variant="h5"
              fontWeight={"bold"}
              color={themeColor.primary.dark}
            >
              Profile
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                auth.logout();
              }}
            >
              Logout
            </Button>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            sx={{ alignItems: { xs: "flex-start" } }}
          >
            <Grid>
              <Grid display={"flex"} alignItems={"center"}>
                <Typography
                  fontWeight={"bold"}
                  color={themeColor.blue.dark}
                  variant="subtitle1"
                  width={180}
                >
                  Full Name:
                </Typography>
                <Typography variant="subtitle1" color={themeColor.blue.dark}>
                  {auth.user?.name ?? "-"}
                </Typography>
              </Grid>
              <Grid display={"flex"} alignItems={"center"}>
                <Typography
                  fontWeight={"bold"}
                  color={themeColor.blue.dark}
                  variant="subtitle1"
                  width={180}
                >
                  Email:
                </Typography>
                <Typography variant="subtitle1" color={themeColor.blue.dark}>
                  {auth.user?.email ?? "-"}
                </Typography>
              </Grid>
              <Grid display={"flex"} alignItems={"center"}>
                <Typography
                  fontWeight={"bold"}
                  color={themeColor.blue.dark}
                  variant="subtitle1"
                  width={180}
                >
                  Member Type:
                </Typography>
                <Typography variant="subtitle1" color={themeColor.blue.dark}>
                  {auth.user?.memberType ?? "-"}
                </Typography>
              </Grid>
              <Grid display={"flex"} alignItems={"center"}>
                <Typography
                  fontWeight={"bold"}
                  color={themeColor.blue.dark}
                  variant="subtitle1"
                  width={180}
                >
                  Phone:
                </Typography>
                <Typography variant="subtitle1" color={themeColor.blue.dark}>
                  {auth.user?.phone ?? "-"}
                </Typography>
              </Grid>
              <Grid display={"flex"} alignItems={"center"}>
                <Typography
                  fontWeight={"bold"}
                  color={themeColor.blue.dark}
                  variant="subtitle1"
                  width={180}
                >
                  Job Title:
                </Typography>
                <Typography variant="subtitle1" color={themeColor.blue.dark}>
                  {auth.user?.jobTitle ?? "-"}
                </Typography>
              </Grid>
              <Grid>
              <Grid display={"flex"} alignItems={"center"}>
                <Typography
                  fontWeight={"bold"}
                  color={themeColor.blue.dark}
                  variant="subtitle1"
                  width={180}
                >
                  Hospital:
                </Typography>
                <Typography variant="subtitle1" color={themeColor.blue.dark}>
                  {auth.user?.hospital ?? "-"}
                </Typography>
              </Grid>
              <Grid display={"flex"} alignItems={"center"}>
                <Typography
                  fontWeight={"bold"}
                  color={themeColor.blue.dark}
                  variant="subtitle1"
                  width={180}
                >
                  Department:
                </Typography>
                <Typography variant="subtitle1" color={themeColor.blue.dark}>
                  {auth.user?.department ?? "-"}
                </Typography>
              </Grid>
              <Grid display={"flex"} alignItems={"center"}>
                <Typography
                  fontWeight={"bold"}
                  color={themeColor.blue.dark}
                  variant="subtitle1"
                  width={180}
                >
                  Bayanati Number:
                </Typography>
                <Typography variant="subtitle1" color={themeColor.blue.dark}>
                  {auth.user?.bayanati_number ?? "-"}
                </Typography>
              </Grid>
              <Grid display={"flex"} alignItems={"center"}>
                <Typography
                  fontWeight={"bold"}
                  color={themeColor.blue.dark}
                  variant="subtitle1"
                  width={180}
                >
                  Speciality:
                </Typography>
                <Typography variant="subtitle1" color={themeColor.blue.dark}>
                  {auth.user?.speciality ?? "-"}
                </Typography>
              </Grid>
              {auth.user?.memberType !== "External" && (
              <Grid display={"flex"} alignItems={"center"}>
                <Typography
                  fontWeight={"bold"}
                  color={themeColor.blue.dark}
                  variant="subtitle1"
                  width={180}
                >
                  Registration Code:
                </Typography>
                <Typography variant="subtitle1" color={themeColor.blue.dark}>
                  {auth.user?.code ?? "-"}
                </Typography>
              </Grid>
              
              )}
              
            </Grid>
            </Grid>
          </Grid>
          
          <Grid
            item
            md={6}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            sx={{ alignItems: { md: "center", xs: "center" } }}
          >
            <QRCodeGenerator value={auth.user?.email ?? "-"} />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Account;
