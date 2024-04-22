import React from "react";
import { FaPlus } from "react-icons/fa";

interface ButtonMemberProps {
  placeholder: string;
  onClick?: () => void;
}

const ButtonAddMember: React.FC<ButtonMemberProps> = ({ placeholder, onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center p-2 gap-2">
      <div className="">
        <FaPlus className="text-mainGreen" />
      </div>
      {placeholder}
    </button>
  );
};

export default ButtonAddMember;
