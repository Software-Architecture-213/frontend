import { useState } from 'react';
import AdminLoginForm from './components/AdminLoginForm';
import BrandLoginForm from './components/BrandLoginForm';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('admin');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center items-center min-h-screen main-bg-gradient">
      {/* Form Container */}
      <div className="main-bg bg-white shadow-2xl rounded-lg p-6 w-full max-w-lg">
        {/* Tab Buttons */}
        <div className="flex justify-between border-gray-300 mb-4">
          <button
            className={`w-1/2 py-2 mr-1 text-center focus:outline-none ${
              activeTab === 'admin'
                ? 'bg-white border-b-2 main-text font-bold border-main'
                : 'bg-slate-50 text-gray-500'
            }`}
            onClick={() => handleTabChange('admin')}
          >
            Admin
          </button>
          <button
            className={`w-1/2 py-2 ml-1 text-center focus:outline-none ${
              activeTab === 'brand'
                ? 'bg-white border-b-2 main-text font-bold border-main'
                : 'bg-slate-50 text-gray-500'
            }`}
            onClick={() => handleTabChange('brand')}
          >
            Brand
          </button>
        </div>

        {/* Admin Login Form */}
        {activeTab === 'admin' && <AdminLoginForm />}

        {/* Brand Login Form */}
        {activeTab === 'brand' && <BrandLoginForm />}
      </div>
    </div>
  );
};

export default LoginPage;
