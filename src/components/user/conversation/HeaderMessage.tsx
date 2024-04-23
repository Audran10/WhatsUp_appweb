import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import defaultAvatar from "../../../assets/defaultAvatar.png";

interface HeaderMessageProps {
  title: string | undefined;
  picture: string | undefined;
}

const HeaderMessage: React.FC<HeaderMessageProps> = ({ title, picture }) => {
  return (
    <div className="bg-secondaryWhite w-full h-[8%] flex items-center justify-between p-4">
      <div className="flex">
        <img
          className="w-14 h-14 rounded-full object-center object-cover "
          src={picture ?? defaultAvatar}
          alt="logo"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold ml-4">{title}</h1>
          <span className="text-secondaryGray ml-4">En ligne</span>
        </div>
      </div>
      <button>
        <BsThreeDotsVertical className="text-mainGray text-2xl" />
      </button>
    </div>
  );
};

export default HeaderMessage;
