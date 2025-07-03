"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "../components/AuthForm";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (username: string, password: string) => {
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to register");
      }

      setSuccess("User registered successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen bg-blue-900 text-white flex items-center justify-center px-4">
      <div className="bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          
                  {error && (
                    <div className="mb-4 bg-red-100 text-red-700 p-3 rounded text-center font-medium shadow">
                      {error}
                    </div>
                  )}
          
                  <AuthForm type="register" onSubmit={handleRegister} />
                </div>
              </main>
            );
  }
          