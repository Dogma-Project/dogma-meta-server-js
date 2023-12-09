import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import AppHeader from "./header";
import LeftMenu from "./left-menu";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box>
      <AppHeader handleDrawerToggle={handleDrawerToggle}></AppHeader>
      <Toolbar></Toolbar>
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{
            flexShrink: 0,
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "300px",
              },
            }}
          >
            <LeftMenu></LeftMenu>
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "300px",
                position: "relative",
              },
            }}
            open
          >
            <LeftMenu></LeftMenu>
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <RouterProvider router={router} />
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;
