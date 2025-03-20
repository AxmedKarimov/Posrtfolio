import { FaSquareGithub } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";

interface NavLinkItem {
  name: string;
  path: string;
}

export default function Navbar() {
  const navLinks: NavLinkItem[] = [
    { name: "Bosh sahifa", path: "/" },
    { name: "Haqida", path: "/about" },
    { name: "Loyihalar", path: "/projects" },
    { name: "Bog'lanish", path: "/contact" },
  ];

  return (
    <div className="w-full h-[80px] border-b-neutral-700 border-b-2 bg-neutral-800 flex items-center justify-between p-4">
      <div className="flex gap-6">
        <IoMenu className="text-white" size={33} />
        <h1 className="text-center text-white text-2xl font-bold">
          Karimov <span className="text-green-600">Axmed</span>
        </h1>
      </div>
      <div>
        <ul className="gap-6 list-none text-white text-1xl font-light cursor-pointer flex items-center">
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
            <a href="https://github.com/">
              <FaSquareGithub size={27} className="rounded-full" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
