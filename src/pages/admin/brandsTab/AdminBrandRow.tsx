import React, { useState } from 'react';
import { DEFAULT_AVATAR_URL } from '../../../constants/app';
import Toggle from '../../../components/Toggle';
import { BrandRow } from '../../../types/brand';

interface AdminBrandRowProps {
  brand: BrandRow;
}

const AdminBrandRow: React.FC<AdminBrandRowProps> = ({ brand }) => {
  // const [isDisabled, setIsDisabled] = useState<boolean>(brand.disabled)
  const [openDisablebrandDialog, setOpenDisablebrandDialog] = useState(false); // Mod


  // const handleEnablebrand = async () => {
  //   try {
  //      const response = await identitybrandApi.enablebrand(brand.email!, !isEnabled)
  //      const data = response.data
  //      console.log(data)
  //      setIsEnabled(!isEnabled)
  //   } catch (error) {
  //     console.error("Error updating profile: ", error);
  //   } 
  // }

  return (
    <tr className="hover:bg-slate-50 border-b border-slate-200">
       {/* <td className="p-4 py-5 overflow-x-clip">
        <p className="block font-semibold text-sm text-slate-800">{brand.brandId}</p>
      </td> */}
      <td className="p-4 py-5">
        <img
          src={brand.imageUrl != null ? brand.imageUrl : DEFAULT_AVATAR_URL}
          alt="Profile"
          className="w-8 h-8 p-1 rounded-full"
        />
      </td>
      <td className="p-4 py-5">
        <p className="block font-semibold text-sm text-slate-800">{brand.displayName}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{brand.username}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{brand.field}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{brand.createAt} </p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm main-text font-bold text-slate-800 cursor-pointer">{brand.status}</p>
      </td>
      <td className="p-4 py-5">
      {/* {brand.disabled ? (
          <span className="text-red-500 font-bold text-lg">✘</span>
        ) : (
          <span className="text-green-500 font-bold text-lg">✔</span>
        )} */}
        {/* <Toggle checked={isDisabled} onClick={() => setOpenDisablebrandDialog(true)} /> */}
        {/* <DisablebrandDialog open={openDisablebrandDialog} setOpen={setOpenDisablebrandDialog} onChange={setIsDisabled} brand={brand} /> */}
      </td>
    </tr>
  );
};

export default AdminBrandRow;
