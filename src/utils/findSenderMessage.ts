import Conversation from "../models/Conversation";
import User from "../models/User";

const findSenderMessage = (conversation: Conversation, senderId: string): User => {
  const sender = conversation.users.find(
    (user: User) => user._id === senderId
  );

  if (!sender) {
    throw new Error("Sender not found");
  }

  return sender;
};

export default findSenderMessage;
