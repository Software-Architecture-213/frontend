import { Outlet, Link } from 'react-router-dom';

const BrandMainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="flex items-center h-16 px-4 border-b">
          <img
            src="https://placehold.co/100x40"
            alt="Logo - Text saying 'VoucherHub' in a stylized font"
            className="h-10"
          />
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link to="/brand/dashboard" className="flex items-center space-x-2 text-gray-700">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/brand/campaigns" className="flex items-center space-x-2 text-gray-700">
                <i className="fas fa-bullhorn"></i>
                <span>Campaigns</span>
              </Link>
            </li>
            <li>
              <Link to="/brand/stores" className="flex items-center space-x-2 text-gray-700">
                <i className="fas fa-store"></i>
                <span>Stores</span>
              </Link>
            </li>
            <li>
              <Link to="/brand/employees" className="flex items-center space-x-2 text-gray-700">
                <i className="fas fa-users"></i>
                <span>Employees</span>
              </Link>
            </li>
            <li>
              <Link to="/brand/quizzes" className="flex items-center space-x-2 text-gray-700">
                <i className="fas fa-gamepad"></i>
                <span>Quizzes</span>
              </Link>
            </li>
            <li>
              <Link to="/brand/payments" className="flex items-center space-x-2 text-gray-700">
                <i className="fas fa-credit-card"></i>
                <span>Payments</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center h-16 px-6 bg-white shadow-md">
          <h1 className="text-xl font-semibold">Brand</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-bell"></i>
              <span>Phúc Long</span>
              <img
                src="https://placehold.co/40x40"
                alt="User profile picture"
                className="rounded-full"
              />
            </div>
          </div>
        </header>

        <section className="p-6">
          <Outlet /> {/* Nested Routes */}
        </section>
      </main>
    </div>
  );
};

export default BrandMainLayout;
