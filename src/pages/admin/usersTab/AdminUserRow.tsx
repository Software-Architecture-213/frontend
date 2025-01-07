import React, { useState } from 'react';
import { UserRow } from '../../../types/user';
import { DEFAULT_AVATAR_URL } from '../../../constants/app';
import Toggle from '../../../components/Toggle';
import DisableUserDialog from './DisableUserDialog';
import { PencilIcon } from '@heroicons/react/16/solid';
import UpdateUserDialog from './UpdateUserDialog';

interface AdminUserRowProps {
  user: UserRow;
}

const AdminUserRow: React.FC<AdminUserRowProps> = ({ user }) => {
  const [openDisableUserDialog, setOpenDisableUserDialog] = useState(false); 
  const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState(false); 
  const [thisUser, setThisUser] = useState<UserRow>(user)

  return (
    <tr className="hover:bg-slate-50 border-b border-slate-200">
       {/* <td className="p-4 py-5 overflow-x-clip">
        <p className="block font-semibold text-sm text-slate-800">{user.userId}</p>
      </td> */}
      <td className="p-4 py-5">
        <img
          src={thisUser.photoUrl != null ? thisUser.photoUrl : DEFAULT_AVATAR_URL}
          alt="Profile"
          className="w-8 h-8 p-1 rounded-full"
        />
      </td>
      <td className="p-4 py-5">
        <p className="block font-semibold text-sm text-slate-800">{thisUser.displayName}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisUser.email}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisUser.dateOfBirth}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisUser.gender}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisUser.phoneNumber}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisUser.lastSignIn}</p>
      </td>
      <td className="p-4 py-5">
        <Toggle checked={thisUser.disabled} onClick={() => setOpenDisableUserDialog(true)} />
        <DisableUserDialog open={openDisableUserDialog} setOpen={setOpenDisableUserDialog} onChange={setThisUser} user={thisUser} />
      </td>
      <td className="p-4 py-5">
        <button
          className="p-2 rounded-full bg-transparent main-text focus:none hover:bg-gray-100"
          aria-label="Edit User"
          onClick={() => setOpenUpdateUserDialog(true)}
        >
          <PencilIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
        </button>
        <UpdateUserDialog open={openUpdateUserDialog} setOpen={setOpenUpdateUserDialog} user={thisUser} />

      </td>
    </tr>
  );
};

export default AdminUserRow;
