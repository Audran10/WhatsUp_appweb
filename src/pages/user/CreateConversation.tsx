import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ButtonAddMember from '../../components/user/createConversation/ButtonAddMember';
import InputMember from '../../components/user/createConversation/InputMember';
import createConversation from '../../hooks/conversations/createConversation';
import UserPicItem from '../../components/items/ConversationPicItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { isValidPhoneNumber } from '../../utils/utils';
import { useTranslation } from 'react-i18next';

interface CreateConversationProps {
  setShowCreateGroup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateConversation: React.FC<CreateConversationProps> = ({
  setShowCreateGroup,
}) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user.value);
  const [nbMembers, setNbMembers] = useState<number>(1);
  const [conversationName, setConversationName] = useState<string | undefined>(
    undefined
  );
  const [conversationPicture, setConversationPicture] = useState<
    File | undefined
  >(undefined);
  const [members, setMembers] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const newUserRef = useRef<HTMLDivElement>(null);

  const handleAddMember = () => {
    if (!isValidPhoneNumber(members[nbMembers - 1])) {
      setError(t('new_conversation_error_phone_format'));
      return;
    }
    setNbMembers(nbMembers + 1);
    setMembers([...members, '']);
    setError(undefined);
    setIsDisabled(true);
  };

  const handleRemoveMember = () => {
    if (nbMembers > 1) {
      setNbMembers(nbMembers - 1);
      setMembers(members.slice(0, members.length - 1));
      setError(undefined);
      setIsDisabled(false);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newMembers = [...members];

    if (!isValidPhoneNumber(value)) {
      newMembers[index] = value;
      setIsDisabled(true);
    } else if (value === user?.phone) {
      newMembers[index] = value;
      setIsDisabled(true);
      setError(t('new_conversation_error_ourself'));
    } else if (newMembers.includes(value)) {
      newMembers[index] = value;
      setIsDisabled(true);
      setError(t('new_conversation_error_same_member'));
    } else {
      newMembers[index] = value;
      setIsDisabled(false);
      setError(undefined);
    }

    setMembers(newMembers);
  };

  const handleCreateConversation = () => {
    let formData = new FormData();

    if (conversationName) {
      formData.append('name', conversationName);
    }

    members.forEach((user) => {
      formData.append('users[]', user);
    });

    if (conversationPicture) {
      formData.append('file', conversationPicture);
    }

    createConversation(formData).then((conversation) => {
      setShowCreateGroup(false);
      window.location.href = `/${conversation._id}`;
    });
  };

  const scrollToBottom = () => {
    if (newUserRef.current) {
      newUserRef.current.scrollTop = newUserRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [nbMembers]);

  return (
    <div className='flex flex-col h-full justify-center items-center  bg-mainWhite'>
      <div className='flex flex-row w-full gap-8 h-[14%] p-6 items-end bg-mainGreen'>
        <button onClick={() => setShowCreateGroup(false)}>
          <FaArrowLeft className='h-6 w-6 text-mainWhite' />
        </button>
        <h1 className='text-2xl text-mainWhite'>{t('new_conversation')}</h1>
      </div>

      <div className='h-[86%] w-full'>
        <UserPicItem
          placeholder={t('new_conversation_picture')}
          setConversationPicture={setConversationPicture}
        />

        <input
          type='text'
          className='w-full p-4 text-sm text-mainGray bg-secondaryWhite focus:outline-none mb-2 mt-2'
          placeholder={t('new_conversation_name')}
          maxLength={50}
          onChange={(e) => setConversationName(e.target.value)}
        />
        <div
          className='flex flex-col max-h-[45%] w-full overflow-y-auto'
          ref={newUserRef}
        >
          {[...Array(nbMembers)].map((_, index) => (
            <InputMember
              key={index}
              index={index}
              value={members[index] || ''}
              onClick={handleRemoveMember}
              onChange={(value) => handleInputChange(index, value)}
              placeholder={`${t('new_conversation_member')} ${index + 1}`}
            />
          ))}
          <p className='text-red-400 text-base ml-2'>{error}</p>

          <div className='ml-2'>
            <ButtonAddMember
              onClick={handleAddMember}
              placeholder={t('new_conversation_add_member')}
              disabled={isDisabled}
            />
          </div>
        </div>

        <div className='flex justify-center items-center w-full mt-4 mb-2'>
          <button
            onClick={handleCreateConversation}
            className={`p-2 rounded-lg ${
              isDisabled
                ? 'bg-secondaryWhite text-secondaryGray'
                : 'bg-mainGreen text-mainWhite'
            }`}
            disabled={isDisabled}
          >
            {t('new_conversation_create')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateConversation;
