import React, { useEffect, useState } from "react";
import Layout from "../../components/user/layout/Layout";
import { useParams } from "react-router-dom";
import getConversationById from "../../hooks/conversations/getConversationById";
import Conversation from "../../models/Conversation";

const ConversationPage: React.FC = () => {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<Conversation>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getConversationById(conversationId ?? "").then((data) => {
      setConversation(data);
      setLoading(false);
    });
  }, [conversationId]);

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <h1>Hello conversation</h1>
      <h1 className="text-4xl text-center">{conversation?.name}</h1>
    </Layout>
  );
};

export default ConversationPage;
