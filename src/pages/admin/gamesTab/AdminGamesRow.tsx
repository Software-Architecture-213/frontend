import React, { useState } from 'react';
import { DEFAULT_AVATAR_URL } from '../../../constants/app';
import { PencilIcon } from '@heroicons/react/16/solid';

import { GameRow } from '../../../types/game';
import UpdateGameDialog from './UpdateGameDialog';
import { toLocaleString } from '../../../utils/dateUtils';
interface GameRowProps {
  game: GameRow;
}

const AdminGamesRow: React.FC<GameRowProps> = ({ game }) => {
  const [openDisableUserDialog, setOpenDisableUserDialog] = useState(false); 
  const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState(false); 
  const [thisGame, setThisGame] = useState<GameRow>(game)

  return (
    <tr className="hover:bg-slate-50 border-b border-slate-200">
       {/* <td className="p-4 py-5 overflow-x-clip">
        <p className="block font-semibold text-sm text-slate-800">{user.userId}</p>
      </td> */}
      <td className="p-4 py-5">
        <img
          src={thisGame.imageUrl != null ? thisGame.imageUrl : DEFAULT_AVATAR_URL}
          alt="Profile"
          className="w-8 h-8 p-1 rounded-full"
        />
      </td>
      <td className="p-4 py-5">
        <p className="block font-semibold text-sm text-slate-800">{thisGame.name}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisGame.description}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisGame.type.toUpperCase()}</p>
      </td>
  
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{thisGame.difficulty.toUpperCase()}</p>
      </td>
      <td className="p-4 py-5">
        <p className="block text-sm text-slate-800">{toLocaleString(thisGame.createdAt!)}</p>
      </td>
      {/* <td className="p-4 py-5">
        <Toggle checked={thisGame.disabled} onClick={() => setOpenDisableUserDialog(true)} />
        <DisableUserDialog open={openDisableUserDialog} setOpen={setOpenDisableUserDialog} onChange={setThisGame} user={thisGame} />
      </td> */}
      <td className="p-4 py-5">
        <button
          className="p-2 rounded-full bg-transparent main-text focus:none hover:bg-gray-100"
          aria-label="Edit User"
          onClick={() => setOpenUpdateUserDialog(true)}
        >
          <PencilIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
        </button>
        <UpdateGameDialog open={openUpdateUserDialog} setOpen={setOpenUpdateUserDialog} game={thisGame} />

      </td>
    </tr>
  );
};

export default AdminGamesRow;
