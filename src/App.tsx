import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AdminMainLayout from './pages/admin/AdminMainLayout';
import AdminDashboardTab from './pages/admin/AdminDashboardTab';
import AdminAccountsTab from './pages/admin/AdminAccountsTab';



function App() {

  return (
    <div className='h-screen w-screen'>
      <Router>
        <Routes>
        <Route path="admin" element={<AdminMainLayout />}>
          <Route path='' element={<AdminDashboardTab />} />
          <Route path="dashboard" element={<AdminDashboardTab />} />
          <Route path="accounts" element={<AdminAccountsTab/>} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App
