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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Background from "./backgrond";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const goToLogin = () => navigate("/login");

    const handleSubmit = async () => {
        if (!email.trim()) {
            setErrorMsg("يرجى إدخال البريد الإلكتروني");
            setStatus("error");
            return;
        }

        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || "حدث خطأ، حاول مرة أخرى");
            }

            setStatus("success");

            // الرجوع لصفحة تسجيل الدخول بعد 2.5 ثانية
            setTimeout(goToLogin, 2500);
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
                {/* ── حالة النجاح ── */}
                {status === "success" ? (
                    <Fade in>
                        <Box className="flex flex-col items-center text-center gap-3">
                            <Box className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-1">
                                <CheckCircleOutlineIcon sx={{ fontSize: 36, color: "#22c55e" }} />
                            </Box>

                            <Typography variant="h6" className="!font-bold !text-gray-900">
                                تم إرسال الرابط!
                            </Typography>

                            <Typography variant="body2" className="!text-gray-500 !leading-relaxed">
                                لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى{" "}
                                <span className="font-semibold text-gray-700">{email}</span>
                            </Typography>

                            <Typography variant="caption" className="!text-gray-400">
                                سيتم تحويلك إلى صفحة تسجيل الدخول قريباً...
                            </Typography>
                        </Box>
                    </Fade>
                ) : (
                    /* ── النموذج ── */
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
                                <Alert severity="error" className="!mb-4 !rounded-xl !text-sm">
                                    {errorMsg}
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
                                disabled={status === "loading"}
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
                                disabled={status === "loading"}
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
                )}
            </Box>
        </Background>
    );
}