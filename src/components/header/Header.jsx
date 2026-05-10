import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import UserDropdown from "./UserDropdown";

import { useDonation } from "../../context/DonationContext";
import DonationForm from "../../pages/Donation/Donation";

const navStyle = {
  color: "white",
  position: "relative",
  fontSize: 18,

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
};

export default function Header() {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("token");

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [isUserLoading, setIsUserLoading] = useState(false);

  // Mobile Menu
  const [anchorEl, setAnchorEl] = useState(null);

  // User Menu
  const [userMenu, setUserMenu] = useState(null);

  const openMobile = Boolean(anchorEl);
  const openUserMenu = Boolean(userMenu);

  const isAuthenticated = Boolean(authToken);

  // Donation Modal
  const { openDonation, setOpenDonation } = useDonation();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleUserOpen = (event) => setUserMenu(event.currentTarget);

  const handleUserClose = () => setUserMenu(null);

  const userInitials = useMemo(() => {
    const safeName = user.name?.trim();

    if (!safeName) return "U";

    const nameParts = safeName.split(/\s+/).filter(Boolean);

    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    return `${nameParts[0].charAt(0)}${nameParts[1]
      .charAt(0)
      .toUpperCase()}`;
  }, [user.name]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!authToken) return;

      try {
        setIsUserLoading(true);

        const apiBaseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

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
  }, [authToken]);

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
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              flexGrow: { xs: 1, md: 0.3 },
            }}
          >
            دار الأيتام
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              mx: "auto",
            }}
          >
            <Button sx={navStyle} component={NavLink} to="/">
              الرئيسية
            </Button>

            <Button sx={navStyle} component={NavLink} to="/about">
              من نحن
            </Button>

            <Button sx={navStyle} component={NavLink} to="/orphans">
              الأيتام
            </Button>

            <Button sx={navStyle} component={NavLink} to="/help">
              طلب مساعدة
            </Button>

            <Button
              variant="contained"
              onClick={() => setOpenDonation(true)}
              sx={{
                bgcolor: "#9DB25D",
                borderRadius: "20px",
                px: 3,
                textTransform: "none",
                fontWeight: "bold",

                "&:hover": {
                  bgcolor: "#8aa84f",
                },
              }}
            >
              تبرع
            </Button>
          </Box>

          {/* Right Side */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* User Avatar */}
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

            {/* User Dropdown */}
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

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={openMobile}
            onClose={handleMenuClose}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#2e7d32",
                color: "white",
                minWidth: 200,
              },
            }}
          >
            <MenuItem
              component={NavLink}
              to="/"
              onClick={handleMenuClose}
              sx={{
                justifyContent: "flex-end",
                color: "white",
              }}
            >
              الرئيسية
            </MenuItem>

            <MenuItem
              component={NavLink}
              to="/about"
              onClick={handleMenuClose}
              sx={{
                justifyContent: "flex-end",
                color: "white",
              }}
            >
              من نحن
            </MenuItem>

            <MenuItem
              component={NavLink}
              to="/orphans"
              onClick={handleMenuClose}
              sx={{
                justifyContent: "flex-end",
                color: "white",
              }}
            >
              الأيتام
            </MenuItem>

            <MenuItem
              component={NavLink}
              to="/help"
              onClick={handleMenuClose}
              sx={{
                justifyContent: "flex-end",
                color: "white",
              }}
            >
              طلب مساعدة
            </MenuItem>

            <MenuItem
              onClick={() => {
                setOpenDonation(true);
                handleMenuClose();
              }}
              sx={{
                justifyContent: "flex-end",
                color: "white",
              }}
            >
              تبرع
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Toolbar />

      {/* Donation Modal */}
      {openDonation && (
        <DonationForm onClose={() => setOpenDonation(false)} />
      )}
    </>
  );
}