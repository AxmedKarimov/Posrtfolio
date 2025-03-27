"use client";
import { FaSquareGithub } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";

interface NavLinkItem {
  name: string;
  path: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks: NavLinkItem[] = [
    { name: "Bosh sahifa", path: "/" },
    { name: "Haqida", path: "/about" },
    { name: "Loyihalar", path: "/projects" },
    { name: "Boglanish", path: "/contact" },
  ];

  return (
    <nav className="w-full h-[80px] border-b-2 border-neutral-700 bg-neutral-800 flex items-center justify-between px-6 relative">
      {/* Logo va Menyu tugmasi */}
      <div className="flex items-center gap-6 z-50">
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose size={33} /> : <IoMenu size={33} />}
        </button>
        <Link
          href={"/"}
          className="text-white text-2xl font-bold cursor-pointer"
        >
          Karimov <span className="text-green-600">Axmed</span>
        </Link>
      </div>

      {/* Katta ekranda korinadigan navbar */}
      <ul className="hidden lg:flex gap-6 text-white text-lg font-light">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.path}
              className="relative px-2 pb-2 hover:text-green-400"
            >
              {link.name}
            </Link>
          </li>
        ))}
        <li>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSquareGithub
              size={27}
              className="rounded-full hover:text-green-400 transition"
            />
          </a>
        </li>
      </ul>

      {/* Mobil menyu */}
      <div
        className={`fixed top-0 left-0  w-[200px] h-[400px]  bg-neutral-800 bg-opacity-90 flex flex-col items-center justify-center transition-transform duration-300 ${
          isOpen ? "translate-y-0 mt-18" : "-translate-y-[500px] "
        } lg:hidden z-50`}
      >
        {/* Mobil menyu tarkibi */}
        <ul className="flex flex-col gap-6 text-white text-2xl font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.path}
                className="hover:text-green-400 block py-2"
                onClick={() => setIsOpen(false)} // Link bosilganda menyu yopiladi
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-green-400 transition"
              onClick={() => setIsOpen(false)}
            >
              <FaSquareGithub size={30} />
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
