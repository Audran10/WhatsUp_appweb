import Conversation from "../../models/Conversation";

const leaveConversation = async (conversationId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/conversations/${conversationId}/leave`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return response.json();
  } catch (error) {
    return {} as Conversation;
  }
};

export default leaveConversation;
