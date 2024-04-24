import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "../../components/common/SearchBar";
import ButtonAddMember from "../../components/user/createConversation/ButtonAddMember";
import InputMember from "../../components/user/createConversation/InputMember";
import createConversation from "../../hooks/conversations/createConversation";
import { useNavigate } from "react-router-dom";
import UserPicItem from "../../components/items/UserPicItem";

interface CreateConversationProps {
  setShowCreateGroup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateConversation: React.FC<CreateConversationProps> = ({
  setShowCreateGroup,
}) => {
  const navigate = useNavigate();
  const [nbMembers, setNbMembers] = useState<number>(1);
  const [conversationName, setConversationName] = useState<string | undefined>(
    undefined
  );
  const [conversationPicture, setConversationPicture] = useState<
    File | undefined
  >(undefined);
  const [members, setMembers] = useState<string[]>([]);

  const handleAddMember = () => {
    setNbMembers(nbMembers + 1);
    setMembers([...members, ""]);
  };

  const handleRemoveMember = () => {
    if (nbMembers > 1) {
      setNbMembers(nbMembers - 1);
      setMembers(members.slice(0, members.length - 1));
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleCreateConversation = () => {
    let formData = new FormData();

    if (conversationName) {
      formData.append("name", conversationName);
    }

    members.forEach((user) => {
      formData.append("users[]", user);
    });

    if (conversationPicture) {
      formData.append("file", conversationPicture);
    }

    createConversation(formData).then((conversation) => {
      console.log("conv", conversation);
      setShowCreateGroup(false);
      navigate(`/${conversation._id}`);
    });
  };

  return (
    <div className="h-screen justify-center items-center  bg-mainWhite">
      <div className="flex flex-row gap-8 h-[14%] p-6 items-end bg-mainGreen">
        <button onClick={() => setShowCreateGroup(false)}>
          <FaArrowLeft className="h-6 w-6 text-mainWhite" />
        </button>
        <h1 className="text-2xl text-mainWhite">Nouvelle conversation</h1>
      </div>

      <UserPicItem
        placeholder="AJOUTER UNE PHOTO A LA CONVERSATION"
        setConversationPicture={setConversationPicture}
      />

      <SearchBar placeholder="Recherchez un nom ou un numéro" border={false} />

      <div className="flex justify-center w-full mt-2 mb-8">
        <button
          onClick={handleCreateConversation}
          className="bg-mainGreen text-mainWhite p-2 rounded-lg"
        >
          Créez la conversation
        </button>
      </div>

      <input
        type="text"
        className="w-full p-4 text-sm text-mainGray bg-secondaryWhite focus:outline-none mb-6"
        placeholder="Nom de la conversation (optionnel)"
        onChange={(e) => setConversationName(e.target.value)}
      />
      <div className="overflow-y-auto">
        {[...Array(nbMembers)].map((_, index) => (
          <InputMember
            key={index}
            index={index}
            value={members[index] || ""}
            onClick={handleRemoveMember}
            onChange={(value) => handleInputChange(index, value)}
            placeholder={`Membre ${index + 1}`}
          />
        ))}

        <ButtonAddMember
          onClick={handleAddMember}
          placeholder="Ajouter un membre"
        />
      </div>
    </div>
  );
};

export default CreateConversation;
