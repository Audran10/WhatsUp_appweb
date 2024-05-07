import Conversation from "../models/Conversation";
import User from "../models/User";

const findSenderMessage = (conversation: Conversation, senderId: string) => {
  const sender = conversation.users.find(
    (user: User) => user._id === senderId
  );

  if (!sender) {
    return null;
  }

  return sender;
};

export default findSenderMessage;
