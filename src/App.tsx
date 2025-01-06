import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AdminMainLayout from './pages/admin/AdminMainLayout';
import AdminDashboardTab from './pages/admin/dashboardTab/AdminDashboardTab';
import { AuthProvider } from './hooks/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/auth/RegisterPage';
import BrandMainLayout from './pages/brand/BrandMainLayout';
import BrandDashboardTab from './pages/brand/BrandDashBoard';
import BrandCampaign from './pages/brand/Campaign Promotions/BrandCampaign';
import BrandCreateCampaign from './pages/brand/Campaign Promotions/BrandCreateCampain';
import AdminProfilePage from './pages/admin/profile/AdminProfilePage';
import RedirectPage from './pages/RedirectPage';
import AdminUsersTab from './pages/admin/usersTab/AdminUsersTab';
import BrandVoucher from './pages/brand/Voucher/BrandVoucher';
import BrandCreateVoucher from './pages/brand/Voucher/BrandCreateVoucher';
import BrandCampaignDetail from './pages/brand/Campaign Promotions/BrandCampaignDetail';
import BrandVoucherDetail from './pages/brand/Voucher/BrandVoucherDetail';
import BrandBranchStore from './pages/brand/Store/BrandBranchStore';
import BrandUpdateCampaign from './pages/brand/Campaign Promotions/BrandUpdateCampaign';
import BrandUpdateVoucher from './pages/brand/Voucher/BrandUpdateVoucher';
import BrandProfilePage from './pages/brand/Profile/BrandProfilePage';
import BrandPayment from './pages/brand/BrandPayment';
import AdminBrandsTab from './pages/admin/brandsTab/AdminBrandsTab';



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
                <Route path="users" element={<AdminUsersTab />} />
                <Route path="profile" element={<AdminProfilePage />} />
                <Route path='brands' element={<AdminBrandsTab/>} />
              </Route>
              {/* Brand route */}
              <Route path="brand" element={<BrandMainLayout/>}>
                <Route path='profile' element={<BrandProfilePage />} />
                <Route path='' element={<BrandDashboardTab />} />
                <Route path="dashboard" element={<BrandDashboardTab />} />
                <Route path="campaign" element={<BrandCampaign />}/>
                <Route path="campaign/create" element={<BrandCreateCampaign />} />
                <Route path="campaign/update/:campaignId" element={<BrandUpdateCampaign />} />
                <Route path="campaign/:promotionId" element={<BrandCampaignDetail/>} />
                <Route path="voucher" element={<BrandVoucher />} />
                <Route path="voucher/:voucherId" element={<BrandVoucherDetail />} />
                <Route path="voucher/create/:promotionId" element={<BrandCreateVoucher />} />
                <Route path="voucher/update/:voucherId" element={<BrandUpdateVoucher />} />
                <Route path="store" element={<BrandBranchStore/>}/>
                <Route path="payment" element={<BrandPayment/>}/>
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
