"use client";
import { useState } from "react";

type Props = {
  type: "login" | "register";
  onSubmit: (username: string, password: string) => void;
};

export default function AuthForm({ type, onSubmit }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="space-y-4 p-6 max-w-sm mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(username, password);
      }}
    >

      <input
        type="text"
        placeholder="Username"
        value={username}
        required
        className="w-full p-2 border rounded"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        className="w-full p-2 border rounded"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded transition">
  {type === "login" ? "Login" : "Register"}
</button>

    </form>
  );
}
