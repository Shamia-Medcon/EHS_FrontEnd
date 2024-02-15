import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box, Card, CardActions, CardContent, Grid } from "@mui/material";
import themeColor from "@/components/constant/color";

type PropsType = {
  target: string;
};
const Countdown = ({ target }: PropsType) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(target);
    const difference = targetDate.getTime() - now.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderItem = (value: any, title: string) => {
    return (
      <Card
        elevation={10}
        sx={{ borderRadius: 4, width: { md: 200, xs: "auto" } }}
      >
        <CardContent sx={{ p: { md: 3, xs: 1 }, pb: 0 }}>
          <Grid
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography
              fontWeight={"bold"}
              variant="h3"
              color={themeColor.blue.dark}
              gutterBottom
            >
              {`${value}`}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions
          sx={{
            py: { md: 2, xs: 1 },
            backgroundColor: themeColor.blue.dark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { md: 18, xs: 12 },
              fontWeight: { md: "bold", xs: 500 },
            }}
            textTransform={"uppercase"}
            color={themeColor.white.dark}
            gutterBottom
          >
            {`${title}`}
          </Typography>
        </CardActions>
      </Card>
    );
  };

  return (
    <Grid
      my={4}
      width={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid
        container
        maxWidth={"md"}
        spacing={2}
        px={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid
          item
          xs={12}
          my={4}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Typography
            fontWeight={"bold"}
            variant="h5"
            color={themeColor.blue.dark}
            gutterBottom
          >
            Time before the event:
          </Typography>
        </Grid>
        <Grid item md={3} xs={3}>
          {renderItem(timeLeft.days, "Days")}
        </Grid>
        <Grid item md={3} xs={3}>
          {renderItem(timeLeft.hours, "Hours")}
        </Grid>
        <Grid item md={3} xs={3}>
          {renderItem(timeLeft.minutes, "Minutes")}
        </Grid>
        {/* <Grid item md={3} xs={3}>
          {renderItem(timeLeft.seconds, "Seconds")}
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Countdown;
