import React from 'react';
import { Card, CardContent, Typography, Button, Avatar, Box, Chip } from "@mui/material";
import { LocationOn, Cake, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function OrphanCard({ orphan }) {
  const navigate = useNavigate();

  // القيم الافتراضية للتجربة (يمكنك استبدالها ببيانات الـ props)
  const data = orphan ;

  return (  
    <Box sx={{ 
      position: "relative", 
      mt: 10, 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      {/* الصورة الشخصية مع إطار دائري */}
      <Box sx={{
        position: "absolute",
        top: -70,
        zIndex: 2,
        p: 1,
        bgcolor: "white",
        borderRadius: "50%",
        boxShadow: "0 8px 24px rgba(157, 178, 93, 0.2)"
      }}>
        <Avatar
          src={data.image}
          sx={{
            width: 130,
            height: 130,
            border: "4px solid #9DB25D"
          }}
        />
        {/* شارة "جديد" أو حالة اليتيم */}
        <Chip 
          label="جديد" 
          size="small"
          sx={{
            position: "absolute",
            bottom: 5,
            right: 0,
            bgcolor: "#C696D1",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.7rem"
          }}
        />
      </Box>

      <Card
        sx={{
          width: 340,
          borderRadius: "32px",
          textAlign: "center",
          pt: 9,
          pb: 4,
          px: 2,
          boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.02)",
          background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAF2 100%)"
        }}
      >
        <CardContent>
          {/* الاسم */}
          <Typography 
            variant="h5" 
            fontWeight="800" 
            sx={{ color: "#1A1C18", mb: 2 }}
          >
            {data.name}
          </Typography>

          {/* معلومات سريعة (العمر والجنس) */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
            <Chip 
              icon={<Cake sx={{ fontSize: "1rem !important" }} />} 
              label={data.age} 
              variant="outlined"
              sx={{ borderRadius: "12px", border: "none", bgcolor: "#F4F4EC" }}
            />
            <Chip 
              icon={<Person sx={{ fontSize: "1rem !important" }} />} 
              label={data.gender} 
              variant="outlined"
              sx={{ borderRadius: "12px", border: "none", bgcolor: "#F4F4EC" }}
            />
          </Box>

          {/* المكان */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, color: "#45483A", mb: 2 }}>
            <LocationOn sx={{ fontSize: "1.2rem", color: "#9DB25D" }} />
            <Typography variant="body2" fontWeight="500">
              {data.place}
            </Typography>
          </Box>

          {/* الوصف القصير */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: "#6D7160", 
              fontStyle: "italic", 
              lineHeight: 1.6,
              mb: 4,
              px: 1
            }}
          >
            "{data.description}"
          </Typography>

          {/* زر الكفالة المحدث */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/sponsor-form")}
            sx={{
              py: 1.8,
              bgcolor: "#9DB25D",
              borderRadius: "20px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 8px 16px rgba(157, 178, 93, 0.3)",
              "&:hover": {
                bgcolor: "#8aa84f",
                boxShadow: "0 12px 20px rgba(157, 178, 93, 0.4)"
              },
              transition: "all 0.3s ease"
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