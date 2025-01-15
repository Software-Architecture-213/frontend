import React, { useState } from 'react';

import { toLocaleString } from '../../../utils/dateUtils';
import { PaymentRow } from '../../../types/brand';
import { DEFAULT_AVATAR_URL } from '../../../constants/app';
interface PaymentRowProps {
  payment: PaymentRow;
}

const AdminPaymentsRow: React.FC<PaymentRowProps> = ({ payment }) => {
  // const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState(false); 
  const [thisPayment, setThisPayment] = useState<PaymentRow>(payment)

  return (
    <tr className="hover:bg-slate-50 border-b border-slate-200">
      <td className="p-4 py-5">
        <p className="block font-semibold text-sm text-slate-800">{thisPayment.orderId}</p>
      </td>
      <td className="p-4 py-5">
        <div className="flex items-center space-x-3">
          <img
            src={thisPayment.brandImageUrl != null ? thisPayment.brandImageUrl : DEFAULT_AVATAR_URL}
            alt="Profile"
            className="w-10 h-10 p-1 rounded-full"
          />
          <p className="text-sm text-slate-800">{thisPayment.brandName}</p>
        </div>
      </td>

      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisPayment.amount}$</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{toLocaleString(thisPayment.createdAt!)}</p>
      </td>
      {/* <td className="p-4 py-5">
        <button
          className="p-2 rounded-full bg-transparent main-text focus:none hover:bg-gray-100"
          aria-label="Edit User"
          onClick={() => setOpenUpdateUserDialog(true)}
        >
          <PencilIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
        </button>
        <UpdatepaymentDialog open={openUpdateUserDialog} setOpen={setOpenUpdateUserDialog} payment={thisPayment} />

      </td> */}
    </tr>
  );
};

export default AdminPaymentsRow;
