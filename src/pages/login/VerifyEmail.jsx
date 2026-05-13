import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

const VerifyEmailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying email...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const email = params.get("email");
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

        if (!token || !email) {
            setMessage("Invalid verification link.");
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
                    setMessage("Email verified successfully! Redirecting to login...");
                    setLoading(false);
                    setTimeout(() => navigate("/login"), 2000);
                } else {
                    setMessage(data.message || "Verification failed.");
                    setLoading(false);
                }
            })
            .catch(() => {
                setMessage("Verification failed.");
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
                    px: 3,
                    py: 6,
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
                }}
            >
                {loading && <CircularProgress sx={{ mb: 3 }} />}
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                    Email Verification
                </Typography>
                <Typography sx={{ color: "#475569" }}>{message}</Typography>
            </Box>
        </Box>
    );
};

export default VerifyEmailPage;
