import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { setAccessToken, setRefreshToken } from '../api/axiosInstance';
import { identityUserApi } from '../api/identityClient/identityUserApi';
import { useNavigate, useLocation } from 'react-router-dom';
import { brandApi } from '../api/brandClient/brandApi';

interface AuthContextType {
    profile: any | null;
    isFetchingProfile: boolean;
    fetchProfile: () => Promise<void>;
}

const initAuthContext: AuthContextType = {
    profile: null,
    isFetchingProfile: true,
    fetchProfile: async () => {},
};

const AuthContext = createContext<AuthContextType>(initAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState<any | null>(null);
    const [isFetchingProfile, setIsFetchingProfile] = useState(true);

    useEffect(() => {
        const cookies = new Cookies();
        const accessToken = cookies.get('accessToken');
        const refreshToken = cookies.get('refreshToken');

        // Ensure tokens are set globally in the axios instance
        if (accessToken) setAccessToken(accessToken);
        if (refreshToken) setRefreshToken(refreshToken);

        // Fetch profile if tokens exist
        if (accessToken && refreshToken) {
            fetchProfile();
        } else {
            setIsFetchingProfile(false); // Mark loading as false if no tokens
        }
    }, []); // Runs only on component mount

    const fetchProfile = async () => {
        setIsFetchingProfile(true);

        try {
            // Attempt to fetch user profile from Identity API
            const identityResponse = await identityUserApi.getMyProfile();
            setProfile(identityResponse.data);
        } catch (identityError) {
            console.warn('Identity validation failed, attempting Brand API...');

            try {
                // Fallback: Fetch profile from Brand API
                const brandResponse = await brandApi.getMyProfile();
                setProfile(brandResponse.data);
            } catch (brandError) {
                console.error('Profile validation failed for both Identity and Brand APIs.');
                setProfile(null);
                if (location.pathname !== '/register') navigate('/login'); // Redirect to login
            }
        } finally {
            setIsFetchingProfile(false);
        }
    };

    return (
        <AuthContext.Provider value={{ profile, isFetchingProfile, fetchProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
