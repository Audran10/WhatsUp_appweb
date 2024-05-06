import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import GroupPicItem from '../../components/items/GroupPicItem';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { ShowDetailsGroupContext } from '../../provider/ShowDetailsGroupProvider';
import { IoExitOutline } from 'react-icons/io5';
import leaveConversation from '../../hooks/conversations/leaveConversation';
import getConversationById from '../../hooks/conversations/getConversationById';
import InputProfileItem from '../../components/items/InputProfileItem';
import MemberListItem from '../../components/items/MemberListItem';
import Conversation from '../../models/Conversation';
import { formatDateComplete } from '../../utils/formatDate';
import User from '../../models/User';
import updateConversation from '../../hooks/conversations/updateConversation';

const DetailsGroupPage: React.FC = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [conversationData, setConversationData] = useState<Conversation>();
  const user = useSelector((state: RootState) => state.user.value);
  const { setShowDetailsGroup } = useContext(ShowDetailsGroupContext);
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [members, setMembers] = useState<User[]>([]);
  const [conversationPicture, setConversationPicture] = useState<
    File | undefined
  >(undefined);

  if (!conversationId) {
    return null;
  }

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }

  const isAdmin = conversationData?.owned_by === user._id;

  useEffect(() => {
    fetchConversationData();
  }, [conversationId]);

  const fetchConversationData = async () => {
    const data = await getConversationById(conversationId);
    if (data) {
      setConversationData(data);
      setName(data.name || '');
      setDate(data.created_at || '');
      setMembers(data.users || []);
    }
  };

  const onMembersChange = () => {
    fetchConversationData();
  };

  const handleUpdateGroup = () => {
    const formData = new FormData();

    if (name) {
      formData.append('name', name);
    }

    if (conversationPicture) {
      formData.append('file', conversationPicture);
    }

    updateConversation(conversationId, formData).then(() => {
      onMembersChange();
      window.location.reload();
    });
  };

  return (
    <div className="h-full justify-center items-center bg-secondaryWhite">
      <div className="flex h-[14%] w-full p-6 items-end justify-between bg-mainGreen">
        <div className="flex gap-8">
          <button onClick={() => setShowDetailsGroup(false)}>
            <FaArrowLeft className="h-6 w-6 text-mainWhite" />
          </button>
          <h1 className="text-2xl text-mainWhite">Detail</h1>
        </div>
        <div className="flex gap-3 ml-auto">
          <button
            onClick={() => {
              leaveConversation(conversationId);
              navigate('/');
              window.location.reload();
            }}
            className="flex">
            <IoExitOutline className="flex h-7 w-7 text-mainWhite" />
          </button>
        </div>
      </div>
      <GroupPicItem
        placeholder="Ajouter une photo à la conversation"
        picture={conversationData?.picture_url ?? ''}
        date={formatDateComplete(new Date(date))}
        setGroupPicture={setConversationPicture}
      />

      <InputProfileItem
        labelName={'Nom de la conversation'}
        type="text"
        value={name}
        required={false}
        maxLength={64}
        onChangeValue={(e) => setName(e.target.value)}
      />

      <MemberListItem
        users={members}
        isAdmin={isAdmin}
        owned_by={conversationData?.owned_by ?? ''}
        conversationId={conversationId}
        onMembersChange={onMembersChange}
      />

      <div className="flex justify-center w-full">
        <button
          className="bg-mainGreen text-mainWhite p-2 rounded-lg mt-2 w-32"
          onClick={handleUpdateGroup}>
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default DetailsGroupPage;
