import { useState, useEffect } from "react";

import {
    Button,
    Link,
    Box,
    Paper,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Divider,
    Stack,
    CircularProgress,
    Alert,
} from "@mui/material";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { setAuthTokens } from "../../services/authService";

import Background from "./backgrond";

import { loginSchema } from "../../schemas/loginSchema";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const OAUTH_ERROR_MESSAGES = {
    EMAIL_ALREADY_EXISTS:
        "هذا البريد الإلكتروني مسجل بالفعل باستخدام كلمة مرور. يرجى تسجيل الدخول بالبريد الإلكتروني وكلمة المرور.",
};

const SERVER_ERROR_TRANSLATIONS = {
    "Invalid email or password": "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    "Email is required": "البريد الإلكتروني مطلوب.",
    "Password is required": "كلمة المرور مطلوبة.",
};

const getFriendlyOAuthError = (raw) => {
    // raw is like "Google EMAIL_ALREADY_EXISTS" or "Facebook EMAIL_ALREADY_EXISTS"
    const code = Object.keys(OAUTH_ERROR_MESSAGES).find((key) =>
        raw.includes(key)
    );
    return (
        OAUTH_ERROR_MESSAGES[code] ||
        "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى."
    );
};

const translateServerError = (message) => {
    if (!message) return "حدث خطأ ما، يرجى المحاولة مرة أخرى.";

    const translation = SERVER_ERROR_TRANSLATIONS[message];
    return translation || message;
};

export default function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    // Read ?error= from URL on mount (Google/Facebook OAuth callback)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const oauthError = params.get("error");
        if (oauthError) {
            try {
                const decoded = decodeURIComponent(oauthError);
                setServerError(getFriendlyOAuthError(decoded));
            } catch {
                setServerError("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.");
            }
            // Clean the URL — show error only once
            window.history.replaceState(null, "", window.location.pathname);
        }
    }, []);

    const handleFacebookLogin = () => {
        window.location.href = `${apiBaseUrl}/api/auth/facebook`;
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleGoogleLogin = () => {
        window.location.href = `${apiBaseUrl}/api/auth/google`;
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setServerError("");

            const response = await axios.post(
                "/api/auth/login",
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    withCredentials: true,
                }
            );

            const responseData = response.data.data;

                // Store access token in memory only
                setAuthTokens({ accessToken: responseData.accessToken });

            // Store user
            localStorage.setItem("user", JSON.stringify(responseData.user));

            // Redirect admins to dashboard and regular users to home page
            navigate(responseData.user?.role === "admin" ? "/admin" : "/");

        } catch (error) {
            console.error(error);

            setServerError(
                translateServerError(
                    error.response?.data?.message ||
                    "حدث خطأ ما، يرجى المحاولة مرة أخرى."
                )
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Background>
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 2,
                    direction: "rtl",
                }}
            >
                <Paper
                    elevation={6}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        width: "100%",
                        maxWidth: "420px",
                        borderRadius: "24px",
                        p: 4,
                        backgroundColor: "#f8f8f8",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: "center",
                            fontWeight: 700,
                            color: "#1e293b",
                            mb: 1,
                        }}
                    >
                        أهلاً بعودتك
                    </Typography>

                    <Typography
                        sx={{
                            textAlign: "center",
                            color: "#667085",
                            fontSize: "1rem",
                            mb: 4,
                            lineHeight: 1.8,
                        }}
                    >
                        سجّل الدخول لإدارة ودعم مجتمع دار الأيتام
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

                    {/* Email */}
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: "#344054",
                            textAlign: "right",
                        }}
                    >
                        البريد الإلكتروني
                    </Typography>

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                placeholder="أدخل بريدك الإلكتروني"
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email?.message || " "}
                                sx={{
                                    mb: 3,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        backgroundColor: "#f3f4f6",
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
                        )}
                    />

                    {/* Password */}
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: "#344054",
                            textAlign: "right",
                        }}
                    >
                        كلمة المرور
                    </Typography>

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                placeholder="أدخل كلمة المرور"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                error={!!errors.password}
                                helperText={errors.password?.message || " "}
                                sx={{
                                    mb: 2,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        backgroundColor: "#f3f4f6",
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
                                                edge="end"
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
                        )}
                    />

                    {/* Forgot Password */}
                    <Box
                        sx={{
                            mt: 1,
                            mb: 3,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Link
                            component={RouterLink}
                            to="/forgot-password"
                            underline="none"
                            sx={{
                                color: "#16a34a",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                            }}
                        >
                            نسيت كلمة المرور؟
                        </Link>
                    </Box>

                    {/* Login Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={!isValid || loading}
                        sx={{
                            py: 1.6,
                            borderRadius: "12px",
                            textTransform: "none",
                            fontSize: "1rem",
                            fontWeight: 700,
                            backgroundColor: "#00c951",
                            boxShadow: "0 8px 20px rgba(0, 201, 81, 0.25)",
                            "&:hover": {
                                backgroundColor: "#00b248",
                            },
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "تسجيل الدخول"
                        )}
                    </Button>

                    {/* Divider */}
                    <Box
                        sx={{
                            my: 4,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Divider sx={{ flex: 1, borderColor: "#D0D5DD" }} />

                        <Typography
                            sx={{
                                color: "#667085",
                                fontSize: "0.95rem",
                                whiteSpace: "nowrap",
                            }}
                        >
                            أو المتابعة باستخدام
                        </Typography>

                        <Divider sx={{ flex: 1, borderColor: "#D0D5DD" }} />
                    </Box>

                    {/* Guest Button */}
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate('/')}
                        sx={{
                            py: 1.4,
                            borderRadius: "12px",
                            textTransform: "none",
                            fontSize: "1rem",
                            fontWeight: 600,
                            borderColor: "#D0D5DD",
                            color: "#344054",
                            backgroundColor: "#fff",
                            marginBottom: "20px",
                            "&:hover": {
                                borderColor: "#bfc5ce",
                                backgroundColor: "#f9fafb",
                            },
                        }}
                    >
                        المتابعة كزائر
                    </Button>

                    {/* Social Buttons */}
                    <Stack spacing={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={
                                <FacebookIcon sx={{ ml: 1, color: "#1877f2" }} />
                            }
                            onClick={handleFacebookLogin}
                            sx={{
                                py: 1.4,
                                borderRadius: "12px",
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 600,
                                borderColor: "#D0D5DD",
                                color: "#344054",
                                backgroundColor: "#fff",
                                display: "flex",
                                justifyContent: "center",
                                gap: "8px",
                                "& .MuiButton-startIcon": {
                                    margin: 0,
                                },
                            }}
                        >
                            المتابعة عبر Facebook
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon sx={{ ml: 1 }} />}
                            onClick={handleGoogleLogin}
                            sx={{
                                py: 1.4,
                                borderRadius: "12px",
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 600,
                                borderColor: "#D0D5DD",
                                color: "#344054",
                                backgroundColor: "#fff",
                                display: "flex",
                                justifyContent: "center",
                                gap: "8px",
                                "& .MuiButton-startIcon": {
                                    margin: 0,
                                },
                            }}
                        >
                            المتابعة عبر Google
                        </Button>
                    </Stack>

                    {/* Footer */}
                    <Typography
                        sx={{
                            mt: 4,
                            textAlign: "center",
                            color: "#667085",
                            fontSize: "1rem",
                        }}
                    >
                        لا تملك حساباً؟{" "}
                        <Link
                            component={RouterLink}
                            to="/signup"
                            underline="none"
                            sx={{
                                color: "#16a34a",
                                fontWeight: 700,
                            }}
                        >
                            إنشاء حساب
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Background>
    );
}