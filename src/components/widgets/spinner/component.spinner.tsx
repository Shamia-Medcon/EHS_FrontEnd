import themeColor from "@/components/constant/color";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
const FadeLoader = dynamic(() =>
  import("react-spinners/FadeLoader").then((module) => module.default)
);
const Grid = dynamic(() =>
  import("@mui/material/Grid").then((module) => module.default)
);

interface ItemSpinnerInterface {
  loading: boolean;
  size?: number,
  children?: ReactNode;
}
function ComponentSpinner({ loading, size, children }: ItemSpinnerInterface) {
  return (
    <>
      <Grid
        container
        display={"flex"}
        direction="column"
        justifyContent="center"
        alignItems="center"
        width={size}
      >
        <Box sx={{ mb: 2 }}>{children}</Box>
        <FadeLoader
          color={themeColor.secondary.main}
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Grid>
    </>
  );
}

export default ComponentSpinner;
