import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getConversationById from "../../hooks/conversations/getConversationById";
import Conversation from "../../models/Conversation";
import Layout from "../../components/user/layout/Layout";
import HeaderMessage from "../../components/user/conversation/HeaderMessage";
import Message from "../../components/user/conversation/Message";
import InputMessage from "../../components/user/conversation/InputMessage";

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
      <HeaderMessage title={conversation?.name} />
      <div className="flex-grow w-full overflow-y-auto">
        <Message
          myMessage={false}
          sender="Paul"
          content="Salut, comment ça va ?"
          date="08:58"
        />
        <Message
          myMessage={true}
          sender="Paul"
          content="Salut, ça va et toi ?"
          date="08:58"
        />
      </div>
      <InputMessage />
    </Layout>
  );
};

export default ConversationPage;
