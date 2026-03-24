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

const Authorized = ({ data, setData, errors = {} }) => {

    const authorized = data.agent || {};

    const handleChange = (e) => {
        setData({
            ...data,
            agent: {
                ...authorized,
                [e.target.name]: e.target.value
            }
        });
    };

    return (
        <Box sx={{ mt: 6 }} dir="rtl" >
            <Typography borderBottom={"#e0e0e0 2px solid"} marginBottom={3} variant="h5">تفاصيل المفوض </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="رقم الهوية"
                        name="id"
                        value={authorized.id || ""}
                        onChange={handleChange}
                        error={Boolean(errors.agentId)}
                        helperText={errors.agentId}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="الاسم"
                        name="name"
                        value={authorized.name || ""}
                        onChange={handleChange}
                        error={Boolean(errors.agentName)}
                        helperText={errors.agentName}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="الأب"
                        name="father"
                        value={authorized.father || ""}
                        onChange={handleChange}
                        error={Boolean(errors.agentFather)}
                        helperText={errors.agentFather}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="الجد"
                        name="grandfather"
                        value={authorized.grandfather || ""}
                        onChange={handleChange}
                        error={Boolean(errors.agentGrandFather)}
                        helperText={errors.agentGrandFather}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="العائلة"
                        name="family"
                        value={authorized.family || ""}
                        onChange={handleChange}
                        error={Boolean(errors.agentFamily)}
                        helperText={errors.agentFamily}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 200 }}>
                    <TextField
                        label="نوع العمل"
                        name="workType"
                        value={authorized.workType || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <FormControl
                        fullWidth
                        error={Boolean(errors.agentGender)}
                    >
                        <InputLabel>الجنس</InputLabel>
                        <Select
                            name="gender"
                            value={authorized.gender || ""}
                            label="الجنس"
                            onChange={handleChange}
                        >
                            <MenuItem value="male">ذكر</MenuItem>
                            <MenuItem value="female">أنثى</MenuItem>
                        </Select>
                        {errors.agentGender && (
                            <Typography variant="caption" color="error">
                                {errors.agentGender}
                            </Typography>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="صلة القرابة مع الكفيل"
                        name="kinship"
                        value={authorized.kinship || ""}
                        onChange={handleChange}
                        error={Boolean(errors.agentKinship)}
                        helperText={errors.agentKinship}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="رقم الجوال"
                        name="MobilePhone"
                        value={authorized.MobilePhone || ""}
                        onChange={handleChange}
                        error={Boolean(errors.agentMobilePhone)}
                        helperText={errors.agentMobilePhone}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="الدولة"
                        name="country"
                        value={authorized.country || ""}
                        onChange={handleChange}
                        error={Boolean(errors.agentCountry)}
                        helperText={errors.agentCountry}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 300 }}>
                    <TextField
                        label="المدينة"
                        name="cityName"
                        value={authorized.cityName || ""}
                        onChange={handleChange}
                        error={Boolean(errors.agentCityName)}
                        helperText={errors.agentCityName}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 200 }}>
                    <TextField
                        label="الشارع"
                        name="streetName"
                        value={authorized.streetName || ""}
                        onChange={handleChange}
                        error={Boolean(errors.agentStreetName)}
                        helperText={errors.agentStreetName}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Authorized;
