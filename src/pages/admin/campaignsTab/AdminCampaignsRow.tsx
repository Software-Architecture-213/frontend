import React, { useState } from 'react';
import { DEFAULT_AVATAR_URL } from '../../../constants/app';

import { CampaignRow } from '../../../types/campaign';
import { toLocaleString } from '../../../utils/dateUtils';
interface CampaignRowProps {
  campaign: CampaignRow;
}

const AdminCampaignsRow: React.FC<CampaignRowProps> = ({ campaign }) => {
  // const [openDisableUserDialog, setOpenDisableUserDialog] = useState(false); 
  // const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState(false); 
  const [thisCampaign, setThisCampaign] = useState<CampaignRow>(campaign)

  return (
    <tr className="hover:bg-slate-50 border-b border-slate-200">
       {/* <td className="p-4 py-5 overflow-x-clip">
        <p className="block font-semibold text-sm text-slate-800">{user.userId}</p>
      </td> */}
      <td className="p-4 py-5">
        <img
          src={thisCampaign.imageUrl != null ? thisCampaign.imageUrl : DEFAULT_AVATAR_URL}
          alt="Profile"
          className="w-8 h-8 p-1 rounded-full"
        />
      </td>
      <td className="p-4 py-5">
        <p className="block font-semibold text-sm text-slate-800">{thisCampaign.name}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisCampaign.description}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisCampaign.brandName}</p>
      </td>
  
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisCampaign.budget}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{toLocaleString(thisCampaign.startDate!)}</p>
      </td> 
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{toLocaleString(thisCampaign.endDate!)}</p>
      </td> 

    </tr>
  );
};

export default AdminCampaignsRow;
