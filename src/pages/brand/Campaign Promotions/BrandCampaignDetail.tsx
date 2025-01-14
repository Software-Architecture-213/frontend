import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { brandApi } from '../../../api/brandClient/brandApi';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DEFAULT_CAMPAIGN_PROMOTION from '../../../assets/images/default_campaign_promotion.png';

interface Promotion {
    name: string;
    status: string;
    imageUrl?: string;
    brandId: string;
    startDate: string;
    endDate: string;
    budget: number;
    remainingBudget: number;
    createAt: string;
    updateAt: string;
    vouchers?: { code: string; value: number; description: string }[];
    games?: string[];
}


const BrandCampaignDetail = () => {
    const { promotionId } = useParams<{ promotionId: string }>();
    const [promotion, setPromotion] = useState<Promotion | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const response = await brandApi.getCampaignPromotionDetail(promotionId!);
                setPromotion(response.data);
            } catch (error) {
                console.error('Failed to fetch campaign details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaignDetails();
    }, [promotionId]);

    if (loading) {
        return <div>Loading campaign details...</div>;
    }

    if (!promotion) {
        return <div>Campaign not found.</div>;
    }

    return (
        <section className="p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-black">{promotion.name}</h2>
                    <span className={`px-4 py-2 rounded-full ${promotion.status === 'ACTIVE' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {promotion.status}
                    </span>
                </div>

                {/* Campaign Image */}
                <div className="mb-6 justify-items-center">
                    <img src={promotion.imageUrl ?? DEFAULT_CAMPAIGN_PROMOTION} alt={promotion.name} className="w-auto h-64 object-contain rounded-lg shadow-lg" />
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-black">
                    <div className="text-left rounded-lg shadow-lg p-4 bg-gray-200">
                        <h3 className="text-3xl m-3 font-semibold">Details</h3>
                        <p><strong>Brand ID:</strong> {promotion.brandId}</p>
                        <p><strong>Start Date:</strong> {new Date(promotion.startDate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(promotion.endDate).toLocaleDateString()}</p>
                        <p><strong>Budget:</strong> ${promotion.budget}</p>
                        <p><strong>Remaining Budget:</strong> ${promotion.remainingBudget}</p>
                        <p><strong>Games:</strong> {promotion.games ? promotion.games.join(', ') : 'No games selected'}</p>
                    </div>
                    <div className='text-left rounded-lg shadow-lg p-4 bg-gray-200'>
                        <h3 className="text-3xl m-3 font-semibold">Timestamps</h3>
                        <p><strong>Created At:</strong> {new Date(promotion.createAt).toLocaleDateString()}</p>
                        <p><strong>Updated At:</strong> {new Date(promotion.updateAt).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Vouchers */}
                {promotion.vouchers && promotion.vouchers.length > 0 ? (
                    <div>
                        <h3 className="text-3xl font-semibold text-gray-700 mb-4">Vouchers</h3>
                        <div className="space-y-4 text-black">
                            {promotion.vouchers.map((voucher, index) => (
                                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                    <p><strong>Voucher Code:</strong> {voucher.code}</p>
                                    <p><strong>Discount:</strong> {voucher.value}%</p>
                                    <p><strong>Description:</strong> {voucher.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-black">
                        <p>No vouchers available</p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default BrandCampaignDetail;
