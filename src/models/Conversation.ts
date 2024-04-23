import User from "./User";

interface Message {
  _id: string;
  sender_id: string;
  content: string;
  created_at: Date;
}

interface Conversation {
  _id: string;
  name: string;
  users: User[];
  messages: Message[];
  created_at: Date;
  updated_at: Date;
}

export default Conversation;
