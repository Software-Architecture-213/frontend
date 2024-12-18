// pages/brand/BrandCampaign.tsx

const BrandCampaign = () => {
  return (
    <section className="p-6">
      {/* Campaigns Table */}
      <div className="bg-white rounded shadow-md p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Campaigns</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search campaign name..."
              className="px-4 py-2 border rounded"
            />
            <button className="text-gray-600">
              <i className="fas fa-filter"></i>
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2"><input type="checkbox" /></th>
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Start Date</th>
              <th className="p-2">End Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Initial</th>
              <th className="p-2">Remaining</th>
              <th className="p-2">Paid</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">124bc</td>
              <td className="p-2">AEON MALL! Back to School!</td>
              <td className="p-2">09/01/2023 08:40PM</td>
              <td className="p-2">16/01/2023 08:39PM</td>
              <td className="p-2"><span className="px-2 py-1 bg-gray-500 text-white rounded">ENDED</span></td>
              <td className="p-2">1000</td>
              <td className="p-2">996</td>
              <td className="p-2"><i className="fas fa-check text-green-500"></i></td>
              <td className="p-2">
                <button className="text-red-600 hover:text-red-800">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">e45a9</td>
              <td className="p-2">Sale 8/8</td>
              <td className="p-2">08/03/2023 01:04AM</td>
              <td className="p-2">15/03/2023 01:05AM</td>
              <td className="p-2"><span className="px-2 py-1 bg-pink-500 text-white rounded">NOT_ACCEPTED</span></td>
              <td className="p-2">100</td>
              <td className="p-2">100</td>
              <td className="p-2"><i className="fas fa-check text-green-500"></i></td>
              <td className="p-2">
                <button className="text-red-600 hover:text-red-800">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">27c4f</td>
              <td className="p-2">Sale 22/2</td>
              <td className="p-2">13/03/2023 09:47AM</td>
              <td className="p-2">21/03/2023 08:39AM</td>
              <td className="p-2"><span className="px-2 py-1 bg-yellow-500 text-white rounded">PENDING</span></td>
              <td className="p-2">1000</td>
              <td className="p-2">1000</td>
              <td className="p-2"><i className="fas fa-check text-green-500"></i></td>
              <td className="p-2">
                <button className="text-red-600 hover:text-red-800">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span>Rows per page: </span>
            <select className="border rounded p-1">
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>
          <div>
            <span>1–3 of 3</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCampaign;
