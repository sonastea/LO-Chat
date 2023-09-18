import Navbar from "@components/Navbar";
import { ThemeProvider } from "@mui/system";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>LO:Chat</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="LO:Chat" content="LO:Chat webapp" />
        <meta
          name="description"
          content="Come and LO:Chat. Chat and talk with online connections in many different chat rooms."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Navbar />
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
