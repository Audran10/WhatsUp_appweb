import React from "react";

// interface InputMessageProps {
//   value: string;
//   setValue: React.Dispatch<React.SetStateAction<string>>;
//   sendMessage: () => void;
// }

const InputMessage: React.FC = () => {
  return (
    <div className="bg-secondaryWhite flex items-end justify-center w-full p-2">
        <input
            type="text"
            placeholder="Entrez un message"
            className="w-[70%] p-2 flex rounded-lg"
        />
    </div>
  );
};

export default InputMessage;