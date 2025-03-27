"use client";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";

type Tool = {
  id: number;
  name: string;
  img: string;
};

export default function Tools() {
  const supabase = createClient();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{ name: string; img: string }>({
    name: "",
    img: "",
  });

  const [newTool, setNewTool] = useState<{ name: string; img: string }>({
    name: "",
    img: "",
  });

  useEffect(() => {
    async function fetchTools() {
      const { data, error } = await supabase.from("tools").select("*");
      if (error) console.error("Supabase error:", error.message);
      else setTools(data as Tool[]);
      setLoading(false);
    }
    fetchTools();
  }, []);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEditing = false
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (isEditing) {
        setEditData({ ...editData, img: reader.result as string });
      } else {
        setNewTool({ ...newTool, img: reader.result as string });
      }
    };
  };

  async function addTool() {
    if (!newTool.name || !newTool.img) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    const { data, error } = await supabase
      .from("tools")
      .insert([newTool])
      .select("*");

    if (error) {
      console.error("Yangi tool qo‘shishda xatolik:", error.message);
    } else {
      setTools([...tools, data[0]]);
      setNewTool({ name: "", img: "" });
    }
  }

  function startEdit(tool: Tool) {
    setEditingId(tool.id);
    setEditData({ name: tool.name, img: tool.img });
  }

  async function saveEdit(id: number) {
    const { error } = await supabase
      .from("tools")
      .update(editData)
      .eq("id", id);
    if (error) return console.error("Saqlashda xatolik:", error.message);

    setTools((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, name: editData.name, img: editData.img } : t
      )
    );
    setEditingId(null);
  }

  async function deleteTool(id: number) {
    await supabase.from("tools").delete().match({ id });
    setTools(tools.filter((t) => t.id !== id));
  }

  return (
    <div className="p-6 min-h-screen  text-white">
      <h1 className="text-4xl font-bold mb-8">Tools</h1>

      {/* 🔥 ADD TOOL FORM */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-2xl mb-4">Yangi Tool Qo‘shish</h2>
        <input
          type="text"
          placeholder="Tool nomi"
          value={newTool.name}
          className="bg-gray-700 p-2 rounded text-white w-full mb-2"
          onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
          className="mb-2"
        />
        {newTool.img && (
          <img
            src={newTool.img}
            alt="Preview"
            className="h-16 w-16 object-cover rounded-lg"
          />
        )}
        <button
          onClick={addTool}
          className="bg-green-600 px-4 py-2 rounded mt-2"
        >
          Qo‘shish
        </button>
      </div>

      {/* 🔥 TABLE LIST */}
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
            {tools.map((tool) => (
              <tr key={tool.id} className="text-center bg-gray-800">
                <td className="border border-gray-700 p-2">
                  {editingId === tool.id ? (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                      />
                      <img
                        src={editData.img}
                        alt={tool.name}
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                    </>
                  ) : (
                    <img
                      src={tool.img}
                      alt={tool.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                  )}
                </td>
                <td className="border border-gray-700 p-2">
                  {editingId === tool.id ? (
                    <input
                      type="text"
                      value={editData.name}
                      className="bg-gray-700 p-1 rounded text-white"
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  ) : (
                    tool.name
                  )}
                </td>
                <td className="border border-gray-700 p-2">
                  {editingId === tool.id ? (
                    <button
                      onClick={() => saveEdit(tool.id)}
                      className="bg-green-600 px-2 py-1 rounded"
                    >
                      Saqlash
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(tool)}
                      className="bg-blue-600 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteTool(tool.id)}
                    className="bg-red-600 px-2 py-1 rounded ml-2"
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
