"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";


interface Tool {
  id: number;
  name: string;
  img: string;
}

interface Client {
  id: number;
  name: string;
  img: string;
}

export default function AboutPage() {
  const supabase = createClient();
  const [tools, setTools] = useState<Tool[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: toolsData, error: toolsError } = await supabase
        .from("tools")
        .select("*");

      if (!toolsError && toolsData) setTools(toolsData);

      const { data: clientsData, error: clientsError } = await supabase
        .from("clients")
        .select("*");

      if (!clientsError && clientsData) setClients(clientsData);
    }

    fetchData();
  }, [supabase]);

  const skills = [
    {
      name: "Seo",
      description: "Qidiruv tizimining natijalarida sayt reytingini yaxshilash",
      icon: "/image wrapper.svg",
    },
    {
      name: "Dizayn",
      description: "Kuchli dizayn va kichik detallarga e'tibor berish",
      icon: "/image wrapper (1).svg",
    },
    {
      name: "Sifat",
      description: "Yuqori darajada sifatli ishlangan saytlar",
      icon: "/image wrapper (2).svg",
    },
    {
      name: "Tezkorlik",
      description: "Qisqa muddat ichida sayt yaratish",
      icon: "/image wrapper (3).svg",
    },
  ];

  return (
    <div className="min-h-screen text-white px-6 py-10 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-green-400">
        Men haqimda
      </h1>
      <p className="mt-4 text-gray-300 max-w-2xl text-start mb-6">
        Men Karimov Axmed veb dasturchisiman. Yoshim 16 da, Bucoro viloyati
        Kogon shahrida tug‘ilganman. Qiziqarli, ko‘p funksionallikga ega bo‘lgan
        va kuchli dizaynga ega bo‘lgan dasturlar yaratishga qiziqaman.
        <br />
        <br />
        <span className="mt-2">
          Mening vazifam veb-saytni foydalanuvchilarga qulay, sayt dizayni jalb
          qiluvchi lekin ayni paytda tezkor bo‘lishini ta’minlashdir. Agar sizga
          men yaratgan loyihalarim qiziq bo‘lsa,{" "}
          <span className="text-green-400">Loyihalar</span> sahifasiga tashrif
          buyurishingiz mumkin.
        </span>
      </p>
      <Link
        href={"/contact"}
        className="mt-5 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Bog‘lanish
      </Link>

      {/* Asbob-uskunalar */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-green-400">Asbob-uskunalar</h2>
        <div className="grid grid-cols-4 gap-6 mt-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-gray-900 p-4 rounded-lg flex flex-col items-center"
            >
              <img src={tool.img} alt={tool.name} className="w-12 h-12" />
              <p className="mt-2">{tool.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Men nimalar qila olaman */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-green-400">
          Men nimalar qila olaman
        </h2>
        <div className="grid grid-cols-2 gap-6 mt-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-lg flex flex-col items-start"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-12 h-12 mb-2"
              />
              <h3 className="text-lg font-bold flex flex-col">
                {skill.name}
                <span className="border-b-4 border-green-400 w-12 mt-1"></span>
              </h3>
              <p className="text-gray-300 mt-2">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mijozlar */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-green-400">Mijozlar</h2>
        <div className="grid grid-cols-3 gap-6 mt-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-gray-900 p-4 rounded-lg flex flex-col items-center"
            >
              <img src={client.img} alt={client.name} className="w-16 h-16" />
              <p className="mt-2">{client.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
