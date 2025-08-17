import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-blue-400 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand - Clickable */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-white transition"
        >
          Aartech Solonics Ltd
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <Link to="/developers" className="hover:text-white transition">
            Developer
          </Link>
          <Link to="/about" className="hover:text-white transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-white transition">
            Contact
          </Link>
          <Link
            to="/login"
            className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-blue-400 hover:text-white transition"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-black border-t border-blue-800">
          <ul className="flex flex-col gap-4 px-6 py-4 text-lg">
            <li>
              <Link
                to="/developers"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-white transition"
              >
                Developers
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-white transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-white transition"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block bg-red-600 text-white px-4 py-2 rounded-md font-semibold text-center hover:bg-red-700 transition"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
