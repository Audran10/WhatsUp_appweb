import React, { useCallback, useState } from 'react';
import { banUser } from '../../../hooks/admin/BanUser';
import { unbanUser } from '../../../hooks/admin/UnbanUser';
import { fetchUser } from '../../../hooks/FetchUser';

export const UserItem: React.FC<{
  userId: string;
  email: string;
  username: string;
  phone: string;
}> = ({ userId, email, username, phone }) => {
  const [isBanned, setIsBanned] = useState<boolean>(false);

  const updateUserRole = useCallback(() => {
    const fetchUserData = async () => {
      const data = await fetchUser(userId);
      if (data.role === 'banned') {
        setIsBanned(true);
      } else {
        setIsBanned(false);
      }
    };

    fetchUserData();
  }, []);

  const handleBan = async (id: string) => {
    await banUser(id);
    updateUserRole();
  };

  const handleUnban = async (id: string) => {
    await unbanUser(id);
    updateUserRole();
  };

  return (
    <div className="w-full flex flex-row p-4 border-b hover:bg-gray-50 items-center">
      <div className="w-2/5 font-semibold text-lg text-gray-800 text-left ">
        {`n°${userId}`}
      </div>
      <div className="w-1/5 text-gray-500 text-left">
        <span className="text-gray-700">{email}</span>
      </div>
      <div className="w-1/5 text-gray-500 text-left">
        <span className="text-gray-700">{username}</span>
      </div>
      <div className="w-1/5 text-gray-500 text-left">
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
