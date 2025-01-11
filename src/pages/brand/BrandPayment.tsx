import React, { useEffect, useState } from "react";
import { brandApi } from "../../api/brandClient/brandApi";
import { parseISO } from "date-fns/parseISO";
import { format } from "date-fns";


interface Payment {
  id: string;
  amount: number;
  createAt: string;
  status: string;
  currency: string;
}

const BrandPayment: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await brandApi.getPayment(); // Replace with actual API endpoint
        setPayments(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch payments.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Payments</h1>

      {isLoading && <p>Loading payments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && payments.length === 0 && (
        <p>You have not made any payments yet.</p>
      )}

      {!isLoading && !error && payments.length > 0 && (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-3 text-left">Payment ID</th>
              <th className="border border-gray-200 p-3 text-left">Amount</th>
              <th className="border border-gray-200 p-3 text-left">Date</th>
              <th className="border border-gray-200 p-3 text-left">Status</th>
              <th className="border border-gray-200 p-3 text-left">Currency</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="border border-gray-200 p-3">{payment.id}</td>
                <td className="border border-gray-200 p-3">{payment.amount.toFixed(2)}</td>
                <td className="border border-gray-200 p-3">{payment.createAt ? new Date(payment.createAt).toLocaleDateString() : 'Invalid Date'}</td>
                <td className="border border-gray-200 p-3">{payment.status}</td>
                <td className="border border-gray-200 p-3">{payment.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BrandPayment;
