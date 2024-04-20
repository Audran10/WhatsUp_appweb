import React from "react";
import { BsThreeDotsVertical } from 'react-icons/bs';

interface HeaderMessageProps {
  title: string | undefined;
}

const HeaderMessage: React.FC<HeaderMessageProps> = ({ title }) => {
  return (
    <div className="bg-secondaryWhite w-full h-[8%] flex items-center justify-between p-4">
      <div className="flex">
        <img
          className="w-14 h-14 rounded-full object-center object-cover "
          src="https://img.freepik.com/photos-gratuite/portrait-lion-genere-par-ia_268835-4278.jpg?size=626&ext=jpg&ga=GA1.1.1518270500.1712448000&semt=ais"
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
