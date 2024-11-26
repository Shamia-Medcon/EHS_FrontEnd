import themeColor from "@/components/constant/color";
import { routeConfig } from "@/components/constant/route";
import Layout from "@/components/design/layout";
import EventDetails from "@/components/widgets/event/details";
import { get } from "@/handler/api.handler";
import { FacultyType } from "@/types/props.types";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Faculty() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [faculties, setFaculties] = useState<FacultyType[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await get(routeConfig.faculty.index, null);
      if (res && res.status_code == 200) {
        setFaculties(res.data);
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
      >
        {loading ? (
          <ClipLoader color={themeColor.primary.dark} size={40} />
        ) : (
          <Grid mb={5} container maxWidth={"lg"}>
            <Grid
              width={1}
              py={2}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ backgroundColor: themeColor.secondary.dark }}
            >
              <Typography variant="h5" color={themeColor.white.dark}>
                Faculty Members
              </Typography>
            </Grid>
            {faculties.map((item, key) => {
              return (
                <Grid p={2} key={key} item md={6} xs={12}>
                  <Grid display={"flex"} alignItems={"center"} gap={2}>
                    <Box component="img" width={120} height={120} src={item.profile} alt="Profile"/>
                    <Divider
                      sx={{
                        my: 1,
                        height: 100,
                        p: 0.6,
                        backgroundColor: themeColor.blue.dark,
                      }}
                      orientation="vertical"
                      flexItem
                    />
                    <Grid display={"flex"} flexDirection={"column"} gap={1}>
                      <Typography variant="subtitle1" fontWeight={"bold"}>
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle2" maxWidth={400}>
                        {item.brief}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}
