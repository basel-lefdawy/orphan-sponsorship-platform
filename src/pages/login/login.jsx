import { useState } from "react";

import {
    Checkbox,
    FormControlLabel,
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
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import Background from "./backgrond";

import { loginSchema } from "../../schemas/loginSchema";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const handleFacebookLogin = () => {
        window.location.href = "http://localhost:5000/api/auth/facebook";
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
            rememberMe: false,
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setServerError("");

            const response = await axios.post(
                "http://localhost:3000/auth/login",
                {
                    email: data.email,
                    password: data.password,
                }
            );

            console.log("Login success:", response.data);

            // Example:
            // localStorage.setItem("token", response.data.token);

            // Later:
            // navigate("/dashboard");

        } catch (error) {
            console.error(error);

            setServerError(
                error.response?.data?.message ||
                "حدث خطأ ما، يرجى المحاولة مرة أخرى."
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
                        <Typography
                            sx={{
                                color: "#dc2626",
                                mb: 2,
                                textAlign: "center",
                                fontWeight: 500,
                            }}
                        >
                            {serverError}
                        </Typography>
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

                    {/* Remember Me + Forgot Password */}
                    <Box
                        sx={{
                            mt: 1,
                            mb: 3,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 2,
                            flexWrap: "wrap",
                        }}
                    >
                        <Link
                            href="#"
                            underline="none"
                            sx={{
                                color: "#16a34a",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                            }}
                        >
                            نسيت كلمة المرور؟
                        </Link>

                        <Controller
                            name="rememberMe"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                            sx={{
                                                color: "#D0D5DD",
                                                "&.Mui-checked": {
                                                    color: "#22c55e",
                                                },
                                            }}
                                        />
                                    }
                                    label="تذكرني"
                                    sx={{
                                        m: 0,
                                        "& .MuiFormControlLabel-label": {
                                            color: "#344054",
                                            fontWeight: 500,
                                            fontSize: "0.95rem",
                                        },
                                    }}
                                />
                            )}
                        />
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

                    {/* Google Button */}
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
                            Continue with Facebook
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={
                                <GoogleIcon sx={{ ml: 1 }} />
                            }
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
