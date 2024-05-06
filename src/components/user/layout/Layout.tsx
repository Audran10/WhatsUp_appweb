import React, { useEffect, useState } from 'react';
import LayoutTop from './LayoutTop';
import SearchBar from '../../common/SearchBar';
import LayoutDiscussionGroupCard from './LayoutDiscussionGroupCard';
import CreateConversation from '../../../pages/user/CreateConversation';
import ProfilePage from '../../../pages/user/ProfilePage';
import getMyConversations from '../../../hooks/conversations/getMyConversations';
import Conversation from '../../../models/Conversation';
import { formatListConversationDate } from '../../../utils/formatDate';
import findSenderMessage from '../../../utils/findSenderMessage';
import { Outlet } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

const Layout: React.FC = () => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user.value);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversations, setSelectedConversations] = useState<
    Conversation[] | []
  >([]);
  const [showCreateGroup, setShowCreateGroup] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const socket = io('http://localhost:3000');

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }

  const joinRoom = () => {
    if (socket && user._id) {
      socket.emit('joinNotification', user._id);
    }
  };

  useEffect(() => {
    getMyConversations().then((data) => {
      setConversations(data);
      setSelectedConversations(data);
      joinRoom();
      setLoading(false);
    });
    AOS.init({
      duration: 400,
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filteredConversations = conversations.filter((conversation) =>
      conversation.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSelectedConversations(filteredConversations);
  };

  useEffect(() => {
    function onConversationChange(conversation: string) {
      const updateConv = JSON.parse(conversation);
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conv) => {
          if (conv._id === updateConv._id) {
            return updateConv;
          }
          return conv;
        });
        return updatedConversations;
      });
  
      setSelectedConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conv) => {
          if (conv._id === updateConv._id) {
            return updateConv;
          }
          return conv;
        });
        return updatedConversations;
      });
    }
    socket.on('new_message', onConversationChange);
  }, [conversations, selectedConversations]);
  

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen w-full bg-mainBeige'>
        <ClipLoader color='#99999e' size={50} />
      </div>
    );
  }

  return (
    <div className='flex h-full w-full'>
      <div className='flex flex-col h-full w-[30%] border-r-[1px] border-stone-200 bg-mainWhite container'>
        {showCreateGroup && !showProfile && (
          <div className='h-full' data-aos={'fade-right'}>
            <CreateConversation setShowCreateGroup={setShowCreateGroup} />
          </div>
        )}
        {showProfile && !showCreateGroup && (
          <div className='h-full' data-aos={'fade-right'}>
            <ProfilePage setShowProfile={setShowProfile} />
          </div>
        )}

        {!showCreateGroup && !showProfile && (
          <>
            <LayoutTop
              profilePicture={user.picture_url}
              setShowCreateGroup={setShowCreateGroup}
              setShowProfile={setShowProfile}
            />

            <SearchBar onChange={handleChange} placeholder={t('search')} />

            <div className='container overflow-y-auto'>
              {selectedConversations
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime()
                )
                .map((conversation) => (
                  <LayoutDiscussionGroupCard
                    key={conversation._id}
                    conversationId={conversation._id}
                    groupPicture={conversation.picture_url}
                    name={conversation.name}
                    lastSender={
                      conversation.last_message
                        ? findSenderMessage(
                            conversation,
                            conversation.last_message?.sender_id
                          ).pseudo
                        : ''
                    }
                    lastMessage={conversation.last_message?.content}
                    date={formatListConversationDate(
                      conversation.last_message?.created_at
                    )}
                  />
                ))}
            </div>
          </>
        )}
      </div>

      <div className='flex flex-col w-[70%] bg-secondaryWhite container'>
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
