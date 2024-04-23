import React from 'react';

export const TicketItem: React.FC<{
  ticketNumber: string;
  reporter: string;
  content: string;
  senderId: string;
}> = ({ ticketNumber, reporter, content, senderId }) => {
  return (
    <div className="w-full flex flex-row p-4 border-b hover:bg-gray-50 items-center">
      <div className="w-1/4 font-semibold text-lg text-gray-800 text-left ">
        {`n°${ticketNumber}`}
      </div>
      <div className="w-1/4 text-gray-500 text-left">
        <span className="text-gray-700">
          {reporter}, {senderId}
        </span>
      </div>
      <div className="w-2/4 text-gray-500 text-left">
        <span className="text-gray-700">{content}</span>
      </div>
      <div className="w-1/4 text-center">
        <button className="mr-2 bg-green-500 text-white p-2 rounded">
          Accepter
        </button>
        <button className="bg-red-500 text-white p-2 rounded">Refuser</button>
      </div>
    </div>
  );
};
