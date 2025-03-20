import React from "react";
import Image from "next/image";

export default function SideBar() {
  return (
    <div className="w-1/4 bg-neutral-800 h-[667px] p-3 pt-5">
      <Image
        src={"/photo.avif"}
        alt={"Profile Picture"}
        width={250}
        height={150}
        className="rounded-lg mx-auto mb-3"
      />
      <h1 className="text-white text-2xl mb-2">Karimov Axmed</h1>
      <div className="flex flex-wrap justify-start items-center gap-2 mb-3  ">
        <div className="status">Veb dasturchi</div>
        <div className="status">Odam</div>
        <div className="status">Gamer</div>
        <div className="status">Shift</div>
        <div className="status">G-64</div>
      </div>
      <hr className="w-full border-1  text-neutral-700 mb-3" />
      <div className="flex justify-center items-center gap-3 mb-2">
        <Image src={"/Frame 11.svg"} width={45} height={45} alt="gmail" />
        <div>
          <h1 className="text-white text-1 mb-1">E-pochta</h1>
          <a className="text-neutral-400" href="">
            axmedkarimov34@gmail.com
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 mb-2">
        <Image src={"/Frame 11 (1).svg"} width={45} height={45} alt="gmail" />
        <div>
          <h1 className="text-white text-1 mb-1">Github</h1>
          <a className="text-neutral-400" href="">
            axmedkarimov34@gmail.com
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 mb-2">
        <Image src={"/Frame 11 (2).svg"} width={45} height={45} alt="gmail" />
        <div>
          <h1 className="text-white text-1 mb-1">Telegram</h1>
          <a className="text-neutral-400" href="">
            axmedkarimov34@gmail.com
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Image src={"/Frame 11 (3).svg"} width={45} height={45} alt="gmail" />
        <div>
          <h1 className="text-white text-1 mb-1">Telefon raqam</h1>
          <a className="text-neutral-400" href="">
            axmedkarimov34@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
