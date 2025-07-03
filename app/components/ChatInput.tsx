"use client";
import { useState, KeyboardEvent } from "react";

type ChatInputProps = {
  onSendMessage: (msg: string) => void;
  disabled?: boolean;  // add this optional prop
};

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message.trim()) {
      handleSend();
    }
  };

  return (
    <div className="flex items-center bg-white p-4 border-t rounded-b-lg shadow-md">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter message"
        disabled={disabled}  // disable input while loading
        className="flex-grow p-3 border rounded-full shadow-sm text-gray-700 disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !message.trim()} // also disable send button
        className={`ml-3 px-4 py-2 rounded-full text-white ${
          !disabled && message.trim() ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Send
      </button>
    </div>
  );
}
