import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import CelebrationIcon from '@mui/icons-material/Celebration';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FaceIcon from "@mui/icons-material/Face";

const images = [
  "https://modo3.com/thumbs/fit630x300/252784/1561377629/%D8%A3%D9%81%D9%83%D8%A7%D8%B1_%D9%81%D8%B9%D8%A7%D9%84%D9%8A%D8%A7%D8%AA_%D8%AA%D8%B1%D9%81%D9%8A%D9%87%D9%8A%D8%A9_%D9%84%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84.jpg",
  "https://static.sayidaty.net/styles/900_scale/public/2024-04/low-angle-portrait-of-smiling-multi-cultural-child-2023-11-27-04-55-10-utc_0.jpg.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrMWKCrSBUm_x5OuauZOCy16R1JgjQO5UVVg&s",
  "https://windroseacademy.edu.eg/wp-content/uploads/2018/02/Happy-pyjama-day.jpg",
  "https://www.al-monitor.com/sites/default/files/styles/newsletter/public/2024-10/8bc138ca68766a8a07e842f47edb64e6bc4eb4f1.jpg?itok=o-ddZjcv",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYTfgCWuFgB5o0MVj7Pz19w23lyW-H23w7XQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSRmUQjFTgcYwsOaOPPlG6OLadkVoeWC7wig&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1-r5SOCzh3UUTGXATrYrc8BEumCDSN3aJUg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgam-1RDNwJMMSosMONPWfErQBRw6_4qrbNQ&s",
];

const iconStyle = {
  color: "#2e7d32",
  fontSize: 22,
};

function Footer() {
  const navigate = useNavigate();

  return (
    <footer>
      <Box sx={{ bgcolor: "#f0f0f0", py: 3, px: { xs: 1, md: 2 } }}>
        <Grid container justifyContent="space-around" spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" }, width: { xs: "100%", md: 200 } }}>
            <Typography sx={{ fontSize: { xs: 20, md: 30 } }}>
              معلومات.
            </Typography>
            <Box sx={{ fontSize: 12, pt: 3, textAlign: { xs: "center", md: "left" } }}>
              دار الأيتام هي مؤسسة خيرية تأسست بهدف رعاية الأيتام والمحتاجين وتقديد الدعم الكامل لهم في جميع جوانب الحياة.
            </Box>
            <Box sx={{ mt: 1 }}>
              <Box display="flex" alignItems="center" gap={1} sx={{ pb: 1, pt: 2 }}>
                <LocationOnIcon sx={iconStyle} />
                <Typography sx={{ fontSize: { xs: 12, md: "inherit" } }}>
                  Nablus
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1} sx={{ pb: 1 }}>
                <EmailIcon sx={iconStyle} />
                <Typography sx={{ fontSize: { xs: 12, md: "inherit" } }}>
                  info@darelyateem.org
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1} sx={{ pb: 1 }}>
                <PhoneIcon sx={iconStyle} />
                <Typography sx={{ fontSize: { xs: 12, md: "inherit" } }}>
                  +1 917 563 6537
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" }, width: { xs: "100%", md: 200 } }}>
            <Typography sx={{ fontSize: { xs: 16, md: 20 } }}>
              ألبوم الصور.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
                pt: 3,
              }}
            >
              {images.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" }, width: { xs: "100%", md: 200 } }}>
            <Typography sx={{ fontSize: { xs: 16, md: 20 } }}>
              أهم الروابط.
            </Typography>
            <Box sx={{ pt: 3, display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" } }}>
              <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                <HomeIcon sx={{ fontSize: { xs: 18, md: "inherit" } }} />
                <Button sx={{ mt: 0, fontSize: { xs: 12, md: "inherit" } }} onClick={() => navigate("/")} color="success">الرئيسية</Button>
              </Box>

              <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                <CelebrationIcon sx={{ fontSize: { xs: 18, md: "inherit" } }} />
                <Button sx={{ mt: 0, fontSize: { xs: 12, md: "inherit" } }} onClick={() => navigate("/activities")} color="success">الأنشطة</Button>
              </Box>

              <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                <VolunteerActivismIcon sx={{ fontSize: { xs: 18, md: "inherit" } }} />
                <Button sx={{ mt: 0, fontSize: { xs: 12, md: "inherit" } }} onClick={() => navigate("/donate")} color="success">التبرع</Button>
              </Box>

              <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                <FaceIcon sx={{ fontSize: { xs: 18, md: "inherit" } }} />
                <Button sx={{ mt: 0, fontSize: { xs: 12, md: "inherit" } }} onClick={() => navigate("/orphans")} color="success">الأيتام</Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" }, width: { xs: "100%", md: "230px" } }}>
            <Typography sx={{ fontSize: { xs: 16, md: 20 }, textAlign: { xs: "center", md: "left" } }}>
              تابعنا على مواقع التواصل الإجتماعي.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                sx={{ color: "#1877F2" }}
              >
                <FacebookIcon fontSize="large" />
              </IconButton>

              <IconButton
                href="https://instagram.com"
                target="_blank"
                sx={{ color: "#E4405F" }}
              >
                <InstagramIcon fontSize="large" />
              </IconButton>

              <IconButton
                href="https://twitter.com"
                target="_blank"
                sx={{ color: "#1DA1F2" }}
              >
                <TwitterIcon fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ bgcolor: "#f0f0f0", display: "flex", justifyContent: "center", padding: { xs: "12px 8px", md: "16px" } }}>
        2025 © جميع الحقوق محفوظة
      </Box>
    </footer>
  );
}

export default Footer;