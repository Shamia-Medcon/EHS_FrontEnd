import { Box, Grid } from "@mui/material";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import ResponsiveAppBar from "../header/gallery-header";
import Banner from "@/components/widgets/banner";
import { EventType } from "@/types/props.types";
import CustomMenu from "../header/menu";
import Footer from "../footer";
import { useRouter } from "next/router";
import { routeConfig } from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import Sponser from "@/components/widgets/sponser";

type PropType = {
  children: ReactNode;
  banner: boolean;
  year23?:boolean;
  year24?:boolean
};
function Layout({ children, banner, year23,year24  }: PropType) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<EventType>();
  const image =[
    "/static/images/ehs 2023 logo.png",
    "/static/images/ehs 2024 logo.png",
    "/static/images/ehs 2023 logo.png",
    "/static/images/ehs 2024 logo.png"
  ]

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.event.live, null);
      if (res && res.status_code == 200) {
        setEvent(res.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    loadData();
  }, [router]);


  const logoImage = year23
    ? "/static/images/ehs 2023 logo.png"
    : year24
    ? "/static/images/ehs 2024 logo.png"
    : "/static/images/default-logo.png";

  const dateImage = year23
    ? "/static/images/gallery-date-2023.png"
    : year24
    ? "/static/images/gallery-date-2024.png"
    : "/static/images/default-date.png";

  console.log("imagesss",image)

  return (
    <Fragment>
      <Grid
        mb={10}
        container
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid width={1} maxWidth={1920}>
          <Grid
            position={"relative"}
            width={1}
            sx={{ height: { md: 50, xs: "auto" } }}
          >
            <Box
              component="img"
              src="/static/images/ehs-gallery-banner.png"
              alt="EHS Gallery Banner"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid
            container
            width={1}
            sx={{
              height: "30vh", // Full viewport height for centering
              display: "flex",
              justifyContent: "center", // Horizontally center
              alignItems: "center", // Vertically center
            }}
          >
            <Box
              component="img"
              src={logoImage}
              alt="EHS 2023 Logo"
              sx={{
                width: "20%", // Adjust width to reduce size
                height: "auto", // Maintain aspect ratio
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid
            container
            width={1}
            sx={{
              height: "20vh", // Full viewport height for centering
              display: "flex",
              justifyContent: "center", // Horizontally center
              alignItems: "center", // Vertically center
            }}
          >
            <Box
              component="img"
              src={dateImage}
              alt="EHS 2023 Logo"
              sx={{
                width: "50%", // Adjust width to reduce size
                height: "auto", // Maintain aspect ratio
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid
            container
            width={1}
            sx={{
              minHeight: "10vh", // Full viewport height for centering
              display: "flex",
              justifyContent: "center", // Horizontally center
              alignItems: "center", // Vertically center
              flexWrap: "wrap",
            }}
          >
            {image.map((image, index) => (
        <Box
          key={index}
          m={2}
          border={1}
          borderRadius={5}
          component="img"
          src={image}
          sx={{
            width: 800,
            height: "auto",
            objectFit: "cover",
            display: "block",
          }}
        />
      ))}
       </Grid>
        </Grid>
      </Grid>
      <Sponser />
      <Footer />
    </Fragment>
  );
}

export default Layout;
