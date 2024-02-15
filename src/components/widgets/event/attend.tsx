import themeColor from "@/components/constant/color";
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

const Speciality = [
  "Endocrinologists",
  "Internists",
  "Cardiologists",
  "Nephrologists",
  "Family Medicine Physicians",
  "General Practitioners",
  "Dietitian",
  "Residents",
  "Nurses",
  "Medical Students",
  "Diabetes Educators",
];
function ShouldAttend() {
  return (
    <Grid
      mt={4}
      mb={1}
      py={4}
      width={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ backgroundColor: themeColor.blue.dark, px: { xs: 2, md: 2 } }}
    >
      <Grid container maxWidth={"xl"}>
        <Grid item xs={12} md={6} sx={{ my: { md: 4, xs: 1 }, px: 2 }}>
          <Typography
            color={"white"}
            textTransform={"uppercase"}
            fontWeight={"bold"}
            variant="h5"
          >
            Who Should Attend
          </Typography>
          <Divider
            sx={{
              mt: 3,
              width: 250,
              p: 0.6,
              backgroundColor: themeColor.primary.dark,
            }}
            orientation="horizontal"
            flexItem
          />
          <List
            sx={{ listStyleType: "disc", width: "100%", maxWidth: 360 }}
            aria-label="Speciality"
          >
            {Speciality.map((item, key) => {
              return (
                <ListItem
                  key={key}
                  disablePadding
                  sx={{ display: "list-item", color: "white" }}
                >
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      color: themeColor.white.dark,
                      fontWeight: "medium",
                      variant: "body1",
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ my: { md: 4, xs: 0 } }}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Box
            component={"img"}
            src={"/static/images/image-1.svg"}
            // width={350}
            // height={400}
            // maxWidth={350}
            sx={{ width: "100%", maxWidth: { md: "100%", xs: 350 } }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ShouldAttend;
