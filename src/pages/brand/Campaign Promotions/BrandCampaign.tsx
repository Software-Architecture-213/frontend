import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brandApi } from '../../../api/brandClient/brandApi';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BrandCampaign = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dropdownState, setDropdownState] = useState<{ [key: string]: boolean }>({});

  const toggleDropdown = (campaignId: string) => {
    setDropdownState(prevState => ({
      ...prevState,
      [campaignId]: !prevState[campaignId],
    }));
  };

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

  const handleShowDetail = (campaignId: string) => {
    navigate(`/brand/campaign/${campaignId}`);
  }

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  return (
    <section className="p-6">
      {/* Header and Create Campaign Button */}
      <div className="flex justify-between items-center mb-4 text-black">
        <h2 className="text-lg font-semibold">Campaign Promotions</h2>
        <button
          onClick={handleCreateCampaign}
          className="px-4 py-2 bg-orange-400 text-white rounded shadow-md hover:bg-orange-600"
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
              className="w-64 p-2 bg-white border border-slate-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
            />
            <button className="text-black bg-gray-300">
              <i className="fas fa-filter"></i>
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left text-black">
          <thead>
            <tr className="border-b">
              <th className="p-2"><input type="checkbox" /></th>
              <th className="p-2">Name</th>
              <th className="p-2">Start Date</th>
              <th className="p-2">End Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Games</th>
              <th className="p-2">Budget</th>
              <th className="p-2">Remaining Budget</th>
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
                  <span className={`px-2 py-1 rounded ${campaign.status === 'EXPIRED' ? 'bg-gray-500 text-white' : campaign.status === 'NOT_ACCEPTED' ? 'bg-pink-500 text-white' : campaign.status === 'INACTIVE' ? 'bg-red-500 text-white' : campaign.status === 'ACTIVE' ? 'bg-green-500 text-white' : campaign.status === 'PAID' ? 'bg-yellow-500 text-white' : 'bg-yellow-500 text-white'}`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="p-2">
                  {campaign.games && campaign.games.length > 0
                    ? campaign.games.map((game: any) => game.data.name).join(', ')
                    : 'No games selected'}
                </td>
                <td className="p-2">${campaign.budget}</td>
                <td className="p-2">${campaign.remainingBudget}</td>
                <td className="p-2 relative">
                  <button className="text-black bg-gray-300 hover:bg-gray-400" onClick={() => toggleDropdown(campaign.id)}>
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                  {dropdownState[campaign.id] && (
                    <div className="absolute right-2 bg-gray-100 w-48 rounded-lg z-10">
                      <ul className="space-y-1">
                        <li>
                          <button className="bg-gray-300 w-full text-left px-4 py-2 flex items-center border-black hover:bg-gray-400" onClick={() => handleShowDetail(campaign.id)}>
                            <i className="fas fa-info-circle mr-2"></i>
                            Detail
                          </button>
                        </li>
                        <li>
                          <button className="bg-gray-300 w-full text-left px-4 py-2 flex items-center border-black hover:bg-gray-400" onClick={() => navigate(`/brand/campaign/update/${campaign.id}`)}>
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

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center text-black">
          <div>
            <span className=''>Rows per page: </span>
            <select className="border rounded p-1 bg-white border-slate-300">
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
