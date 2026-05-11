import { Box } from "@mui/material";
import loginBackground from "../../assets/loginBackground.jpg";
export default function Background({ children }) {
    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        `url(${loginBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: "scale(1.1)",
                    filter: "blur(8px)",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(135deg, rgba(20,83,45,0.7), rgba(22,101,52,0.6), rgba(6,78,59,0.7))",
                }}
            />

            <Box
                sx={{
                    position: "relative",
                    zIndex: 10,
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "2rem",
                    fontWeight: "bold",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}