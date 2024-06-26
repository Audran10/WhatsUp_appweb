import Conversation from "../../models/Conversation";

const getMyConversations = async (): Promise<Conversation[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/conversations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch conversations");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getMyConversations;
