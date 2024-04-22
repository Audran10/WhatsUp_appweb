import React from "react";
import { FaPlus } from "react-icons/fa";

interface LayoutTopProps {
  setShowCreateGroup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutTop: React.FC<LayoutTopProps> = ({ setShowCreateGroup, setShowProfile }) => {
  return (
    <div className="flex items-center justify-between w-full h-[8%] bg-secondaryWhite p-3">
      <button onClick={() => setShowProfile(true)}>
        <img
          className="w-14 h-14 rounded-full object-center object-cover "
          src="https://img.freepik.com/photos-gratuite/portrait-lion-genere-par-ia_268835-4278.jpg?size=626&ext=jpg&ga=GA1.1.1518270500.1712448000&semt=ais"
          alt="logo"
        />
      </button>
      <div className="flex flex-grow justify-end gap-4">
        <button className="flex" onClick={() => setShowCreateGroup(true)}>
          <FaPlus className="text-mainGray text-xl" />
        </button>
      </div>
    </div>
  );
};

export default LayoutTop;
