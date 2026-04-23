// @flow strict
"use client";
import Link from "next/link";
import { useState } from "react";
import { personalData } from "@/utils/data/personal-data";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className=" text-[#16f2b3] text-3xl font-bold">
            {personalData.name}
          </Link>
        </div>

        {/* Hamburger button — visible only on mobile */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-[5px] p-2 z-[60]"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`block h-[2px] w-6 bg-white rounded transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-white rounded transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-white rounded transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>

        {/* Desktop nav — always visible at md+ */}
        <ul className="hidden md:flex md:h-auto md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100 text-sm" id="navbar-default">
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#about">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">ABOUT</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#experience"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EXPERIENCE</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#skills"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">SKILLS</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#education"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EDUCATION & CERTS</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/blog"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">BLOGS</div></Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#projects"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">PROJECTS</div></Link>
          </li>
        </ul>

        {/* Mobile drawer overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile slide-in menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#0d1224] border-l border-[#1b2c68] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col pt-20 px-6 gap-2">
            <Link className="block py-3 no-underline outline-none hover:no-underline border-b border-[#1b2c68]" href="/#about" onClick={closeMenu}>
              <span className="text-sm text-white transition-colors duration-300 hover:text-pink-600">ABOUT</span>
            </Link>
            <Link className="block py-3 no-underline outline-none hover:no-underline border-b border-[#1b2c68]" href="/#experience" onClick={closeMenu}>
              <span className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EXPERIENCE</span>
            </Link>
            <Link className="block py-3 no-underline outline-none hover:no-underline border-b border-[#1b2c68]" href="/#skills" onClick={closeMenu}>
              <span className="text-sm text-white transition-colors duration-300 hover:text-pink-600">SKILLS</span>
            </Link>
            <Link className="block py-3 no-underline outline-none hover:no-underline border-b border-[#1b2c68]" href="/#education" onClick={closeMenu}>
              <span className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EDUCATION & CERTS</span>
            </Link>
            <Link className="block py-3 no-underline outline-none hover:no-underline border-b border-[#1b2c68]" href="/blog" onClick={closeMenu}>
              <span className="text-sm text-white transition-colors duration-300 hover:text-pink-600">BLOGS</span>
            </Link>
            <Link className="block py-3 no-underline outline-none hover:no-underline border-b border-[#1b2c68]" href="/#projects" onClick={closeMenu}>
              <span className="text-sm text-white transition-colors duration-300 hover:text-pink-600">PROJECTS</span>
            </Link>
            <Link className="block py-3 no-underline outline-none hover:no-underline" href="/#contact" onClick={closeMenu}>
              <span className="text-sm text-[#16f2b3] transition-colors duration-300 hover:text-pink-600">CONTACT</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
