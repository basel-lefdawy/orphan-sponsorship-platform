import { useEffect, useState } from "react";
import { Grid, Button, Typography, CircularProgress, Box } from "@mui/material";
import OrphanCard from "./OrphanCard";
import { fetchOrphans } from "../../services/apis";
import { useNavigate } from "react-router-dom";

function OrphansSection() {
  const [orphans, setOrphans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrphans = async () => {
      try {
        setLoading(true);
        const data = await fetchOrphans();
        setOrphans(data.slice(0, 3));
        setError(null);
      } catch (err) {
        setError("فشل تحميل بيانات الأيتام");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrphans();
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
    <section>
      <div>
        <div className="secdiv d">اكفل يتيم</div>
        <h3 className="secdiv h">يتيم بانتظار كفالتك</h3>
      </div>
      <Grid container spacing={4} justifyContent="center">
        {orphans.map((orphan, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{
              transition: "0.3s",
              "&:hover": { transform: "translateY(-20px)", cursor: "pointer" }
            }}
          >
            <OrphanCard orphan={orphan} />
          </Grid>
        ))}
      </Grid>
      <div>
        <Button
          variant="contained"
          onClick={() => navigate("/orphans")}
          sx={{
            bgcolor: "#9DB25D",
            borderRadius: "20px",
            px: 4,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#8aa84f",
            },
            display: "block",
            mx: "auto",
            mt: 7
          }}
        >
          عرض الايتام
        </Button>
      </div>
    </section>
  );
}

export default OrphansSection;

