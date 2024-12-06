import themeColor from "@/components/constant/color";
import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { ClipLoader } from "react-spinners";

type PropType = {
  children?: ReactNode;
  banner?: string;
};
function Banner({ children, banner }: PropType) {
  console.log("banner",banner)
  return (
    <Grid sx={{ position: "relative", overflow: "hidden"}}>
      {banner ? (
        <>
          <Grid
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100vw", 
            height: "60vh", 
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover", 
            backgroundPosition: "center", 
            backgroundRepeat: "no-repeat", 
          }}
            // sx={{
            //   backgroundImage: `url(/static/images/banner-new.svg)`,
            //   backgroundSize: {  md: "cover", xs: "contain" }, 
            //   backgroundPosition: { md: "center", xs: "center" }, 
            //   backgroundRepeat: "no-repeat",
            //   width: "100%",
            //   height: { md: 650, xs: 550 }, 
            // }}
    //         sx={{
    //           position: "relative",
    // width: "100vw",
    // height: "60vh",
    // minWidth: "100%",
    // minHeight: "100%",
    // overflow: "hidden",
    //         }}
          >
            {/* <Box
      component="img"
      src="/static/images/banner-new.svg"
      alt="Banner Background"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover", // Prevents cropping
        zIndex: -1, // Pushes it to the background
        objectPosition: "center center",
        backgroundAttachment: "fixed"
      }}
    /> */}
            {/* <Box
              component="img"
              src="/static/images/writeup.png" 
              alt="Overlay Image"
              sx={{
                position: "absolute",
                top: "18%", 
                left: "50%",
                transform: "translate(-50%, 0)", 
                width: { md: "30%", xs: "50%" }, 
                height: "auto", 
              }}
            />
            <Box
              component="img"
              src="/static/images/360 logo.png"
              alt="Overlay Image"
              sx={{
                position: "absolute",
                top: "25%", 
                left: "22%",
                transform: "translate(-50%, 0)", 
                width: { md: "18%", xs: "50%" }, 
                height: "auto", 
              }}
            /> */}
          </Grid>
          {/* <Box
            component={"img"}
            width={"100%"}
            alt="Banner"
            sx={{
              objectFit: "contain",
              backgroundColor: themeColor.lightGreyColor,
            }}
            src={banner}
            minHeight={550}
          /> */}
          <Grid position={"absolute"} top={0} zIndex={1000} left={0} right={0}>
            <Grid pt={2}>{children}</Grid>
          </Grid>
          <Grid
            sx={{
              display: { xs: "none", md: "flex" },
              left: { lg: 100, md: 20, xs: 100 },
            }}
            position={"absolute"}
            bottom={100}
            right={100}
          >
            {/* <Grid>
              <Typography
                color={themeColor.blue.dark}
                fontWeight={"bold"}
                sx={{ fontSize: { lg: "4rem", md: "2.8rem", sm: "1.4rem" } }}
              >
                Diabetes 360:
              </Typography>
              <Typography
                color={themeColor.blue.dark}
                fontWeight={"bold"}
                sx={{ fontSize: { lg: "1.6rem", md: "1.1rem", sm: "1rem" } }}
              >
                Choices, Challenges, and Change
              </Typography>
              <Divider
                sx={{
                  width: { lg: 400, md: 280,sm:200 },
                  p: 0.4,
                  backgroundColor: themeColor.secondary.dark,
                }}
                orientation="horizontal"
                flexItem
              />
            </Grid> */}
          </Grid>
          <Grid
            sx={{ display: { xs: "flex", md: "none" } }}
            position={"absolute"}
            bottom={0}
            top={0}
            left={0}
            right={0}
            display={"flex"}
            pl={2}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            {/* <Grid mt={3}>
              <Typography
                color={themeColor.blue.dark}
                fontWeight={"bold"}
                variant="h4"
              >
                Diabetes 360:
              </Typography>
              <Typography
                color={themeColor.blue.dark}
                fontWeight={"bold"}
                variant="body2"
              >
                Choices, Challenges, and Change
              </Typography>
              <Divider
                sx={{
                  width: 215,
                  p: 0.3,
                  mt: 0.2,
                  backgroundColor: themeColor.secondary.dark,
                }}
                orientation="horizontal"
                flexItem
              />
            </Grid> */}
          </Grid>
        </>
      ) : (
        <Grid>
          <Box
            position={"absolute"}
            top={0}
            bottom={0}
            left={0}
            right={0}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <ClipLoader />
          </Box>
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={550}
          ></Skeleton>
        </Grid>
      )}
    </Grid>
  );
}

export default Banner;
