import React from "react";

interface MessageProps {
  myMessage: boolean;
  sender: string;
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
        <div className="flex justify-end w-full h-auto p-4">
          <div className="flex flex-col bg-secondaryGreen rounded-xl p-2 max-w-[60%] relative">
            <span className="max-w-[95%]">{content}</span>
            <span className="text-secondaryGray text-xs absolute bottom-0 right-0 p-2">
              {date}
            </span>
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
            <h1>~ {sender}</h1>
            <span className="max-w-[95%]">{content}</span>
            <span className="text-secondaryGray text-xs absolute bottom-0 right-0 p-2">
              {date}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
