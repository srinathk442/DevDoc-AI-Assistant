"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ChatInput from "../components/ChatInput";
import ChatMessages from "../components/ChatMessages";

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }
}, [router]);


  const handleSendMessage = async (text: string) => {
    if (loading) return;
    setError(null);

    const newMessages = [...messages, { text, isUser: true }];
    setMessages(newMessages);

    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ question: text }),
      });

      const data = await res.json();
      setMessages([...newMessages, { text: data.answer || "Sorry, no answer found.", isUser: false }]);
    } catch {
      setError("Failed to get response. Please try again.");
      setMessages(newMessages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 return (
  <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
    

    {/* Chat Section */}
    <div className="flex-grow overflow-y-auto p-6">
      {messages.length > 0 && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-5xl mx-auto min-h-[60vh]">
          <ChatMessages messages={messages} />
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>

    {/* Error Message */}
    {error && (
      <div className="p-3 text-center text-red-700 bg-red-100 border border-red-300 mx-4 rounded font-medium">
        {error}
      </div>
    )}

    {/* Input Section */}
    <div className="p-6 border-t bg-white/90 shadow-inner">
      <div className="max-w-5xl mx-auto">
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  </div>
);

}
