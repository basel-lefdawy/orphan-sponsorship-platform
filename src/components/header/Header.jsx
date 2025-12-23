import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

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
            <Button sx={navStyle} color="inherit" component={NavLink} to="/sponsor">
              كفالة يتيم
            </Button>
            <Button sx={navStyle} color="inherit" component={NavLink} to="/contact">
              تواصل معنا
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
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
