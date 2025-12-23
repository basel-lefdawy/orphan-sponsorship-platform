import Cards from "./Categories/Cards";
import SectionHeader from "./SectionHeader";
import { Grid, Container } from "@mui/material";

const SponsoringPage = () => {
    return (
        <>
            <Container maxWidth={10}>
                <SectionHeader title="حالات الايتام" textAlign={"right"}></SectionHeader>
                <Cards></Cards>
            </Container>
        </>
    )
}
export default SponsoringPage;