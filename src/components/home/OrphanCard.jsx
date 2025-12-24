import { Card, CardContent, Typography, Button, Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function OrphanCard({ orphan }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: "relative", mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Avatar
        src={orphan.image}
        sx={{
          width: 115,
          height: 115,
          position: "absolute",
          top: -80,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      />

      <Card
        sx={{
          width: 320,
          borderRadius: "24px",
          textAlign: "center",
          pt: 7,
          pb: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {orphan.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            {orphan.gender} - {orphan.age} سنوات
          </Typography>

          <Typography variant="body2" mt={1}>
            المكان: {orphan.place}
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/sponsor-form")}
            sx={{
              mt: 3,
              bgcolor: "#9DB25D",
              borderRadius: "20px",
              px: 4,
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#8aa84f"
              }
            }}
          >
            اكفل يتيم
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default OrphanCard;