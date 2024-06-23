"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosLogIn } from "react-icons/io";
import SearchCm from "../header/SearchCm";
import UserMenu from "../header/UserMenu";

const SearchAndMenu = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <div className="hidden md:flex w-1/2 mx-4 justify-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <SearchCm />
        </div>
      </div>

      {/* Links */}
      <div className="hidden md:flex space-x-6 justify-end items-center">
        <Link
          href="/contact"
          className="text-gray-800 hover:text-gray-700 font-semibold hover:font-bold hover:text-pink-500 duration-500"
        >
          Contact
        </Link>
        <a
          href="#"
          className="text-gray-800 hover:text-gray-700 font-semibold hover:font-bold hover:text-pink-500 duration-500"
        >
          Services
        </a>
        {session?.user?.email ? (
          <UserMenu session={session} />
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md text-white hover:bg-opacity-80 hover:text-pink-500 font-semibold hover:font-bold  duration-500"
          >
            <IoIosLogIn /> Login
          </Link>
        )}
      </div>
    </>
  );
};

export default SearchAndMenu;
