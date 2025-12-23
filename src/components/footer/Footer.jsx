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
      <Box sx={{ bgcolor: "#f0f0f0", py: 3 }}>
        <Grid container justifyContent="space-around" alignItems="flex-start">
          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: 200 }}>
            <Typography sx={{ fontSize: 30 }}>
              معلومات.
            </Typography>
            <Box sx={{ fontSize: 12, pt: 3 }}>
              شركة دار يتيم  هي شركة أمريكية متخصصة في تقديم خدمات استشارات إدارة الأعمال، تأسست بهدف تمكين الأفراد والمؤسسات من تحقيق أعلى مستويات الكفاءة والنمو، من خلال حلول استراتيجية مبتكرة وخطط تطوير فعّالة تلبي متطلبات السوق وتواكب التحديات الحديثة.
            </Box>
            <Box>
              <Box display="flex" alignItems="center" gap={1} sx={{ pb: 1, pt: 2 }}>
                <LocationOnIcon sx={iconStyle} />
                <Typography>
                  Nablus
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1} sx={{ pb: 1 }}>
                <EmailIcon sx={iconStyle} />
                <Typography>
                  info@darelyateem.org
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1} sx={{ pb: 1 }}>
                <PhoneIcon sx={iconStyle} />
                <Typography>
                  +1 917 563 6537
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: 200, height: 100 }}>
            <Typography sx={{ fontSize: 20 }}>
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
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: 200, height: 100 }}>
            <Typography sx={{ fontSize: 20 }}>
              أهم الروابط.
            </Typography>
            <Box sx={{ pt: 3 }}>
              <Box sx={{ mb: 3 }}>
                <HomeIcon />
                <Button sx={{ mt: -2 }} onClick={() => navigate("/")} color="success">الرئيسية</Button>
              </Box>

              <Box sx={{ mb: 3 }}>
                <CelebrationIcon />
                <Button sx={{ mt: -2 }} onClick={() => navigate("/activities")} color="success">الأنشطة</Button>
              </Box>

              <Box sx={{ mb: 3 }}>
                <VolunteerActivismIcon />
                <Button sx={{ mt: -2 }} onClick={() => navigate("/donate")} color="success">التبرع</Button>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FaceIcon />
                <Button sx={{ mt: -2 }} onClick={() => navigate("/orphans")} color="success">الأيتام</Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: 230, height: 100 }}>
            <Typography sx={{ fontSize: 20 }}>
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
      <Box sx={{ bgcolor: "#f0f0f0", display: "flex", justifyContent: "center" }}>
        2025 © جميع الحقوق محفوظة
      </Box>
    </footer>
  );
}

export default Footer;

