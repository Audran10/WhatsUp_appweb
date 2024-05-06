import React, { useEffect, useState } from 'react';
import User from '../../models/User';
import { TbCrown } from 'react-icons/tb';
import updateConversation from '../../hooks/conversations/updateConversation';
import { CiCircleRemove } from 'react-icons/ci';

interface MemberListItemProps {
  users: User[] | undefined;
  isAdmin: boolean;
  owned_by: string;
  conversationId: string;
}

const MemberListItem: React.FC<MemberListItemProps> = ({
  users,
  isAdmin,
  owned_by,
  conversationId,
}) => {
  const userDefaultPicture = `src/assets/defaultAvatar.png`;
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    setMembers(users || []);
  }, [users]);

  useEffect(() => {}, [members]);

  const handleKickUser = (kickedMemberId: string) => {
    const newMembersAfterKick = members.filter(
      (member) => member._id !== kickedMemberId
    );
    setMembers(newMembersAfterKick);

    const formData = new FormData();

    members.forEach((user) => {
      formData.append('users[]', user.phone);
    });

    updateConversation(conversationId, formData);
  };

  return (
    <div className="py-4 px-8 mb-4 bg-mainWhite shadow-md">
      <label className="font-medium">Membres</label>
      <div className="mt-2 overflow-y-auto max-h-48">
        {members?.map((member) => (
          <div key={member._id} className="flex items-center py-2">
            <img
              src={member.picture_url || userDefaultPicture}
              alt={member.pseudo}
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                marginRight: 10,
              }}
            />
            <span className="text-gray-500">{member.pseudo}</span>
            {member._id == owned_by && <TbCrown className="ml-2" />}

            {isAdmin && member._id != owned_by && (
              <button onClick={async () => handleKickUser(member._id)}>
                <CiCircleRemove className="text-mainRed text-2xl" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberListItem;
