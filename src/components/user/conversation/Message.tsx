import React from "react";
import User from "../../../models/User";

interface MessageProps {
  myMessage: boolean;
  sender: User;
  content: string;
  date: string;
}

const Message: React.FC<MessageProps> = ({
  myMessage,
  sender,
  content,
  date,
}) => {
  return (
    <>
      {myMessage ? (
        <div className="flex justify-end w-[97%] h-auto p-4">
          <div className="flex flex-col bg-secondaryGreen rounded-xl p-2 max-w-[60%] relative">
            <div className="flex">
              <span className="w-[95%] text-base flex items-start mr-2">
                {content}
              </span>
              <span className="text-secondaryGray text-xs flex items-end">
                {date}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-auto p-4">
          <img
            className="w-7 h-7 rounded-full object-center object-cover m-2"
            src="https://img.freepik.com/photos-gratuite/portrait-lion-genere-par-ia_268835-4278.jpg?size=626&ext=jpg&ga=GA1.1.1518270500.1712448000&semt=ais"
            alt="logo"
          />
          <div className="flex flex-col bg-mainWhite rounded-xl p-2 max-w-[60%] relative">
            <h1 className="text-base text-red-300">
              ~ {sender?.pseudo}
            </h1>
            <div className="flex">
              <span className="w-[95%] text-base flex items-start mr-2">
                {content}
              </span>
              <span className="text-secondaryGray text-xs flex items-end">
                {date}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
