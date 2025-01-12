import React, { useState } from 'react';
import { DEFAULT_AVATAR_URL } from '../../../constants/app';
import { BrandRow } from '../../../types/brand';
import ChangeBrandStatusDialog from './ChangeBrandStatusDialog';
import { PencilIcon } from '@heroicons/react/16/solid';
import UpdateBrandDialog from './UpdateBrandDialog';
import { toLocaleString } from '../../../utils/dateUtils';

interface AdminBrandRowProps {
  brand: BrandRow;
}

const AdminBrandRow: React.FC<AdminBrandRowProps> = ({ brand }) => {
  // const [isDisabled, setIsDisabled] = useState<boolean>(brand.disabled)
  const [openChangeBrandStatusDialog, setOpenChangeBrandStatusDialog] = useState(false); // Mod
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false); 
  
  const [thisBrand, setThisBrand] = useState(brand)

  return (
    <tr className="hover:bg-slate-50 border-b border-slate-200">
       {/* <td className="p-4 py-5 overflow-x-clip">
        <p className="block font-semibold text-sm text-slate-800">{brand.brandId}</p>
      </td> */}
      <td className="p-4 py-5">
        <img
          src={thisBrand.imageUrl != null ? thisBrand.imageUrl : DEFAULT_AVATAR_URL}
          alt="Profile"
          className="w-8 h-8 p-1 rounded-full"
        />
      </td>
      <td className="p-4 py-5">
        <p className="block font-semibold text-sm text-slate-800">{thisBrand.displayName}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisBrand.username}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisBrand.field}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisBrand.headQuarter}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{toLocaleString(thisBrand.createAt!)} </p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm main-text font-bold text-slate-800 cursor-pointer" onClick={() => setOpenChangeBrandStatusDialog(true)}>{thisBrand.status}</p>
        <ChangeBrandStatusDialog onChange={setThisBrand} setOpen={setOpenChangeBrandStatusDialog} open={openChangeBrandStatusDialog} brand={thisBrand}/>
      </td>
      <td className="p-4 py-5">
        <button
          className="p-2 rounded-full bg-transparent main-text focus:none hover:bg-gray-100"
          aria-label="Edit User"
          onClick={() => setOpenUpdateDialog(true)}
        >
          <PencilIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
        </button>
        <UpdateBrandDialog open={openUpdateDialog} setOpen={setOpenUpdateDialog} brand={thisBrand} />

      </td>
    </tr>
  );
};

export default AdminBrandRow;
