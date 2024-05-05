import React from "react";
import { FaPlus } from "react-icons/fa";

interface ButtonMemberProps {
  placeholder: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ButtonAddMember: React.FC<ButtonMemberProps> = ({
  placeholder,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center p-2 mt-2 gap-2 ${
        disabled ? "bg-secondaryWhite text-secondaryGray rounded-md" : ""
      }`}
      disabled={disabled}
    >
      <div>
        <FaPlus
          className={`text-mainGreen ${disabled ? "text-secondaryGray" : ""}`}
        />
      </div>
      {placeholder}
    </button>
  );
};

export default ButtonAddMember;
