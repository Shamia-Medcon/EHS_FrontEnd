import themeColor from "@/components/constant/color";
import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { ClipLoader } from "react-spinners";

type PropType = {
  children?: ReactNode;
  banner?: string;
};
function Banner({ children, banner }: PropType) {
  return (
    <Grid sx={{ position: "relative" }}>
      {banner ? (
        <>
          <Grid
            sx={{
              backgroundImage: `url(${banner})`,
              backgroundSize: { md: "cover", xs: "cover" },
              backgroundPosition: { md: "90% 0%", xs: "90% 0%" },
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: { md: 650, xs: 550 },
            }}
          ></Grid>
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
            <Grid>
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
            </Grid>
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
            <Grid mt={3}>
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
            </Grid>
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
