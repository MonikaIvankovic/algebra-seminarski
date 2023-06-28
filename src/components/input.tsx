import React, { ChangeEvent, FormEvent, useState } from "react";

type InputProps = {
  onSendMessage: (message: string) => void;
};

const Input: React.FC<InputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onSendMessage(text);
      setText("");
    }
  };

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus={true}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Input;
