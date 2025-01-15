// pages/admin/AdminDashboard.tsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { BriefcaseIcon, ChevronDownIcon, HomeIcon, PaperClipIcon, UserIcon } from '@heroicons/react/20/solid';
import { identityAuthApi } from '../../api/identityClient/identityAuthApi';
import { PuzzlePieceIcon } from '@heroicons/react/16/solid';
import AppLogo from '../../components/AppLogo';


const Header = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 shadow-md p-4 flex justify-between items-center">
      {/* Profile Dropdown */}
      <div className="ml-auto mr-3 flex items-center space-x-4">
        <Menu as="div" className="relative inline-block text-left">
          {/* Profile button */}
          <div>
            <MenuButton className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <img
                src={profile.photoUrl}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold text-gray-700">{profile.displayName}</span>
              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
            </MenuButton>
          </div>

          {/* Dropdown menu */}
          <MenuItems style={{zIndex: 10}} className="absolute right-0 z-1 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="py-1">
              <MenuItem>
                <Link
                  to="/admin/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem >
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" 
                  onClick={async () => {
                    await identityAuthApi.logout();
                    console.log("logout");
                    navigate("/login");
                  }}
                >
                  Logout
                </Link>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="main-bg text-white w-64 space-y-6 py-7 px-3 ">
      <AppLogo/>
      <ul className="text-left space-y-4">
        <li>
          <Link to="/admin/dashboard" className="flex items-center py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-800">
            <HomeIcon className="w-5 h-5 text-gray-300 mr-3" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="flex items-center py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-800">
            <UserIcon className="w-5 h-5 text-gray-300 mr-3" />
            Users
          </Link>
        </li>
        <li>
          <Link to="/admin/brands" className="flex items-center py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-800">
            <BriefcaseIcon className="w-5 h-5 text-gray-300 mr-3" />
            Brands
          </Link>
        </li>
        <li>
          <Link to="/admin/games" className="flex items-center py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-800">
            <PuzzlePieceIcon className="w-5 h-5 text-gray-300 mr-3" />
            Games
          </Link>
        </li>
        <li>
          <Link to="/admin/campaigns" className="flex items-center py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-800">
            <PaperClipIcon className="w-5 h-5 text-gray-300 mr-3" />
            Campaigns
          </Link>
        </li>
      </ul>
    </div>
  );
};


const AdminMainLayout = () => {
  return (
    <div className="flex h-screen ">
      {/* Sidebar - Fixed to the left */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header - Stays at the top */}
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* This is where nested routes like AdminProfilePage will be rendered */}
        </div>
      </div>
    </div>
  );
};


export default AdminMainLayout;
