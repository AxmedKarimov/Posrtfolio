"use client";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Client = {
  id: number;
  name: string;
  img: string;
};

export default function Clients() {
  const supabase = createClient();
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState({ name: "", img: "" });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) console.error("Supabase error:", error.message);
      else setClients(data as Client[]);
      setLoading(false);
    }
    fetchClients();
  }, [supabase]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    clientId?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (clientId) {
        setClients((prev) =>
          prev.map((c) =>
            c.id === clientId ? { ...c, img: reader.result as string } : c
          )
        );
      } else {
        setNewClient({ ...newClient, img: reader.result as string });
      }
    };
  };

  async function addClient() {
    const { data, error } = await supabase
      .from("clients")
      .insert([newClient])
      .select();
    if (error) return console.error("Qo‘shishda xatolik:", error.message);
    setClients([...clients, data[0]]);
    setNewClient({ name: "", img: "" });
  }

  async function deleteClient(id: number) {
    await supabase.from("clients").delete().match({ id });
    setClients(clients.filter((c) => c.id !== id));
  }

  return (
    <div className="p-6 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8">Clients</h1>

      {/* 📌 Yangi client qo‘shish */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-2xl mb-4">Yangi client qo‘shish</h2>
        <input
          type="text"
          placeholder="Client nomi"
          className="p-2 w-full rounded bg-gray-700 text-white mb-2"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="p-2 w-full bg-gray-700 text-white mb-2"
          onChange={(e) => handleImageUpload(e)}
        />
        <button
          onClick={addClient}
          className="bg-green-600 px-4 py-2 rounded w-full"
        >
          Qo‘shish
        </button>
      </div>

      {/* 📌 Clientlar jadvali */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 p-2">Rasm</th>
              <th className="border border-gray-700 p-2">Nomi</th>
              <th className="border border-gray-700 p-2">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="text-center bg-gray-800">
                <td className="border border-gray-700 p-2">
                  {client.img ? (
                    <Image
                      src={client.img}
                      alt={client.name}
                      width={64}
                      height={64}
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, client.id)}
                  />
                </td>
                <td className="border border-gray-700 p-2">
                  <input
                    type="text"
                    value={client.name}
                    className="bg-gray-700 p-1 rounded text-white"
                    onChange={(e) =>
                      setClients((prev) =>
                        prev.map((c) =>
                          c.id === client.id
                            ? { ...c, name: e.target.value }
                            : c
                        )
                      )
                    }
                  />
                </td>
                <td className="border border-gray-700 p-2">
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="bg-red-600 px-2 py-1 rounded"
                  >
                    O‘chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
