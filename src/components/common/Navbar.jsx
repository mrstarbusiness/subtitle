import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import SearchAndMenu from "./SearchAndMenu";

const Navbar = () => {
  return (
    <SessionProvider>
      <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto grid grid-cols-3 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              <Image
                src="/assets/bd_sub_logo.png"
                height={40}
                width={60}
                alt="subtitle bangla logo"
              />
            </Link>
          </div>

          <SearchAndMenu />
        </div>

        {/* Mobile Menu */}
        {/* <div className="md:hidden mt-4">
          <div className="flex w-full mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <a href="#" className="block text-gray-800 hover:text-blue-500 mb-2">
            Link 1
          </a>
          <a href="#" className="block text-gray-800 hover:text-blue-500 mb-2">
            Link 2
          </a>
          <a href="#" className="block text-gray-800 hover:text-blue-500">
            Link 3
          </a>
        </div> */}
      </nav>
    </SessionProvider>
  );
};

export default Navbar;
