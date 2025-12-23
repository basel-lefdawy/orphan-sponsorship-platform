import { Grid, Container } from "@mui/material";
import CategoryCard from "./CategoryCard";
import orphan1Img from "../../../assets/images/Sponsoring/social.jpeg";
import orphan2Img from "../../../assets/images/Sponsoring/full.jpeg";
import orphan3Img from "../../../assets/images/Sponsoring/education.jpeg";
import orphan4Img from "../../../assets/images/Sponsoring/medical.jpeg";

const Cards = () => {
    return (
        <Container maxWidth={10}>
            <Grid
                container
                spacing={4}
                justifyContent="flex-start"
                dir="rtl"
            >
                <Grid item>
                    <CategoryCard
                        title="كفالة طالب علم"
                        image={orphan3Img}
                        type="education"
                    />
                </Grid>

                <Grid item>
                    <CategoryCard
                        title="كفالة حالة مرضية"
                        image={orphan4Img}
                        type="medical"
                    />
                </Grid>

                <Grid item>
                    <CategoryCard
                        title="كفالة حالة اجتماعية"
                        image={orphan1Img}
                        type="social"
                    />
                </Grid>

                <Grid item>
                    <CategoryCard
                        title="كفالة شاملة لليتيم"
                        image={orphan2Img}
                        type="full"
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cards;
