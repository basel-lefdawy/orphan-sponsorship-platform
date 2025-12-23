import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import OrphanCard from "../../components/card";
import SectionHeader from "./SectionHeader";
import boyImg from "../../assets/images/Sponsoring/boy.jpeg";
import girlImg from "../../assets/images/Sponsoring/girl.jpeg";

const API_MAP = {
    social: "https://mocki.io/v1/dc5abc59-62d0-4610-b112-0d80cefbc36f",
    education: "https://mocki.io/v1/6557c673-f54d-4288-adbd-20fb787e8dfd",
    medical: "https://mocki.io/v1/b035da8e-d119-48ff-839a-797af26af401",
    full: "https://mocki.io/v1/7b4d5d75-2e5f-4553-a1b6-28d4c9909365",
};

const OrphansByCategoryPage = () => {
    const { type } = useParams();
    const [orphans, setOrphans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = API_MAP[type];
        if (!url) return;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const orphansArray = Array.isArray(data)
                    ? data
                    : data[type] || [];
                setOrphans(orphansArray);
                localStorage.setItem("currentOrphans", JSON.stringify(orphansArray));
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [type]);

    if (loading) {
        return <Typography textAlign="center">جاري تحميل البيانات...</Typography>;
    }
    const titles = {
        social: "حالات الأيتام – كفالة اجتماعية",
        education: "حالات الأيتام – كفالة تعليمية",
        medical: "حالات الأيتام – كفالة طبية",
        full: "حالات الأيتام – كفالة شاملة",
    };

    const pageTitle = titles[type] || "   حالات الأيتام";
    return (
        <Box sx={{ p: 4 }}>
            <SectionHeader title={pageTitle} textAlign={"center"}></SectionHeader>

            <Grid container justifyContent="center">
                {orphans.map((orphan) => {
                    const imageSrc = orphan.gender === "ذكر" ? boyImg : girlImg;

                    return (
                        <OrphanCard
                            key={orphan.id}
                            id={orphan.id}
                            name={orphan.name}
                            gender={orphan.gender}
                            age={orphan.age}
                            place={orphan.place}
                            image={imageSrc}
                            type={orphan.sponsoringType}
                        />
                    );
                })}
            </Grid>
        </Box>
    );
};

export default OrphansByCategoryPage;