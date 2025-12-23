import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FaceIcon from "@mui/icons-material/Face";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < target) {
      const timer = setTimeout(() => {
        setCount(count + 5);
        return () => clearTimeout(timer);
      }, 20);
    }
  }, [count, target]);

  return <Typography variant="h4" sx={{ color: "white" }}>{count.toLocaleString()}</Typography>;
}

function StatsSection() {
  return (
    <Box sx={{ bgcolor: "#05843cff", py: 6, mt: 8 }}>
      <Grid container justifyContent="center" spacing={30}>
        <Grid item xs={12} md={4} textAlign="center">
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography sx={{ color: "#fff", fontWeight: "bold", mb: 3 }}>
              في الانتظار للكفالة
            </Typography>
            <AccessibilityNewIcon sx={{ color: "white", fontSize: 30 }} />
          </Box>
          <Counter target={2100} />
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography sx={{ color: "#fff", fontWeight: "bold", mb: 3 }}>
              أيتام ومحتاجين
            </Typography>
            <FaceIcon sx={{ color: "#fff", fontWeight: "bold", mb: 3 }} />
          </Box>
          <Counter target={1408} />
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography sx={{ color: "#fff", fontWeight: "bold", mb: 3 }}>
              كفلاء
            </Typography>
            <VolunteerActivismIcon sx={{ color: "#fff", fontWeight: "bold", mb: 3 }} />
          </Box>
          <Counter target={255} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default StatsSection;

