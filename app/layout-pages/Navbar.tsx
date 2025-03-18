import React from "react";
import { FaSquareGithub } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

export default function Navbar() {
  return (
    <div className="w-full h-[80px] border  bg-neutral-800 flex items-center justify-between p-4">
      <div className="flex gap-6">
        <IoMenu className="text-white" size={33} />
        <h1 className="text-center text-white text-2xl font-bold">
          Karimov <span className="text-green-600">Axmed</span>
        </h1>
      </div>
      <div>
        <ul className=" gap-6 list-none text-white text-1xl font-light cursor-pointer flex items-center">
          <li>Bosh sahifa</li>
          <li>Haqida</li>
          <li>Loyihalar</li>
          <li>Bog'lanish</li>
          <li>
            <a href="https://github.com/">
              {" "}
              <FaSquareGithub size={27} className="rounded-full" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
