import Conversation from "../../models/Conversation";

const createConversation = async (
  formData: FormData
): Promise<Conversation> => {
  try {
    const response = await fetch(`http://localhost:3000/conversations/create`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to create conversation");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return {} as Conversation;
  }
};

export default createConversation;
