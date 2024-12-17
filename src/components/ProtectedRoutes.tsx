import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';



const ProtectedRoutes = ()=> {
  const { profile } = useAuth();

  if (!profile) {
    return <Navigate to="/login" />;
  }

  return <Outlet/>;  
};

export default ProtectedRoutes