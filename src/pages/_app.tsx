import React, { Suspense } from "react";
import themeColor from "@/components/constant/color";
import type { EmotionCache } from "@emotion/cache";
import type { NextComponentType } from "next";
import type { AppProps } from "next/app";
import { createEmotionCache } from "@/components/utils/create-emotion-cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import Head from "next/head";
const clientSideEmotionCache = createEmotionCache();
import { createTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import GlobalStyling from "./_global";
import CustomSpinner from "@/components/widgets/spinner";
import { AuthProvider } from "@/components/context/AuthContext";
import AuthMiddleware from "@/components/context/AuthMiddleware";
import { themeConfig } from "@/components/constant/theme";
import "@/styles/globals.css";

type ExtendedAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
  emotionCache: EmotionCache;
};
// Update the Button's color options to include a violet option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    light: true;
    dark: true;
    greyBlack: true;
    lightBlack: true;
    yallowdark : true;
    black : true;
  }
}
declare module "@mui/material/styles" {
  interface Palette {
    light: Palette["primary"];
    greyBlack: {
      main: string;
      light: string;
      dark: string;
    };
    lightBlack: {
      main: string;
      light: string;
      dark: string;
    };
    yallowdark :{
      main : string;
      light: string;
      dark: string;
    }
    black :{
      main : string;
      light: string;
      dark: string;
    }
  }
  interface PaletteOptions {
    light?: PaletteOptions["primary"];
    dark?: PaletteOptions["primary"];
    greyBlack?: {
      main: string;
      light: string;
      dark: string;
    };
    lightBlack?: {
      main: string;
      light: string;
      dark: string;
    };
    yallowdark :{
      main : string;
      light: string;
      dark: string;
    }
    black :{
      main : string;
      light: string;
      dark: string;
    }
  }
}

const theme = createTheme({
  typography: {
    fontFamily: `"Open-Sans", "Helvetica", "Arial", sans-serif`,
    h1: {
      "@media (min-width:360px)": {
        fontSize: "2rem",
      },
      "@media (min-width:480px)": {
        fontSize: "3rem",
      },
      "@media (min-width:600px)": {
        fontSize: "5em",
      },
    },
    h2: {
      "@media (min-width:360px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:480px)": {
        fontSize: "2rem",
      },
      "@media (min-width:600px)": {
        fontSize: "4em",
      },
    },
    h3: {
      "@media (min-width:360px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:480px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:600px)": {
        fontSize: "3em",
      },
    },
    h6: {
      "@media (min-width:360px)": {
        fontSize: "1rem",
      },
      "@media (min-width:480px)": {
        fontSize: "1rem",
      },
      "@media (min-width:600px)": {
        fontSize: "1.2em",
      },
    },
    subtitle1: {
      "@media (min-width:360px)": {
        fontSize: "1rem",
      },
      "@media (min-width:480px)": {
        fontSize: "1rem",
      },
      "@media (min-width:600px)": {
        fontSize: "1.2em",
      },
    },
  },

  palette: {
    primary: themeColor.primary,
    secondary: themeColor.secondary,
    light: themeColor.white,
    dark: themeColor.black,
    lightBlack: themeColor.lightBlack,
    greyBlack: themeColor.greyBlack,
      black : themeColor.black,
      yallowdark: themeColor.yallowdark,
    background: {
      default: "#fdfbf7",
    },
  },
});

const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Suspense fallback={<CustomSpinner loading={true} />}>
      <CacheProvider value={emotionCache}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles styles={() => GlobalStyling(theme)} />
            <CacheProvider value={emotionCache}>
              <Head>
                <title>{`${themeConfig.websiteName} `}</title>
                <meta
                  name="description"
                  content={`${themeConfig.websiteName}  `}
                />
                <meta
                  name="keywords"
                  content="the 2nd EHS Diabetes Conference "
                />
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
                <meta
                  name="theme-color"
                  content={themeColor.primary.dark}
                />
          
              </Head>
              {Component.auth ? (
                <AuthMiddleware>
                  <Component {...pageProps} />
                </AuthMiddleware>
              ) : (
                <Component {...pageProps} />
              )}
            </CacheProvider>
          </ThemeProvider>
        </AuthProvider>
      </CacheProvider>
    </Suspense>
  );
};

export default App;
