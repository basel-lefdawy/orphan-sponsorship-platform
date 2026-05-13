import { useMemo, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import {
    Box,
    Typography,
    Paper,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Link,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { hasSignUpErrors, validateSignUpForm } from "../../utils/validation";

export default function SignUp() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const [touchedFields, setTouchedFields] = useState({
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const formErrors = useMemo(() => validateSignUpForm(formData), [formData]);
    const isFormValid = !hasSignUpErrors(formErrors);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (!touchedFields[name]) {
            setTouchedFields((prev) => ({
                ...prev,
                [name]: true,
            }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;

        setTouchedFields((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!isFormValid) return;

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.fullName,
                        email: formData.email,
                        password: formData.password,
                        confirmPassword: formData.confirmPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            alert(data.message);

            navigate("/login");
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const shouldShowError = (field) => submitted || touchedFields[field];

    return (
        <Box
            dir="ltr"
            sx={{
                minHeight: "100vh",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                backgroundColor: "#f8fafc",
            }}
        >
            {/* Left side */}
            <Box
                sx={{
                    position: "relative",
                    display: { xs: "none", md: "block" },
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transform: "scale(1.08)",
                        filter: "blur(6px)",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(135deg, rgba(20,83,45,0.75), rgba(6,95,70,0.65), rgba(20,83,45,0.8))",
                    }}
                />

                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        px: 8,
                        color: "white",
                    }}
                >
                    <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
                        انضم إلى مجتمعنا
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            mb: 3,
                            maxWidth: "620px",
                        }}
                    >
                        كن جزءاً من عائلة تهتم وتمنح الأمل والدعم للأطفال
                        المحتاجين
                    </Typography>

                    <Typography sx={{ fontSize: "1.35rem", opacity: 0.95 }}>
                        معاً نصنع مستقبلاً أفضل
                    </Typography>
                </Box>
            </Box>

            {/* Right side */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 3,
                    py: 4,
                    backgroundColor: "#f8fafc",
                }}
            >
                <Paper
                    elevation={6}
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: "100%",
                        maxWidth: "480px",
                        borderRadius: "24px",
                        p: 5,
                        backgroundColor: "#ffffff",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    }}
                >
                    {/* Title */}
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        إنشاء حساب
                    </Typography>

                    {/* Subtitle */}
                    <Typography sx={{ color: "#667085", mb: 4 }}>
                        انضم إلينا لصنع فرق في حياة الأطفال
                    </Typography>

                    {/* Full Name */}
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: "#344054",
                        }}
                    >
                        الاسم الكامل
                    </Typography>

                    <TextField
                        fullWidth
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="أدخل اسمك الكامل"
                        variant="outlined"
                        error={
                            shouldShowError("fullName") &&
                            Boolean(formErrors.fullName)
                        }
                        helperText={
                            shouldShowError("fullName")
                                ? formErrors.fullName
                                : " "
                        }
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "#f9fafb",
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon
                                        sx={{ color: "#98A2B3" }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Email */}
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: "#344054",
                        }}
                    >
                        البريد الإلكتروني
                    </Typography>

                    <TextField
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="أدخل بريدك الإلكتروني"
                        variant="outlined"
                        error={
                            shouldShowError("email") &&
                            Boolean(formErrors.email)
                        }
                        helperText={
                            shouldShowError("email")
                                ? formErrors.email
                                : " "
                        }
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "#f9fafb",
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon
                                        sx={{ color: "#98A2B3" }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Password */}
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: "#344054",
                        }}
                    >
                        كلمة المرور
                    </Typography>

                    <TextField
                        fullWidth
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="أنشئ كلمة مرور"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        error={
                            shouldShowError("password") &&
                            Boolean(formErrors.password)
                        }
                        helperText={
                            shouldShowError("password")
                                ? formErrors.password
                                : "استخدم 8 أحرف أو أكثر مع حرف كبير وصغير ورقم."
                        }
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "#f9fafb",
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon
                                        sx={{ color: "#98A2B3" }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <VisibilityOffOutlinedIcon
                                                sx={{ color: "#98A2B3" }}
                                            />
                                        ) : (
                                            <VisibilityOutlinedIcon
                                                sx={{ color: "#98A2B3" }}
                                            />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Confirm Password */}
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: "#344054",
                        }}
                    >
                        تأكيد كلمة المرور
                    </Typography>

                    <TextField
                        fullWidth
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="أعد إدخال كلمة المرور"
                        type={showConfirmPassword ? "text" : "password"}
                        variant="outlined"
                        error={
                            shouldShowError("confirmPassword") &&
                            Boolean(formErrors.confirmPassword)
                        }
                        helperText={
                            shouldShowError("confirmPassword")
                                ? formErrors.confirmPassword
                                : " "
                        }
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "#f9fafb",
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon
                                        sx={{ color: "#98A2B3" }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <VisibilityOffOutlinedIcon
                                                sx={{ color: "#98A2B3" }}
                                            />
                                        ) : (
                                            <VisibilityOutlinedIcon
                                                sx={{ color: "#98A2B3" }}
                                            />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Submit */}
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={!isFormValid || loading}
                        sx={{
                            mt: 4,
                            py: 1.6,
                            borderRadius: "12px",
                            fontWeight: 700,
                            backgroundColor: "#00c951",
                            "&:hover": {
                                backgroundColor: "#00b248",
                            },
                        }}
                    >
                        {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                    </Button>

                    <Typography
                        sx={{
                            mt: 3,
                            textAlign: "center",
                            color: "#667085",
                            fontSize: "0.98rem",
                        }}
                    >
                        لديك حساب بالفعل؟{" "}
                        <Link
                            component={RouterLink}
                            to="/login"
                            underline="none"
                            sx={{
                                color: "#16a34a",
                                fontWeight: 700,
                            }}
                        >
                            تسجيل الدخول
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}