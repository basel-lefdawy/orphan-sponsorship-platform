import { useParams } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { fetchOrphans } from "../services/apis";
import { useEffect, useState } from "react";


function Details() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [orphan, setOrphan] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);

    fetchOrphans()
      .then((data) => {

        // تحويل id إلى رقم لأن useParams يرجع string
        // حطيت -1 لانو زدت واحد عند الاي دي في الكارد
        const orphanIndex = Number(id) - 1;

        // استخدام index مباشرة للوصول للبيانات
        if (orphanIndex >= 0 && orphanIndex < data.length) {
          const found = data[orphanIndex];
          setOrphan(found);
        } else {
          setOrphan(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography>جاري تحميل البيانات...</Typography>
      </Box>
    );
  }

  if (!orphan) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10, p: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          غير موجود
        </Typography>

        <Typography sx={{ mb: 2 }}
        >الرقم {id} غير مسجل
        </Typography>

        <Button variant="contained" onClick={() => navigate('/')}>
          ← الصفحة الرئيسية
        </Button>
      </Box>
    );
  }

  return (
    // صندوق تفاصيل اليتيم
    <Box sx={{
      width: { xs: "90%", sm: "80%", md: "60%", lg: "25%" },
      mx: "auto",
      my: 4,
      p: { xs: 2, md: 3 },
      boxShadow: "0 1px 3px rgba(143, 144, 144, 0.76)",
      borderRadius: "20px",
      backgroundColor: "#e4eed8ff",
    }}
    >
      {/* صورة اليتيم  */}
      <img
        src={orphan.image}
        alt={orphan.name}
        style={{
          width: "50%",
          display: "block",
          margin: "0 auto",
          borderRadius: "10px",
        }}
      />

      {/* اسم اليتيم */}
      <Typography variant="h4" sx={{
        display: "block",
        textAlign: "center",
        fontFamily: "Cairo",
        lineHeight: 2,
      }}>
        {orphan.name}
      </Typography>

      {/* وصف اليتيم */}
      <Typography variant="body1" sx={{
        mb: 2,
        textAlign: "center",
        fontFamily: "Cairo",
        fontSize: "16px",
      }}>
        {orphan.description}
      </Typography>


      {/* عبارة تشجيعية للكفالة */}
      <Typography variant="body1" sx={{
        mb: 2,
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Cairo",
        lineHeight: 2,
        fontSize: "16px",
      }}>
        "اكفلني الآن لتكون جزءًا من قصتي كيتيم، ولترى كيف يمكن لدعمك أن يغيّر حياتي."
      </Typography>
      {/* زر الكفالة */}
      <Button
        variant="contained"

        color="success"
        sx={{
          borderRadius: "20px",
          px: 2.1,
          fontWeight: "bold",
          display: "flex",
          mx: "auto",
          backgroundColor: "#9DB25D",
          "&:hover": {
            backgroundColor: "#2d8f66ff",
          },
        }}
        onClick={() => {
          localStorage.setItem(
            "selectedOrphan",
            JSON.stringify({
              orphanId: orphan.id,
              sponsoringType: orphan.sponsoringType,
            })
          );
          navigate("/sponsor-form");
        }}
      >
        اكفل اليتيم
      </Button>
    </Box >


  );
}
export default Details;



