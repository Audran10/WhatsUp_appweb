import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsFillMicFill, BsEmojiSmile } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface InputMessageProps {
  onSend: (content: string) => void;
}

const InputMessage: React.FC<InputMessageProps> = ({ onSend }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<string>("");
  const [EmojiVisible, setIsEmojiVisible] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const addEmoji = (e: any) => {
    setMessage(message + e.native);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(e.target as Node)
    ) {
      setIsEmojiVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const lineHeight = parseFloat(
        window.getComputedStyle(textarea).lineHeight
      );
      const maxHeight = lineHeight * 5;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
      setMessage(textarea.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(message);
      setMessage("");
      EmojiVisible && setIsEmojiVisible(false);
      setTimeout(() => {
        handleInput();
      }, 0);
    }
  };

  const handleSend = () => {
    onSend(message);
    setMessage("");
    EmojiVisible && setIsEmojiVisible(false);
    setTimeout(() => {
      handleInput();
    }, 0);
  };

  return (
    <div className="bg-secondaryWhite flex gap-6 w-full h-15 p-2 px-6">
      <button onClick={() => setIsEmojiVisible(!EmojiVisible)}>
        <BsEmojiSmile className="text-mainGray text-2xl" />
      </button>

      {EmojiVisible && (
        <div className="absolute bottom-14" ref={emojiPickerRef}>
          <Picker
            data={data}
            locale="fr"
            maxFrequentRows={0}
            previewPosition="none"
            onEmojiSelect={addEmoji}
          />
        </div>
      )}

      <button>
        <FaPlus className="text-mainGray text-2xl" />
      </button>

      <textarea
        ref={textareaRef}
        rows={1}
        value={message}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Entrez un message"
        className="flex-grow p-2 flex rounded-lg outline-none resize-none overflow-y-auto"
      />

      {message ? (
        <button onClick={handleSend}>
          <IoSendSharp className="text-mainGray text-2xl" />
        </button>
      ) : (
        <button>
          <BsFillMicFill className="text-mainGray text-2xl" />
        </button>
      )}
    </div>
  );
};

export default InputMessage;
