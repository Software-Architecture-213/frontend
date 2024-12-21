import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";


const RedirectPage = () => {
    const { profile } = useAuth();
    console.log(profile)
    const navigate = useNavigate();
    if (profile.role == "ADMIN") {  
        navigate("/admin")
    }
    if (profile.role == "BRAND") {  
        navigate("/brand")
    }
    navigate("/login")
    return null;
}   

export default RedirectPage