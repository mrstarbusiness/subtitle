// components/Footer.js
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 md:flex md:justify-between md:items-center">
        {/* Copyright */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center md:justify-start mb-4 md:mb-0 space-x-6">
          <a href="#" className="text-white hover:text-gray-400">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Site Links */}
        <div className="text-center md:text-right">
          <a href="#" className="text-white hover:text-gray-400 mx-2">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-400 mx-2">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-400 mx-2">
            Services
          </a>
          <a href="#" className="text-white hover:text-gray-400 mx-2">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
