// pages/admin/AdminDashboard.tsx
import { Outlet, Link } from 'react-router-dom';

const AdminMainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="main-bg text-white w-64 space-y-6 py-7 px-2">
        <h2 className="text-3xl font-semibold text-center text-white">Admin</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/admin/dashboard" className="w-full py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/accounts" className="w-full py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-700">
              Accounts
            </Link>
          </li>
          <li>
            <Link to="/admin/campaigns" className="w-full py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-700">
              Campaigns
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4z" />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Admin Name</span>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Content Area with Outlet for Nested Routes */}
        <div className="flex-1 p-6">
          <Outlet /> {/* This is where nested routes will be rendered */}
        </div>
      </div>
    </div>
  );
};

export default AdminMainLayout;
