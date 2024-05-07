import React, { useCallback, useState } from 'react';
import { BanUser } from '../../../hooks/admin/BanUser';
import { UnbanUser } from '../../../hooks/admin/UnbanUser';
import { FetchUserById } from '../../../hooks/FetchUserById';

export const UserItem: React.FC<{
  userId: string;
  email: string;
  username: string;
  phone: string;
}> = ({ userId, email, username, phone }) => {
  const [isBanned, setIsBanned] = useState<boolean>(false);

  const updateUserRole = useCallback(() => {
    FetchUserById(userId).then((data) => {
      if (data.role === 'banned') {
        setIsBanned(true);
      } else {
        setIsBanned(false);
      }
    });
  }, []);

  const handleBan = async (id: string) => {
    await BanUser(id);
    updateUserRole();
  };

  const handleUnban = async (id: string) => {
    await UnbanUser(id);
    updateUserRole();
  };

  return (
    <div className="w-full flex flex-row p-4 border-b hover:bg-gray-50 items-center">
      <div className="w-1/5 text-gray-800 text-left ">{`n°${userId}`}</div>
      <div className="w-1/5 text-gray-500 text-center">
        <span className="text-gray-700">{email}</span>
      </div>
      <div className="w-1/5 text-gray-500 text-center">
        <span className="text-gray-700">{username}</span>
      </div>
      <div className="w-1/5 text-gray-500 text-center">
        <span className="text-gray-700">{phone}</span>
      </div>
      <div className="w-1/5 text-center">
        {isBanned === false ? (
          <button
            onClick={() => handleBan(userId)}
            className="bg-red-500 text-white p-2 rounded">
            Bannir
          </button>
        ) : (
          <button
            onClick={() => handleUnban(userId)}
            className="mr-2 bg-green-500 text-white p-2 rounded">
            Debannir
          </button>
        )}
      </div>
    </div>
  );
};
