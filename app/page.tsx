"use client";
import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-gray-800 max-w-lg w-full p-12 rounded-3xl shadow-xl text-center border border-gray-600">
          <h2 className="text-5xl font-extrabold mb-8 text-white">Welcome to DevDoc AI</h2>

          <div className="bg-gray-700 rounded-xl p-6 shadow-inner mx-auto max-w-md text-gray-200 text-lg leading-relaxed">
            Your AI-powered documentation assistant. Ask questions about React, Next.js, Node.js,
            and TypeScript docs — and get instant, helpful answers.
          </div>
        </div>
      </main>
    </div>
  );
}
