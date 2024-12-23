import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { setAccessToken, setRefreshToken } from '../api/axiosInstance';
import { identityUserApi } from '../api/identityClient/identityUserApi';
import { useNavigate } from 'react-router-dom';
import { brandApi } from '../api/brandClient/brandAuthApi';

interface AuthContextType {
    profile: any | null;
    isFetchingProfile: boolean;
    fetchProfile: () => Promise<void>;
    isLoading: boolean;  // Track loading state for profile fetch
}

const initAuthContext: AuthContextType = {
    profile: null,
    isFetchingProfile: true, // Initial state while tokens and profile are loading
    fetchProfile: async () => { },
};

const AuthContext = createContext<AuthContextType>(initAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [profile, setProfile] = useState<any | null>(null);
    const [isFetchingProfile, setIsFetchingProfile] = useState(true); // Tracks the loading state of profile fetching
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');

    // Ensure tokens are set once the component mounts
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
        if (!accessToken) {
            setIsFetchingProfile(false); // Mark loading as false since we can't fetch without tokens
            navigate('/login'); // Redirect if no accessToken
            return;
        }

        setIsFetchingProfile(true); // Start loading state
        let shouldNavigate = true;

        try {
            // Try to fetch the profile from Identity
            const response = await identityUserApi.getMyProfile();
            setProfile(response.data);
            shouldNavigate = false; // Do not navigate if identity validation succeeds
        } catch (identityError) {
            console.warn("Identity validation failed, falling back to brand validation.");

            try {
                // Fallback: Try to fetch the profile from Brand
                const responseBrand = await brandApi.getMyProfile();
                if (responseBrand.data) {
                    setProfile(responseBrand.data); // Set the brand profile if valid
                    shouldNavigate = false; // Do not navigate if brand validation succeeds
                }
            } catch (brandError) {
                console.error("Brand validation failed:", brandError);
            }
        }

        setIsFetchingProfile(false); // Mark loading as complete

        // Navigate only if all validation attempts fail
        if (shouldNavigate) {
            setProfile(null);
            navigate('/login');
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
        <AuthContext.Provider value={{ profile, isFetchingProfile, fetchProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
