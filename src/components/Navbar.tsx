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
  const pages = useMemo(() => ["/home", "/chat"], []);
  const [tabValue, setTabValue] = useState<number | boolean>(
    pages.indexOf(pathname) !== -1 ? pages.indexOf(pathname) : false,
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
        <Toolbar
          style={{ display: "flex", justifyContent: "space-between" }}
          component="nav"
        >
          {mobile ? (
            <>
              <Button
                sx={{ fontSize: "1.5rem", paddingLeft: "5%" }}
                href="/"
                variant="text"
                color="secondary"
                aria-label="LO:Home"
              >
                LO:Home
              </Button>
              <NavigationDrawer />
            </>
          ) : (
            <>
              <Tabs
                indicatorColor="secondary"
                value={tabValue}
                textColor="inherit"
                component="div"
              >
                <Tab href="/home" label="Home" LinkComponent={Link} />
                <Tab href="/chat" label="Chat" LinkComponent={Link} />
                {/* <Link href="/about" passHref>
                  <Tab label="About" />
                </Link> */}
              </Tabs>

              <nav>
                <Button
                  href="/login"
                  sx={{ marginLeft: "auto" }}
                  color="inherit"
                  variant="text"
                  LinkComponent={Link}
                >
                  Login
                </Button>
                <Button
                  href="/signup"
                  sx={{ marginLeft: "10px" }}
                  variant="contained"
                  color="secondary"
                  LinkComponent={Link}
                >
                  SignUp
                </Button>
              </nav>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
