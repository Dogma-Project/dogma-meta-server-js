import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import { C_API } from "@dogma-project/constants-meta";
import { AppContext } from "../context";
function AppHeader({
  handleDrawerToggle,
}: {
  handleDrawerToggle?: () => void;
}) {
  const {
    state: { prefix },
    managerRequest,
    dispatch,
  } = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    setAnchorEl(null);
    managerRequest("DELETE", "/prefix/" + prefix, {
      cb: () => {
        dispatch({
          type: C_API.ApiRequestAction.set,
          value: {
            prefix: "",
            api: 0,
          },
        });
      },
    });
  };

  return (
    <AppBar
      position="fixed"
      // sx={{
      //   width: { sm: `calc(100% - ${drawerWidth})` },
      //   ml: { sm: drawerWidth },
      // }}
    >
      <Toolbar>
        {handleDrawerToggle && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
          Dogma Meta
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem onClick={logOut}>Log out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
