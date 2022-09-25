import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const pages = ["Home", "Chat", "About", "Login", "Signup"];

const NavigationDrawer = () => {
  const { pathname } = useRouter();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: "75%" },
        }}
      >
        <List>
          {pages.map((page, index) => (
            <Link href={`/${page.toLowerCase()}`} key={index} passHref>
              <ListItemButton
                href={`/${page.toLowerCase()}`}
                onClick={() => setOpenDrawer(false)}
                selected={pathname.slice(1) === page.toLowerCase()}
                sx={{ padding: "1em" }}
              >
                <ListItemIcon sx={{ width: "50%" }}>
                  <ListItemText sx={{ color: "black", textAlign: "center" }}>
                    {page}
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
      <IconButton
        color="inherit"
        sx={{ marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
        aria-label="Toggle navigation drawer"
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default NavigationDrawer;
