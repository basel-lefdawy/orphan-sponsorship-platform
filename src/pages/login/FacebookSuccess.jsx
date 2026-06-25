import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setAuthTokens } from "../../services/authService";

export default function FacebookSuccess() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    useEffect(() => {
        const token = params.get("token");

        if (token) {
            setAuthTokens({ accessToken: token });
        }

        navigate("/");
    }, [navigate, params]);

    return <div>Logging you in...</div>;
}
