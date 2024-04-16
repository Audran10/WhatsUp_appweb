import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getConversationById from "../../hooks/conversations/getConversationById";
import Conversation from "../../models/Conversation";
import Layout from "../../components/user/layout/Layout";
import InputMessage from "../../components/user/InputMessage";

const ConversationPage: React.FC = () => {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<Conversation>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (conversationId) {
      getConversationById(conversationId).then((data) => {
        setConversation(data);
        setLoading(false);
      });
    }
  }, [conversationId]);

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <h1>Hello conversation</h1>
      <h1 className="flex text-4xl text-center items-end">
        {conversation?.name}
      </h1>
      <InputMessage />
    </Layout>
  );
};

export default ConversationPage;
