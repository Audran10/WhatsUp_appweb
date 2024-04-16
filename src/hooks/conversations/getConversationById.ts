import Conversation from "../../models/Conversation";

const getConversationById = async (
  conversationId: string
): Promise<Conversation> => {
  try {
    const response = await fetch(
      `http://localhost:3000/conversations/${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch conversation");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return {} as Conversation;
  }
};

export default getConversationById;
