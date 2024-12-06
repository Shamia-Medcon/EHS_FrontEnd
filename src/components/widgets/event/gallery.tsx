import themeColor from "@/components/constant/color";
import { routeConfig } from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ClipLoader } from "react-spinners";
import Link from 'next/link';

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: 234,
  width: 350,
};

const responsiveSettings = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 380,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

type ImageType = {
  url: string;
};
type GalleryType = {
  title: string;
  images: ImageType[];
  logo: string;
};

function Gallery() {
  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GalleryType>();

  // const loadGallery = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await get(routeConfig.event.gallery, null);
  //     if (res && res.status_code == 200) {
  //       setData(res.data);
  //     }
  //     setLoading(false);
  //   } catch (e) {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // loadGallery();
  }, []);

  return (
    <Grid mb={3} px={2} className="slide-container">
      {/* {loading ? (
        <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <ClipLoader color={themeColor.primary.dark} size={40} />
        </Grid>
      ) : (
        <>
          {data ? (
            <>
              <Grid
                mb={3}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid>
                  <Typography
                    variant="subtitle1"
                    fontWeight={"bold"}
                    color={themeColor.blue.dark}
                  >
                    {data.title}
                  </Typography>
                  <Typography variant="subtitle2" color={themeColor.blue.dark}>
                    A Glimpse Back: Explore the 2023 Conference Gallery
                  </Typography>
                </Grid>
                <Grid>
                  <Box
                    component={"img"}
                    src={data.logo}
                    width={180}
                    sx={{ objectFit: "contain" }}
                    height={180}
                  />
                </Grid>
              </Grid>
              <Slide
               
                indicators={false}
                responsive={responsiveSettings}

              
                
              >
                {data.images.map((slideImage, index) => (
                  <Grid display={"flex"} justifyContent={"center"} key={index}>
                    <Box
                      component={"img"}
                      src={slideImage.url}
                      sx={{
                        ...divStyle,
                        objectFit: "contain",
                      }}
                    ></Box>
                  </Grid>
                ))}
              </Slide>
            </>
          ) : null} */}
      {/* </> */}
      {/* )} */}
      <Grid
        mb={10}
        mt={10}
        display={"flex"}
        justifyContent={"center"}
        // alignItems={"center"}
        flexDirection={"column"}
        width={1}
      >
        <Grid>
          <Typography
            variant="h4"
            align="center"
            fontWeight={"bold"}
            color={themeColor.blue.dark}
          >
            {"RAK Diabetes Conference Gallery"}
          </Typography>
          {/* <Typography variant="subtitle2" color={themeColor.blue.dark}>
                    A Glimpse Back: Explore the 2023 Conference Gallery
                  </Typography> */}
        </Grid>
      
       <Grid mt={5} container flexDirection={"row"} alignContent={"center"} justifyContent={"center"}>
       <Link href="/gallery-2023/">
          <Box
           m={2}

          border={1}
          borderRadius={5}
            component="img"
            src={"/static/images/ehs 2023 logo.png"}
            sx={{
              width: 350,
              height: "80%",
              objectFit: "cover", // Ensures the image fills the space
              display: "block",
            }}
          />
          </Link>
          <Link href="/gallery-2024/">
           <Box
           m={2}
            border={1}
            borderRadius={5}
            component="img"
            src={"/static/images/ehs 2024 logo.png"}
            sx={{
              width: 350,
              height: "80%",
              objectFit: "cover", // Ensures the image fills the space
              display: "block",
            }}
          />
          </Link>
       
       </Grid>
      </Grid>
    </Grid>
  );
}

export default Gallery;
