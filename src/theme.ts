import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

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

export default theme;
