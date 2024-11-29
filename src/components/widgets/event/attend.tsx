import themeColor from "@/components/constant/color";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
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
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        backgroundColor: themeColor.primary.dark,
      }}
    >
      {/* Left Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          padding: { xs: 2, md: 7 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          
          // paddingLeft:"20px"
          // ,
        }}
      >
        <Typography
          color="white"
          textTransform="uppercase"
          fontWeight="bold"
          variant="h5"
          fontSize={35}
          
        >
          Who Should Attend
        </Typography>

        <List
          sx={{
            // alignContent: 'center',
            listStyleType: "none",
            color: "white",
            marginTop: 2,
            
          }}
        >
          {Speciality.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "list-item",
                padding: 0,
              }}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  color: themeColor.white.dark,
               
                  variant: "body1",
                  fontSize: 25,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Right Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          padding: 0,
        }}
      >
        <Box
          component="img"
          src={
            isMobile
              ? "/static/images/SVG Mobile Image.svg"
              : "/static/images/PNG DESKTOP IMAGE_noborder.png"
          }
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures the image fills the space
            display: "block",
          }}
        />
      </Grid>
    </Grid>
  );
}

export default ShouldAttend;
