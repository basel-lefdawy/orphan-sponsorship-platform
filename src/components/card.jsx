import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia,  Button, Typography, Box } from "@mui/material";

function OrphanCard({id, name, gender, age, place, image, type}) {
    const navigate = useNavigate();
  
    return (
    
     <Card
     // خصائص الكارد بشكل عام 
      sx={{ 
        width: 260, 
         pt:1,
         pb:.5,
         m:1,
         boxShadow: "0 8px 20px rgba(85, 95, 85, 0.45)",
         borderRadius: "30px",
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',  
         textAlign: 'center',  

         "&:hover": {
           transform: "scale(1.05)",
          
         },
         
           
      }}>
      {/* صورة اليتيم */}
       <CardMedia
        component="img"
        image={image}
        alt={name}
         sx={{
          width: 100,
          height: 100,

       }}
      />

      {/* معلومات اليتيم */}
      <CardContent>
        <Typography variant="h6" sx={{ fontFamily: "Cairo"}}><b>{name}</b></Typography>
        <Typography variant="body2" sx={{ fontFamily: "Cairo"}}>  {gender} - {age} سنوات </Typography>
        <Typography variant="body2" sx={{ fontFamily: "Cairo"}}>المكان: {place}</Typography>
        <Typography variant="body2" sx={{ fontFamily: "Cairo", fontWeight: "bold", color: "#2c714dff" }}>نوع الكفالة: {type}</Typography>
      </CardContent>



    {/*زر التفاصيل   */}
<Button
 // بس اكبس على كبسة التفاصيل يوديني على صفحة التفاصيل
   onClick={() => navigate(`/orphans/details/${id}`)}
  variant="contained"
  color="success"
  sx={{
    borderRadius: "20px",
    px: 2.1,
    fontWeight: "bold",
    backgroundColor: "#9DB25D",
    "&:hover": {
      backgroundColor: "#207a54ff",
    },
  }}
>   
    تفاصيل اليتيم
  </Button>
    </Card>
  )
}

export default OrphanCard



