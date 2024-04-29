import React, { useEffect, useState } from "react";
import User from "../../../models/User";
import { IoIosArrowDown } from "react-icons/io";
import defaultAvatar from "../../../assets/defaultAvatar.png";
import createTicket from "../../../hooks/tickets/createTicket";
import Message from "../../../models/Message";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { formatDateInHour } from "../../../utils/formatDate";

interface MessageComposantProps {
  myMessage: boolean;
  sender: User;
  message: Message;
}

const MessageComposant: React.FC<MessageComposantProps> = ({
  myMessage,
  sender,
  message,
}) => {
  const user = useSelector((state: RootState) => state.user.value);
  const [showMessageOption, setShowMessageOption] = useState(false);
  const [optionIsOpen, setOptionIsOpen] = useState(false);
  const optionRef = React.useRef<HTMLButtonElement>(null);

  if (!user) {
    return null;
  }

  const toggleMessageOption = () => {
    setShowMessageOption(!showMessageOption);
  };

  const openOption = () => {
    setOptionIsOpen(!optionIsOpen);
  };

  const handleReport = () => {
    createTicket(user._id, message, sender);
    setOptionIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      optionRef.current &&
      !optionRef.current.contains(e.target as Node)
    ) {
      setOptionIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {myMessage ? (
        <div className="flex justify-end w-[97%] h-auto p-4">
          <div className="flex flex-col bg-secondaryGreen rounded-xl p-2 max-w-[60%] relative">
            <div className="flex">
              <span className="w-[95%] text-base flex items-start mr-2">
                {message.content}
              </span>
              <span className="text-secondaryGray text-xs flex items-end">
                {formatDateInHour(message.created_at)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-auto p-4 relative">
          <img
            className="w-7 h-7 rounded-full object-center object-cover m-2"
            src={sender.picture_url ?? defaultAvatar}
            alt="logo"
          />
          <div
            className="flex flex-col bg-mainWhite rounded-xl p-2 max-w-[60%]"
            onMouseEnter={toggleMessageOption}
            onMouseLeave={toggleMessageOption}
          >
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-base text-red-300">{sender?.pseudo}</h1>
              <button className="flex" onClick={openOption}>
                <IoIosArrowDown
                  className={`h-5 w-5 ${
                    showMessageOption
                      ? "text-secondaryGray"
                      : "text-transparent"
                  }`}
                />
              </button>
            </div>
            <div className="flex">
              <span className="w-[95%] text-base flex items-start mr-2">
                {message.content}
              </span>
              <span className="text-secondaryGray text-xs flex items-end">
                {formatDateInHour(message.created_at)}
              </span>
            </div>
          </div>
          {optionIsOpen && (
              <button
                className="flex bg-mainWhite py-2 px-4 rounded h-10 ml-1 hover:bg-secondaryWhite text-mainGray"
                onClick={handleReport}
                ref={optionRef}
              >
                Signaler
              </button>
          )}
        </div>
      )}
    </>
  );
};

export default MessageComposant;
