import React, { useState, useEffect } from 'react';
import { TicketItem } from './items/TicketItem';
import { Ticket } from '../../models/Ticket';
import { CancelTicket } from '../../hooks/admin/CancelTicket';
import { AcceptTicket } from '../../hooks/admin/AcceptTicket';
import { FetchTickets } from '../../hooks/admin/FetchTickets';

export const Report: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    FetchTickets().then((data) => setTickets(data));
  }, []);

  const handleCancel = async (ticketId: string) => {
    await CancelTicket(ticketId);
    setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
  };

  const handleAccept = async (ticketId: string) => {
    await AcceptTicket(ticketId);
    setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
  };

  if (!tickets) {
    return null;
  }

  return (
    <>
      <div className="text-center px-6 p-4 text-2xl border-b">Report</div>
      <div className="w-full flex flex-col items-start h-max overflow-y-auto">
        <div className="flex flex-row justify-between w-full text-left border-b px-2 py-4">
          <div className="w-1/5 text-xl font-semibold">N° du ticket</div>
          <div className="w-1/5 text-xl font-semibold">Signalé par</div>
          <div className="w-1/5 text-xl font-semibold">
            Contenu du signalement
          </div>
          <div className="w-1/5 text-xl text-center font-semibold">Auteur</div>
          <div className="w-1/5 text-xl font-semibold text-center">Action</div>
        </div>
        {tickets.map((ticket, index) => (
          <TicketItem
            key={index}
            ticketId={ticket._id}
            reporter={ticket.reporter}
            content={ticket.content}
            senderUsername={ticket.sender_username}
            handleCancel={handleCancel}
            handleAccept={handleAccept}
          />
        ))}{' '}
      </div>
    </>
  );
};
