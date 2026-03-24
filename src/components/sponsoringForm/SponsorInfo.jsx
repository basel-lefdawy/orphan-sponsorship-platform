import {
    Box,
    Grid,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";


const SponsorInfo = ({ data, setData, errors = {} }) => {

    const sponsor = data.sponsor || {};

    const handleChange = (e) => {
        setData({
            ...data,
            sponsor: {
                ...sponsor,
                [e.target.name]: e.target.value
            }
        });
    };

    return (
        <Box sx={{ mt: 4 }} dir="rtl">
            <Typography borderBottom={"#e0e0e0 2px solid"} marginBottom={3} variant="h5">تفاصيل الكفيل </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="رقم الهوية"
                        name="id"
                        value={sponsor.id || ""}
                        onChange={handleChange}
                        error={Boolean(errors.sponsorId)}
                        helperText={errors.sponsorId}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="الاسم"
                        name="name"
                        value={sponsor.name || ""}
                        onChange={handleChange}
                        error={Boolean(errors.sponsorName)}
                        helperText={errors.sponsorName}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="الأب"
                        name="father"
                        value={sponsor.father || ""}
                        onChange={handleChange}
                        error={Boolean(errors.sponsorFather)}
                        helperText={errors.sponsorFather}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="الجد"
                        name="grandfather"
                        value={sponsor.grandfather || ""}
                        onChange={handleChange}
                        error={Boolean(errors.sponsorGrandFather)}
                        helperText={errors.sponsorGrandFather}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="العائلة"
                        name="family"
                        value={sponsor.family || ""}
                        onChange={handleChange}
                        error={Boolean(errors.sponsorFamily)}
                        helperText={errors.sponsorFamily}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 210 }}>
                    <TextField
                        label="تاريخ الميلاد"
                        name="birthDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={sponsor.birthDate || ""}
                        onChange={handleChange}
                        error={Boolean(errors.sponsorBirthDate)}
                        helperText={errors.sponsorBirthDate}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="نوع العمل"
                        name="workType"
                        value={sponsor.workType || ""}
                        onChange={handleChange}
                        error={Boolean(errors.sponsorWorkType)}
                        helperText={errors.sponsorWorkType}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="الدولة"
                        name="country"
                        value={sponsor.country || ""}
                        onChange={handleChange}
                        error={Boolean(errors.sponsorCountry)}
                        helperText={errors.sponsorCountry}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="المدينة"
                        name="cityName"
                        value={sponsor.cityName || ""}
                        onChange={handleChange}
                        error={Boolean(errors.sponsorCityName)}
                        helperText={errors.sponsorCityName}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="الشارع"
                        name="streetName"
                        value={sponsor.streetName || ""}
                        onChange={handleChange}
                        error={Boolean(errors.sponsorStreetName)}
                        helperText={errors.sponsorStreetName}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="رقم الجوال"
                        name="MobilePhone"
                        value={sponsor.MobilePhone || ""}
                        onChange={handleChange}
                        error={Boolean(errors.sponsorMobilePhone)}
                        helperText={errors.sponsorMobilePhone}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 210 }}>
                    <TextField
                        label="الهاتف"
                        name="LandlinePhone"
                        value={sponsor.LandlinePhone || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="البريد الالكتروني"
                        name="email"
                        value={sponsor.email || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <FormControl
                        fullWidth
                        error={Boolean(errors.sponsorGender)}
                    >
                        <InputLabel>الجنس</InputLabel>
                        <Select
                            name="gender"
                            value={sponsor.gender || ""}
                            label="الجنس"
                            onChange={handleChange}
                        >
                            <MenuItem value="male">ذكر</MenuItem>
                            <MenuItem value="female">أنثى</MenuItem>
                        </Select>
                        {errors.sponsorGender && (
                            <Typography variant="caption" color="error">
                                {errors.sponsorGender}
                            </Typography>
                        )}
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SponsorInfo;
