import User from "./User";
import Message from "./Message";

interface Conversation {
  _id: string;
  name: string;
  users: User[];
  picture: string;
  picture_url: string;
  messages: Message[];
  last_message: Message;
  created_at: Date;
  updated_at: Date;
}

export default Conversation;
