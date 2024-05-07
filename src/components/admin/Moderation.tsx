import React, { useEffect, useState } from 'react';
import { UserItem } from './items/UserItem';
import User from '../../models/User';
import { FetchUsers } from '../../hooks/FetchUsers';

export const Moderation: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    FetchUsers().then((data) => setUsers(data));
  }, []);

  return (
    <>
      <div className="text-center px-6 p-4 text-2xl border-b">Modération</div>
      <div className="w-full flex flex-col items-start h-max overflow-y-auto">
        <div className="flex flex-row justify-between w-full text-left border-b px-2 py-4">
          <div className="w-1/5 text-xl font-semibold">Id de l'utilisateur</div>
          <div className="w-1/5 text-xl text-center font-semibold">Email</div>
          <div className="w-1/5 text-xl text-center font-semibold">
            Nom d'utilisateur
          </div>
          <div className="w-1/5 text-xl text-center font-semibold">
            N° de téléphone
          </div>
          <div className="w-1/5 text-xl text-center font-semibold">Action</div>
        </div>
        {users.map((user, index) => (
          <UserItem
            key={index}
            userId={user._id}
            username={user.pseudo}
            phone={user.phone}
            email={user.email}
          />
        ))}
      </div>
    </>
  );
};
