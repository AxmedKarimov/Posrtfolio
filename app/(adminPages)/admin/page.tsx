"use client";
import Link from "next/link";
import React from "react";

export default function Admin() {
  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-6xl mt-10 ms-10 text-white font-bold mb-10">
        Hello, Admin
      </h1>
      <div className="max-w-5xl grid grid-cols-2 gap-6 items-center justify-center mx-auto">
        <div className="w-full h-60 bg-neutral-800  p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
          <h1 className="text-white text-4xl font-semibold mb-4">
            Asbob uskunalar
          </h1>
          <h1 className="text-white text-3xl font-semibold mb-4">2</h1>
          <Link
            href={"/addTools"}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Uskuna qo'shish
          </Link>
        </div>

        <div className="w-full h-60 bg-neutral-800  p-6 rounded-2xl shadow-lg mb-4 hover:shadow-2xl transition-shadow">
          <h1 className="text-white text-4xl font-semibold">Projectlar</h1>
          <h1 className="text-white text-3xl font-semibold mb-4">2</h1>

          <Link
            href={"./addProject"}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Project qo'shish
          </Link>
        </div>

        <div className="w-full h-60 bg-neutral-800  p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
          <h1 className="text-white text-4xl font- mb-4">Mijozlar</h1>
          <h1 className="text-white text-3xl font-semibold mb-4">2</h1>

          <Link
            href={"/addClient"}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Mijoz qo'shish
          </Link>
        </div>
      </div>
    </div>
  );
}
