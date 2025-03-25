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
    { name: "Bog'lanish", path: "/contact" },
  ];

  return (
    <nav className="w-full h-[80px] border-b-2 border-neutral-700 bg-neutral-800 flex items-center justify-between px-6">
      {/* Logo va Menyu tugmasi */}
      <div className="flex items-center gap-6 z-50">
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose size={33} /> : <IoMenu size={33} />}
        </button>
        <h1 className="text-white text-2xl font-bold">
          Karimov <span className="text-green-600">Axmed</span>
        </h1>
      </div>

      {/* Katta ekranda ko'rinadigan navbar */}
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
        className={`fixed top-0 left-100 h-full w-[250px] bg-neutral-800 p-5 shadow-md transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        {/* Mobil menyu tarkibi */}
        <ul className="flex flex-col gap-5 mt-10 text-white text-lg">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.path}
                className="hover:text-green-400 block py-2"
                onClick={() => setIsOpen(false)}
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
              className="flex items-center gap-2"
            >
              <FaSquareGithub
                size={27}
                className="hover:text-green-400 transition"
              />
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
