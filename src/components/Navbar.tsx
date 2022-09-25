import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import NavigationDrawer from "./NavigationDrawer";

const Navbar = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { pathname } = useRouter();
  const pages = useMemo(() => ["/home", "/chat", "/about"], []);
  const [tabValue, setTabValue] = useState<number | boolean>(
    pages.indexOf(pathname) !== -1 ? pages.indexOf(pathname) : false
  );

  useEffect(() => {
    if (pages.indexOf(pathname) === -1) setTabValue(false);
    pages.map((page, index) => {
      if (pathname === page) setTabValue(index);
    });
  }, [pages, pathname]);

  return (
    <Box mb="0.5rem">
      <AppBar position="static">
        <Toolbar>
          {mobile ? (
            <>
              <Button
                sx={{ fontSize: "1.5rem", paddingLeft: "5%" }}
                href="/"
                variant="text"
                color="secondary"
              >
                LO:Home
              </Button>
              <NavigationDrawer />
            </>
          ) : (
            <>
              <Tabs
                textColor="inherit"
                indicatorColor="secondary"
                value={tabValue}
              >
                <Link href="/home" passHref>
                  <Tab label="Home" />
                </Link>
                <Link href="/chat" passHref>
                  <Tab label="Chat" />
                </Link>
                <Link href="/about" passHref>
                  <Tab label="About" />
                </Link>
              </Tabs>

              <Link href="/login" passHref>
                <Button
                  sx={{ marginLeft: "auto" }}
                  color="inherit"
                  variant="text"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button
                  sx={{ marginLeft: "10px" }}
                  variant="contained"
                  color="secondary"
                >
                  SignUp
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
