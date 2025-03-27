"use client";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
  img: string;
  xeshtegs: string;
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
    xeshtegs: "",
    status: "active",
    link: "",
  });

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) console.error("Supabase error:", error.message);
      else setProjects(data as Project[]);
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
      .insert([newProject])
      .select();
    if (error) return console.error("Qo‘shishda xatolik:", error.message);
    setProjects([...projects, data[0]]);
    setNewProject({
      id: 0,
      name: "",
      img: "",
      xeshtegs: "",
      status: "active",
      link: "",
    });
  }

  async function updateProject(project: Project) {
    const { error } = await supabase
      .from("projects")
      .update(project)
      .match({ id: project.id });
    if (error) return console.error("Tahrirlashda xatolik:", error.message);
    setProjects(projects.map((p) => (p.id === project.id ? project : p)));
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
          placeholder="Hashtag"
          className="p-2 w-full rounded bg-gray-700 text-white mb-2"
          value={newProject.xeshtegs}
          onChange={(e) =>
            setNewProject({ ...newProject, xeshtegs: e.target.value })
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
            {projects.map((project) => (
              <tr key={project.id} className="text-center bg-gray-800">
                <td className="border border-gray-700 p-2">
                  <img
                    src={project.img}
                    alt={project.name}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, project.id)}
                  />
                </td>
                <td className="border border-gray-700 p-2">
                  <input
                    type="text"
                    value={project.name}
                    className="bg-gray-700 p-1 rounded text-white"
                    onChange={(e) =>
                      setProjects((prev) =>
                        prev.map((p) =>
                          p.id === project.id
                            ? { ...p, name: e.target.value }
                            : p
                        )
                      )
                    }
                    onBlur={() => updateProject(project)}
                  />
                </td>
                <td className="border border-gray-700 p-2">
                  <input
                    type="text"
                    value={project.xeshtegs}
                    className="bg-gray-700 p-1 rounded text-white"
                    onChange={(e) =>
                      setProjects((prev) =>
                        prev.map((p) =>
                          p.id === project.id
                            ? { ...p, xeshtegs: e.target.value }
                            : p
                        )
                      )
                    }
                    onBlur={() => updateProject(project)}
                  />
                </td>
                <td className="border border-gray-700 p-2">
                  <select
                    value={project.status}
                    className="bg-gray-700 p-1 rounded text-white"
                    onChange={(e) =>
                      setProjects((prev) =>
                        prev.map((p) =>
                          p.id === project.id
                            ? { ...p, status: e.target.value }
                            : p
                        )
                      )
                    }
                    onBlur={() => updateProject(project)}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
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
