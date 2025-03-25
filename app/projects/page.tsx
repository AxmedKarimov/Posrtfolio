"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const supabaseUrl: string = "https://your-supabase-url.supabase.co";
const supabaseAnonKey: string = "your-anon-key";

interface Project {
  id: number;
  title: string;
  image: string;
  tags: string[];
  status: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Barchasi");

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (!error && data) {
        setProjects(data as Project[]);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className=" min-h-screen px-6 md:px-16 py-10 text-white">
      <h2 className="text-4xl font-bold border-b-2 border-gray-700 pb-3 text-green-400">
        Loyihalar
      </h2>

      {/* Filter */}
      <div className="flex items-center gap-4 mt-6">
        <button className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition">
          <span>Filtrlash</span>
        </button>
        <select
          className="bg-gray-800 px-4 py-2 rounded-lg text-white border border-gray-600"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>Barchasi</option>
          <option>Yuoqari</option>
          <option>Past</option>
        </select>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 ">
        {projects
          .filter(
            (project) =>
              selectedCategory === "Barchasi" ||
              project.status === selectedCategory
          )
          .map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-700 hover:border-gray-500 transition"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="rounded-lg border border-gray-700"
              />
              <div className="flex justify-between mt-3 border-b border-gray-700 pb-2">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <span
                  className={`text-sm font-medium ${
                    project.status === "Yuoqari"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-800 text-xs px-2 py-1 rounded-md text-gray-300 border border-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Telegram Section */}
      <div className="bg-gray-900 p-6 mt-10 rounded-lg flex items-center justify-between border border-gray-700">
        <div>
          <h3 className="text-xl font-bold">Telegram kanal</h3>
          <p className="text-gray-400">
            Barcha loyihalarimni telegram kanalida ham kuzatib borishingiz
            mumkin!
          </p>
        </div>
        <Link
          href="https://t.me/axmedkarimov34"
          className="bg-green-500 px-4 py-2 rounded-lg  font-semibold hover:bg-green-600 transition text-white"
        >
          Tashrif buyurish
        </Link>
      </div>
    </section>
  );
};

export default Projects;
