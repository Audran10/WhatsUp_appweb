import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import getConversationById from "../../hooks/conversations/getConversationById";
import Conversation from "../../models/Conversation";
import Layout from "../../components/user/layout/Layout";
import HeaderMessage from "../../components/user/conversation/HeaderMessage";
import Message from "../../components/user/conversation/Message";
import InputMessage from "../../components/user/conversation/InputMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatDateInHour } from "../../utils/formatDate";
import findSenderMessage from "../../utils/findSenderMessage";

const ConversationPage: React.FC = () => {
  const { conversationId } = useParams();
  const user = useSelector((state: RootState) => state.user.value);
  const [conversation, setConversation] = useState<Conversation>(
    {} as Conversation
  );
  const [isLoading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const socket = io("http://localhost:3000");

  const joinRoom = () => {
    if (socket && conversationId) {
      socket.emit("joinConversation", conversationId);
    }
  };

  useEffect(() => {
    if (conversationId) {
      getConversationById(conversationId).then((data) => {
        setConversation(data);
        setLoading(false);
        joinRoom();
      });
    }
  }, [conversationId]);

  const sendMessage = (content: string) => {
    if (socket && conversationId) {
      socket.emit(
        "send_message",
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
    socket.on("new_message", onConversationChange);
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
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <HeaderMessage
        title={conversation?.name}
        picture={conversation.picture_url}
      />
      <div className="flex-grow w-full overflow-y-auto" ref={messagesEndRef}>
        {conversation?.messages.map((message, index) => (
          <Message
            key={index}
            myMessage={message.sender_id === user?._id}
            sender={findSenderMessage(conversation, message.sender_id)}
            content={message.content}
            date={formatDateInHour(message.created_at)}
          />
        ))}
      </div>
      <InputMessage onSend={sendMessage} />
    </Layout>
  );
};

export default ConversationPage;
