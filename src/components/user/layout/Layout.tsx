import React, { useEffect, useState } from "react";
import LayoutTop from "./LayoutTop";
import SearchBar from "../../common/SearchBar";
import LayoutDiscussionGroupCard from "./LayoutDiscussionGroupCard";
import CreateConversation from "../../../pages/user/CreateConversation";
import ProfilePage from "../../../pages/user/ProfilePage";
import getMyConversations from "../../../hooks/conversations/getMyConversations";
import Conversation from "../../../models/Conversation";
import { formatListConversationDate } from "../../../utils/formatDate";
import findSenderMessage from "../../../utils/findSenderMessage";
import { Outlet } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const Layout: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversations, setSelectedConversations] = useState<
    Conversation[] | []
  >([]);
  const [showCreateGroup, setShowCreateGroup] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(true);

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }

  useEffect(() => {
    getMyConversations().then((data) => {
      setConversations(data);
      setSelectedConversations(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filteredConversations = conversations.filter((conversation) =>
      conversation.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSelectedConversations(filteredConversations);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-mainBeige">
        <ClipLoader color="#99999e" size={50} />
      </div>
    );
  }

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
              profilePicture={user.picture_url}
              setShowCreateGroup={setShowCreateGroup}
              setShowProfile={setShowProfile}
            />

            <SearchBar onChange={handleChange} placeholder="Recherchez" />

            <div className="container overflow-y-auto">
              {selectedConversations.map((conversation) => (
                <LayoutDiscussionGroupCard
                  key={conversation._id}
                  conversationId={conversation._id}
                  groupPicture={conversation.picture_url}
                  name={conversation.name}
                  lastSender={
                    conversation.last_message
                      ? findSenderMessage(
                          conversation,
                          conversation.last_message?.sender_id
                        ).pseudo
                      : ""
                  }
                  lastMessage={conversation.last_message?.content}
                  date={formatListConversationDate(
                    conversation.last_message?.created_at
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col w-[70%] bg-secondaryWhite container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
