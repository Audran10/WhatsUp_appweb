import React from 'react';

interface InputItemProps {
  labelName: string;
  type: string;
  value: string;
  required?: boolean;
  maxLength?: number;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputItem: React.FC<InputItemProps> = ({
  labelName,
  type,
  value,
  required,
  maxLength,
  onChangeValue,
}) => {
  return (
    <div>
      <label className="font-medium">{labelName}</label>
      <input
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        onChange={onChangeValue}
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-mainGreen shadow-sm rounded-lg"
      />
    </div>
  );
};

export default InputItem;
