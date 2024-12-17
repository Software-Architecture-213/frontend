import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AdminMainLayout from './pages/admin/AdminMainLayout';
import AdminDashboardTab from './pages/admin/AdminDashboardTab';
import AdminAccountsTab from './pages/admin/AdminAccountsTab';
import { AuthProvider } from './hooks/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFoundPage from './pages/NoutFoundPage';
import RegisterPage from './pages/auth/RegisterPage';



function App() {

  return (
    <div className='h-screen w-screen'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="admin" element={<AdminMainLayout />}>
                <Route path='' element={<AdminDashboardTab />} />
                <Route path="dashboard" element={<AdminDashboardTab />} />
                <Route path="accounts" element={<AdminAccountsTab />} />
              </Route>
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
