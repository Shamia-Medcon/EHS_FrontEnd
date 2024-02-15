import themeColor from "@/components/constant/color";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <Grid
      // position={"fixed"}
      bottom={0}
      left={0}
      right={0}
      px={3}
      height={80}
      sx={{ backgroundColor: themeColor.blue.dark }}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box
        component={"img"}
        src="/static/images/medcon-logo.svg"
        sx={{ width: { md: 130, xs: 100 } }}
      ></Box>
      <Grid>
        <Link href={"/privacy"}>
          <Button color="light" size="small">
            <Typography variant="caption">Privacy Policy</Typography>
          </Button>
        </Link>
        <Link href={"/contact"}>
          <Button color="light" size="small">
            <Typography variant="caption"> Contact us</Typography>
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default Footer;
