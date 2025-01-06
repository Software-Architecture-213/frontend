import React, { useState } from 'react';
import { DEFAULT_AVATAR_URL } from '../../../constants/app';
import { BrandRow } from '../../../types/brand';
import ChangeBrandStatusDialog from './ChangeBrandStatusDialog';

interface AdminBrandRowProps {
  brand: BrandRow;
}

const AdminBrandRow: React.FC<AdminBrandRowProps> = ({ brand }) => {
  // const [isDisabled, setIsDisabled] = useState<boolean>(brand.disabled)
  const [openChangeBrandStatusDialog, setOpenChangeBrandStatusDialog] = useState(false); // Mod
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
        <p className="block text-sm text-slate-800">{thisBrand.createAt} </p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm main-text font-bold text-slate-800 cursor-pointer" onClick={() => setOpenChangeBrandStatusDialog(true)}>{thisBrand.status}</p>
        <ChangeBrandStatusDialog onChange={setThisBrand} setOpen={setOpenChangeBrandStatusDialog} open={openChangeBrandStatusDialog} brand={thisBrand}/>
      </td>
      {/* <td className="p-4 py-5">
      {brand.disabled ? (
          <span className="text-red-500 font-bold text-lg">✘</span>
        ) : (
          <span className="text-green-500 font-bold text-lg">✔</span>
        )} */}
        {/* <Toggle checked={isDisabled} onClick={() => setOpenDisablebrandDialog(true)} /> */}
        {/* <DisablebrandDialog open={openDisablebrandDialog} setOpen={setOpenDisablebrandDialog} onChange={setIsDisabled} brand={brand} />
      </td> */}
    </tr>
  );
};

export default AdminBrandRow;
