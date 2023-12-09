import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

function AppHeader({
  handleDrawerToggle,
}: {
  handleDrawerToggle?: () => void;
}) {
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
        <Typography variant="h5" noWrap component="div">
          Dogma Meta
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
