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


const SponsoringInfo = ({ data = {}, setData, errors = {} }) => {
    const sponsoring = data.sponsoring || {};

    const handleChange = (e) => {
        setData({
            ...data,
            sponsoring: {
                ...sponsoring,
                [e.target.name]: e.target.value
            }
        });
    };

    return (
        <Box sx={{ mt: 6 }} dir="rtl">
            <Typography borderBottom={"#e0e0e0 2px solid"} marginBottom={3} variant="h5">تفاصيل الكفالة </Typography>

            <Grid container spacing={3}>
                {/* قيمة الكفالة */}
                <Grid item xs={12} sm={6} md={4} sx={{ minWidth: 300 }}>
                    <TextField
                        label="قيمة الكفالة الشهرية"
                        name="monthlyAmount"
                        type="number"
                        value={sponsoring.monthlyAmount || ""}
                        onChange={handleChange}
                        error={Boolean(errors.monthlyAmount)}
                        helperText={errors.monthlyAmount}
                        fullWidth
                    />
                </Grid>

                {/* تاريخ البدء */}
                <Grid item xs={12} sm={6} md={4} sx={{ minWidth: 300 }}>
                    <TextField
                        label="تاريخ بدء الكفالة"
                        name="startDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={sponsoring.startDate || ""}
                        onChange={handleChange}
                        error={Boolean(errors.startDate)}
                        helperText={errors.startDate}
                        fullWidth
                    />
                </Grid>

                {/* تاريخ الانتهاء */}
                <Grid item xs={12} sm={6} md={4} sx={{ minWidth: 300 }}>
                    <TextField
                        label="تاريخ انتهاء الكفالة"
                        name="endDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={sponsoring.endDate || ""}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>

                {/* طريقة الدفع */}
                <Grid item xs={12} sm={6} md={4} sx={{ minWidth: 300 }}>
                    <FormControl
                        fullWidth
                        error={Boolean(errors.paymentMethod)}
                    >
                        <InputLabel>طريقة الدفع</InputLabel>
                        <Select
                            name="paymentMethod"
                            value={sponsoring.paymentMethod || ""}
                            label="طريقة الدفع"
                            onChange={handleChange}
                        >
                            <MenuItem value="cash">نقدي</MenuItem>
                            <MenuItem value="bank">بنك</MenuItem>
                        </Select>

                        {errors.paymentMethod && (
                            <Typography variant="caption" color="error">
                                {errors.paymentMethod}
                            </Typography>
                        )}
                    </FormControl>
                </Grid>


                {sponsoring.paymentMethod === "bank" && (
                    <>
                        <Grid item xs={12} sm={6} md={4} sx={{ minWidth: 300 }}>
                            <TextField
                                label="اسم البنك"
                                name="bankName"
                                value={sponsoring.bankName || ""}
                                onChange={handleChange}
                                error={Boolean(errors.bankName)}
                                helperText={errors.bankName}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} sx={{ minWidth: 300 }}>
                            <TextField
                                label="رقم الحساب"
                                name="accountNumber"
                                value={sponsoring.accountNumber || ""}
                                onChange={handleChange}
                                error={Boolean(errors.accountNumber)}
                                helperText={errors.accountNumber}
                                fullWidth
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
};

export default SponsoringInfo;
