import React from "react";
import { CiCircleRemove } from "react-icons/ci";

interface InputMemberProps {
  index: number;
  placeholder: string;
  value?: string;
  onClick?: () => void;
  onChange?: (value: string) => void;
}

const InputMember: React.FC<InputMemberProps> = ({
  index,
  placeholder,
  value,
  onClick,
  onChange,
}) => {
  return (
    <div className="flex border-b focus:outline-none">
      <input
        type="text"
        id="addMember"
        className="w-full p-4 text-sm text-mainGray focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />

      {index > 0 && (
        <button onClick={onClick}>
          <CiCircleRemove className="text-mainRed text-2xl" />
        </button>
      )}
    </div>
  );
};

export default InputMember;
