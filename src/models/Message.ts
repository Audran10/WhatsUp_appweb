interface Message {
  _id: string;
  sender_id: string;
  content: string;
  created_at: Date;
}

export default Message;