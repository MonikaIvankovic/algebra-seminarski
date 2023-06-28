import React, { useState } from "react";

interface Message {
  member: {
    id: string;
    clientData: {
      color: string;
      username: string;
    };
  };
  text: string;
}

interface MessagesProps {
  messages: Message[];
  currentMember: {
    id: string;
    clientData: {
      color: string;
      username: string;
    };
  };
}

const Messages: React.FC<MessagesProps> = ({ messages, currentMember }) => {
  const [messageState, setMessageState] = useState<Message[]>(messages);

  // Update the state when `messages` prop changes
  React.useEffect(() => {
    setMessageState(messages);
  }, [messages]);

  const renderMessage = (message: Message) => {
    const { member, text } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    return (
      <li className={className} key={member.id}>
        <span
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };

  return (
    <ul className="Messages-list">
      {messageState.map((message) => renderMessage(message))}
    </ul>
  );
};

export default Messages;
