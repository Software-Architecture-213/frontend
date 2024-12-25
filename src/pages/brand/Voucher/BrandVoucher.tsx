import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { brandApi } from '../../../api/brandClient/brandApi';
import { FaPlus } from 'react-icons/fa';

type Voucher = {
  id: string;
  voucherCode: string;
  value: number;
  expirationDate: string;
  status: string;
};

type Campaign = {
  id: string;
  name: string;
  vouchers: Voucher[];
};

const BrandVoucher = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const navigate = useNavigate();

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

  const handleUpdateVoucher = (voucherId: string) => {
    // Navigate to the voucher update page with voucherId
    navigate(`/brand/voucher/update/${voucherId}`);
  };

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
                    <th className="border p-2">Voucher Code</th>
                    <th className="border p-2">Value</th>
                    <th className="border p-2">Expiration Date</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaign.vouchers.map((voucher) => (
                    <tr key={voucher.id}>
                      <td className="border p-2">{voucher.voucherCode}</td>
                      <td className="border p-2">{voucher.value}</td>
                      <td className="border p-2">{format(new Date(voucher.expirationDate), 'MM/dd/yyyy')}</td>
                      <td className="border p-2">{voucher.status}</td>
                      <td className="border p-2">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                          onClick={() => handleUpdateVoucher(voucher.id)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ): (
              <p>No vouchers found for this campaign.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BrandVoucher;
