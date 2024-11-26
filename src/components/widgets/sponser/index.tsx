import themeColor from "@/components/constant/color";
import { routeConfig } from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import { SponsorType } from "@/types/props.types";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function Sponsors() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SponsorType[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.event.sponsors, null);
      if (res && res.status_code == 200) {
        setData(res.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const _render = (
    md: number,
    xs: number,
    url: string,
    height: number,
    alt: string
  ) => {
    return (
      <Grid
        item
        md={md}
        xs={xs}
        my={4}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          component={"img"}
          height={{ md: height, xs: height * 0.8 }}
          src={url}
          alt={alt}
          sx={{
            objectFit: "contain",
            objectPosition: "center",
            imageRendering: "auto", // or 'pixelated'
          }}
        />
      </Grid>
    );
  };

  // useEffect(() => {
  //   loadData();
  // }, []);
  return (
    <Grid
      container
      sx={{
        minHeight: 300,
        width: 1,
        backgroundImage: `url("/static/images/sponsors_bg.png")`,
        backgroundSize: "cover",
      }}
    >
      <Grid
        width={1}
        flexDirection={"column"}
        display={"flex"}
        gap={2}
        alignItems={"center"}
        // justifyContent={"center"}
      >
        <Typography
          variant="h5"
          textTransform={"uppercase"}
          fontWeight={"bold"}
          color={themeColor.blue.dark}
        >
          Sponsors
        </Typography>
        <Grid container maxWidth={"lg"} spacing={2}>
          {loading ? (
            <Grid
              width={1}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <ClipLoader color={themeColor.primary.dark} size={40} />
            </Grid>
          ) : (
            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={1}
            >
              <Grid mt={5} container maxWidth={"md"}>
                <Grid
                  item
                  md={12}
                  xs={12}
                  my={4}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid
                    position={"relative"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid position={"absolute"} left={{md:-200,xs:-120}}>
                      <Typography variant="h6" color={"#797979"}>Platinum Sponsor</Typography>
                    </Grid>
                    <Box
                      component={"img"}
                      height={{ md: 100, xs: 80 }}
                      src={"/static/sponsors/novo.png"}
                      alt={"NOVO"}
                      sx={{
                        objectFit: "contain",
                        objectPosition: "center",
                        imageRendering: "auto", // or 'pixelated'
                      }}
                    />
                  </Grid>
                </Grid>
                {_render(6, 6, "/static/sponsors/merck.png", 25, "Merck")}
                {_render(6, 6, "/static/sponsors/astra.png", 50, "Astra")}
                {_render(4, 6, "/static/sponsors/abbott.png", 40, "abbott")}
                {_render(4, 6, "/static/sponsors/boe.png", 50, "boe")}
                {_render(4, 6, "/static/sponsors/servier.png", 50, "servier")}
                {_render(4, 6, "/static/sponsors/algor.png", 32, "algor")}
                {_render(4, 6, "/static/sponsors/dexcom.png", 23, "dexcom")}
                {_render(4, 6, "/static/sponsors/allm.png", 40, "allm")}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Sponsors;
