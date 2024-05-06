import Conversation from '../../models/Conversation';

const updateConversation = async (
  conversationId: string,
  formData: FormData
): Promise<Conversation> => {
  try {
    const response = await fetch(
      `http://localhost:3000/conversations/${conversationId}/modify`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update conversation');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return {} as Conversation;
  }
};

export default updateConversation;
