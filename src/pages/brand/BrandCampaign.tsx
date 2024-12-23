import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brandApi } from '../../api/brandClient/brandApi';

const BrandCampaign = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch campaigns from the backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await brandApi.getCampaignPromotions();
        setCampaigns(response.data);
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleCreateCampaign = () => {
    navigate('/brand/campaign/create');
  };

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  return (
    <section className="p-6">
      {/* Header and Create Campaign Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Campaign Promotions</h2>
        <button
          onClick={handleCreateCampaign}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
        >
          Create Campaign
        </button>
      </div>

      {/* Campaign Table */}
      <div className="bg-white rounded shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
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
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-b">
                <td className="p-2"><input type="checkbox" /></td>
                <td className="p-2">{campaign.name}</td>
                <td className="p-2">{new Date(campaign.startDate).toLocaleDateString()}</td>
                <td className="p-2">{new Date(campaign.endDate).toLocaleDateString()}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${campaign.status === 'ENDED' ? 'bg-gray-500 text-white' : campaign.status === 'NOT_ACCEPTED' ? 'bg-pink-500 text-white' : 'bg-yellow-500 text-white'}`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="p-2">{campaign.numOfVouchers}</td>
                <td className="p-2">{campaign.remainingVouchers}</td>
                <td className="p-2">
                  <i className="fas fa-check text-green-500"></i>
                </td>
                <td className="p-2">
                  <button className="text-red-600 hover:text-red-800">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
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
