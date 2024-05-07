import React from 'react';

export const TicketItem: React.FC<{
  ticketId: string;
  reporter: string;
  content: string;
  senderUsername: string;
  handleCancel: (ticketId: string) => void;
  handleAccept: (ticketId: string) => void;
}> = ({
  ticketId,
  reporter,
  content,
  senderUsername,
  handleAccept,
  handleCancel,
}) => {
  return (
    <div className="w-full flex flex-row p-4 border-b hover:bg-gray-50 items-center">
      <div className="w-1/5 text-gray-500 text-left ">{`N°${ticketId}`}</div>
      <div className="w-1/5 text-gray-500 text-left">
        <span className="text-gray-700">{reporter}</span>
      </div>
      <div className="w-1/5 text-gray-500 text-left">
        <span className="text-gray-700">{content}</span>
      </div>
      <div className="w-1/5 text-center text-gray-500 text-left">
        <span className="text-gray-700">{senderUsername}</span>
      </div>
      <div className="w-1/5 text-center">
        <button
          onClick={() => handleAccept(ticketId)}
          className="mr-2 bg-green-500 text-white p-2 rounded">
          Accepter
        </button>
        <button
          onClick={() => handleCancel(ticketId)}
          className="bg-red-500 text-white p-2 rounded">
          Refuser
        </button>
      </div>
    </div>
  );
};
