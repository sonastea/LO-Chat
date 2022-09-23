import Navbar from "@components/Navbar";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

const theme = createTheme({
  palette: {
    primary: {
      light: "#73e8ff",
      main: "#29b6f6",
      dark: "#0086c3",
      contrastText: "#000",
    },
    secondary: {
      light: "#ffff8b",
      main: "#ffee58",
      dark: "#c9bc1f",
      contrastText: "#000",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>LO:Chat</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="LO:Chat" content="LO:Chat webapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
