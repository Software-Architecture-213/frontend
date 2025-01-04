import React, { useState } from 'react';
import { UserRow } from '../../../types/user';
import { DEFAULT_AVATAR_URL } from '../../../constants/app';
import Toggle from '../../../components/Toggle';
import DisableUserDialog from './DisableUserDialog';

interface AdminUserRowProps {
  user: UserRow;
}

const AdminUserRow: React.FC<AdminUserRowProps> = ({ user }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(user.disabled)
  const [openDisableUserDialog, setOpenDisableUserDialog] = useState(false); // Mod


  // const handleEnableUser = async () => {
  //   try {
  //      const response = await identityUserApi.enableUser(user.email!, !isEnabled)
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
        <p className="block font-semibold text-sm text-slate-800">{user.userId}</p>
      </td> */}
      <td className="p-4 py-5">
        <img
          src={user.photoUrl != null ? user.photoUrl : DEFAULT_AVATAR_URL}
          alt="Profile"
          className="w-8 h-8 p-1 rounded-full"
        />
      </td>
      <td className="p-4 py-5">
        <p className="block font-semibold text-sm text-slate-800">{user.displayName}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{user.email}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{user.dateOfBirth}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{user.gender}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{user.phoneNumber}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{user.lastSignIn}</p>
      </td>
      <td className="p-4 py-5">
      {/* {user.disabled ? (
          <span className="text-red-500 font-bold text-lg">✘</span>
        ) : (
          <span className="text-green-500 font-bold text-lg">✔</span>
        )} */}
        <Toggle checked={isDisabled} onClick={() => setOpenDisableUserDialog(true)} />
        <DisableUserDialog open={openDisableUserDialog} setOpen={setOpenDisableUserDialog} onChange={setIsDisabled} user={user} />
      </td>
    </tr>
  );
};

export default AdminUserRow;
