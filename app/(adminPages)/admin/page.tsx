"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const checkPassword = () => {
    if (password === "menAdminman") {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center ">
      <div className="h-96 w-96 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center justify-center p-6">
        <h2 className="text-white text-2xl mb-4">Admin Panel</h2>
        <input
          type="password"
          placeholder="Parolni kiriting"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white w-full mb-4"
        />
        <button
          onClick={checkPassword}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Tekshirish
        </button>
      </div>
    </div>
  );
}
