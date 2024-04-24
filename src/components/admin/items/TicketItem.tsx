import React from 'react';

import { CancelTicket } from '../../../hooks/admin/CancelTicket';
import { AcceptTicket } from '../../../hooks/admin/AcceptTicket';

export const TicketItem: React.FC<{
  ticketId: string;
  reporter: string;
  content: string;
  senderUsername: string;
}> = ({ ticketId, reporter, content, senderUsername }) => {
  const handleCancel = async (ticketId: string) => {
    await CancelTicket(ticketId);
  };

  const handleAccept = async (ticketId: string) => {
    await AcceptTicket(ticketId);
  };

  return (
    <div className="w-full flex flex-row p-4 border-b hover:bg-gray-50 items-center">
      <div className="w-1/5 text-gray-500 text-left ">{`N°${ticketId}`}</div>
      <div className="w-1/5 text-gray-500 text-left">
        <span className="text-gray-700">{reporter}</span>
      </div>
      <div className="w-1/5 text-gray-500 text-left">
        <span className="text-gray-700">{content}</span>
      </div>
      <div className="w-1/5 text-gray-500 text-left">
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
