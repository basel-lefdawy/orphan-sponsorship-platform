import { useState } from "react";
import { Checkbox, FormControlLabel, Button, Link } from "@mui/material";
import {
    Box,
    Paper,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Background from "./backgrond";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import GoogleIcon from "@mui/icons-material/Google";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    return (
        <Background>
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 2,
                }}
            >
                <Paper
                    elevation={6}
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
                        Welcome Back
                    </Typography>

                    <Typography
                        sx={{
                            textAlign: "center",
                            color: "#667085",
                            fontSize: "1rem",
                            mb: 4,
                        }}
                    >
                        Login to support and manage the orphanage community
                    </Typography>

                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: "#344054",
                            textAlign: "right",
                        }}
                    >
                        Email
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="Enter your email"
                        variant="outlined"
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "#f3f4f6",
                                direction: "rtl",
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon sx={{ color: "#98A2B3" }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: "#344054",
                            textAlign: "right",
                        }}
                    >
                        Password
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "#f3f4f6",
                                direction: "rtl",
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon sx={{ color: "#98A2B3" }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? (
                                            <VisibilityOffOutlinedIcon sx={{ color: "#98A2B3" }} />
                                        ) : (
                                            <VisibilityOutlinedIcon sx={{ color: "#98A2B3" }} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box
                        sx={{
                            mt: 2,
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
                                direction: "rtl",
                            }}
                        >
                            Forgot password ?
                        </Link>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    sx={{
                                        color: "#D0D5DD",
                                        "&.Mui-checked": {
                                            color: "#22c55e",
                                        },
                                    }}
                                />
                            }
                            label="Remember me"
                            sx={{
                                m: 0,
                                "& .MuiFormControlLabel-label": {
                                    color: "#344054",
                                    fontWeight: 500,
                                    fontSize: "0.95rem",
                                },
                            }}
                        />


                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
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
                        Login
                    </Button>
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
                            or continue with
                        </Typography>
                        <Divider sx={{ flex: 1, borderColor: "#D0D5DD" }} />
                    </Box>
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
                        onClick={() => {
                            console.log("Continue as Guest");
                            // لاحقًا: redirect لصفحة معينة
                        }}
                    >
                        Continue as Guest
                    </Button>
                    <Stack spacing={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{
                                py: 1.4,
                                borderRadius: "12px",
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 600,
                                borderColor: "#D0D5DD",
                                color: "#344054",
                                backgroundColor: "#fff",
                                "&:hover": {
                                    borderColor: "#bfc5ce",
                                    backgroundColor: "#f9fafb",
                                },
                            }}
                        >
                            Continue with Google
                        </Button>
                    </Stack>

                    <Typography
                        sx={{
                            mt: 4,
                            textAlign: "center",
                            color: "#667085",
                            fontSize: "1rem",
                        }}
                    >
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            underline="none"
                            sx={{
                                color: "#16a34a",
                                fontWeight: 700,
                            }}
                        >
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Background>
    );
}