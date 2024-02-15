import themeColor from "@/components/constant/color";
import { routeConfig } from "@/components/constant/route";
import Layout from "@/components/design/layout";
import ShouldAttend from "@/components/widgets/event/attend";
import EventDetails from "@/components/widgets/event/details";
import Gallery from "@/components/widgets/event/gallery";
import { get } from "@/handler/api.handler";
import { EventType } from "@/types/props.types";
import { Divider, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Home() {
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
    loadData();
  }, []);

  return (
    <Layout banner>
      <Grid
        mt={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        {loading ? (
          <ClipLoader color={themeColor.primary.dark} size={40} />
        ) : event ? (
          <>
            <EventDetails event={event} />
            <ShouldAttend />
            <Grid container maxWidth={"xl"}>
              <Grid item md={12} xs={12}>
                <Gallery />
              </Grid>
              <Divider
                sx={{ width: 1, color: themeColor.secondary.dark }}
                flexItem
                orientation="horizontal"
              />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Layout>
  );
}
