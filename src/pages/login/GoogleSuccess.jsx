import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleSuccess() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    useEffect(() => {
        const token = params.get("token");
        const refreshToken = params.get("refreshToken");

        if (token) {
            localStorage.setItem("accessToken", token);
        }

        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        }

        // optional: fake user object if backend doesn't send user
        // or decode JWT if needed

        // 🚀 IMPORTANT: redirect to home
        navigate("/");
    }, [navigate, params]);

    return <div>Logging you in...</div>;
}