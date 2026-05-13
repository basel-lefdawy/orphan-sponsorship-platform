import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Fade,
    InputAdornment,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Background from "./backgrond";

const ResetPasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const emailParam = params.get("email");
        const tokenParam = params.get("token");

        if (!emailParam || !tokenParam) {
            setError("رابط غير صالح أو منتهي الصلاحية");
            return;
        }

        setEmail(emailParam);
        setToken(tokenParam);
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (password !== confirmPassword) {
            setError("كلمتا المرور غير متطابقتين");
            return;
        }

        if (!password || password.length < 6) {
            setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
            return;
        }

        setLoading(true);

        const apiBaseUrl =
            import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

        try {
            const response = await fetch(
                `${apiBaseUrl}/api/auth/reset-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        token,
                        password,
                        confirmPassword,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess(true);
                setMessage("تم تغيير كلمة المرور بنجاح");
                setTimeout(() => navigate("/login"), 2500);
            } else {
                setError(data.message || "فشل إعادة تعيين كلمة المرور");
            }
        } catch (err) {
            setError("حدث خطأ غير متوقع، حاول مرة أخرى");
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
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: "100%",
                        maxWidth: 440,
                        borderRadius: 4,
                        px: 4,
                        py: 5,
                        backgroundColor: "#fff",
                        boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
                    }}
                >
                    {/* SUCCESS STATE */}
                    {success ? (
                        <Fade in>
                            <Box className="flex flex-col items-center text-center gap-3">
                                <Box className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircleOutlineIcon
                                        sx={{ fontSize: 38, color: "#22c55e" }}
                                    />
                                </Box>

                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: "#111" }}
                                >
                                    تم بنجاح!
                                </Typography>

                                <Typography sx={{ color: "#6b7280" }}>
                                    تم تغيير كلمة المرور، سيتم تحويلك لتسجيل الدخول...
                                </Typography>
                            </Box>
                        </Fade>
                    ) : (
                        <>
                            {/* TITLE */}
                            <Typography
                                variant="h5"
                                sx={{
                                    textAlign: "center",
                                    fontWeight: 800,
                                    mb: 1,
                                    color: "#111",
                                }}
                            >
                                إعادة تعيين كلمة المرور
                            </Typography>

                            <Typography
                                sx={{
                                    textAlign: "center",
                                    color: "#6b7280",
                                    mb: 3,
                                    fontSize: "0.95rem",
                                }}
                            >
                                قم بإدخال كلمة المرور الجديدة لحسابك
                            </Typography>

                            {/* EMAIL INFO */}
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    mb: 3,
                                    color: "#374151",
                                    fontSize: "0.9rem",
                                }}
                            >
                                الحساب: <b>{email}</b>
                            </Typography>

                            {/* ERROR */}
                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            {/* PASSWORD */}
                            <TextField
                                fullWidth
                                type="password"
                                label="كلمة المرور الجديدة"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mb: 2 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon sx={{ color: "#9ca3af" }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* CONFIRM PASSWORD */}
                            <TextField
                                fullWidth
                                type="password"
                                label="تأكيد كلمة المرور"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                sx={{ mb: 3 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon sx={{ color: "#9ca3af" }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* BUTTON */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    backgroundColor: "#22c55e",
                                    borderRadius: "10px",
                                    py: 1.5,
                                    fontWeight: 700,
                                    textTransform: "none",
                                    boxShadow: "0 8px 20px rgba(34,197,94,0.25)",
                                    "&:hover": {
                                        backgroundColor: "#16a34a",
                                    },
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={22} sx={{ color: "#fff" }} />
                                ) : (
                                    "تحديث كلمة المرور"
                                )}
                            </Button>
                        </>
                    )}
                </Paper>
            </Box>
        </Background>
    );
};

export default ResetPasswordPage;