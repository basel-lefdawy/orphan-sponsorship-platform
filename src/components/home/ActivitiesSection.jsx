import { Grid, Button, Typography, CircularProgress, Box } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { fetchActivities } from "../../services/apis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ActivitiesSection() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchActivities();
        setActivities(data.slice(0, 3));
        setError(null);
      } catch (err) {
        setError("فشل تحميل بيانات الأنشطة");
        console.error("Error loading activities:", err);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h3" sx={{ textAlign: "center", mt: 6 }}>
        نشاطاتنا
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {activities.map((activity) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={activity.id}
            sx={{
              transition: "0.3s",
              "&:hover": { transform: "translateY(-20px)", cursor: "pointer" }
            }}
          >
            <ActivityCard activity={activity} />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        onClick={() => navigate("/activities")}
        sx={{
          mt: 6,
          mb: 4,
          display: "block",
          mx: "auto",
          bgcolor: "#9DB25D",
          borderRadius: "20px",
          px: 3,
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#8aa84f" }
        }}
      >
        عرض الأنشطة
      </Button>
    </div>
  );
}

export default ActivitiesSection;

