import React from 'react';
import { UserRow } from '../../../types/user';

interface AdminUserRowProps {
  user: UserRow;
}

const AdminUserRow: React.FC<AdminUserRowProps> = ({ user }) => {
  return (
    <tr className="hover:bg-slate-50 border-b border-slate-200">
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
            <p className="block text-sm text-slate-800">{!user.disabled ? "TRUE" : "FALSE"}</p>
          </td>
          <td className="p-4 py-5">
              Delete, Edit
          </td>
        </tr>
  );
};

export default AdminUserRow;
