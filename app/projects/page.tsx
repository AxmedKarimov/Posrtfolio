"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/supabase/client";

interface Project {
  id: number;
  name: string;
  img?: string;
  tags?: string[];
  status: string;
}

const Projects: React.FC = () => {
  const supabase = createClient();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Barchasi");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("projects").select("*");
        if (error) {
          console.error("Supabase Error:", error);
          setProjects([]);
          return;
        }
        setProjects(data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen px-6 md:px-16 py-10 text-white">
      <h2 className="text-4xl font-bold border-b-2 border-gray-700 pb-3 text-green-400">
        Loyihalar
      </h2>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projects?.length ? (
          projects
            .filter(
              (project) =>
                selectedCategory === "Barchasi" ||
                project.status === selectedCategory
            )
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
        ) : (
          <p className="text-gray-400">
            Hozircha hech qanday loyiha mavjud emas.
          </p>
        )}
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
          className="bg-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition text-white"
        >
          Tashrif buyurish
        </Link>
      </div>
    </section>
  );
};

export default Projects;

// -------------------
// ✅ <ProjectCard /> komponenti tuzatilgan
// -------------------
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (project.img?.startsWith("data:image")) {
      setImageSrc(project.img);
    } else {
      setImageSrc(project.img && project.img !== "" ? project.img : null);
    }
  }, [project.img]);

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-700 hover:border-gray-500 transition">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={project.name || "Loyiha rasmi"}
          width={500}
          height={300}
          className="rounded-lg border border-gray-700"
          unoptimized
        />
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-800 text-gray-500 rounded-lg">
          No Image
        </div>
      )}

      <div className="flex justify-between mt-3 border-b border-gray-700 pb-2">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <span
          className={`text-sm font-medium ${
            project.status === "Yuoqari" ? "text-green-400" : "text-red-400"
          }`}
        >
          {project.status}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.tags?.map((tag, index) => (
          <span
            key={`${project.id}-${tag}-${index}`}
            className="bg-gray-800 text-xs px-2 py-1 rounded-md text-gray-300 border border-gray-700"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
