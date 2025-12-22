import orphanData from '../pages/orphans/data';
import { useParams } from "react-router-dom";
import {Box ,Typography ,Button} from '@mui/material';

function Details (){
 
    const { id } = useParams();
    const orphan = orphanData.find((orphan) => orphan.id === Number(id));
if(!orphan)
    {    // اذا ما لقيت اليتيم
        return <Typography variant="h4">اليتيم غير موجود</Typography>

    }
return(
    // صندوق تفاصيل اليتيم
    <Box sx={{
     width:"30%",
     mx:"auto",
      my:4,
       p:3,
      boxShadow:"0 1px 3px rgba(143, 144, 144, 0.76)", 
      borderRadius:"20px",
      backgroundColor:"#e4eed8ff",
    }}
    >
     {/* صورة اليتيم  */}
     <img 
      src={orphan.image}
      alt={orphan.name} 
     style={{width:"50%", 
        display:"block", 
        margin:"0 auto", 
        borderRadius:"10px",
    }} 
        />

       {/* اسم اليتيم */} 
    <Typography variant="h4" sx={{
    display:"block",
     textAlign:"center",
      fontFamily: "Cairo",
    lineHeight: 2,
    }}>
        {orphan.name}
    </Typography>

    {/* وصف اليتيم */}
    <Typography variant="body1" sx={{
    mb:2, 
    textAlign:"center",
     fontFamily: "Cairo",
    fontSize: "16px",
    }}>
        {orphan.description}
    </Typography>


    {/* عبارة تشجيعية للكفالة */}
    <Typography variant="body1" sx={{
     mb:2, 
    textAlign:"center", 
    fontWeight:"bold",
    fontFamily: "Cairo",
    lineHeight: 2,
    fontSize: "16px",
    textAlign: "center",}}>
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
    backgroundColor: "#3aa970ff",
    "&:hover": {
      backgroundColor: "#2d8f66ff",
    },
  }}
>   
   اكفل اليتيم 
  </Button>
      </Box>


);
}
export default Details;



