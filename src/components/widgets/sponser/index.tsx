import themeColor from "@/components/constant/color";
import { routeConfig } from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import { SponsorType } from "@/types/props.types";
import { Grid, Typography } from "@mui/material";
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

  useEffect(() => {
    loadData();
  }, []);
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
      {/* <Grid
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
            <>
              {data.map((item, key) => {
                return (
                  <Grid key={key} item md={3} xs={12}>
                    <Grid
                      width={150}
                      minHeight={150}
                      border={1}
                      sx={{ backgroundImage: `url(${item.url})` }}
                    ></Grid>
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
      </Grid> */}
    </Grid>
  );
}

export default Sponsors;
