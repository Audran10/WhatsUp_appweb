export const fetchTicket = async (ticketId: string) => {
  try {
    console.log('Fetching ticket:', ticketId);
    const response = await fetch(`http://localhost:3000/ticket/${ticketId}`, {
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
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
