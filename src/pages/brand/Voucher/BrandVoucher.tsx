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
  const [dropdownState, setDropdownState] = useState<{ [key: string]: boolean }>({});

  const toggleDropdown = (voucherId: string) => {
    setDropdownState(prevState => ({
      ...prevState,
      [voucherId]: !prevState[voucherId],
    }));
  };

  useEffect(() => {
    const fetchCampaignsAndVouchers = async () => {
      try {
        const response = await brandApi.getCampaignPromotions(); // Adjust to your API endpoint
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns and vouchers:', error);
      }
    };

    fetchCampaignsAndVouchers();
  }, []);

  const handleVoucherDetail = (voucherId: string) => {
    navigate(`/brand/voucher/${voucherId}`);
  }

  const handleAddVoucher = (campaignId: string) => {
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
                className="flex items-center bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
                onClick={() => handleAddVoucher(campaign.id)}
              >
                <FaPlus className="mr-2" />
                Add Voucher
              </button>
            </div>
            {campaign.vouchers && campaign.vouchers.length !== 0 ? (
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border bg-gray-100 w-1/6">Code</th>
                    <th className="py-2 px-4 border bg-gray-100 w-1/6">Type</th>
                    <th className="py-2 px-4 border bg-gray-100 w-1/6">Value Type</th>
                    <th className="py-2 px-4 border bg-gray-100 w-1/12">Value</th>
                    <th className="py-2 px-4 border bg-gray-100 w-1/6">Expired At</th>
                    <th className="py-2 px-4 border bg-gray-100 w-1/6">Status</th>
                    <th className="py-2 px-4 border bg-gray-100 w-1/12">Max Counts</th>
                    <th className="py-2 px-4 border bg-gray-100 w-1/12">Create Counts</th>
                    <th className="py-2 px-4 border bg-gray-100 w-1/12">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaign.vouchers.map((voucher) => (
                    <tr key={voucher.id} className="h-16">
                      <td className="py-2 px-4 border w-32 overflow-hidden text-ellipsis whitespace-nowrap">{voucher.code}</td>
                      <td className="py-2 px-4 border">{voucher.type}</td>
                      <td className="py-2 px-4 border">{voucher.valueType}</td>
                      <td className="py-2 px-4 border text-right">{voucher.value}</td>
                      <td className="py-2 px-4 border">{format(new Date(voucher.expiredAt), 'yyyy-MM-dd')}</td>
                      <td className="py-2 px-4 border">
                        <span
                          className={`px-2 py-1 rounded ${voucher.status === 'EXPIRED'
                              ? 'bg-gray-500 text-white'
                              : voucher.status === 'ACTIVE'
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                            }`}
                        >
                          {voucher.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 border text-right">{voucher.maxCounts}</td>
                      <td className="py-2 px-4 border text-right">{voucher.createCounts}</td>
                      <td className="py-2 px-4 border text-center relative">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => toggleDropdown(voucher.id)}
                        >
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                        {dropdownState[voucher.id] && (
                          <div className="absolute right-0 top-8 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                            <ul className="py-1">
                              <li>
                                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center" onClick={() => handleVoucherDetail(voucher.id)}>
                                  <i className="fas fa-info-circle mr-2"></i>
                                  Detail
                                </button>
                              </li>
                              <li>
                                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center" onClick={() => navigate(`/brand/voucher/update/${voucher.id}`)}>
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
