import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavigationDrawer from "./NavigationDrawer";

const Header = () => {
  const [tabValue, setTabValue] = useState<number | boolean>(false);
  const { pathname } = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    switch (pathname.slice(1)) {
      case "home":
        setTabValue(0);
        break;
      case "browse":
        setTabValue(1);
        break;
      case "about":
        setTabValue(2);
        break;
      default:
        setTabValue(false);
        break;
    }
  }, [pathname]);

  return (
    <AppBar position="relative">
      <Toolbar>
        {mobile ? (
          <>
            <Typography sx={{ fontSize: "1.5rem", paddingLeft: "5%" }}>
              LO:Home
            </Typography>
            <NavigationDrawer />
          </>
        ) : (
          <>
            <Tabs
              textColor="inherit"
              indicatorColor="secondary"
              onChange={(e: any, value) => {
                setTabValue(value);
              }}
              value={tabValue}
            >
              <Tab label="Home" href="/" />
              <Tab label="Browse" href="/browse" />
              <Tab label="About" href="/about" />
            </Tabs>

            <Button
              sx={{ marginLeft: "auto" }}
              color="inherit"
              variant="text"
              href="/login"
            >
              Login
            </Button>
            <Button
              sx={{ marginLeft: "10px" }}
              variant="contained"
              color="secondary"
              href="/signup"
            >
              SignUp
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
