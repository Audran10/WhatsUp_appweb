import React, { useEffect, useState } from 'react';
import { LayoutCategory } from './layout/LayoutCategory';
import { UserItem } from './items/UserItem';
import User from '../../models/User';

export const Moderation: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <LayoutCategory
      panelName={'Modération'}
      firstCategory={"Id de l'utilisateur"}
      secondCategory={'Email'}
      thirdCategory={"Nom d'utilisateur"}
      fourthCategory={'N° de téléphone'}>
      {users.map((user, index) => (
        <UserItem
          key={index}
          userId={user._id}
          username={user.pseudo}
          phone={user.phone}
          email={user.email}
        />
      ))}
    </LayoutCategory>
  );
};
