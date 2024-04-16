import React from 'react';

interface InputProfileItemProps {
  labelName: string;
  type: string;
  value: string;
  required?: boolean;
  maxLength?: number;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputProfileItem: React.FC<InputProfileItemProps> = ({
  labelName,
  type,
  value,
  required,
  maxLength,
  onChangeValue,
}) => {
  return (
    <div className="py-4  px-8 mb-4 bg-mainWhite shadow-md">
      <label className="font-medium">{labelName}</label>
      <input
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        onChange={onChangeValue}
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border-none focus:border-mainGreen rounded-lg"
      />
    </div>
  );
};

export default InputProfileItem;
