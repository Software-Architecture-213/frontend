import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, CreditCardIcon, HomeIcon, PlayIcon, ShoppingBagIcon, TagIcon } from '@heroicons/react/20/solid';
import { brandApi } from '../../api/brandClient/brandApi';
import DEFAULT_AVATAR from '../../assets/images/default_avatar.png';
import AppLogo from '../../components/AppLogo';

const Header = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50  shadow-md p-4 flex justify-between items-center">
      {/* Profile Dropdown */}
      <div className="ml-auto mr-3 flex items-center space-x-4">
        <Menu as="div" className="relative inline-block text-left">
          {/* Profile button */}
          <div>
            <MenuButton className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <img
                src={profile.imageUrl ?? DEFAULT_AVATAR}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold text-gray-700">{profile.displayName}</span>
              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
            </MenuButton>
          </div>

          {/* Dropdown menu */}
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="py-1">
              <MenuItem>
                <Link
                  to="/brand/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={async () => {
                    await brandApi.logout();
                    console.log("logout");
                    navigate("/login");
                  }}>
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
    <div className="main-bg text-white w-64 space-y-6 py-7 px-3">
      <AppLogo/>
      <ul className="text-left space-y-4">
        <li>
          <Link to="/brand/dashboard" className="flex items-center py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-800">
            <HomeIcon className="w-5 h-5 text-gray-300 mr-3" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/brand/campaign" className="flex items-center py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-800">
            <PlayIcon className="w-5 h-5 text-gray-300 mr-3" />
            Campaign Promotions
          </Link>
        </li>
        <li>
          <Link to="/brand/voucher" className="flex items-center py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-800">
            <TagIcon className="w-5 h-5 text-gray-300 mr-3" />
            Voucher
          </Link>
        </li>
        <li>
          <Link to="/brand/store" className="flex items-center py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-800">
            <ShoppingBagIcon className="w-5 h-5 text-gray-300 mr-3" />
            Stores
          </Link>
        </li>
        <li>
          <Link to="/brand/payment" className="flex items-center py-2 px-4 text-left secondary-text rounded-md hover:bg-gray-800">
            <CreditCardIcon className="w-5 h-5 text-gray-300 mr-3" />
            Payments
          </Link>
        </li>
      </ul>
    </div>
  );
};

const BrandMainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed to the left */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header - Stays at the top */}
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* This is where nested routes like BrandProfilePage will be rendered */}
        </div>
      </div>
    </div>
  );
};

export default BrandMainLayout;
