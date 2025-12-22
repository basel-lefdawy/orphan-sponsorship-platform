import { useEffect, useState } from "react";
import headerImage from "../../../assets/orphans.jpg";
import './header.css'
import orphansData from "../../../dataOrphans/dataOrphans";
import activities from "../../dataActivities/activitiesData";
import { Grid } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CelebrationIcon from '@mui/icons-material/Celebration';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {  IconButton } from "@mui/material";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box
} from "@mui/material";


const images=
[
  "https://modo3.com/thumbs/fit630x300/252784/1561377629/%D8%A3%D9%81%D9%83%D8%A7%D8%B1_%D9%81%D8%B9%D8%A7%D9%84%D9%8A%D8%A7%D8%AA_%D8%AA%D8%B1%D9%81%D9%8A%D9%87%D9%8A%D8%A9_%D9%84%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84.jpg",
  "https://static.sayidaty.net/styles/900_scale/public/2024-04/low-angle-portrait-of-smiling-multi-cultural-child-2023-11-27-04-55-10-utc_0.jpg.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrMWKCrSBUm_x5OuauZOCy16R1JgjQO5UVVg&s",
  "https://windroseacademy.edu.eg/wp-content/uploads/2018/02/Happy-pyjama-day.jpg",
  "https://www.al-monitor.com/sites/default/files/styles/newsletter/public/2024-10/8bc138ca68766a8a07e842f47edb64e6bc4eb4f1.jpg?itok=o-ddZjcv",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYTfgCWuFgB5o0MVj7Pz19w23lyW-H23w7XQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSRmUQjFTgcYwsOaOPPlG6OLadkVoeWC7wig&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1-r5SOCzh3UUTGXATrYrc8BEumCDSN3aJUg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgam-1RDNwJMMSosMONPWfErQBRw6_4qrbNQ&s",
];








 function OrphanCard({orphan}) {
  return (
    <Box sx={{ position: "relative", mt: 10 }}>
      
      {/* Avatar */}
      <Avatar src="/broken-image.jpg" sx=
      {
        {

                width:115,
                height:115,
                position:"absolute",
                top:-80,
                insetInlineStart: "50%",
                transform: "translateX(-50%)",

        }
      } />

      {/* Card */}
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
            {orphan.gender}-{orphan.age} سنوات
          </Typography>

          <Typography variant="body2" mt={1}>
              المكان :{orphan.country} - {orphan.city} 
          </Typography>

          <Button
            variant="contained"
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


function ActivityCard({ activity }) {
  return (
    <Box sx={{ mt: 6 }}>
      <Card
        sx={{
          width: 320,
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          overflow: "hidden"
        }}
      >
        {/* صورة النشاط */}
        <Box
          component="img"
          src={activity.images[0]}
          alt={activity.title}
          sx={{
            width: "100%",
            height: 180,
            objectFit: "cover"
          }}
        />

        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {activity.title}
          </Typography>

          <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            overflow: "hidden"
          }}
        >
          {activity.description}
        </Typography>

          <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
            📍 {activity.location}
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}




function Counter({target})
{
  const [count,setCount]=useState(0);
  
  useEffect(()=>
  {
    if(count<target)
    {
     const timer= setTimeout
      (()=>
      {
          setCount(count+5);
          return () => clearTimeout(timer);
      },20);
    }
    
  },[count])
   return <Typography variant="h4" sx={{color:"white"}}>{count}</Typography>;
 
}






function StatsSection() {
  return (
    <Box sx={{ bgcolor: "#05843cff", py: 6, mt:8}}>
      <Grid container justifyContent="center" spacing={30}>

        <Grid item xs={12} md={4} textAlign="center">
          <Typography sx={{color: "#fff", fontWeight: "bold",mb:3}}>في الانتظار للكفالة</Typography>
          <Counter target={2100} />
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <Typography sx={{color: "#fff", fontWeight: "bold",mb:3}}>أيتام ومحتاجين</Typography>
          <Counter target={1408} />
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <Typography sx={{color: "#fff", fontWeight: "bold",mb:3}}>كفلاء</Typography>
          <Counter target={255} />
        </Grid>

      </Grid>
    </Box>
  );
}

const iconStyle = {
  color: "#2e7d32", // أخضر هادي
  fontSize: 22,
};


export default function Header()
{
     
return(

        <>
        <div className="navpar"></div>
       
        <div className="header">
            
            <img className="imgorphans" src={headerImage} alt="header" />
             <div className="header-overlay"></div>
            <div className="header-text">
                <h1>دار الايتام</h1>
                <p>معًا نمنح الأمل لكل طفل</p>
                
            <Button className="btn" variant="contained">
                    تبرع
            </Button>

            </div>
        </div>
        <section>
                          <div >
                            <div className="secdiv d">اكفل يتيم</div>
                            <h3 className="secdiv h">يتيم بانتظار كفالتك</h3>
                                                        
                            </div>   
                            <Grid container spacing={4} justifyContent="center">
                              
                              {orphansData.map((orphan) => (
                                <Grid item xs={12} sm={6} md={4} key={orphan.id}>
                                <OrphanCard
                                  orphan={orphan}
                                />
                                </Grid>
                              ))}
                              
                              </Grid>
                              <div>

   
                              <StatsSection/>




                                  <Typography
                                  variant="h3"
                                  sx={{ textAlign: "center", mt: 6 }}
                                >
                                  نشاطاتنا
                                </Typography>

                                <Grid container spacing={4} justifyContent="center">
                                  {activities.map((activity) => (
                                    <Grid item xs={12} sm={6} md={4} key={activity.id}>
                                      <ActivityCard activity={activity} />
                                    </Grid>
                                  ))}
                                </Grid>
                                   <Button
                                  variant="contained"
                                  sx={{
                                    mt: 6,
                                    mb:4,
                                    display: "block",
                                    mx:"auto",
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
                           
                             
            </section>
                              
                                  <footer>
                                    <Box sx={{bgcolor:"#f0f0f0",py:3,direction: "rtl"}}>
                                        <Grid container justifyContent="space-around" alignItems="flex-start">
                                          <Grid item  xs={12} md={3} sx={{display:"flex",flexDirection:"column",alignItems:"flex-start",width:200}}>
                                                <Typography sx={{fontSize:30}}>
                                                     معلومات.
                                                </Typography>
                                                  <Box sx={{fontSize:12,pt:3}}>
                                                  شركة دار يتيم LLC هي شركة أمريكية متخصصة في تقديم خدمات استشارات إدارة الأعمال، تأسست بهدف تمكين الأفراد والمؤسسات من تحقيق أعلى مستويات الكفاءة والنمو، من خلال حلول استراتيجية مبتكرة وخطط تطوير فعّالة تلبي متطلبات السوق وتواكب التحديات الحديثة.
                                                </Box>
                                                <Box>
                                                      {/* العنوان */}
                                                      <Box display="flex" alignItems="center" gap={1} sx={{pb:1,pt:2}} >
                                                        <LocationOnIcon sx={iconStyle} />
                                                        <Typography>
                                                          Nablus
                                                        </Typography>
                                                      </Box>

                                                      {/* الإيميل */}
                                                      <Box display="flex" alignItems="center" gap={1} sx={{pb:1}}>
                                                        <EmailIcon sx={iconStyle} />
                                                        <Typography>
                                                          info@darelyateem.org
                                                        </Typography>
                                                      </Box>

                                                      {/* الهاتف */}
                                                      <Box display="flex" alignItems="center" gap={1} sx={{pb:1}}>
                                                        <PhoneIcon sx={iconStyle} />
                                                        <Typography>
                                                          +1 917 563 6537
                                                        </Typography>
                                                      </Box>
                                                </Box>
  

                                          </Grid>
                                          
                                          <Grid item  xs={12} md={3} sx={{display:"flex",flexDirection:"column",alignItems:"flex-start",width:200,height:100}}>
                                          <Typography sx={{fontSize:20}}>
                                            ألبوم الصور.
                                          </Typography>
                                             <Box
                                              sx={{
                                                display: "grid",
                                                gridTemplateColumns: "repeat(3, 1fr)",
                                                gap: 1,
                                                pt:3,
                                              }}
                                            >
                                              {images.map((img, i) => (
                                                <Box
                                                  key={i}
                                                  component="img"
                                                  src={img}
                                                  sx={{
                                                    width: 80,
                                                    height: 80,
                                                    objectFit: "cover",
                                                    borderRadius: 1,
                                                  }}
                                                />
                                              ))}
                                            </Box>
                                          </Grid>
  
                                          <Grid item  xs={12} md={3} sx={{display:"flex",flexDirection:"column",alignItems:"flex-start",width:200,height:100}}>
                                              <Typography sx={{fontSize:20}}>
                                                أهم الروابط.
                                              </Typography>
                                           <Box sx={{pt:3}}>
                                         
                                            <Box sx={{mb:3}}>
                                               <HomeIcon />
                                              <Button sx={{mt:-2}} href="#text-buttons" color="success">الرئيسية</Button>
                                            </Box>
                                            
                                            <Box sx={{mb:3}}>
                                              <CelebrationIcon/>
                                              <Button sx={{mt:-2}} href="#text-buttons" color="success">الأنشطة</Button>
                                            </Box>
                                            
                                                <Box sx={{mb:3}}>
                                                    <VolunteerActivismIcon/>
                                                    <Button sx={{mt:-2}} href="#text-buttons" color="success">التبرع</Button>
                                                </Box>
                                            
                                           </Box>

                                          </Grid>
                                           
                                          <Grid item  xs={12} md={3} sx={{display:"flex",flexDirection:"column",alignItems:"flex-start",width:230,height:100}}>
                                              <Typography sx={{fontSize:20}}>
                                                تابعنا على مواقع التواصل الإجتماعي.
                                              </Typography>
                                           <Box sx={{ display: "flex", gap: 2 ,mt:2}}>
                                            <IconButton
                                              href="https://facebook.com"
                                              target="_blank"
                                              sx={{ color: "#1877F2" }}
                                            >
                                              <FacebookIcon fontSize="large" />
                                            </IconButton>

                                            <IconButton
                                              href="https://instagram.com"
                                              target="_blank"
                                              sx={{ color: "#E4405F" }}
                                            >
                                              <InstagramIcon fontSize="large" />
                                            </IconButton>

                                            <IconButton
                                              href="https://twitter.com"
                                              target="_blank"
                                              sx={{ color: "#1DA1F2" }}
                                            >
                                              <TwitterIcon fontSize="large" />
                                            </IconButton>
                                          </Box>
                                          </Grid>
                                          
                                        </Grid>
                                    </Box>
                                    
                                  </footer>
        </>
)

}
