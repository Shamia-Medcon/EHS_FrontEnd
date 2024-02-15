import React, { MouseEvent, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import themeColor from "@/components/constant/color";
import { useAuth } from "@/hooks/useAuth";

const pages = [
  { title: "Home", action: "/" },
  {
    title: "Scientific Committee",
    action: "/scientific_committee/",
    items: [],
  },
  { title: "Faculty", action: "/faculty/", items: [] },
  {
    title: "Agenda",
    action: "#",
    items: [
      { id: 1, title: "Conference Agenda", action: "/agenda/", items: [] },
      { id: 2,title: "Pre-Conference Workshop", action: "/pre_confrence/", items: [] },
    ],
  },
  { title: "CME", action: "/cme/", items: [] },
];

function CustomMenu() {
  const router = useRouter();
  const path = router.asPath;
  const auth = useAuth();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{ backgroundColor: themeColor.primary.dark }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) =>
                page.items && page.items?.length > 0 ? (
                  <>
                    <Button key={page.title} onClick={handleClick}>
                      <Typography textAlign="center">{page.title}</Typography>
                      
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {page.items.map((item) => {
                        return (
                          <MenuItem
                            key={item.id}
                            onClick={() => {
                              router.push({
                                pathname: item.action,
                              });
                            }}
                          >
                            {item.title}
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </>
                ) : (
                  <MenuItem
                    key={page.title}
                    onClick={() => {
                      router.push({
                        pathname: page.action,
                      });
                    }}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                )
              )}
              <MenuItem
                key={auth.user ? "Account" : "register"}
                onClick={() => {
                  router.push({
                    pathname: auth.user ? "/account" : "/register",
                  });
                }}
              >
                <Typography textAlign="center">
                  {auth.user ? "Account" : "Register"}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {pages.map((page) =>
              page.items && page.items?.length > 0 ? (
                <>
                  <Button
                    key={page.title}
                    onClick={handleClick}
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                      position: "relative",
                      fontWeight: "bold",
                    }}
                    color={path == page.action ? "greyBlack" : "light"}
                  >
                    <Box
                      component={"span"}
                      sx={{
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        borderBottom: path == page.action ? 3 : 0,
                        borderBottomColor:
                          path == page.action ? "greyBlack" : "light",
                        maxWidth: 50,
                        width: "100%",
                      }}
                    />
                    {page.title}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {page.items.map((item) => {
                      return (
                        <MenuItem
                          key={item.id}
                          onClick={() => {
                            router.push({
                              pathname: item.action,
                            });
                          }}
                        >
                          {item.title}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </>
              ) : (
                <Button
                  key={page.title}
                  onClick={() => {
                    router.push({
                      pathname: page.action,
                    });
                  }}
                  sx={{
                    position: "relative",
                    fontWeight: "bold",
                  }}
                  color={path == page.action ? "greyBlack" : "light"}
                >
                  <Box
                    component={"span"}
                    sx={{
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderBottom: path == page.action ? 3 : 0,
                      borderBottomColor:
                        path == page.action ? "greyBlack" : "light",
                      maxWidth: 50,
                      width: "100%",
                    }}
                  />
                  {page.title}
                </Button>
              )
            )}
            <Button
              key={auth.user ? "Account" : "register"}
              onClick={() => {
                router.push({
                  pathname: auth.user ? "/account" : "/register",
                });
              }}
              sx={{
                position: "relative",
                fontWeight: "bold",
              }}
              color={path == "/register" ? "greyBlack" : "light"}
            >
              <Box
                component={"span"}
                sx={{
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderBottom:
                    path == "/register" || path == "/account" ? 3 : 0,
                  borderBottomColor:
                    "/register" || path == "/account" ? "greyBlack" : "light",
                  maxWidth: 50,
                  width: "100%",
                }}
              />
              {auth.user ? "Account" : "register"}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default CustomMenu;
