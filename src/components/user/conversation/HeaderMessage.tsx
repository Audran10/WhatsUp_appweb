import React, { useEffect, useState, useContext, useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import defaultAvatar from '../../../assets/defaultAvatar.png';
import leaveConversation from '../../../hooks/conversations/leaveConversation';
import { useParams } from 'react-router-dom';
import { ShowDetailsGroupContext } from '../../../provider/ShowDetailsGroupProvider';

interface HeaderMessageProps {
  title: string | undefined;
  picture: string | undefined;
}

const HeaderMessage: React.FC<HeaderMessageProps> = ({ title, picture }) => {
  const { conversationId } = useParams();
  const { setShowDetailsGroup } = useContext(ShowDetailsGroupContext);

  const [isOpen, setIsOpen] = useState(false);
  const optionRef = useRef<HTMLDivElement>(null);

  if (!conversationId) {
    return null;
  }

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  const leaveGroup = () => {
    leaveConversation(conversationId).then(() => {
      window.location.href = '/';
    });
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-secondaryWhite w-full h-[8%] flex items-center justify-between p-4 relative">
      <div className="flex">
        <img
          className="w-14 h-14 rounded-full object-center object-cover "
          src={picture ?? defaultAvatar}
          alt="logo"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-semibold ml-4">{title}</h1>
        </div>
      </div>
      <button
        onClick={openMenu}
        className={`flex justify-center items-center h-10 w-10 ${
          isOpen ? 'bg-gray-300 rounded-full' : null
        }`}>
        <BsThreeDotsVertical className="text-mainGray text-2xl" />
      </button>
      {isOpen && (
        <div
          className="absolute top-full right-1 bg-white border border-gray-200 rounded shadow-md mt-1"
          ref={optionRef}>
          <button
            onClick={() => setShowDetailsGroup && setShowDetailsGroup(true)}
            className="block w-full py-2 px-4 text-sm text-left text-gray-800 hover:bg-gray-100">
            Information du groupe
          </button>
          <button
            onClick={leaveGroup}
            className="block w-full py-2 px-4 text-sm text-left text-gray-800 hover:bg-gray-100">
            Quitter le groupe
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderMessage;
