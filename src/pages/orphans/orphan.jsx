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
      <Box sx={{ textAlign: "center", mb: 5 }}>

        <Typography variant="h4" color="success" fontWeight="bold" sx={{ fontFamily: "Cairo" }} >
          تكفل يتيم
        </Typography>

        <Typography fontWeight="bold" sx={{ fontSize: 18, fontFamily: "Cairo" }}>
          اختر اليتيم الذي ترغب في كفالته من بين الأطفال المحتاجين للدعم والرعاية.
        </Typography>

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
            type={orphan.type}
          />
        ))}

      </Box> {/* نهاية بطاقات الايتام */}

    </Box>// للعنوان والبطاقات
  )
}

export default Orphan