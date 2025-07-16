import React from "react";
import Image from "next/image";
import { Instagram, Facebook, Heart } from "lucide-react";

const IndividualFooter = () => {
  return (
    <footer className="bg-[#4B2477] text-white py-12 px-4 sm:px-6 lg:px-12 lg:mx-[-4rem]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between flex-wrap gap-10 md:gap-0">
        {/* Left Section: Logo and Links */}
        <div className="flex flex-col space-y-4 md:space-y-6">
          <div className="flex items-center space-x-2">
            <Image
              src="https://client.avertisystems.com/assets/img/averti21.png"
              alt="Averti Systems Logo"
              width={100}
              height={100}
              className="w-[80px] h-auto"
            />
          </div>
          <div className="flex flex-col space-y-2 text-sm">
            <a href="#" className="hover:text-gray-300">
              About
            </a>
            <a href="#" className="hover:text-gray-300">
              FAQ
            </a>
            <a href="#" className="hover:text-gray-300">
              Terms of Use
            </a>
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Center Section: Social Icons */}
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-gray-300">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 8v10a5 5 0 1 1-5-5" />
              <path d="M16 3a5 5 0 0 0 5 5" />
              <path d="M16 3v13a5 5 0 0 1-5 5" />
            </svg>
          </a>
        </div>

        {/* Right Section: Contact Button & Info */}
        <div className="flex flex-col items-start md:items-end space-y-4 text-sm">
          <button className="bg-[#FF5C00] hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition-colors w-fit">
            Contact Us
          </button>
          <div className="flex items-center space-x-1">
            <span>Made with love</span>
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div className="text-white">in San Francisco, California</div>
        </div>
      </div>
    </footer>
  );
};

export default IndividualFooter;
