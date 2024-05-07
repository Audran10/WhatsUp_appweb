import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import getConversationById from '../../hooks/conversations/getConversationById';
import Conversation from '../../models/Conversation';
import { ClipLoader } from 'react-spinners';
import HeaderMessage from '../../components/user/conversation/HeaderMessage';
import DateIndicator from '../../components/user/conversation/DateIndicator';
import MessageComposant from '../../components/user/conversation/Message';
import InputMessage from '../../components/user/conversation/InputMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import findSenderMessage from '../../utils/findSenderMessage';

const ConversationPage: React.FC = () => {
  const { conversationId } = useParams();
  const user = useSelector((state: RootState) => state.user.value);
  const [conversation, setConversation] = useState<Conversation>(
    {} as Conversation
  );
  const [isLoading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

  const joinRoom = () => {
    if (socket && conversationId) {
      socket.emit('joinConversation', conversationId);
    }
  };

  useEffect(() => {
    if (conversationId) {
      getConversationById(conversationId).then((data) => {
        setConversation(data);
        joinRoom();
        setLoading(false);
      });
    }
  }, [conversationId]);

  const sendMessage = (content: string) => {
    if (socket && conversationId) {
      socket.emit(
        'send_message',
        JSON.stringify({
          content,
          conversation_id: conversationId,
          sender_id: user?._id,
        })
      );
    }
  };

  useEffect(() => {
    function onConversationChange(message: string) {
      setConversation((prevConversation) => {
        if (!prevConversation) return prevConversation;
        const updatedMessages = [
          ...prevConversation.messages,
          JSON.parse(message),
        ];
        return { ...prevConversation, messages: updatedMessages };
      });
    }
    socket.on('new_message', onConversationChange);
  }, [conversation]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <ClipLoader color="#99999e" size={50} />
      </div>
    );
  }

  return (
    <>
      <HeaderMessage
        title={conversation?.name}
        picture={conversation?.picture_url}
      />
      <div
        className="flex-grow w-full overflow-y-auto bg-[url(/src/assets/conversation_background.png)]"
        ref={messagesEndRef}>
        {conversation?.messages.map((message, index) => {
          const previousMessage =
            index > 0 ? conversation.messages[index - 1] : null;
          return (
            <React.Fragment key={message._id}>
              <DateIndicator
                dateMessage={message.created_at}
                datePreviousMessage={
                  previousMessage ? previousMessage.created_at : null
                }
              />
              <MessageComposant
                key={message._id}
                myMessage={message.sender_id === user?._id}
                sender={findSenderMessage(conversation, message.sender_id) ? findSenderMessage(conversation, message.sender_id) : null}
                message={message}
                lastMessage={previousMessage}
              />
            </React.Fragment>
          );
        })}
      </div>
      <InputMessage onSend={sendMessage} />
    </>
  );
};

export default ConversationPage;
