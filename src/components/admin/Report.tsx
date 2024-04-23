import React from 'react';
import { LayoutCategory } from './layout/LayoutCategory';
import { TicketItem } from './items/TicketItem';

const ticketData = [
  {
    ticketNumber: '12345',
    reporter: 'User123',
    content: 'Description du problème...',
    senderId: '661cd5d6b43cb1021d5ddfec',
  },
  {
    ticketNumber: '12346',
    reporter: 'User124',
    content: 'Autre problème...',
    senderId: '661cd5d6b43cb1021d5ddfec',
  },
  {
    ticketNumber: '12347',
    reporter: 'User125',
    content: 'Encore un problème...',
    senderId: '661cd5d6b43cb1021d5ddfec',
  },
];

export const Report: React.FC = () => {
  return (
    <LayoutCategory
      panelName={'Report'}
      firstCategory={'N° du ticket'}
      secondCategory={'Signalé par'}
      thirdCategory={'Contenu du signalement'}>
      {ticketData.map((ticket, index) => (
        <TicketItem
          key={index}
          ticketNumber={ticket.ticketNumber}
          reporter={ticket.reporter}
          content={ticket.content}
          senderId={ticket.senderId}
        />
      ))}
    </LayoutCategory>
  );
};
