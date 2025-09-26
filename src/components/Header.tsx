"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import logo from "../image/logo-dark.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-50 w-full border-b border-gray-100  top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              {/* <div className="w-8 h-8 bg-zabit-primary rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-zabit-dark">AVERTI SYSTEMS</span> */}
              <Image
                src={logo}
                alt="Averti Systems Logo"
                width={100}
                height={100}
                className="w-full h-[3rem] object-cover"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-[35%]">
            <Link
              href="/"
              className="text-gray-700 hover:text-zabit-primary transition-colors duration-200 font-medium"
            >
              Platform
            </Link>
            <Link
              href="/individual"
              className="text-gray-700 hover:text-zabit-primary transition-colors duration-200 font-medium"
            >
              For Individuals
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <button className="bg-zabit-dark text-white px-6 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 hover:scale-105">
              Book a demo
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-zabit-primary transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#platform"
                className="text-gray-700 hover:text-zabit-primary transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Platform
              </a>
              <a
                href="#individuals"
                className="text-gray-700 hover:text-zabit-primary transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                For Individuals
              </a>
              <button className="bg-zabit-dark text-white px-6 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 text-left">
                Book a demo
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
