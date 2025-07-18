import React from "react";
import { Ban } from "lucide-react"; // Lucide icon

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center relative">
        {/* Glowing red ring effect */}
        <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-red-100 shadow-inner animate-pulse mb-4 relative">
          <div className="absolute w-full h-full rounded-full border-4 border-red-500 opacity-30 animate-glow"></div>
          <Ban className="text-red-600 z-10" size={36} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page. Please log in with the appropriate credentials.
        </p>

        <a
          href="/login"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
