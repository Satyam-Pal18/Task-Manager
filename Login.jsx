import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name to continue.");
      return;
    }
    onLogin(name.trim());
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Sign In</h1>
        <p className="text-gray-600 mb-8">
          Enter your name to access your task manager dashboard.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 
                       focus:border-transparent transition text-xs 
                       placeholder:text-xs"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-10 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
        </div>
      </div>
    </div>
  );
}
