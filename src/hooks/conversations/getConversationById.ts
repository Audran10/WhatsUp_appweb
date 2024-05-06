
const getConversationById = async (conversationId: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/conversations/${conversationId}`,
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
    return error;
  }
};

export default getConversationById;
