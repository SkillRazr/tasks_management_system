import React from "react";
import logo from "@/assets/Skillrazr_logo.svg";
import Image from "next/image";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const boardsList = ["skilrazr apr", "skilrazr may", "skilrazr jun"];
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center px-3 py-2 bg-slate-500/10 rounded-b-2xl">
        <div
          className="
            absolute
            top-0
            left-0
            w-full
            h-96
            bg-gradient-to-br
            from-pink-400
            to-[#0055D1]
            rounded-md
            filter
            blur-3xl
            opacity-50
            -z-50"
        />

        <Image
          src={logo}
          alt="logo"
          className="w-44 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* search box */}
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          {/* avatar */}
          <div className="h-10 w-10 ml-4 sm:ml-8 rounded-full overflow-hidden">
            <Image
              // src={user.photoURL}
              alt="avatar"
              className="bg-pink-500 h-full w-full object-cover cursor-pointer"
              // onClick={handleClick}
            />
          </div>
        </div>
      </div>
      {/* select months */}
      <div className="flex space-x-10 px-3 py-4 items-center">
        <PlusIcon className="h-6 w-6 cursor-pointer" />
        {boardsList.map((board, index) => (
          <div
            key={index}
            className="cursor-pointer py-1 px-4 hover:bg-gray-100 rounded"
          >
            <p className="text-lg font-semibold">{board}</p>
          </div>
        ))}
      </div>
    </header>
  );
};
