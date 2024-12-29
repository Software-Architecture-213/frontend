import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { brandApi } from '../../../api/brandClient/brandApi';
import { format } from 'date-fns';

type Voucher = {
    id: string;
    code: string;
    type: string;
    imageUrl: string;
    valueType: string;
    value: number;
    description: string;
    expiredAt: string;
    status: string;
    maxCounts: number;
    createCounts: number;
    createAt: string;
    updateAt: string;
};

const BrandVoucherDetail = () => {
    const { voucherId } = useParams<{ voucherId: string }>();
    const [voucher, setVoucher] = useState<Voucher | null>(null);

    useEffect(() => {
        const fetchVoucherDetails = async () => {
            try {
                const response = await brandApi.getVoucherDetail(voucherId!);
                setVoucher(response.data);
            } catch (error) {
                console.error('Error fetching voucher details:', error);
            }
        };

        if (voucherId) {
            fetchVoucherDetails();
        }
    }, [voucherId]);

    if (!voucher) {
        return <div>Loading...</div>;
    }

    return (
        <section className="p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold">{voucher.code}</h2>
                    <span className={`px-4 py-2 rounded-full ${voucher.status === 'ACTIVE' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                        {voucher.status}
                    </span>
                </div>
            </div>

            {voucher.imageUrl && (
                <div className="mb-6">
                    <img src={voucher.imageUrl} alt={voucher.code} className="w-full h-64 object-cover rounded-lg" />
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="text-left rounded-lg shadow-lg p-4 bg-gray-100">
                    <h3 className="text-3xl m-3 font-semibold text-gray-700">Voucher Info</h3>
                    <p className="text-lg font-semibold">Code: {voucher.code}</p>
                    <p className="text-lg">Type: {voucher.type}</p>
                    <p className="text-lg">Value Type: {voucher.valueType}</p>
                    <p className="text-lg">Value: {voucher.value}</p>
                    <p className="text-lg">Description: {voucher.description}</p>
                    <p className="text-lg">Status: {voucher.status}</p>
                    <p className="text-lg">Max Counts: {voucher.maxCounts}</p>
                    <p className="text-lg">Create Counts: {voucher.createCounts}</p>
                </div>
                <div className="text-left rounded-lg shadow-lg p-4 bg-gray-100">
                    <h3 className="text-3xl m-3 font-semibold text-gray-700">Timestamps</h3>
                    <p className="text-lg">Expired At: {format(new Date(voucher.expiredAt), 'yyyy-MM-dd')}</p>
                    <p className="text-lg">Created At: {format(new Date(voucher.createAt), 'yyyy-MM-dd')}</p>
                    <p className="text-lg">Updated At: {format(new Date(voucher.updateAt), 'yyyy-MM-dd')}</p>
                </div>
            </div>
        </section>
    );
};

export default BrandVoucherDetail;
