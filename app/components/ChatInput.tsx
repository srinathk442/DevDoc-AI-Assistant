"use client";
import { useState, KeyboardEvent } from "react";

type ChatInputProps = {
  onSendMessage: (msg: string) => void;
  disabled?: boolean;
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
    <div className="flex items-center bg-white p-4 border-t rounded-b-xl shadow-lg">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        disabled={disabled}
        className="flex-grow p-3 border border-gray-300 rounded-full shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        className={`ml-4 px-5 py-3 rounded-full font-semibold text-white transition ${
          !disabled && message.trim()
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Send
      </button>
    </div>
  );
}
