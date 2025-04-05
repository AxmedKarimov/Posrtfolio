"use client";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Project = {
  id: number;
  name: string;
  img: string;
  tags: string[];
  status: string;
  link: string;
};

export default function Projects() {
  const supabase = createClient();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newProject, setNewProject] = useState<Project>({
    id: 0,
    name: "",
    img: "",
    tags: [],
    status: "active",
    link: "",
  });

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        console.error("Supabase error:", error.message);
      } else {
        setProjects(
          data.map((p) => ({
            ...p,
            tags: p.tags ? p.tags : [],
          }))
        );
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    projectId?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (projectId) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === projectId ? { ...p, img: reader.result as string } : p
          )
        );
      } else {
        setNewProject({ ...newProject, img: reader.result as string });
      }
    };
  };

  async function addProject() {
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          ...newProject,
          tags: `{${newProject.tags.join(",")}}`,
        },
      ])
      .select();

    if (error) {
      return console.error("Qo‘shishda xatolik:", error.message);
    }

    setProjects([...projects, { ...data[0], tags: data[0].tags }]);
    setNewProject({
      id: 0,
      name: "",
      img: "",
      tags: [],
      status: "active",
      link: "",
    });
  }

  async function deleteProject(id: number) {
    await supabase.from("projects").delete().match({ id });
    setProjects(projects.filter((p) => p.id !== id));
  }

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>

      {/* 📌 Yangi project qo‘shish */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-2xl mb-4">Yangi project qo‘shish</h2>
        <input
          type="text"
          placeholder="Project nomi"
          className="p-2 w-full rounded bg-gray-700 text-white mb-2"
          value={newProject.name}
          onChange={(e) =>
            setNewProject({ ...newProject, name: e.target.value })
          }
        />
        <input
          type="file"
          accept="image/*"
          className="p-2 w-full bg-gray-700 text-white mb-2"
          onChange={(e) => handleImageUpload(e)}
        />
        <input
          type="text"
          placeholder="Hashtaglarni vergul bilan yozing"
          className="p-2 w-full rounded bg-gray-700 text-white mb-2"
          value={newProject.tags.join(", ")}
          onChange={(e) =>
            setNewProject({ ...newProject, tags: e.target.value.split(", ") })
          }
        />
        <input
          type="text"
          placeholder="Havola"
          className="p-2 w-full rounded bg-gray-700 text-white mb-2"
          value={newProject.link}
          onChange={(e) =>
            setNewProject({ ...newProject, link: e.target.value })
          }
        />
        <button
          onClick={addProject}
          className="bg-green-600 px-4 py-2 rounded w-full"
        >
          Qo‘shish
        </button>
      </div>

      {/* 📌 Projectlar jadvali */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 p-2">Rasm</th>
              <th className="border border-gray-700 p-2">Nomi</th>
              <th className="border border-gray-700 p-2">Hashtag</th>
              <th className="border border-gray-700 p-2">Holat</th>
              <th className="border border-gray-700 p-2">Havola</th>
              <th className="border border-gray-700 p-2">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index} className="text-center bg-gray-800">
                <td className="border border-gray-700 p-2">
                  <Image
                    src={project.img}
                    alt={project.name}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, project.id)}
                  />
                </td>
                <td className="border border-gray-700 p-2">{project.name}</td>
                <td className="border border-gray-700 p-2">
                  {project.tags.join(", ")}
                </td>
                <td className="border border-gray-700 p-2">{project.status}</td>
                <td className="border border-gray-700 p-2">
                  <a
                    href={project.link}
                    target="_blank"
                    className="text-blue-400"
                  >
                    Link
                  </a>
                </td>
                <td className="border border-gray-700 p-2">
                  <button
                    onClick={() => deleteProject(project.id)}
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
