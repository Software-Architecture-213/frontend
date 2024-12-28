import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { brandApi } from '../../../api/brandClient/brandApi';
import { FaPlus } from 'react-icons/fa';

type Voucher = {
  id: string;
  code: string;
  type: string;
  valueType: string;
  value: number;
  description: string;
  expiredAt: string;
  status: string;
  maxCounts: number;
  createCounts: number;
};

type Campaign = {
  id: string;
  name: string;
  vouchers: Voucher[];
};

const BrandVoucher = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    const fetchCampaignsAndVouchers = async () => {
      try {
        // Fetch the campaigns and vouchers from the backend
        const response = await brandApi.getCampaignPromotions(); // Adjust to your API endpoint
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns and vouchers:', error);
      }
    };

    fetchCampaignsAndVouchers();
  }, []);

  // const handleUpdateVoucher = (voucherId: string) => {
  //   // Navigate to the voucher update page with voucherId
  //   navigate(`/brand/voucher/update/${voucherId}`);
  // };

  const handleAddVoucher = (campaignId: string) => {
    // Navigate to the create voucher page with campaignId
    navigate(`/brand/voucher/create/${campaignId}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Voucher Dashboard</h2>

      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        campaigns.map((campaign) => (
          <div key={campaign.id} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">{campaign.name}</h3>
              <button
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={() => handleAddVoucher(campaign.id)}
              >
                <FaPlus className="mr-2" />
                Add Voucher
              </button>
            </div>
            {campaign.vouchers && campaign.vouchers.length !== 0 ? (
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Code</th>
                    <th className="py-2 px-4 border-b">Type</th>
                    <th className="py-2 px-4 border-b">Value Type</th>
                    <th className="py-2 px-4 border-b">Value</th>
                    <th className="py-2 px-4 border-b">Expired At</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Max Counts</th>
                    <th className="py-2 px-4 border-b">Create Counts</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaign.vouchers.map((voucher) => (
                    <tr key={voucher.id}>
                      <td className="py-2 px-4 border-b">{voucher.code}</td>
                      <td className="py-2 px-4 border-b">{voucher.type}</td>
                      <td className="py-2 px-4 border-b">{voucher.valueType}</td>
                      <td className="py-2 px-4 border-b">{voucher.value}</td>
                      <td className="py-2 px-4 border-b">{format(new Date(voucher.expiredAt), 'yyyy-MM-dd')}</td>
                      <td className='py-2 px-4 border-b'>
                        <span className={`px-2 py-1 rounded ${voucher.status === 'EXPIRED' ? 'bg-gray-500 text-white' : voucher.status === 'ACTIVE' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                          {voucher.status}
                        </span>
                      </td>

                      <td className="py-2 px-4 border-b">{voucher.maxCounts}</td>
                      <td className="py-2 px-4 border-b">{voucher.createCounts}</td>
                      <td className="p-2 relative">
                        <button className="text-blue-600 hover:text-blue-800" onClick={toggleDropdown}>
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                        {dropdownOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                            <ul className="py-1">
                              <li>
                                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                                  <i className="fas fa-info-circle mr-2"></i>
                                  Detail
                                </button>
                              </li>
                              <li>
                                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                                  <i className="fas fa-edit mr-2"></i>
                                  Update
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No vouchers found for this campaign.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BrandVoucher;
