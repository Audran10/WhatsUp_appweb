import React, { useEffect, useState } from "react";
import LayoutTop from "./LayoutTop";
import SearchBar from "../../common/SearchBar";
import LayoutDiscussionGroupCard from "./LayoutDiscussionGroupCard";
import CreateConversation from "../../../pages/user/CreateConversation";
import ProfilePage from "../../../pages/user/ProfilePage";
import getMyConversations from "../../../hooks/conversations/getMyConversations";
import Conversation from "../../../models/Conversation";
import {formatDate} from "../../../utils/formatDate";
import findSenderMessage from "../../../utils/findSenderMessage";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showCreateGroup, setShowCreateGroup] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  useEffect(() => {
    getMyConversations().then((data) => {
      setConversations(data);
    });
  }, []);

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col h-full w-[30%] border-r-[1px] border-stone-200 bg-mainWhite container">
        {showCreateGroup && !showProfile && (
          <CreateConversation setShowCreateGroup={setShowCreateGroup} />
        )}
        {showProfile && !showCreateGroup && (
          <ProfilePage setShowProfile={setShowProfile} />
        )}

        {!showCreateGroup && !showProfile && (
          <>
            <LayoutTop
              setShowCreateGroup={setShowCreateGroup}
              setShowProfile={setShowProfile}
            />
            <SearchBar placeholder="Recherchez" />
            <div className="container overflow-y-auto">
              {conversations.map((conversation) => (
                <LayoutDiscussionGroupCard
                  key={conversation._id}
                  conversationId={conversation._id}
                  groupPicture={conversation.picture_url}
                  name={conversation.name}
                  lastSender={conversation.last_message ? findSenderMessage(conversation, conversation.last_message?.sender_id).pseudo : ""}
                  lastMessage={conversation.last_message?.content}
                  date={formatDate(conversation.last_message?.created_at)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col w-[70%] bg-mainBeige container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
