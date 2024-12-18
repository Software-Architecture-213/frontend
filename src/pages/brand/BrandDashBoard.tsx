const BrandDashboardTab = () => {
    return (
      <div>
        <h1 className="text-xl font-semibold mb-6">Dashboard</h1>
  
        {/* General Statistic */}
        <div className="bg-white p-4 shadow-md rounded-md mb-6">
          <h2 className="text-lg font-semibold mb-4">General Statistic</h2>
          <div className="grid grid-cols-4 gap-4">
            {["Campaigns", "Customers", "Release Vouchers", "Used Vouchers"].map(
              (stat, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <h3 className="flex items-center">
                    {stat}
                    <i className="fas fa-question-circle ml-1 text-gray-500"></i>
                  </h3>
                  <div className="text-3xl font-bold">0</div>
                  <div className="text-sm text-gray-500">
                    Data is not changed than the last day
                  </div>
                </div>
              )
            )}
          </div>
        </div>
  
        {/* Game Statistic & Discount Voucher Statistic */}
        <div className="grid grid-cols-2 gap-6">
          {/* Game Statistic */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg font-semibold mb-4">Game Statistic</h2>
            <div className="flex items-center mb-4">
              <select className="border p-2 rounded-md">
                <option>Select</option>
              </select>
              <span className="ml-2 text-gray-500">
                Please select your campaign
              </span>
            </div>
            <div className="flex space-x-4">
              {[
                { color: "red-500", label: "2048" },
                { color: "blue-500", label: "Jump" },
                { color: "yellow-500", label: "Shake" },
                { color: "teal-500", label: "Q&A" },
              ].map((game, index) => (
                <div key={index} className="flex items-center">
                  <span
                    className={`w-3 h-3 bg-${game.color} inline-block rounded-full`}
                  ></span>
                  <span className="ml-2">{game.label}</span>
                </div>
              ))}
            </div>
          </div>
  
          {/* Discount Voucher Statistic */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-lg font-semibold mb-4">
              Discount Voucher Statistic
            </h2>
            <div className="flex items-center mb-4">
              <select className="border p-2 rounded-md">
                <option>Select</option>
              </select>
              <span className="ml-2 text-gray-500">
                Please select your campaign
              </span>
            </div>
            <div className="text-gray-500">A number of discount vouchers</div>
            <div className="flex items-center mt-2">
              <span className="w-3 h-3 bg-blue-500 inline-block rounded-full"></span>
              <span className="ml-2">Discount vouchers</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BrandDashboardTab;
  