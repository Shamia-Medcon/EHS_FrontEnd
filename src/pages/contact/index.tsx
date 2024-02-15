import { routeConfig } from "@/components/constant/route";
import Layout from "@/components/design/layout";
import { post } from "@/handler/api.handler";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";

function Contact() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    message_content: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const res = await post(routeConfig.contact, info, null);
      if (res && res.status_code == 200) {
        Swal.fire({
          title: "Info!",
          text: "Inquiry received! We'll get back to you soon. Thanks for reaching out!",
          icon: "success",
        }).then((result) => {
          setInfo({ name: "", email: "", message_content: "" });
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Apologies, there seems to be an issue with your details. Please check and try again. Thank you.",
          icon: "error",
        });
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setInfo({
      ...info,
      [key]: value,
    });
  };

  return (
    <Layout banner>
      <Grid
        mt={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid
          container
          sx={{ flexDirection: { md: "row", xs: "column-reverse" } }}
          maxWidth={"lg"}
        >
          <Grid item md={6} xs={12}>
            <Paper elevation={3} sx={{ width: "100%", height: "400px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14383.934142151042!2d55.7431158!3d25.6718405!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef609baa6559f57%3A0xebe1edc5a93f8b8a!2sM%C3%B6venpick%20Resort%20Al%20Marjan%20Island!5e0!3m2!1sen!2sae!4v1706604634858!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Paper>
          </Grid>
          <Grid item md={6} xs={12} p={4}>
            <Grid display={"flex"} flexDirection={"column"} gap={2}>
              <Typography fontWeight={"bold"} variant="subtitle1">
                Get in touch
              </Typography>
              <Grid display={"flex"} flexDirection={"column"} gap={2}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  placeholder="Full Name"
                  fullWidth
                  required
                  size="small"
                  onChange={(e) => {
                    handleChange("name", e.target.value);
                  }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  placeholder="Email"
                  fullWidth
                  required
                  size="small"
                  onChange={(e) => {
                    handleChange("email", e.target.value);
                  }}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  placeholder="Message"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  size="small"
                  onChange={(e) => {
                    handleChange("message_content", e.target.value);
                  }}
                />
                <Grid display={"flex"}>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      onClick={submit}
                      sx={{ width: 100 }}
                      variant="contained"
                      color="secondary"
                    >
                      Send
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Contact;
