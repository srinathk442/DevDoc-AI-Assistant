"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string) => {
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to login");
      }

      localStorage.setItem("token", data.token);
      router.push("/chat");
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Login failed");
  }
}
  };

  return (
    <main className="min-h-screen bg-blue-900 text-white flex items-center justify-center px-4">
      <div className="bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded text-center font-medium shadow">
            {error}
          </div>
        )}

        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </main>
  );
}
