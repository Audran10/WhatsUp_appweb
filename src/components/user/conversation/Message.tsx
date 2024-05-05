import React, { useEffect, useRef, useState } from 'react';
import User from '../../../models/User';
import { IoIosArrowDown } from 'react-icons/io';
import defaultAvatar from '../../../assets/defaultAvatar.png';
import createTicket from '../../../hooks/tickets/createTicket';
import Message from '../../../models/Message';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { formatDateInHour, isSameDay } from '../../../utils/formatDate';
import { useTranslation } from 'react-i18next';

interface MessageComposantProps {
  myMessage: boolean;
  sender: User;
  message: Message;
  lastMessage: Message | null;
}

const MessageComposant: React.FC<MessageComposantProps> = ({
  myMessage,
  sender,
  message,
  lastMessage,
}) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user.value);
  const [showMessageOption, setShowMessageOption] = useState(false);
  const [optionIsOpen, setOptionIsOpen] = useState(false);
  const optionRef = useRef<HTMLButtonElement>(null);

  const lastMessageDate = new Date(lastMessage?.created_at ?? '');
  const messageDate = new Date(message.created_at);

  if (!user) {
    return null;
  }

  const toggleMessageOption = () => {
    setShowMessageOption(!showMessageOption);
  };

  const openOption = () => {
    setOptionIsOpen(!optionIsOpen);
  };

  const handleReport = () => {
    createTicket(user._id, message, sender);
    setOptionIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
      setOptionIsOpen(false);
    }
  };

  const shouldDisplayProfilePicture =
    !myMessage &&
    (!lastMessage ||
      lastMessage.sender_id !== message.sender_id ||
      !isSameDay(lastMessageDate, messageDate));

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {myMessage ? (
        <div
          className={`flex justify-end w-[97%] h-auto ${
            lastMessage?.sender_id === message.sender_id ? 'pb-1' : 'pt-4 pb-1'
          }`}>
          <div className="flex flex-col bg-secondaryGreen rounded-xl p-2 max-w-[60%] relative">
            <div>
              <span className="text-base break-words">{message.content}</span>
              <span className="text-secondaryGray text-xs float-right mt-[0.4rem] ml-2">
                {message.created_at && formatDateInHour(message.created_at)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`flex w-full h-auto relative ${
            shouldDisplayProfilePicture ? 'pt-4 pb-1' : 'pb-1 pl-11'
          }`}>
          {shouldDisplayProfilePicture && (
            <img
              className="w-7 h-7 rounded-full object-center object-cover m-2"
              src={sender.picture_url ?? defaultAvatar}
              alt="logo"
            />
          )}

          <div
            className="flex bg-mainWhite rounded-xl p-2 max-w-[60%]"
            onMouseEnter={toggleMessageOption}
            onMouseLeave={toggleMessageOption}>
            <div className="max-w-[95%]">
              {lastMessage?.sender_id !== message.sender_id && (
                <h1 className="text-base text-red-300">{sender?.pseudo}</h1>
              )}
              <span className="text-base break-words">{message.content}</span>
            </div>

            <div className="h-full flex flex-col flex-grow justify-between ml-2">
              <button className="self-center" onClick={openOption}>
                <IoIosArrowDown
                  className={`h-5 w-5 ${
                    showMessageOption
                      ? 'text-secondaryGray'
                      : 'text-transparent'
                  }`}
                />
              </button>
              <span className="text-secondaryGray text-xs flex justify-center">
                {message.created_at && formatDateInHour(message.created_at)}
              </span>
            </div>
          </div>

          {optionIsOpen && (
            <button
              className="flex bg-mainWhite py-2 px-4 rounded h-10 ml-1 hover:bg-secondaryWhite text-mainGray"
              onClick={handleReport}
              ref={optionRef}>
              {t('report')}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default MessageComposant;
