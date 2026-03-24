import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const navStyle = {
  color: "white",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 6,
    left: "50%",
    width: 0,
    height: "2px",
    backgroundColor: "#FFFFFF33",
    transition: "0.3s",
    transform: "translateX(-50%)",
  },
  "&.active::after": {
    width: "60%",
  },
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  fontSize: 18
};

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#2e7d32" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 0.3 }}>
            دار الأيتام
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            <Button sx={navStyle} color="inherit" component={NavLink} to="/">
              الرئيسية
            </Button>

            <Button sx={navStyle} color="inherit" component={NavLink} to="/about">
              من نحن
            </Button>
            <Button sx={navStyle} color="inherit" component={NavLink} to="/orphans">
              الأيتام
            </Button>
            <Button sx={navStyle} color="inherit" component={NavLink} to="/help">
              طلب مساعدة
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/donate")}
              sx={{
                bgcolor: "#9DB25D",
                borderRadius: "20px",
                px: 3,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#8aa84f" }
              }}
            >
              تبرع
            </Button>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ fontSize: 28 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "#2e7d32",
                  color: "white",
                  minWidth: 200,
                }
              }}
            >
              <MenuItem component={NavLink} to="/" onClick={handleMenuClose} sx={{ justifyContent: "flex-end", color: "white" }}>الرئيسية</MenuItem>
              <MenuItem component={NavLink} to="/activities" onClick={handleMenuClose} sx={{ justifyContent: "flex-end", color: "white" }}>الانشطة</MenuItem>
              <MenuItem component={NavLink} to="/about" onClick={handleMenuClose} sx={{ justifyContent: "flex-end", color: "white" }}>من نحن</MenuItem>
              <MenuItem component={NavLink} to="/orphans" onClick={handleMenuClose} sx={{ justifyContent: "flex-end", color: "white" }}>الأيتام</MenuItem>
              <MenuItem component={NavLink} to="/help" onClick={handleMenuClose} sx={{ justifyContent: "flex-end", color: "white" }}>طلب مساعدة</MenuItem>
              <MenuItem component={NavLink} to="/sponsoring" onClick={handleMenuClose} sx={{ justifyContent: "flex-end", color: "white" }}>كفالة يتيم</MenuItem>
              <MenuItem component={NavLink} to="/donate" onClick={handleMenuClose} sx={{ justifyContent: "flex-end", color: "white" }}>تبرع</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}