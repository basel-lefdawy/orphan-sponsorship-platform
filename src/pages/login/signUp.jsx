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
    Alert,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { hasSignUpErrors, validateSignUpForm } from "../../utils/validation";

const FALLBACK_SIGNUP_ERROR =
    "تعذر إنشاء الحساب. يرجى التحقق من البيانات والمحاولة مرة أخرى.";

const arabicValidationMessages = {
    "Name must be between 2 and 50 characters":
        "يجب أن يكون الاسم بين حرفين و50 حرفا.",
    "Name can only contain letters, spaces, hyphens, and apostrophes":
        "يمكن أن يحتوي الاسم على أحرف عربية أو إنجليزية ومسافات وشرطات وفواصل علوية فقط.",
    "Email is required": "البريد الإلكتروني مطلوب.",
    "Invalid email format": "يرجى إدخال بريد إلكتروني صالح.",
    "Password must be between 8 and 128 characters":
        "يجب أن تكون كلمة المرور بين 8 و128 حرفا.",
    "Password must contain at least one uppercase letter":
        "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل.",
    "Password must contain at least one lowercase letter":
        "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل.",
    "Password must contain at least one number":
        "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.",
    "Password must contain at least one special character (@$!%*?&_-#^)":
        "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل (@$!%*?&_-#^).",
    "Please confirm your password": "يرجى تأكيد كلمة المرور.",
    "Passwords do not match": "كلمتا المرور غير متطابقتين.",
    "Email is already registered": "هذا البريد الإلكتروني مسجل بالفعل.",
    "Email is already registered with another provider":
        "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول باستخدام المزود المرتبط به.",
    "This email is already registered with another provider":
        "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول باستخدام المزود المرتبط به.",
    "Email already in use": "هذا البريد الإلكتروني مستخدم بالفعل.",
};

const toArabicSignupMessage = (message) => {
    if (!message) return FALLBACK_SIGNUP_ERROR;

    const mappedMessage = arabicValidationMessages[message];
    if (mappedMessage) return mappedMessage;

    const normalized = message.toLowerCase();
    if (normalized.includes("already registered with another provider")) {
        return "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول باستخدام المزود المرتبط به.";
    }

    if (normalized.includes("already registered")) {
        return "هذا البريد الإلكتروني مسجل بالفعل.";
    }

    if (normalized.includes("already in use")) {
        return "هذا البريد الإلكتروني مستخدم بالفعل.";
    }

    return message;
};

const getSignupPayloadMessage = (data) => {
    if (!data) return "";
    if (typeof data === "string") return data;

    const errorFromArray = Array.isArray(data.errors)
        ? data.errors.find((error) => error?.message)?.message
        : null;

    return (
        errorFromArray ||
        data.message ||
        data.error ||
        data.msg ||
        ""
    );
};

const getSignupErrorMessage = (data) =>
    toArabicSignupMessage(getSignupPayloadMessage(data));

export default function SignUp() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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
        setServerError("");

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
        setServerError("");
        setSuccessMessage("");

        if (!isFormValid) return;

        try {
            setLoading(true);

                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

                const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.fullName,
                        email: formData.email,
                        password: formData.password,
                        confirmPassword: formData.confirmPassword,
                    }),
                });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(getSignupErrorMessage(data));
            }

            setSuccessMessage(
                "تم إنشاء حسابك! يرجى التحقق من بريدك الإلكتروني."
            );
        } catch (error) {
            console.error(error);
            setServerError(error.message || FALLBACK_SIGNUP_ERROR);
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

                    {serverError && (
                        <Alert
                            severity="error"
                            dir="rtl"
                            sx={{
                                mb: 3,
                                textAlign: "right",
                                alignItems: "center",
                                borderRadius: "12px",
                                "& .MuiAlert-icon": {
                                    ml: 1,
                                    mr: 0,
                                },
                            }}
                        >
                            {serverError}
                        </Alert>
                    )}

                    {successMessage && (
                        <Alert
                            severity="success"
                            dir="rtl"
                            sx={{
                                mb: 3,
                                textAlign: "right",
                                alignItems: "center",
                                borderRadius: "12px",
                                "& .MuiAlert-icon": {
                                    ml: 1,
                                    mr: 0,
                                },
                            }}
                        >
                            {successMessage}
                        </Alert>
                    )}

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
                        disabled={!isFormValid || loading || !!successMessage}
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