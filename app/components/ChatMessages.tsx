export default function ChatMessages({ messages }: { messages: { text: string; isUser: boolean }[] }) {
  return (
    <div className="flex flex-col gap-4 p-6 overflow-y-auto flex-grow bg-white"> {/* Full white background */}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`max-w-[65%] px-4 py-3 rounded-2xl shadow ${
            msg.isUser
              ? "bg-blue-500 text-white self-end rounded-br-md"  // User messages (blue, rounded shape)
              : "bg-gray-100 text-black self-start rounded-bl-md" // AI messages (light gray, rounded shape)
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
