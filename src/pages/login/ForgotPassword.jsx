import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    Alert,
    CircularProgress,
    Fade,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Background from "./backgrond";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const goToLogin = () => navigate("/login");

    const handleSubmit = async () => {
        if (!email.trim()) {
            setErrorMsg("يرجى إدخال البريد الإلكتروني");
            setStatus("error");
            return;
        }

        setStatus("loading");
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
            const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.message || "حدث خطأ، حاول مرة أخرى");
            }

            setSuccessMsg(
                data?.message
                    ? "تحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور"
                    : "تحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور"
            );
            setStatus("success");
        } catch (err) {
            setErrorMsg(err.message || "حدث خطأ غير متوقع");
            setStatus("error");
        }
    };

    return (
        <Background>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 440,
                    mx: 2,
                    bgcolor: "white",
                    borderRadius: 4,
                    boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
                    px: { xs: 3.5, sm: 6 },
                    py: { xs: 4.5, sm: 5.5 },
                    direction: "rtl",
                }}
            >
                <Fade in>
                    <Box className="flex flex-col">
                        <Typography
                            variant="h5"
                            align="center"
                            sx={{ fontWeight: 700, color: "#111", mb: 1 }}
                        >
                            نسيت كلمة المرور؟
                        </Typography>

                        <Typography
                            variant="body2"
                            align="center"
                            sx={{ color: "#6b7280", lineHeight: 1.6, mb: 3.5 }}
                        >
                            أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور
                        </Typography>

                        {/* خطأ */}
                        {status === "error" && errorMsg && (
                            <Alert severity="error" sx={{ mb: 2, borderRadius: "12px", fontSize: "0.875rem" }}>
                                {errorMsg}
                            </Alert>
                        )}

                        {/* نجاح */}
                        {status === "success" && successMsg && (
                            <Alert severity="success" sx={{ mb: 2, borderRadius: "12px", fontSize: "0.875rem" }}>
                                {successMsg}
                            </Alert>
                        )}

                        {/* البريد */}
                        <Typography
                            variant="caption"
                            sx={{ fontWeight: 600, color: "#374151", mb: 0.8 }}
                        >
                            البريد الإلكتروني
                        </Typography>

                        <TextField
                            fullWidth
                            type="email"
                            placeholder="أدخل بريدك الإلكتروني"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (status === "error") {
                                    setStatus("idle");
                                    setErrorMsg("");
                                }
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            disabled={status === "loading" || status === "success"}
                            error={status === "error"}
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 3,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    backgroundColor: "#f3f4f6",
                                    "& fieldset": { borderColor: "transparent" },
                                    "&:hover fieldset": { borderColor: "#22c55e" },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#22c55e",
                                    },
                                },
                            }}
                        />

                        {/* زر الإرسال */}
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={status === "loading" || status === "success"}
                            sx={{
                                backgroundColor: "#22c55e",
                                borderRadius: "10px",
                                py: 1.6,
                                fontWeight: 600,
                                "&:hover": { backgroundColor: "#16a34a" },
                            }}
                        >
                            {status === "loading" ? (
                                <span className="flex items-center gap-2">
                                    <CircularProgress size={16} sx={{ color: "#fff" }} />
                                    جاري الإرسال...
                                </span>
                            ) : (
                                "إرسال رابط إعادة التعيين"
                            )}
                        </Button>

                        {/* الرجوع */}
                        <Button
                            fullWidth
                            onClick={goToLogin}
                            startIcon={<ArrowBackIcon />}
                            sx={{
                                mt: 2.5,
                                color: "#22c55e",
                                fontWeight: 600,
                                "&:hover": { backgroundColor: "transparent", color: "#16a34a" },
                            }}
                        >
                            العودة لتسجيل الدخول
                        </Button>
                    </Box>
                </Fade>
            </Box>
        </Background>
    );
}