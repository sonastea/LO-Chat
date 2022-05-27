import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const pages = ["Home", "Browse", "About", "Login", "Signup"];

const NavigationDrawer = () => {
  const { pathname } = useRouter();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {pages.map((page, index) => (
            <ListItemButton
              href={`/${page.toLowerCase()}`}
              onClick={() => setOpenDrawer(false)}
              key={index}
              selected={pathname.slice(1) === page.toLowerCase()}
            >
              <ListItemIcon>
                <ListItemText sx={{ color: "black" }}>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        color="inherit"
        sx={{ marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default NavigationDrawer;
