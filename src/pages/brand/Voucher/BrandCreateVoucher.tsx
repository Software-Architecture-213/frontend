import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { brandApi } from '../../../api/brandClient/brandApi';

const BrandCreateVoucher = () => {
  const { promotionId } = useParams<{ promotionId: string }>();
  const navigate = useNavigate();
  
  const [voucherCode, setVoucherCode] = useState('');
  const [value, setValue] = useState<number>(0);
  const [expirationDate, setExpirationDate] = useState('');
  const [status, setStatus] = useState('ACTIVE');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await brandApi.createVoucher({
        promotionId,
        voucherCode,
        value,
        expirationDate,
        status,
      });

      console.log('Voucher created successfully:', response.data);
      navigate('/brand/vouchers'); // Redirect to voucher dashboard after successful creation
    } catch (error) {
      console.error('Error creating voucher:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Create Voucher</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Voucher Code</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Voucher Value</label>
          <input
            type="number"
            className="w-full border p-2 rounded-md"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Expiration Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded-md"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            className="w-full border p-2 rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md"
        >
          Create Voucher
        </button>
      </form>
    </div>
  );
};

export default BrandCreateVoucher;
