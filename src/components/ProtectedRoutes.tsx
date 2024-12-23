import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { useState, useEffect } from 'react';

const ProtectedRoutes = () => {
    const { profile, isFetchingProfile } = useAuth(); // Add isFetchingProfile state to AuthContext
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isFetchingProfile) {
            setIsLoading(false); // Stop loading when profile fetching is done
        }
    }, [isFetchingProfile]);

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner/loading indicator
    }

    if (!profile) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;

export default ProtectedRoutes;
