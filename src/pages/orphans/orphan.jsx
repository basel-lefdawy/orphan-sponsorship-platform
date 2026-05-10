import OrphanCard from '../../components/card';
import { useEffect, useState } from 'react';
import { fetchOrphans } from "../../services/apis";
import { Box, Typography } from '@mui/material';


function Orphan() {
  const [orphans, setOrphans] = useState([]);

  useEffect(() => {
    fetchOrphans()
      .then((data) => {
        setOrphans(data);
      })
      .catch((error) => {
        console.error("API ERROR:", error);
      });
  }, []);

  return (

    // لعنوان والبطاقات
    <Box sx={{ px: 2, py: 4 }}>
      {/* العنوان */}
      <Box
  sx={{
    textAlign: "center",
    mb: 6,
    mt: 4,
    px: 2
  }}
>
  <Typography variant="h4"
    sx={{
      fontFamily: "Cairo",
      fontWeight: "800",
      color: "#2e7d32", 
      mb: 1,
      letterSpacing: "0.5px"
    }}
  >
    اكفل يتيم
  </Typography>

  <Typography
    sx={{
      fontFamily: "Cairo",
      fontSize: "1.1rem",
      color: "#45483A", 
      maxWidth: "600px",
      mx: "auto",
      lineHeight: 1.8
    }}
  >
    اختر اليتيم الذي ترغب في كفالته من بين الأطفال المحتاجين للدعم والرعاية.
  </Typography>

  {/* خط تحت العنوان */}
  <Box
    sx={{
      width: "60px",
      height: "4px",
      bgcolor: "#9DB25D",
      mx: "auto",
      mt: 2,
      borderRadius: "10px"
    }}
  />
  </Box>

      {/* بطاقات الايتام */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", // بالنص
          gap: { xs: 1, sm: 2, md: 4 },
          px: { xs: 1, sm: 2, md: 4 },
          py: { xs: 3, md: 6 },
        }}

      >
        {orphans.map((orphan, index) => (
          <OrphanCard
            key={`orphan-${index}`}
            id={index + 1}
            name={orphan.name}
            image={orphan.image}
            age={orphan.age}
            gender={orphan.gender}
            place={orphan.place}
            description={orphan.description}
         
          />
        ))}

      </Box> {/* نهاية بطاقات الايتام */}

    </Box>// للعنوان والبطاقات
  )
}

export default Orphan