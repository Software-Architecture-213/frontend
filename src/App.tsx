import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AdminMainLayout from './pages/admin/AdminMainLayout';
import AdminDashboardTab from './pages/admin/dashboardTab/AdminDashboardTab';
import AdminAccountsTab from './pages/admin/accountTab/AdminAccountsTab';
import { AuthProvider } from './hooks/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/auth/RegisterPage';
import BrandMainLayout from './pages/brand/BrandMainLayout';
import BrandDashboardTab from './pages/brand/BrandDashBoard';
import RedirectPage from './pages/RedirectPage';
import BrandCampaign from './pages/brand/BrandCampaign';
import AdminProfilePage from './pages/admin/profile/AdminProfilePage';



function App() {

  return (
    <div className='h-screen w-screen'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              {/* Admin route */}
              <Route path="admin" element={<AdminMainLayout />}>
                <Route path='' element={<AdminDashboardTab />} />
                <Route path="dashboard" element={<AdminDashboardTab />} />
                <Route path="accounts" element={<AdminAccountsTab />} />
                <Route path="profile" element={<AdminProfilePage />} />
              </Route>
              {/* Brand route */}
              <Route path="brand" element={<BrandMainLayout/>}>
                <Route path='' element={<BrandDashboardTab />} />
                <Route path="dashboard" element={<BrandDashboardTab />} />
                <Route path="campaign" element={<BrandCampaign />} />
              </Route>
              <Route path='' element={<RedirectPage/>}/>
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App
