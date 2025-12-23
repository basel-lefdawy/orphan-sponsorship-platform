import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import boyImg from "../../assets/images/Sponsoring/boy.jpeg";
import girlImg from "../../assets/images/Sponsoring/girl.jpeg";

function Details() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [orphan, setOrphan] = useState(null);

    useEffect(() => {
        const storedOrphans =
            JSON.parse(localStorage.getItem("currentOrphans")) || [];

        const foundOrphan = storedOrphans.find(
            (o) => o.id === Number(id)
        );

        setOrphan(foundOrphan);
    }, [id]);

    if (!orphan) {
        return (
            <Typography variant="h4" textAlign="center">
                اليتيم غير موجود
            </Typography>
        );
    }


    const imageSrc = orphan.gender === "ذكر" ? boyImg : girlImg;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Box
                sx={{
                    width: { xs: "90%", sm: "60%", md: "30%" },
                    p: 3,
                    boxShadow: "0 1px 3px rgba(143, 144, 144, 0.76)",
                    borderRadius: "20px",
                    backgroundColor: "#e4eed8ff",
                }}
            >
                {/* صورة اليتيم */}
                <img
                    src={imageSrc}
                    alt={orphan.name}
                    style={{
                        width: "50%",
                        display: "block",
                        margin: "0 auto",
                        borderRadius: "10px",
                    }}
                />

                {/* الاسم */}
                <Typography
                    variant="h4"
                    textAlign="center"
                    fontFamily="Cairo"
                    lineHeight={2}
                >
                    {orphan.name}
                </Typography>

                {/* الوصف */}
                <Typography
                    variant="body1"
                    textAlign="center"
                    fontFamily="Cairo"
                    mb={2}
                >
                    {orphan.description}
                </Typography>

                {/* عبارة تشجيعية */}
                <Typography
                    variant="body1"
                    textAlign="center"
                    fontWeight="bold"
                    fontFamily="Cairo"
                    mb={3}
                >
                    "اكفلني الآن لتكون جزءًا من قصتي كيتيم، ولترى كيف يمكن لدعمك أن يغيّر حياتي."
                </Typography>

                {/* زر الكفالة */}
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        borderRadius: "20px",
                        px: 3,
                        fontWeight: "bold",
                        display: "flex",
                        mx: "auto",
                        backgroundColor: "#3aa970ff",
                        "&:hover": {
                            backgroundColor: "#2d8f66ff",
                        },
                    }}
                    onClick={() => {
                        localStorage.setItem(
                            "selectedSponsoringData",
                            JSON.stringify({
                                orphanId: orphan.id,
                                sponsoringType: orphan.sponsoringType,
                            })
                        );

                        navigate("/SponsorFormPage");
                    }}
                >
                    اكفل اليتيم
                </Button>
            </Box>
        </Box>
    );
}


export default Details;
