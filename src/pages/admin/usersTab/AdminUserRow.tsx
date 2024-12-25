import React from 'react';
import { UserRow } from '../../../types/user';
import { DEFAULT_AVATAR_URL } from '../../../constants/app';

interface AdminUserRowProps {
  user: UserRow;
}

const AdminUserRow: React.FC<AdminUserRowProps> = ({ user }) => {
  return (
    <tr className="hover:bg-slate-50 border-b border-slate-200">
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
      {user.disabled ? (
          <span className="text-red-500 font-bold text-lg">✘</span>
        ) : (
          <span className="text-green-500 font-bold text-lg">✔</span>
        )}
      </td>
      <td className="p-4 py-5 flex justify-content-center space-x-4">
        <div
          className="main-text bg-transparent cursor-pointer"
          title="Edit"
          onClick={() => console.log('Edit user', user.userId)}
        >
          🖉
        </div>
        <div
          className="text-red bg-transparent cursor-pointer"
          title="Delete"
          onClick={() => console.log('Delete user', user.userId)}
        >
          🗑️
        </div>
      </td>
    </tr>
  );
};

export default AdminUserRow;
