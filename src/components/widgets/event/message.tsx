import themeColor from "@/components/constant/color";
import { EventMessage, EventType } from "@/types/props.types";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";

type PropsType = {
  event: EventType;
};

const renderItem = (item: EventMessage, key: number) => {
  return (
    <Grid px={2} key={key} container maxWidth={"xl"}>
      <Grid
        item
        xs={12}
        md={5}
        my={4}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box component={"img"} src={item.image} width={200} height={200} />
        <Grid
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          maxWidth={300}
          textAlign={"center"}
        >
          <Typography
            fontWeight={"bold"}
            variant="subtitle1"
            color={themeColor.secondary.dark}
            gutterBottom
          >
            {item.title}
          </Typography>
          <Typography
            fontWeight={"bold"}
            variant="caption"
            color={themeColor.blue.dark}
            maxWidth={250}
            gutterBottom
          >
            {item.subtitle}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
      </Grid>
      <Grid
        item
        xs={12}
        md={7}
        my={4}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Typography
          fontWeight={"bold"}
          variant="h6"
          color={themeColor.primary.dark}
          gutterBottom
        >
          {item.message_header}
        </Typography>
        <Grid
          component={"div"}
          sx={{ maxWidth: 600 }}
          lineHeight={1.4}
          dangerouslySetInnerHTML={{ __html: item.message_content }}
        />
      </Grid>
    </Grid>
  );
};
function WelcomeMessage({ event }: PropsType) {
  return (
    <Grid
      my={4}
      width={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid container maxWidth={"xl"}>
        {event.messages.map((item, key) => {
          return renderItem(item, key);
        })}
      </Grid>
    </Grid>
  );
}

export default WelcomeMessage;
