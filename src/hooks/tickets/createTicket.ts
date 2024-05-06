import Message from "../../models/Message";
import User from "../../models/User";

const createTicket = async (userId: string, message: Message, sender: User) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        reporter: userId,
        content: message.content,
        message_id: message._id,
        sender_username: sender.pseudo,
        sender_id: sender._id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error creating ticket: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    return error;
  }
};

export default createTicket;