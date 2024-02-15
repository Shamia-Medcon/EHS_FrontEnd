import themeColor from "@/components/constant/color";
import { routeConfig } from "@/components/constant/route";
import { get } from "@/handler/api.handler";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ClipLoader } from "react-spinners";

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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GalleryType>();

  const loadGallery = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.event.gallery, null);
      if (res && res.status_code == 200) {
        setData(res.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <Grid mb={3} px={2} className="slide-container">
      {loading ? (
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
          ) : null}
        </>
      )}
    </Grid>
  );
}

export default Gallery;
