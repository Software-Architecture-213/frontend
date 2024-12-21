import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { setAccessToken, setRefreshToken } from '../api/axiosInstance';
import { identityUserApi } from '../api/identityClient/identityUserApi';

interface AuthContextType {
    profile: any | null;
    fetchProfile: () => Promise<void>;
    isLoading: boolean;  // Track loading state for profile fetch
}

const initAuthContext: AuthContextType = {
    profile: null,
    fetchProfile: async () => {},
    isLoading: true,  // Initially loading is true
}

const AuthContext = createContext<AuthContextType>(initAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [profile, setProfile] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);  // Loading state for profile fetch
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');

    // Set tokens on mount
    useEffect(() => {
        if (accessToken) {
            setAccessToken(accessToken);
        }
        if (refreshToken) {
            setRefreshToken(refreshToken);
        }
    }, []);

    // Fetch profile if tokens are set
    const fetchProfile = async () => {
        try {
            const response = await identityUserApi.getMyProfile();
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setProfile(null);  // Optionally handle error cases more gracefully
        } finally {
            setIsLoading(false);  // Mark loading as false after profile is fetched
        }
    };

    // Once tokens are set, fetch profile
    useEffect(() => {
        if (accessToken && refreshToken) {
            fetchProfile();  // Fetch profile only after tokens are available
        } else {
            setIsLoading(false);  // If no tokens are found, stop loading
        }
    }, [accessToken, refreshToken]);

    return (
        <AuthContext.Provider value={{ profile, fetchProfile, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
