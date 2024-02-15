import { Box, Grid } from "@mui/material";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import ResponsiveAppBar from "../header";
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
};
function Layout({ children, banner }: PropType) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<EventType>();

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
            sx={{ height: { md: 650, xs: "auto" } }}
          >
            {banner ? (
              <Banner banner={event?.banner}>
                <ResponsiveAppBar logo={event?.logo} />
              </Banner>
            ) : null}
            <CustomMenu />
          </Grid>
          <Grid width={1} sx={{ mt: { md: 15, xs: 1 } }}>
            {children}
          </Grid>
        </Grid>
      </Grid>
      <Sponser />
      <Footer />
    </Fragment>
  );
}

export default Layout;
