interface Conversation {
  _id: string;
  name: string;
  users: string[];
  messages: [
    {
      senderId: string;
      content: string;
      createdAt: Date;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}

export default Conversation;
