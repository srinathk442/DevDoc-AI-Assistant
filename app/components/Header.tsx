"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, [pathname]); // re-check on route change

  const linkClass =
    "cursor-pointer transition-colors font-semibold bg-transparent border-none p-0 outline-none";

  return (
    <header className="w-full sticky top-0 z-10 bg-gray-900 text-gray-200 shadow-md p-4 flex justify-between items-center">
      <h1
        onClick={() => router.push("/")} // Navigate to home on click
        className="text-xl font-semibold hover:text-blue-300 cursor-pointer select-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") router.push("/");
        }}
        role="link"
        aria-label="Go to Home Page"
      >
        DevDoc AI Assistant
      </h1>
      <div className="space-x-6">
        {loggedIn ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className={`${linkClass} text-red-500 hover:text-red-700`}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => router.push("/login")}
              className={`${linkClass} text-blue-500 hover:text-blue-700`}
            >
              Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className={`${linkClass} text-green-500 hover:text-green-700`}
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}
