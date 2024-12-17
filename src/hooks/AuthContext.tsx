import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { setAccessToken, setRefreshToken } from '../api/axiosInstance';
import { identityUserApi } from '../api/identityClient/identityUserApi';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    profile: any | null;
    fetchProfile: () => Promise<void>;
}

const initAuthContext: AuthContextType = {
    profile: null,
    fetchProfile: async () => { },
}

const AuthContext = createContext<AuthContextType>(initAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [profile, setProfile] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');
    const navigate = useNavigate();

    // Ensure tokens are set only once the component mounts
    useEffect(() => {
        if (accessToken) {
            setAccessToken(accessToken);
        }
        if (refreshToken) {
            setRefreshToken(refreshToken);
        }
        setIsLoading(false);  // Mark loading as false after token initialization
    }, []);

    // Method to fetch user data from the /profile API
    const fetchProfile = async () => {
        if (!accessToken) {
            navigate('/login');  // Redirect if no accessToken
            return;
        }
        try {
            const response = await identityUserApi.getMyProfile();
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setProfile(null);
            navigate('/login');  // Redirect to login if fetching profile fails
        }
    };

    // Fetch profile once the component has mounted and the tokens are set
    useEffect(() => {
        if (!isLoading) {
            fetchProfile();
        }
    }, [isLoading]);



    return (
        <AuthContext.Provider value={{ profile, fetchProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
