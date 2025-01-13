import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const RedirectPage = () => {
    const { profile } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (profile) {
            if (profile.role === "ADMIN") {
                navigate("/admin");
            } else if (profile.role === "BRAND") {
                navigate("/brand");
            } else {
                navigate("/login");
            }
        }
    }, [profile, navigate]);

    return null;
};

export default RedirectPage;