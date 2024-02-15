import { EventType } from "@/types/props.types";
import { Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import themeColor from "@/components/constant/color";
import { LuCalendarDays } from "react-icons/lu";
import { GoLocation } from "react-icons/go";
import Countdown from "./timer";
import WelcomeMessage from "./message";
import Link from "next/link";

type PropType = {
  event: EventType;
};
function EventDetails({ event }: PropType) {
  return (
    <Grid container maxWidth={"lg"}>
      <Grid item md={6} xs={6}>
        <Grid
          display={"flex"}
          sx={{
            flexDirection: { md: "row", xs: "column" },
            gap: { md: 2, xs: 0 },
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <LuCalendarDays size={50} color={themeColor.blue.dark} />
          <Link
            href={"https://medcon.ae/ical/ehs_2024/ehs.ics"}
            target="_blank"
          >
            <Button sx={{ textTransform: "inherit" }}>
              <Grid sx={{ py: { md: 4, xs: 0 } }}>
                <Typography
                  textAlign={"left"}
                  sx={{ fontSize: { md: 18, xs: 14 } }}
                  color={themeColor.blue.dark}
                  fontWeight={"bold"}
                  dangerouslySetInnerHTML={{ __html: event.date }}
                />
                <Typography
                  textAlign={"left"}
                  sx={{ fontSize: { md: 18, xs: 14 } }}
                  color={themeColor.primary.dark}
                  dangerouslySetInnerHTML={{ __html: event.days }}
                />
              </Grid>
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid item md={6} xs={6}>
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            flexDirection: { md: "row", xs: "column" },
            gap: { md: 2, xs: 0 },
          }}
        >
          <GoLocation size={50} color={themeColor.blue.dark} />
          <Link href={event.map} target="_blank">
            <Button sx={{ textTransform: "inherit" }}>
              <Grid sx={{ py: { md: 4, xs: 0 } }}>
                <Typography
                  textAlign={"left"}
                  sx={{ fontSize: { md: 18, xs: 14 } }}
                  color={themeColor.blue.dark}
                  fontWeight={"bold"}
                  dangerouslySetInnerHTML={{ __html: event.hotel }}
                />
                <Typography
                  textAlign={"left"}
                  sx={{ fontSize: { md: 18, xs: 14 } }}
                  color={themeColor.primary.dark}
                  dangerouslySetInnerHTML={{ __html: event.address }}
                />
              </Grid>
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Divider
        sx={{ width: 1, color: themeColor.secondary.dark }}
        flexItem
        orientation="horizontal"
      />
      <Grid item md={12} xs={12}>
        <Countdown target={event.start_date} />
      </Grid>
      <Divider
        sx={{ width: 1, color: themeColor.secondary.dark }}
        flexItem
        orientation="horizontal"
      />

      <WelcomeMessage event={event} />
      <Divider
        sx={{ width: 1, color: themeColor.secondary.dark }}
        flexItem
        orientation="horizontal"
      />
    </Grid>
  );
}

export default EventDetails;
