import React, { MouseEvent, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { ClipLoader } from "react-spinners";
import { Button, Grid, Skeleton } from "@mui/material";
import Link from "next/link";

type PropsType = {
  logo?: string;
};
function ResponsiveAppBar({ logo }: PropsType) {
  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{ backgroundColor: "transparent" }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              mr: 1,
            }}
          >
            <Link href={"/"}>
              <Button>
                <Box
                  component={"img"}
                  width={300}
                  height={100}
                  sx={{ objectFit: "contain" }}
                  alt="EHS"
                  // src={"/static/images/ehs-new.svg"}
                />
              </Button>
            </Link>

            {logo ? (
              <Box
                component={"img"}
                width={220}
                height={80}
                sx={{ objectFit: "contain" }}
                alt="EHS"
                marginTop={0}
                marginRight={3}
                // src={logo}
              />
            ) : (
              <Grid width={200} height={100} position={"relative"}>
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
                <Skeleton variant="text" width={200} height={100}></Skeleton>
              </Grid>
            )}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "space-between",
              alignItems: "center",
              display: { xs: "flex", md: "none" },
              mr: 1,
            }}
          >
            <Link href={"/"}>
              <Button>
                <Box
                  component={"img"}
                  width={160}
                  height={60}
                  sx={{ objectFit: "contain" }}
                  alt="EHS"
                  src={"/static/images/ehs-new.svg"}
                />
              </Button>
            </Link>
            <Box
              component={"img"}
              width={100}
              height={40}
              alt="EHS"
              src={logo}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
