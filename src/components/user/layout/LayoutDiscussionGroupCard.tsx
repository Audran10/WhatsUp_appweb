import React from 'react';
import { Link, useParams } from 'react-router-dom';
import defaultAvatar from '../../../assets/defaultAvatar.png';
import { useTranslation } from 'react-i18next';

interface LayoutDiscussionGroupCardProps {
  conversationId: string;
  groupPicture: string;
  name: string;
  lastSender: string;
  lastMessage: string;
  date: string;
}

const LayoutDiscussionGroupCard: React.FC<LayoutDiscussionGroupCardProps> = ({
  conversationId,
  groupPicture,
  name,
  lastSender,
  lastMessage,
  date,
}) => {
  const { t } = useTranslation();
  const params = useParams();

  const goToConversation = () => {
    window.location.href = `/${conversationId}`;
  };

  return (
    <div
      onClick={goToConversation}
      className={`flex w-full h-20 p-4 border-b hover:bg-secondaryWhite hover:cursor-pointer ${
        params.conversationId === conversationId ? 'bg-secondaryWhite' : ''
      }`}
    >
      <img
        className='w-14 h-14 rounded-full object-center object-cover'
        src={groupPicture ?? defaultAvatar}
        alt='logo'
      />
      <div className='flex flex-col w-full h-full p-2  whitespace-nowrap overflow-hidden'>
        <div className='flex h-[50%] w-full justify-between items-center'>
          <h1 className='text-xl font-semibold'>{name}</h1>
          {lastMessage && (
            <span className='text-sm text-secondaryGray'>{date}</span>
          )}
        </div>
        <div className='flex h-[50%] w-full mt-1 items-center'>
          {lastMessage ? (
            <>
              <span className='text-sm text-secondaryGray overflow-hidden text-ellipsis'>
                {lastSender}: {lastMessage}
              </span>
            </>
          ) : (
            <span className='text-sm text-secondaryGray'>
              {t('conversation_no_message')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LayoutDiscussionGroupCard;
