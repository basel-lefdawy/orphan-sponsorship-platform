import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Alert, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const VerifyEmailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("جاري التحقق من البريد الإلكتروني...");
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const email = params.get("email");
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

        if (!token || !email) {
            setMessage("رابط التحقق غير صالح أو منتهي الصلاحية.");
            setStatus("error");
            setLoading(false);
            return;
        }

        fetch(`${apiBaseUrl}/api/auth/verify-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, token }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.ok && data.success) {
                    setMessage("تم التحقق من البريد بنجاح! جاري إعادة التوجيه...");
                    setStatus("success");
                    setLoading(false);
                    setTimeout(() => navigate("/login"), 2000);
                } else {
                    setMessage(data.message || "فشل التحقق. يرجى المحاولة مرة أخرى.");
                    setStatus("error");
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error("Verify email error:", err);
                setMessage("فشل التحقق. يرجى المحاولة مرة أخرى أو التواصل مع الدعم.");
                setStatus("error");
                setLoading(false);
            });
    }, [location.search, navigate]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
                backgroundColor: "#f8fafc",
            }}
        >
            <Box
                sx={{
                    maxWidth: 520,
                    width: "100%",
                    textAlign: "center",
                    px: 4,
                    py: 6,
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
                }}
            >
                {/* LOADING STATE */}
                {loading && (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <CircularProgress size={50} />
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1f2937" }}>
                            التحقق من البريد الإلكتروني
                        </Typography>
                        <Typography sx={{ color: "#6b7280", fontSize: "0.95rem" }}>
                            {message}
                        </Typography>
                    </Box>
                )}

                {/* SUCCESS STATE */}
                {!loading && status === "success" && (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                backgroundColor: "#d1fae5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CheckCircleOutlineIcon sx={{ fontSize: 50, color: "#10b981" }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1f2937", mt: 1 }}>
                            تم التحقق بنجاح!
                        </Typography>
                        <Typography sx={{ color: "#6b7280", fontSize: "0.95rem", mb: 2 }}>
                            تم تأكيد بريدك الإلكتروني بنجاح. سيتم نقلك إلى صفحة تسجيل الدخول قريباً...
                        </Typography>
                        <Box
                            component="div"
                            sx={{
                                width: "100%",
                                height: 3,
                                backgroundColor: "#e5e7eb",
                                borderRadius: 2,
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    backgroundColor: "#10b981",
                                    animation: "slideIn 2s ease-in-out forwards",
                                    "@keyframes slideIn": {
                                        "0%": { width: "0%" },
                                        "100%": { width: "100%" },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                )}

                {/* ERROR STATE */}
                {!loading && status === "error" && (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                backgroundColor: "#fee2e2",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ErrorOutlineIcon sx={{ fontSize: 50, color: "#ef4444" }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1f2937", mt: 1 }}>
                            فشل التحقق
                        </Typography>
                        <Alert severity="error" sx={{ width: "100%", mb: 2, textAlign: "right" }}>
                            {message}
                        </Alert>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/login")}
                            sx={{
                                backgroundColor: "#ef4444",
                                "&:hover": { backgroundColor: "#dc2626" },
                                px: 4,
                                py: 1.2,
                                borderRadius: 2,
                                textTransform: "none",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                            }}
                        >
                            العودة لتسجيل الدخول
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default VerifyEmailPage;
