import React from "react";

interface MessageType {
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
  messages: MessageType[];
  currentMember: {
    id: string;
  };
}

const Messages: React.FC<MessagesProps> = ({ messages, currentMember }) => (
  <ul className="Messages-list">
    {messages.map((message) => renderMessage(message, currentMember))}
  </ul>
);

const renderMessage = (message: MessageType, currentMember: { id: string }) => {
  const { member, text } = message;
  const messageFromMe = member.id === currentMember.id;
  const className = messageFromMe
    ? "Messages-message currentMember"
    : "Messages-message";

  return (
    <li className={className}>
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

export default Messages;
