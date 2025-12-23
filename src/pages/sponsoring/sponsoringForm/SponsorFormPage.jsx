import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import SponsorInfo from "./SponsorInfo";
import SponsoringInfo from "./SponsoringInfo";
import Authorized from "./AuthorizedPersonInfo";
import { Container } from "@mui/material";

const SponsorFormPage = () => {
    const [data, setData] = useState({
        sponsor: {},
        sponsoring: {},
        agent: {}
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const selectedOrphan = JSON.parse(
            localStorage.getItem("selectedOrphan")
        );

        if (selectedOrphan) {
            setData((prev) => ({
                ...prev,
                sponsoring: {
                    ...prev.sponsoring,
                    orphanId: selectedOrphan.orphanId,
                    sponsoringType: selectedOrphan.sponsoringType,
                },
            }));
        }
    }, []);
    const validateAll = () => {
        let temp = {};

        // Sponsor
        if (!data.sponsor?.id) temp.sponsorId = "رقم الهوية مطلوب";
        if (!data.sponsor?.name) temp.sponsorName = "الاسم مطلوب";
        if (!data.sponsor?.gender) temp.sponsorGender = "الجنس مطلوب";
        if (!data.sponsor?.father) temp.sponsorFather = "اسم الاب مطلوب";
        if (!data.sponsor?.grandfather) temp.sponsorGrandFather = "اسم الجد مطلوب";
        if (!data.sponsor?.family) temp.sponsorFamily = "اسم العائلة مطلوب";
        if (!data.sponsor?.workType) temp.sponsorWorkType = "نوع العمل مطلوب";
        if (!data.sponsor?.country) temp.sponsorCountry = "اسم الدولة مطلوب";
        if (!data.sponsor?.cityName) temp.sponsorCityName = "اسم المدينة مطلوب";
        if (!data.sponsor?.streetName) temp.sponsorStreetName = "اسم الشارع مطلوب";
        if (!data.sponsor?.MobilePhone) temp.sponsorMobilePhone = "رقم الجوال مطلوب";

        // Sponsoring
        if (!data.sponsoring?.monthlyAmount)
            temp.monthlyAmount = "قيمة الكفالة مطلوبة";

        if (!data.sponsoring?.startDate)
            temp.startDate = "تاريخ البداية مطلوب";

        if (!data.sponsoring?.paymentMethod)
            temp.paymentMethod = "طريقة الدفع مطلوبة";

        if (data.sponsoring?.paymentMethod === "bank") {
            if (!data.sponsoring.bankName)
                temp.bankName = "اسم البنك مطلوب";
            if (!data.sponsoring.accountNumber)
                temp.accountNumber = "رقم الحساب مطلوب";
        }

        // Authorized
        if (!data.agent?.name) temp.agentName = "اسم المفوض مطلوب";
        if (!data.agent?.father) temp.agentFather = "اسم الاب مطلوب";
        if (!data.agent?.grandfather) temp.agentGrandFather = "اسم الجد مطلوب";
        if (!data.agent?.family) temp.agentFamily = "اسم العائلة مطلوب";
        if (!data.agent?.kinship) temp.agentKinship = "صلة القرابة مطلوبة";
        if (!data.agent?.MobilePhone) temp.agentMobilePhone = "رقم الجوال مطلوب";
        if (!data.agent?.country) temp.agentCountry = "اسم الدولة مطلوب";
        if (!data.agent?.cityName) temp.agentCityName = "اسم المدينة مطلوب";
        if (!data.agent?.streetName) temp.agentStreetName = "اسم الشارع مطلوب";

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleSubmit = () => {
        if (!validateAll()) return;

        localStorage.setItem(
            "sponsoringFormData",
            JSON.stringify(data)
        );
    };

    return (
        <Container maxWidth={10}>
            <Typography textAlign={"center"} variant="h4" marginTop={5}>طلب كفالة</Typography>
            <SponsorInfo data={data} setData={setData} errors={errors} />
            <SponsoringInfo data={data} setData={setData} errors={errors} />
            <Authorized data={data} setData={setData} errors={errors} />

            <Box sx={{ textAlign: "center", mt: 6, mb: 6 }}>
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        px: 9,
                        py: 1.8,
                        fontSize: "1.1rem",
                        borderRadius: 3
                    }}
                    onClick={handleSubmit}
                >
                    ✔️ مصادقة وارسال
                </Button>
            </Box>
        </Container>
    );
};


export default SponsorFormPage;
