import React, { useEffect, useState } from "react";
import LayoutTop from "./LayoutTop";
import LayoutSearchBar from "./LayoutSearchBar";
import LayoutDiscussionGroupCard from "./LayoutDiscussionGroupCard";
import getMyConversations from "../../../hooks/conversations/getMyConversations";
import Conversation from "../../../models/Conversation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    getMyConversations().then((data) => {
      setConversations(data);
    });
  }, []);

  return (
    <>
      <div className="flex h-full w-full">
        <div className="flex flex-col h-full w-[30%] bg-mainWhite container">
          <LayoutTop />
          <LayoutSearchBar />

          <div className="container overflow-y-auto">
            {conversations.map((conversation) => (
              <LayoutDiscussionGroupCard
                key={conversation._id}
                conversationId={conversation._id}
                name={conversation.name}
                lastSender={conversation.messages[0]?.senderId}
                lastMessage={conversation.messages[0]?.content}
                date={conversation.messages[0]?.createdAt.toString()}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col h-full w-[70%] bg-mainBeige container">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
