import React, { useState, useEffect } from 'react';
import { LayoutCategory } from './layout/LayoutCategory';
import { TicketItem } from './items/TicketItem';
import { Ticket } from '../../models/Ticket';

export const Report: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        console.log('Fetching updated list of users');
        const response = await fetch('http://localhost:3000/tickets/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <LayoutCategory
      panelName={'Report'}
      firstCategory={'N° du ticket'}
      secondCategory={'Signalé par'}
      thirdCategory={'Contenu du signalement'}
      fourthCategory={'Auteur'}>
      {tickets.map((ticket, index) => (
        <TicketItem
          key={index}
          ticketId={ticket._id}
          reporter={ticket.reporter}
          content={ticket.content}
          senderUsername={ticket.senderUsername}
        />
      ))}
    </LayoutCategory>
  );
};
