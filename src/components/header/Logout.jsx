"use client";

import { doSingOut } from "@/app/actions";

const Logout = () => {
  const handleSignOut = () => {
    doSingOut();
  };
  return (
    <li>
        <a
          type="submit"
          onClick={handleSignOut}
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
        >
          Logout
        </a>
    </li>
  );
};

export default Logout;
