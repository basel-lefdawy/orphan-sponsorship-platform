import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  Avatar,
  MenuItem,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import UserDropdown from "./UserDropdown";

const navStyle = {
  color: "white",
  position: "relative",
  fontSize: 16,
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 4,
    left: "50%",
    width: 0,
    height: "2px",
    backgroundColor: "#fff",
    transition: "0.3s",
    transform: "translateX(-50%)",
  },
  "&.active::after": {
    width: "60%",
  },
};

export default function Header() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [isUserLoading, setIsUserLoading] = useState(false);

  // mobile menu
  const [anchorEl, setAnchorEl] = useState(null);

  // user menu (important feature)
  const [userMenu, setUserMenu] = useState(null);

  const openMobile = Boolean(anchorEl);
  const openUserMenu = Boolean(userMenu);
  const isAuthenticated = Boolean(authToken);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleUserOpen = (event) => setUserMenu(event.currentTarget);
  const handleUserClose = () => setUserMenu(null);

  const userInitials = useMemo(() => {
    const safeName = user.name?.trim();

    if (!safeName) return "U";

    const nameParts = safeName.split(/\s+/).filter(Boolean);
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

    return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
  }, [user.name]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!authToken) return;

      try {
        setIsUserLoading(true);
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const { data } = await axios.get(`${apiBaseUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const payload = data?.user || data || {};
        setUser({
          name: payload.name || payload.fullName || "",
          email: payload.email || "",
        });
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleUserClose();
    navigate("/login");
  };

  const handleLogin = () => {
    handleUserClose();
    navigate("/login");
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#2e7d32" }} dir="rtl">
        <Toolbar>

          {/* Logo / Title */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            دار الأيتام
          </Typography>

          {/* Center Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, mx: "auto" }}>
            <Button sx={navStyle} component={NavLink} to="/">الرئيسية</Button>
            <Button sx={navStyle} component={NavLink} to="/about">من نحن</Button>
            <Button sx={navStyle} component={NavLink} to="/orphans">الأيتام</Button>
            <Button sx={navStyle} component={NavLink} to="/help">طلب مساعدة</Button>

            <Button
              variant="contained"
              onClick={() => navigate("/donate")}
              sx={{
                bgcolor: "#9DB25D",
                borderRadius: "20px",
                px: 3,
                fontWeight: "bold",
                "&:hover": { bgcolor: "#8aa84f" },
              }}
            >
              تبرع
            </Button>
          </Box>

          {/* USER ICON (IMPORTANT - BACKEND READY) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

            <IconButton onClick={handleUserOpen}>
              <Avatar
                sx={{
                  bgcolor: "#9DB25D",
                  width: 36,
                  height: 36,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {userInitials}
              </Avatar>
            </IconButton>

            <UserDropdown
              anchorEl={userMenu}
              open={openUserMenu}
              onClose={handleUserClose}
              user={user}
              userInitials={userInitials}
              isUserLoading={isUserLoading}
              isAuthenticated={isAuthenticated}
              authToken={authToken}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />

            {/* MOBILE MENU */}
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={openMobile}
            onClose={handleMenuClose}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#2e7d32",
                color: "white",
              },
            }}
          >
            <MenuItem component={NavLink} to="/" onClick={handleMenuClose}>
              الرئيسية
            </MenuItem>
            <MenuItem component={NavLink} to="/about" onClick={handleMenuClose}>
              من نحن
            </MenuItem>
            <MenuItem component={NavLink} to="/orphans" onClick={handleMenuClose}>
              الأيتام
            </MenuItem>
            <MenuItem component={NavLink} to="/help" onClick={handleMenuClose}>
              طلب مساعدة
            </MenuItem>
            <MenuItem component={NavLink} to="/donate" onClick={handleMenuClose}>
              تبرع
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  );
}